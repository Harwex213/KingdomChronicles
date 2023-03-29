import { makeAutoObservable } from "mobx";
import { userModel } from "../services/auth";

export class PendingStartGame {
    constructor() {
        this.clearGameInfo();

        makeAutoObservable(this, {
            isOwner: false,
        });
    }

    setGameInfo(gameInfo) {
        this.id = gameInfo.id;
        this.name = gameInfo.name;
        this.maxPlayersAmount = gameInfo.maxPlayersAmount;
        this.ownerId = gameInfo.ownerId;
        this.mapGenerationConfig = gameInfo.mapGenerationConfig;
        this.created = gameInfo.created;
        this.userProfiles = Object.values(gameInfo.userProfiles);
        this.playersReadyStatus = gameInfo.playersReadyStatus;

        this.currentPlayer = {
            isOwner: this.ownerId === userModel.id,
            userProfile: this.userProfiles.find((userProfile) => userProfile.userId === userModel.id),
            isReady: this.playersReadyStatus[userModel.id],
        };
    }

    changePlayerReadyStatus({ userId, status }) {
        this.playersReadyStatus[userId] = status;
        if (userModel.id === userId) {
            this.currentPlayer.isReady = status;
        }
    }

    clearGameInfo() {
        this.id = "";
        this.name = "";
        this.maxPlayersAmount = 0;
        this.ownerId = 0;
        this.mapGenerationConfig = "";
        this.created = null;
        this.userProfiles = [];
        this.playersReadyStatus = {};
        this.currentPlayer = {};
        this.chatMessages = [];
    }

    get canOwnerStartGame() {
        for (const [userId, playerReadyStatus] of Object.entries(this.playersReadyStatus)) {
            if (Number(userId) !== this.ownerId && playerReadyStatus !== true) {
                return false;
            }
        }

        return true;
    }

    isOwner(id) {
        return this.ownerId === id;
    }

    clearChat() {
        this.chatMessages = [];
    }

    addChatMessage(message) {
        this.chatMessages.push(message);
    }
}
