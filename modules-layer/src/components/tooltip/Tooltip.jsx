import styles from "./tooltip.module.css";
import { useState } from "react";

const Tooltip = ({ text, children, position = "top" }) => {
    const [showTooltip, setShowTooltip] = useState(false);

    const handleMouseEnter = () => {
        setShowTooltip(true);
    };

    const handleMouseLeave = () => {
        setShowTooltip(false);
    };

    let tooltipStyle;
    switch (position) {
        case "top":
            tooltipStyle = { top: "-100%", left: "50%", transform: "translateX(-50%)" };
            break;
        case "left":
            tooltipStyle = { top: "50%", right: "100%", transform: "translateY(-50%)" };
            break;
        case "bottom":
            tooltipStyle = { top: "100%", left: "50%", transform: "translateX(-50%)" };
            break;
        case "right":
            tooltipStyle = { top: "50%", left: "100%", transform: "translateY(-50%)" };
            break;
        default:
            tooltipStyle = { top: "-100%", left: "50%", transform: "translateX(-50%)" };
            break;
    }

    return (
        <div
            className={styles.tooltipContainer}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            {children}
            {showTooltip && (
                <div className={styles.tooltip} style={tooltipStyle}>
                    {text}
                </div>
            )}
        </div>
    );
};

export { Tooltip };
