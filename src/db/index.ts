import { MemoryBookStorage } from "./memory";
import { Book } from "./models";

interface BookStorageInterface {
    addBook(guildID:string, book:Book): boolean;
    removeBook(guildID:string, key:string): boolean;
    listBooks(guildID:string): Array<Book>;

    addProgress(guildID:string, userID:string, bookID:string, progress:number): boolean;
    removeProgress(guildID:string, userID:string, bookID:string): boolean;
    getProgress(guildID:string, userID:string, bookID:string): number | undefined;
}

const bookStorage:BookStorageInterface = new MemoryBookStorage();

export {
    Book,
    BookStorageInterface,
    bookStorage,
};