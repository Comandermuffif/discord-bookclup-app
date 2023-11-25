import { Book, BookProgress } from "./models";
import { BookStorageInterface } from "./index"

class BookShelf {
    private books = new Map<string, Book>();
    private progress = new Map<string, BookProgress>();

    addBook(book: Book): boolean {
        if (this.books.has(book.key)) { return false; }
        this.books.set(book.key, book);
        return true;
    }

    removeBook(bookID: string): boolean {
        return this.books.delete(bookID);
    }

    listBooks(): Array<Book> {
        return new Array(...this.books.values());
    }

    addProgress(userID: string, bookID: string, progress: number): boolean {
        if (!this.books.has(bookID)) { return false; }
        this.progress.set(this._progressKey(userID, bookID), new BookProgress(bookID, userID, progress));
        return true;
    }

    removeProgress(userID: string, bookID: string): boolean {
        return this.progress.delete(this._progressKey(userID, bookID));
    }

    getProgresses(userID:string): Array<BookProgress> {
        throw Error("Not implemented");
    }

    getProgress(userID: string, bookID: string): BookProgress | undefined {
        return this.progress.get(this._progressKey(userID, bookID));
    }

    _progressKey(userID: string, bookID: string): string {
        return `${userID}:${bookID}`;
    }
}

class MemoryBookStorage implements BookStorageInterface {
    knownBooks: Map<string, BookShelf>;

    constructor() {
        this.knownBooks = new Map<string, BookShelf>();
    }

    addBook(guildID: string, book: Book): boolean {
        const bookshelf = this._getBookshelf(guildID);
        if (bookshelf.addBook(book)) {
            this.knownBooks.set(guildID, bookshelf);
            return true;
        }
        return false;
    }

    removeBook(guildID: string, key: string): boolean {
        const bookshelf = this._getBookshelf(guildID);
        return bookshelf.removeBook(key);
    }

    listBooks(guildID: string): Array<Book> {
        return this._getBookshelf(guildID).listBooks();
    }

    addProgress(guildID: string, userID: string, bookID: string, progress: number): boolean {
        const bookshelf = this._getBookshelf(guildID);
        return bookshelf.addProgress(userID, bookID, progress);
    }

    removeProgress(guildID: string, userID: string, bookID: string): boolean {
        const bookshelf = this._getBookshelf(guildID);
        if (bookshelf.removeProgress(userID, bookID)) {
            this.knownBooks.set(guildID, bookshelf);
            return true;
        }
        return false;
    }

    getProgresses(guildID:string, userID:string): Array<BookProgress> {
        const bookshelf = this._getBookshelf(guildID);
        return bookshelf.getProgresses(userID);
    }

    getProgress(guildID: string, userID: string, bookID: string): BookProgress | undefined {
        const bookshelf = this._getBookshelf(guildID);
        return bookshelf.getProgress(userID, bookID);
    }

    _getBookshelf(guildID: string): BookShelf {
        return this.knownBooks.get(guildID) || new BookShelf();
    }
};

export {
    MemoryBookStorage,
};