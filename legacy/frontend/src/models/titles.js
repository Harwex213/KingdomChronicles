class Titles {
    constructor() {
        this.titles = [];
        this.options = [];
    }

    setTitles(newTitles) {
        this.titles = newTitles;
        this.options = newTitles.map((title) => ({ value: title.id, name: title.name }));
    }

    getTitleName(id) {
        return id ? this.titles[id - 1].name : "";
    }

    getAsOptions() {
        return this.options;
    }
}

export { Titles };
