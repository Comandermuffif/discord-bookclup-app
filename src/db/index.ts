import { MemoryBookStorage } from "./memory";
import { Book, BookProgress } from "./models";

interface BookStorageInterface {
    addBook(guildID:string, book:Book): boolean;
    removeBook(guildID:string, key:string): boolean;
    listBooks(guildID:string): Array<Book>;

    addProgress(guildID:string, userID:string, bookID:string, progress:number): boolean;
    removeProgress(guildID:string, userID:string, bookID:string): boolean;
    getProgresses(guildID:string, userID:string): Array<BookProgress>;
    getProgress(guildID:string, userID:string, bookID:string): BookProgress | undefined;
}

const bookStorage:BookStorageInterface = new MemoryBookStorage();

export {
    Book,
    BookStorageInterface,
    bookStorage,
};