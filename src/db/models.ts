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

class BookProgress {
    constructor (bookID: string, userID: string, progress: number = 0) {
        this.bookID = bookID;
        this.userID = userID;
        this.progress = progress;
    }

    public bookID: string;
    public userID: string;
    public progress: number;
}

export {
    Book,
    BookProgress,
}