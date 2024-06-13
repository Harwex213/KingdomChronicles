using System.Collections.Concurrent;
using KingdomChronicles.Services.DTOs.Game;
using KingdomChronicles.Services.DTOs.UserProfile;
using KingdomChronicles.Services.Game;
using KingdomChronicles.WebApi.Constants;
using KingdomChronicles.WebApi.Hubs.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.SignalR;
using Microsoft.EntityFrameworkCore;

namespace KingdomChronicles.WebApi.Hubs;

[Authorize]
public class StartGameHub : Hub
{
    private static readonly ConcurrentDictionary<string, string> ConnectionIds = new();
    private static readonly ConcurrentDictionary<Guid, PendingStartGame> PendingStartGames = new();
    private readonly DataAccess.AppDbContext _dbContext;
    private readonly AutoMapper.IMapper _mapper;

    public StartGameHub(DataAccess.AppDbContext dbContext, AutoMapper.IMapper mapper)
    {
        _dbContext = dbContext;
        _mapper = mapper;
    }

    private async Task<bool> CheckIsShouldBeInStartedGame(int userId)
    {
        if (GameHub.IsPlayerShouldBeInGame(userId))
        {
            await Clients.Caller.SendAsync(GameHubConstants.NotInGameEvents.ShouldBeInStartedGame);
            return true;
        }

        return false;
    }

    private async Task TryAbortExistedConnection()
    {
        if (ConnectionIds.TryRemove(Context.UserIdentifier!, out var oldConnectionId))
        {
            await Clients.Client(oldConnectionId).SendAsync(GameHubConstants.NotInGameEvents.AbortExistedConnection);
        }
    }

    private void SaveCurrentConnection()
    {
        if (ConnectionIds.TryAdd(Context.UserIdentifier!, Context.ConnectionId) == false)
        {
            throw new HubException(GameHubConstants.Errors.CannotConnect);
        }
    }

    private async Task<StartGameHubUser> RetrieveHubUser(int userId)
    {
        var userProfile = await _dbContext.UserProfiles.AsNoTracking().FirstOrDefaultAsync(u => u.UserId == userId);
        return new StartGameHubUser
        {
            UserProfile = _mapper.Map<UserProfileDto>(userProfile)
        };
    }

    private async Task SendCurrentPendingStartGames()
    {
        var pendingStartGames = PendingStartGames.Select(g => g.Value).ToList();
        var pendingStartGamesDto = _mapper.Map<IEnumerable<PendingStartGameDto>>(pendingStartGames);
        await Clients.Caller.SendAsync(GameHubConstants.NotInGameEvents.CurrentPendingStartGames, pendingStartGamesDto);
    }

    private async Task SendUserProfileInfo(StartGameHubUser hubUser)
    {
        await Clients.Caller.SendAsync(GameHubConstants.UserProfileEvents.UserProfileInfo, hubUser.UserProfile);
    }
    
    public override async Task OnConnectedAsync()
    {
        var connectedUserId = int.Parse(Context.UserIdentifier!);
        
        if (await CheckIsShouldBeInStartedGame(connectedUserId))
        {
            return;
        }

        await TryAbortExistedConnection();
        
        SaveCurrentConnection();

        var hubUser = await RetrieveHubUser(connectedUserId);
        Context.Items.Add(GameHubConstants.HubUserItemKey, hubUser);
        
        await Groups.AddToGroupAsync(Context.ConnectionId, GameHubConstants.GroupNames.NotInGame);

        await SendUserProfileInfo(hubUser);
        await SendCurrentPendingStartGames();
    }

    private StartGameHubUser GetCurrentHubUser()
    {
        if (Context.Items.TryGetValue(GameHubConstants.HubUserItemKey, out var foundHubUser) == false)
        {
            throw new HubException(GameHubConstants.Errors.PlayerNotFound);
        }
        return (StartGameHubUser)foundHubUser!;
    }

