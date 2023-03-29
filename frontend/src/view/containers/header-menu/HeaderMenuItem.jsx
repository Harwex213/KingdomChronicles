import { observer } from "mobx-react-lite";
import { useNavigate } from "react-router-dom";
import { currentAuthorizedRoute } from "../../../services/states";
import styles from "./headerMenu.module.css";

const HeaderMenuItem = observer(({ route, children }) => {
    const navigate = useNavigate();
    let className = styles.item;
    if (currentAuthorizedRoute.current === route) {
        className += " " + styles.selectedItem;
    }
    return (
        <div
            className={className}
            onClick={() => {
                navigate(`/${route}`);
            }}
        >
            {children}
        </div>
    );
});

export { HeaderMenuItem };
