import { Book } from "./models";
import { BookStorageInterface } from "./index"

class MemoryBookStorage implements BookStorageInterface {
    knownBooks: Map<string, Map<string, Book>>;

    constructor() {
        this.knownBooks = new Map<string, Map<string, Book>>();
    }

    addBook(guildID: string, book: Book): void {
        const guildBooks = this.knownBooks.get(guildID) || new Map<string, Book>();
        guildBooks.set(book.key, book);
        this.knownBooks.set(guildID, guildBooks);
    }

    removeBook(guildID: string, key: string): void {
        const guildBooks = this.knownBooks.get(guildID) || new Map<string, Book>();
        guildBooks.delete(key);
    }

    listBooks(guildID: string): Map<string, Book> {
        return this.knownBooks.get(guildID) || new Map<string, Book>();
    }
};

export {
    MemoryBookStorage,
};