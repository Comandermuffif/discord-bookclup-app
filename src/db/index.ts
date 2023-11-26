/* eslint-disable no-unused-vars */
import { MemoryBookStorage } from "./memory";
import { Book, BookProgress } from "./models";

interface BookStorageInterface {
    addBook(guildID:string, book:Book): boolean;
    removeBook(guildID:string, key:string): boolean;
    getBook(guildID:string, key:string): Book | undefined;
    listBooks(guildID:string): Array<Book>;

    addProgress(guildID:string, userID:string, bookID:string, progress:number): boolean;
    removeProgress(guildID:string, userID:string, bookID:string): boolean;
    getProgress(guildID:string, userID:string, bookID:string): BookProgress | undefined;
    getProgressByUser(guildID:string, userID:string): Array<BookProgress> | undefined;
    getProgressByBook(guildID:string, bookID:string): Array<BookProgress> | undefined;
}

const bookStorage:BookStorageInterface = new MemoryBookStorage();

export {
    Book,
    BookStorageInterface,
    bookStorage,
};