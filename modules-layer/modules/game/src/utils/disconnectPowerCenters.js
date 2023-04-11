const disconnectPowerCenters = (powerCenters) => {
    if (powerCenters.length < 2) {
        return;
    }

    for (const powerCenter of powerCenters) {
        const connectedPowerCenterIds = [powerCenter.id, ...powerCenter.connectedPowerCenterIds];
        for (const otherPowerCenter of powerCenters) {
            if (otherPowerCenter === powerCenter.id) {
                continue;
            }

            otherPowerCenter.removeConnectedPowerCenterIds(connectedPowerCenterIds);
        }
    }
};

export { disconnectPowerCenters };
