import internalization from "../../../common/internalization/new-game-screen.json";
import formsErrorMessages from "../../../common/internalization/forms-error-messages.json";
import styles from "./newGameCreateSubScreen.module.css";
import { Formik } from "formik";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import { TextField, Select } from "../../components/formik-form";
import { NEW_GAME_SCREEN_ROUTES } from "../../../common/constants/routes";
import { startGameService } from "../../../services/start-game";

const locale = internalization.create;
const navigateToSearch = `../${NEW_GAME_SCREEN_ROUTES.SEARCH}`;

const getMaxPlayersAmountSelectOptions = (maxValue) => {
    const getMaxPlayersAmountOption = (value) => ({
        value,
        name: `${value} ${locale.placeholders.maxPlayersAmountOption}`,
    });
    return [...Array(maxValue)].map((_, index) => getMaxPlayersAmountOption(index + 1));
};

const playersAmountMaxValue = 4;
const maxPlayersAmountSelectOptions = getMaxPlayersAmountSelectOptions(playersAmountMaxValue);

const form = {
    fields: {
        name: "name",
        maxPlayersAmount: "maxPlayersAmount",
    },
    validationSchema: yup.object({
        name: yup
            .string()
            .required(formsErrorMessages.required)
            .max(25, formsErrorMessages.maxLengthExceeded),
        maxPlayersAmount: yup
            .number()
            .required(formsErrorMessages.required)
            .min(1, formsErrorMessages.minLengthExceeded)
            .max(4, formsErrorMessages.maxLengthExceeded),
    }),
};

const NewGameCreateSubScreen = () => {
    const navigate = useNavigate();

    const handleCreate = async (values, formikHelpers) => {
        try {
            const createGameValues = { ...values };
            createGameValues.maxPlayersAmount = Number(createGameValues.maxPlayersAmount);
            await startGameService.createGame(createGameValues);
            formikHelpers.resetForm();
        } catch (e) {
            formikHelpers.setFieldError(form.fields.name, e.message);
        }
    };

    const handleBackToSearch = () => {
        navigate(navigateToSearch);
    };

    return (
        <div>
            <h1>{locale.header}</h1>
            <Formik
                initialValues={{
                    name: "",
                    maxPlayersAmount: 1,
                }}
                validationSchema={form.validationSchema}
                onSubmit={handleCreate}
            >
                {(formik) => (
                    <form className={styles.form} onSubmit={formik.handleSubmit}>
                        <TextField name={form.fields.name} formik={formik}>
                            {locale.placeholders.name}
                        </TextField>
                        <Select
                            name={form.fields.maxPlayersAmount}
                            formik={formik}
                            options={maxPlayersAmountSelectOptions}
                        >
                            {locale.placeholders.maxPlayersAmount}
                        </Select>
                        <div className={styles.actions}>
                            <button type="submit" disabled={formik.isSubmitting}>
                                {locale.actions.submit}
                            </button>
                            <button type="button" onClick={handleBackToSearch}>
                                {locale.actions.backToSearch}
                            </button>
                        </div>
                    </form>
                )}
            </Formik>
        </div>
    );
};

export { NewGameCreateSubScreen };
