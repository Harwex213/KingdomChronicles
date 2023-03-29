import { observer } from "mobx-react-lite";
import { useNavigate } from "react-router-dom";
import { currentProfileRoute } from "../../../services/states";
import styles from "./profileMenu.module.css";

const ProfileMenuItem = observer(({ route, children }) => {
    const navigate = useNavigate();
    let className = styles.item;

    if (currentProfileRoute.current === route) {
        className += " " + styles.selectedItem;
    }
    return (
        <div
            className={className}
            onClick={() => {
                navigate(route);
            }}
        >
            {children}
        </div>
    );
});

export { ProfileMenuItem };
