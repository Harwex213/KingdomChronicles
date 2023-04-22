import { SERVER_METHODS } from "./config";
import { connection, startedGameModel } from "./init";
import { globallyCatchHubException } from "../globallyCatchHubException";
import { GameModel } from "game";
import { CurrentPlayer } from "game-service";
import { mapRendererService } from "../mapRenderer";
import { titles } from "../loaders/titlesLoader";
import { State } from "../../models/states/state";

const STATES = {
    IDLE: "IDLE",
    PENDING_PLAYERS_CONNECT: "PENDING_PLAYERS_CONNECT",
    ALL_PLAYERS_CONNECTED: "ALL_PLAYERS_CONNECTED",
    GAME_RUNNING: "GAME_RUNNING",
};

let gameModel = null;
const gameService = {
    currentPlayer: null,
    state: new State(STATES.IDLE),
};

gameService.sendChatMessage = async (message) => {
    await connection.invoke(SERVER_METHODS.SEND_MESSAGE, message);
};

gameService.doAction = async (actionName, params) => {
    console.log(actionName, params);
    await connection.invoke(SERVER_METHODS.DO_ACTION, JSON.stringify({ actionName, params }));
};

gameService.run = async () => {
    await connection.invoke(SERVER_METHODS.RUN_GAME);
};

gameService.leave = async () => {
    await connection.invoke(SERVER_METHODS.LEAVE_FROM_GAME);
};

globallyCatchHubException(gameService);

gameService.cleanGame = () => {
    gameService.currentPlayer.dispose();
    gameService.currentPlayer = null;
    gameModel = null;
    gameService.state.setState(STATES.IDLE);
};

gameService.startGame = (gameInfo) => {
    gameService.state.setState(STATES.PENDING_PLAYERS_CONNECT);

    startedGameModel.setGameInfo(gameInfo);

    const playersInfo = [];
    let currentPlayerIndexInGame;

    for (let i = 0; i < startedGameModel.userProfiles.length; i++) {
        const userProfile = startedGameModel.userProfiles[i];
        playersInfo.push({
            name: titles.getTitleName(userProfile.titleId) + " " + userProfile.name,
            kingdomName: userProfile.kingdomName,
            motto: userProfile.motto,
            color: userProfile.flag.backgroundColor,
        });
        if (userProfile.userId === startedGameModel.currentPlayer.userProfile.userId) {
            currentPlayerIndexInGame = i;
        }
    }

    console.log(startedGameModel.mapGenerationConfig);
    gameModel = GameModel.createNew({
        seedRandom: startedGameModel.mapGenerationConfig.randomSeed,
        mapSizeType: startedGameModel.mapGenerationConfig.mapSizeType,
        playersInfo: playersInfo,
    });
    if (gameService.currentPlayer !== null) {
        gameService.currentPlayer.dispose();
    }

    gameService.currentPlayer = new CurrentPlayer({
        index: currentPlayerIndexInGame,
        gameState: gameModel.gameState,
        mapRenderer: mapRendererService.mapRenderer,
        onAction: gameService.doAction.bind(gameService),
    });

    if (Object.values(startedGameModel.playersConnectedStatus).every((isConnected) => isConnected)) {
        gameService.state.setState(STATES.ALL_PLAYERS_CONNECTED);
    }
};

gameService.onGameRunning = () => {
    if (gameService.state.current === STATES.ALL_PLAYERS_CONNECTED) {
        gameService.state.setState(STATES.GAME_RUNNING);
    }
};

gameService.onPlayerConnected = (joinerId) => {
    startedGameModel.setPlayerConnected(joinerId);
    if (Object.values(startedGameModel.playersConnectedStatus).every((isConnected) => isConnected)) {
        gameService.state.setState(STATES.ALL_PLAYERS_CONNECTED);
    }
};

gameService.onPlayerDisconnected = (leaverId) => {
    startedGameModel.setPlayerDisconnected(leaverId);
    if (gameService.state.current === STATES.ALL_PLAYERS_CONNECTED) {
        gameService.state.setState(STATES.PENDING_PLAYERS_CONNECT);
    }
    const leaverName = startedGameModel.userProfiles.find((u) => u.userId === leaverId).name;
    startedGameModel.addChatMessage({
        author: "System",
        message: leaverName + " leaved",
        sendingTime: "",
    });
};

gameService.applyAction = ({ actionName, params }) => {
    if (gameService.state.current !== STATES.GAME_RUNNING) {
        return;
    }

    console.log("gameModel.applyAction");
    gameModel.applyAction(actionName, params);
    gameService.currentPlayer.updateActionPossibilities();
};

gameService.nextTick = () => {
    if (gameService.state.current !== STATES.GAME_RUNNING) {
        return;
    }

    gameModel.nextTick();
    gameService.currentPlayer.updateActionPossibilities();
};

export { gameService, STATES };
