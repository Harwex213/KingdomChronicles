class Resource {
    constructor({ name, dependsOn, producedOn }) {
        this.name = name;
        this.dependsOn = dependsOn;
        this.producedOn = producedOn;
    }
}

export { Resource };
