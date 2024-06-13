import internalization from "../../../../common/internalization/profile-screen.json";
import { ColorPicker } from "../../../components/color-picker/ColorPicker";

const locale = internalization.flagEdit;

const EditBackground = ({ backgroundColor, onColorChange }) => {
    return (
        <div>
            <ColorPicker
                value={backgroundColor}
                onChange={onColorChange}
                placeholder={locale.backgroundTab.colorPickerPlaceholder}
            />
        </div>
    );
};

export { EditBackground };
