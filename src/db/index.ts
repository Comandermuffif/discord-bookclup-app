/* eslint-disable no-unused-vars */
import { MemoryBookStorage } from "./memory";
import { Book, BookProgress, BookSection } from "./models";

interface BookStorageInterface {
    addBook(book:Book): boolean;
    removeBook(guildID:string, key:string): boolean;
    getBook(guildID:string, key:string): Book | undefined;
    listBooks(guildID:string): Array<Book>;

    addSection(section:BookSection): boolean;
    removeSection(guildID:string, bookID:string, sectionIndex:number): boolean;
    getSection(guildID:string, bookID:string, sectionIndex:number): BookSection | undefined;
    listSections(guildID:string, bookID:string): Array<BookSection>;

    addProgress(progress:BookProgress): boolean;
    removeProgress(guildID:string, userID:string, bookID:string): boolean;
    getProgress(guildID:string, userID:string, bookID:string): BookProgress | undefined;
    listProgressByUser(guildID:string, userID:string): Array<BookProgress>;
    listProgressByBook(guildID:string, bookID:string): Array<BookProgress>;
}

const bookStorage:BookStorageInterface = new MemoryBookStorage();

export {
    Book,
    BookStorageInterface,
    bookStorage,
};