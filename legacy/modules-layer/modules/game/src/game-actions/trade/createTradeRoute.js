import { GAME_VALIDATIONS } from "shared/enums";
import { TradeRoute } from "shared/models";

const createTradeRoute = ({
    gameState,
    gameValidator,

    playerIndex,
    sourcePowerCenterId,
    destinationPowerCenterId,
    transferResourceName,
    transferAmount,
}) => {
    let canDoAction = true;

    canDoAction &&= gameValidator.validate(GAME_VALIDATIONS.CAN_CREATE_TRADE_ROUTE, {
        playerIndex,
        powerCenterId: sourcePowerCenterId,
    });

    canDoAction &&= gameValidator.validate(GAME_VALIDATIONS.CAN_SEND_TRADE_ROUTE, {
        playerIndex,
        sourcePowerCenterId,
        destinationPowerCenterId,
        transferResourceName,
        transferAmount,
    });

    if (canDoAction === false) {
        return;
    }

    const tradeRoute = new TradeRoute({
        destinationPowerCenterId,
        transferResourceName,
        transferAmount,
    });

    gameState.powerCenters[sourcePowerCenterId].addTradeRoute(tradeRoute);
};

export { createTradeRoute };