    public async Task SendMessage(string message)
    {
        var currentHubUser = GetCurrentHubUser();

        var chatMessage = new ChatMessageDto
        {
            Message = message,
            SendingTime = DateTime.UtcNow
        };

        bool isUserInGame;
        string? gameId;
        lock (currentHubUser)
        {
            chatMessage.Author = currentHubUser.UserProfile.Name;
            isUserInGame = currentHubUser.IsInGame;
            gameId = currentHubUser.IsInGame ? currentHubUser.Game!.Id.ToString() : null;
        }
        
        if (isUserInGame)
        {
            await Clients.Group(gameId!).SendAsync(GameHubConstants.PendingStartGameEvents.NewChatMessage, chatMessage);
        }
        else
        {
            await Clients.Group(GameHubConstants.GroupNames.NotInGame)
                .SendAsync(GameHubConstants.NotInGameEvents.NewChatMessage, chatMessage);
        }
    }

    private async Task ChangeGroupToGame(string gameId)
    {
        await Groups.RemoveFromGroupAsync(Context.ConnectionId, GameHubConstants.GroupNames.NotInGame);
        await Groups.AddToGroupAsync(Context.ConnectionId, gameId);
    }

    private async Task ChangeGroupToNotInGame(string oldGameId)
    {
        await Groups.RemoveFromGroupAsync(Context.ConnectionId, oldGameId);
        await Groups.AddToGroupAsync(Context.ConnectionId, GameHubConstants.GroupNames.NotInGame);
    }

    private async Task SendGlobalEventGameCreated(PendingStartGame createdGame)
    {
        var pendingStartGameDto = _mapper.Map<PendingStartGameDto>(createdGame);
        await Clients.Group(GameHubConstants.GroupNames.NotInGame)
            .SendAsync(GameHubConstants.NotInGameEvents.GameCreated, pendingStartGameDto);
    }
    
    private async Task SendGlobalEventGameUpdated(PendingStartGame updatedGame)
    {
        var pendingStartGameDto = _mapper.Map<PendingStartGameDto>(updatedGame);
        await Clients.Group(GameHubConstants.GroupNames.NotInGame)
            .SendAsync(GameHubConstants.NotInGameEvents.GameUpdated, pendingStartGameDto);
    }

    private async Task SendGlobalEventGameDestroyed(Guid gameId)
    {
        await Clients.Group(GameHubConstants.GroupNames.NotInGame)
            .SendAsync(GameHubConstants.NotInGameEvents.GameDestroyed, gameId);
    }
    
    public async Task CreateGame(CreateGameDto createGameDto)
    {
        var (validationResult, errorMessage) = Utils.Validate(createGameDto);
        if (validationResult == false)
        {
            throw new HubException(errorMessage);
        }

        var currentHubUser = GetCurrentHubUser();

        var newGame = _mapper.Map<PendingStartGame>(createGameDto);
        newGame.OwnerId = currentHubUser.UserProfile.UserId;
        newGame.AddNewUserProfile(currentHubUser.UserProfile);
        PendingStartGames.TryAdd(newGame.Id, newGame);
        
        lock (currentHubUser)
        {
            if (currentHubUser.IsInGame)
            {
                throw new HubException(GameHubConstants.Errors.AlreadyInGame);
            }
            currentHubUser.Game = newGame;
        }
        
        await ChangeGroupToGame(newGame.Id.ToString());
        
        await Clients.Caller.SendAsync(GameHubConstants.PendingStartGameEvents.CreatedGame, newGame);
        await SendGlobalEventGameCreated(newGame);
    }

