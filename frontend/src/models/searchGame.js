import { makeAutoObservable } from "mobx";

export class SearchGame {
    constructor() {
        this.pendingStartGames = [];
        this.chatMessages = [];

        makeAutoObservable(this);
    }

    setPendingStartGames(games) {
        this.pendingStartGames = games;
    }

    addPendingStartGame(game) {
        this.pendingStartGames.unshift(game);
    }

    updatePendingStartGame(game) {
        const gameIndex = this.pendingStartGames.findIndex((g) => g.id === game.id);
        this.pendingStartGames[gameIndex] = game;
    }

    removePendingStartGame(gameId) {
        const gameIndex = this.pendingStartGames.findIndex((game) => game.id === gameId);
        this.pendingStartGames.splice(gameIndex, 1);
    }

    clearChat() {
        this.chatMessages = [];
    }

    addChatMessage(message) {
        this.chatMessages.push(message);
    }
}
