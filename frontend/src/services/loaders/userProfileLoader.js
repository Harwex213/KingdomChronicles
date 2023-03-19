import { apiClients } from "../../apiClients";
import { LoadStateMachine } from "../loadStateMachine";
import { UserProfile } from "../../models/userProfile";

const { userProfileClient } = apiClients;

const userProfile = new UserProfile();
let errorMessage = "";
const userProfileLoader = new LoadStateMachine({
    load: async () => {
        const { payload: userProfile } = await userProfileClient.get();
        return userProfile;
    },
    onSuccess: (newUserProfile) => {
        userProfile.setUserProfile(newUserProfile);
    },
    onError: (error) => {
        errorMessage = error.message;
    },
});

export { userProfileLoader, userProfile, errorMessage };
