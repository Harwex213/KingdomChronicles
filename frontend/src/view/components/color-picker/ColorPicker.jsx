import style from "./colorPicker.module.css";

const ColorPicker = ({ placeholder, value, onChange }) => {
    return (
        <div className={style.container}>
            <input
                className={style.input}
                type="color"
                value={value}
                onChange={(event) => onChange(event.target.value)}
            />
            <p>{placeholder}</p>
        </div>
    );
};

export { ColorPicker };