    public async Task JoinGame(Guid gameId)
    {
        var currentHubUser = GetCurrentHubUser();

        if (PendingStartGames.TryGetValue(gameId, out var game) == false)
        {
            throw new HubException(GameHubConstants.Errors.GameNotFound);
        }

        lock (currentHubUser)
        {
            if (currentHubUser.IsInGame)
            {
                throw new HubException(GameHubConstants.Errors.AlreadyInGame);
            }
            currentHubUser.Game = game;
        }
        
        lock (game)
        {
            if (game.UserProfiles.Count == game.MaxPlayersAmount)
            {
                throw new HubException(GameHubConstants.Errors.GameIsFull);
            }
        
            game.AddNewUserProfile(currentHubUser.UserProfile);
        }

        await ChangeGroupToGame(game.Id.ToString());
        
        await Clients.Caller.SendAsync(GameHubConstants.PendingStartGameEvents.JoinedToGame, game);
        await Clients.GroupExcept(game.Id.ToString(), Context.ConnectionId)
            .SendAsync(GameHubConstants.PendingStartGameEvents.PlayerJoined, game);
        await SendGlobalEventGameUpdated(game);
    }

    private static PendingStartGame RetrieveGame(StartGameHubUser hubUser)
    {
        PendingStartGame game;
        lock (hubUser)
        {
            if (hubUser.IsInGame == false)
            {
                throw new HubException(GameHubConstants.Errors.NotInGame);
            }

            game = hubUser.Game!;
        }

        return game;
    }

    private async Task ChangeReadyStatus(bool newReadyStatus)
    {
        var currentHubUser = GetCurrentHubUser();
        var game = RetrieveGame(currentHubUser);
        
        lock (game)
        {
            if (game.OwnerId == currentHubUser.UserProfile.UserId)
            {
                throw new HubException(GameHubConstants.Errors.ShouldBeNotOwner);
            }

            game.PlayersReadyStatus[currentHubUser.UserProfile.UserId] = newReadyStatus;
        }

        await Clients.Group(game.Id.ToString())
            .SendAsync(GameHubConstants.PendingStartGameEvents.PlayerChangeReadyStatus, new PlayerChangeReadyStatusDto
            {
                UserId = currentHubUser.UserProfile.UserId,
                Status = newReadyStatus
            });
    }

    public async Task ReadyForGame()
    {
        await ChangeReadyStatus(true);
    }

    public async Task NotReadyForGame()
    {
        await ChangeReadyStatus(false);
    }

    public async Task UpdateMapGenerationConfig(string mapGenerationConfig)
    {
        var currentHubUser = GetCurrentHubUser();
        var game = RetrieveGame(currentHubUser);

        lock (game)
        {
            if (currentHubUser.UserProfile.UserId != game.OwnerId)
            {
                throw new HubException(GameHubConstants.Errors.ShouldBeOwner);
            }

            game.MapGenerationConfig = mapGenerationConfig;
        }

        await Clients.Group(game.Id.ToString())
            .SendAsync(GameHubConstants.PendingStartGameEvents.MapGenerationConfigUpdate, mapGenerationConfig);
    }

    public async Task LeaveFromGame()
    {
        var currentHubUser = GetCurrentHubUser();
        var game = RetrieveGame(currentHubUser);
        
        lock (currentHubUser)
        {
            currentHubUser.Game = null;
        } 
        await ChangeGroupToNotInGame(game.Id.ToString());
        await Clients.Caller.SendAsync(GameHubConstants.PendingStartGameEvents.LeavedFromGame);
        
        bool isAllPlayersLeaved = false;
        lock (game)
        {
            if (game.UserProfiles.Count == 1)
            {
                isAllPlayersLeaved = true;
            }
            else
            {
                game.RemoveUserProfile(currentHubUser.UserProfile);
            }
        }

        if (isAllPlayersLeaved)
        {
            PendingStartGames.TryRemove(game.Id, out _);
            await SendGlobalEventGameDestroyed(game.Id);
        }
        else
        {
            lock (game)
            {
                if (game.OwnerId == currentHubUser.UserProfile.UserId)
                {
                    game.OwnerId = game.UserProfiles.First().UserId;
                }
            }

            await Clients.GroupExcept(game.Id.ToString(), Context.ConnectionId)
                .SendAsync(GameHubConstants.PendingStartGameEvents.PlayerLeaved, game);
            await SendGlobalEventGameUpdated(game);
        }
    }

