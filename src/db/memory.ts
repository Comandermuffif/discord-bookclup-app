import { Book, BookProgress } from "./models";
import { BookStorageInterface } from "./index";

class MemoryBookStorage implements BookStorageInterface {
    /** Books by GuildID */
    private _guildBooks = new Map<string, Array<Book>>();

    addBook(guildID: string, book: Book): boolean {
        const guildBooks = this._getGuildBooks(guildID);
        if (!guildBooks.some((x) => x.key == book.key))
        {
            guildBooks.push(book);
            this._setGuildBooks(guildID, guildBooks);
            return true;
        }
        return false;
    }
    removeBook(guildID: string, key: string): boolean {
        const guildBooks = this._getGuildBooks(guildID);
        const newBooks = guildBooks.filter((x) => x.key != key);

        if (newBooks.length != guildBooks.length) {
            this._setGuildBooks(guildID, newBooks);
            return true;
        }
        return false;
    }
    getBook(guildID: string, key: string): Book | undefined {
        const guildBooks = this._getGuildBooks(guildID);
        return guildBooks.find((x) => x.key === key);
    }
    listBooks(guildID: string): Book[] {
        return this._getGuildBooks(guildID);
    }

    addProgress(guildID: string, userID: string, bookID: string, progress: number): boolean {
        const guildBooks = this._getGuildBooks(guildID);
        const book = guildBooks.find((x) => x.key === bookID);
        if (!book) { return false; }
        const currentProgress = book.readers.find((x) => x.userID === userID);
        if (currentProgress) {
            currentProgress.currentSection = progress;
        } else {
            book.readers.push({ bookID, userID, currentSection: progress });
        }
        return true;
    }
    removeProgress(guildID: string, userID: string, bookID: string): boolean {
        const guildBooks = this._getGuildBooks(guildID);
        const book = guildBooks.find((x) => x.key === bookID);
        if (!book) { return false; }
        book.readers = book.readers.filter((x) => x.userID !== userID);
        return true;
    }
    getProgress(guildID: string, userID: string, bookID: string): BookProgress | undefined {
        const guildBooks = this._getGuildBooks(guildID);
        const book = guildBooks.find((x) => x.key === bookID);
        if (!book) { return; }
        return book.readers.find((x) => x.userID === userID);
    }
    getProgressByUser(guildID: string, userID: string): BookProgress[] | undefined {
        const guildBooks = this._getGuildBooks(guildID);
        const progresses = new Array<BookProgress>();
        guildBooks.forEach((x) => {
            const progress = x.readers.find((y) => y.userID === userID);
            if (progress) {
                progresses.push(progress);
            }
        });
        return progresses;
    }
    getProgressByBook(guildID: string, bookID: string): BookProgress[] | undefined {
        const guildBooks = this._getGuildBooks(guildID);
        const book = guildBooks.find((x) => x.key === bookID);
        if (!book) { return; }
        return book.readers;
    }

    /**
     * Get Books for a specific Guild
     * @param guildID The Guild ID
     * @returns The books for the Guild
     */
    _getGuildBooks(guildID:string): Array<Book> {
        return this._guildBooks.get(guildID) || new Array<Book>();
    }
    /**
     * Set Books for a specific Guild
     * @param guildID The Guild ID
     * @param books The books to set
     */
    _setGuildBooks(guildID:string, books:Array<Book>): undefined {
        this._guildBooks.set(guildID, books);
    }
};

export {
    MemoryBookStorage,
};