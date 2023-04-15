import styles from "./playerInfo.module.css";
import { observer } from "mobx-react-lite";
import { RESOURCE_NAMES } from "shared/enums";
import { Block, Container, Text, ResourceIcon } from "../../components";
import { useContext } from "react";
import { CurrentPlayerContext } from "../../CurrentPlayerContext";

const PlayerInfo = observer(({ className = "" }) => {
    const currentPlayer = useContext(CurrentPlayerContext);

    const playerInfo = currentPlayer.info;

    return (
        <Block className={styles.container + " " + className} isExternal>
            <div className={styles.flag} style={{ backgroundColor: playerInfo.colorStr }}></div>
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
                <Text
                    style={{
                        fontSize: "16px",
                        lineHeight: 1,
                    }}
                >
                    Current tick: {currentPlayer.gameState.currentTick}
                </Text>
                <Block className={styles.economic}>
                    <Container direction="row" centered="vertical">
                        <Text>{currentPlayer.treasure}</Text>
                        <ResourceIcon
                            className={styles.money}
                            type={RESOURCE_NAMES.MONEY}
                            selectable={false}
                        />
                    </Container>
                    <Text variant="positive">+ {currentPlayer.income}</Text>
                    <Text variant="negative">- {currentPlayer.outcome}</Text>
                </Block>
            </div>
        </Block>
    );
});

export { PlayerInfo };