    private void CleanConnection()
    {
        ConnectionIds.TryGetValue(Context.UserIdentifier!, out var connectionId);
        if (connectionId == Context.ConnectionId)
        {
            ConnectionIds.TryRemove(Context.UserIdentifier!, out _);
        }
    }
    
    public override async Task OnDisconnectedAsync(Exception? exception)
    {
        var currentHubUser = GetCurrentHubUser();
        
        bool isInGame;
        lock (currentHubUser)
        {
            isInGame = currentHubUser.IsInGame;
        }

        if (isInGame && GameHub.IsPlayerShouldBeInGame(currentHubUser.UserProfile.UserId) == false)
        {
            await LeaveFromGame();
        }
        
        CleanConnection();
        Context.Items.Remove(GameHubConstants.HubUserItemKey);
    }

    public async Task StartGame()
    {
        var currentHubUser = GetCurrentHubUser();
        var game = RetrieveGame(currentHubUser);

        lock (game)
        {
            if (currentHubUser.UserProfile.UserId != game.OwnerId)
            {
                throw new HubException(GameHubConstants.Errors.ShouldBeOwner);
            }

            if (game.PlayersReadyStatus.Where(g => g.Key != game.OwnerId).All(g => g.Value) == false)
            {
                throw new HubException(GameHubConstants.Errors.NotAllPlayersReady);
            }
        }

        PendingStartGames.TryRemove(game.Id, out _);

        await SendGlobalEventGameDestroyed(game.Id);

        var startedGame = _mapper.Map<StartedGame>(game);
        GameHub.AddToStartedGames(startedGame);

        await Clients.Group(game.Id.ToString()).SendAsync(GameHubConstants.PendingStartGameEvents.GameStarted);
    }

    public async Task EditUserProfileInfo(EditUserProfileInfoDto editUserProfileInfoDto)
    {
        var (validationResult, errorMessage) = Utils.Validate(editUserProfileInfoDto);
        if (validationResult == false)
        {
            throw new HubException(errorMessage);
        }
        
        var currentHubUser = GetCurrentHubUser();
        var userProfile = await _dbContext.UserProfiles
            .FirstAsync(u => u.UserId == currentHubUser.UserProfile.UserId);

        userProfile.Name = editUserProfileInfoDto.Name!;
        userProfile.KingdomName = editUserProfileInfoDto.KingdomName!;
        userProfile.Motto = editUserProfileInfoDto.Motto!;
        userProfile.TitleId = editUserProfileInfoDto.TitleId!;
        userProfile.FlagBackgroundColor = editUserProfileInfoDto.BackgroundColor!;

        _dbContext.UserProfiles.Update(userProfile);
        await _dbContext.SaveChangesAsync();
        
        currentHubUser.UserProfile = _mapper.Map<UserProfileDto>(userProfile);

        await SendUserProfileInfo(currentHubUser);
    }

    public async Task EditUserProfileFlag(EditUserProfileFlagDto editUserProfileFlagDto)
    {
        var (validationResult, errorMessage) = Utils.Validate(editUserProfileFlagDto);
        if (validationResult == false)
        {
            throw new HubException(errorMessage);
        }
        
        var currentHubUser = GetCurrentHubUser();
        var userProfile = await _dbContext.UserProfiles
            .FirstAsync(u => u.UserId == currentHubUser.UserProfile.UserId);

        userProfile.FlagBackgroundColor = editUserProfileFlagDto.BackgroundColor!;
        userProfile.FlagForegroundColor = editUserProfileFlagDto.ForegroundColor!;
        userProfile.FlagForegroundSvg = editUserProfileFlagDto.ForegroundSvg!;
        userProfile.FlagEmblemColor = editUserProfileFlagDto.EmblemColor!;
        userProfile.FlagEmblemSvg = editUserProfileFlagDto.EmblemSvg!;
        
        _dbContext.UserProfiles.Update(userProfile);
        await _dbContext.SaveChangesAsync();
        
        currentHubUser.UserProfile = _mapper.Map<UserProfileDto>(userProfile);

        await SendUserProfileInfo(currentHubUser);
    }
}