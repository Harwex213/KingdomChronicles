class User {
    constructor() {
        this.id = 0;
        this.username = "Username";
    }

    setUser({ id, username }) {
        this.id = id;
        this.username = username;
    }
}

export { User };
