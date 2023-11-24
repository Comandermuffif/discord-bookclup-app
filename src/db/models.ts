class Book {
    constructor (key: string, name: string, sections: number) {
        this.key = key
        this.name = name;
        this.sections = sections;
    }

    public key: string;
    public name: string;
    public sections: number;
}

export {
    Book,
}