import { observer } from "mobx-react-lite";
import { gameService } from "../../gameService/gameService";
import { Block, Container, Text } from "../../../components-game";
import { ResourceIcon } from "../../../components-game/resourceIcon/ResourceIcon";
import { RESOURCE_NAMES } from "models/game";
import styles from "./playerInfo.module.css";

const PlayerInfo = observer(() => {
    if (gameService.currentPlayer === null) {
        return <></>;
    }

    const playerInfo = gameService.currentPlayer.info;
    const playerEconomic = gameService.currentPlayer.economic;

    return (
        <Block className={styles.container} isExternal>
            <div className={styles.flag} style={{ backgroundColor: playerInfo?.colorStr }}></div>
            <div className={styles.info}>
                <Text className={styles.kingdomName} size="big" family="dumbledor">
                    {playerInfo.kingdomName}
                </Text>
                <Text
                    style={{
                        fontSize: "16px",
                        color: "#bebebe",
                    }}
                >
                    {playerInfo.motto}
                </Text>
                <Block className={styles.economic}>
                    <Container direction="row" centered="vertical">
                        <Text>{playerEconomic.treasure}</Text>
                        <ResourceIcon
                            className={styles.money}
                            type={RESOURCE_NAMES.MONEY}
                            selectable={false}
                        />
                    </Container>
                    <Text variant="positive">+ {playerEconomic.income}</Text>
                    <Text variant="negative">- {playerEconomic.outcome}</Text>
                </Block>
            </div>
        </Block>
    );
});

export { PlayerInfo };
