import * as signalR from "@microsoft/signalr";
import { GAME_HUB_URL } from "./config";
import { StartedGame } from "../../models/startedGame";
import { ConnectStateMachine } from "../connectStateMachine";
import internalization from "../../common/internalization/api-clients.json";

const connection = new signalR.HubConnectionBuilder()
    .withUrl(GAME_HUB_URL)
    .configureLogging(signalR.LogLevel.Information)
    .build();

const startedGameModel = new StartedGame();

const gameConnector = new ConnectStateMachine({
    connect: async () => {
        await connection.start();
    },
    disconnect: async () => {
        startedGameModel.clearGameInfo();
        await connection.stop();
    },
    onError: () => {
        gameConnector.errorMessage = internalization.errors.serviceUnavailable;
    },
});

export { connection, gameConnector, startedGameModel };
