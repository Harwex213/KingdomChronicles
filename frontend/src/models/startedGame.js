import { makeAutoObservable } from "mobx";
import { userModel } from "../services/auth";

export class StartedGame {
    constructor() {
        this.clearGameInfo();

        makeAutoObservable(this, {
            isOwner: false,
        });
    }

    setGameInfo(gameInfo) {
        this.id = gameInfo.id;
        this.name = gameInfo.name;
        this.ownerId = gameInfo.ownerId;
        this.created = gameInfo.created;
        this.userProfiles = gameInfo.userProfiles;
        this.playersConnectedStatus = gameInfo.playersConnectedStatus;

        this.currentPlayer = {
            isOwner: this.ownerId === userModel.id,
            userProfile: this.userProfiles.find((userProfile) => userProfile.userId === userModel.id),
        };
    }

    setPlayerConnected(userId) {
        this.playersConnectedStatus[userId] = true;
    }

    setPlayerDisconnected(userId) {
        this.playersConnectedStatus[userId] = true;
    }

    clearGameInfo() {
        this.id = "";
        this.name = "";
        this.ownerId = 0;
        this.created = null;
        this.userProfiles = [];
        this.playersConnectedStatus = {};
        this.currentPlayer = {};
        this.chatMessages = [];
    }

    clearChat() {
        this.chatMessages = [];
    }

    addChatMessage(message) {
        this.chatMessages.push(message);
    }
}
