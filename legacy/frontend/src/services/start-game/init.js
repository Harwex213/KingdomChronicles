import * as signalR from "@microsoft/signalr";
import { START_GAME_HUB_URL } from "./config";
import { SearchGame } from "../../models/searchGame";
import { PendingStartGame } from "../../models/pendingStartGame";
import { ConnectStateMachine } from "../connectStateMachine";
import internalization from "../../common/internalization/api-clients.json";

const connection = new signalR.HubConnectionBuilder()
    .withUrl(START_GAME_HUB_URL)
    .configureLogging(signalR.LogLevel.Information)
    .build();

const searchGameModel = new SearchGame();
const pendingStartGameModel = new PendingStartGame();

const startGameConnector = new ConnectStateMachine({
    connect: async () => {
        await connection.start();
    },
    disconnect: async () => {
        await connection.stop();
        searchGameModel.setPendingStartGames([]);
        searchGameModel.clearChat();
        pendingStartGameModel.clearGameInfo();
        pendingStartGameModel.clearChat();
    },
    onError: () => {
        startGameConnector.errorMessage = internalization.errors.serviceUnavailable;
    },
});

export { connection, startGameConnector, searchGameModel, pendingStartGameModel };
