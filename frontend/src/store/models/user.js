import { makeAutoObservable } from "mobx";

class User {
    constructor() {
        this.id = 0;
        this.username = "Username";

        makeAutoObservable(this);
    }

    setUser({ id, username }) {
        this.id = id;
        this.username = username;
    }

    clearUser() {
        this.id = 0;
        this.username = "Username";
    }
}

export { User };
