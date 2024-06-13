class UserProfile {
    constructor() {
        this.name = "";
        this.kingdomName = "";
        this.motto = "";
        this.titleId = "";
        this.flag = {
            backgroundColor: "",
            foregroundColor: "",
            foregroundSvg: "",
            emblemColor: "",
            emblemSvg: "",
        };
    }

    setUserProfile({ name, kingdomName, motto, titleId, flag }) {
        this.name = name;
        this.kingdomName = kingdomName;
        this.titleId = titleId;
        this.motto = motto;
        this.flag.backgroundColor = flag.backgroundColor;
        this.flag.foregroundColor = flag.foregroundColor;
        this.flag.foregroundSvg = flag.foregroundSvg;
        this.flag.emblemColor = flag.emblemColor;
        this.flag.emblemSvg = flag.emblemSvg;
    }
}

export { UserProfile };
