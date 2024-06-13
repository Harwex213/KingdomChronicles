import { apiClients } from "../../apiClients";
import { LoadStateMachine } from "../loadStateMachine";
import { Titles } from "../../models/titles";

const { titleClient } = apiClients;

const titles = new Titles();
let errorMessage = "";
const titlesLoader = new LoadStateMachine({
    load: async () => {
        const { payload: titles } = await titleClient.getCurrentTitles();
        return titles;
    },
    onSuccess: (newTitles) => {
        titles.setTitles(newTitles);
    },
    onError: (error) => {
        errorMessage = error.message;
    },
});

export { titlesLoader, titles, errorMessage };
