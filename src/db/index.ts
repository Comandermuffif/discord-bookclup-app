class Book {
    constructor (key: string, description: string | null) {
        this.key = key
        this.description = description;
    }

    public key: string;
    public description: string | null;
}

const knownBooks = new Map<string, Array<Book>>();

function addBook(guildID:string, bookKey:string) {
    const guildBooks = knownBooks.get(guildID) || new Array<Book>();

    guildBooks.push(new Book(bookKey, null));

    knownBooks.set(guildID, guildBooks);
}

function listBooks(guildID:string): Array<Book> | undefined {
    return knownBooks.get(guildID);
}

export {
    Book,
    addBook,
    listBooks,
};