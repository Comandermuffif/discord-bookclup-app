/* eslint-disable no-unused-vars */
import { MemoryBookStorage } from "./memory";
import { Book, BookProgress, BookSection, PerGuild, PerGuildBook } from "./models";

interface BookStorageInterface {
    addBook(book:Book): boolean;
    addBook(book:Book, force:boolean): boolean;
    removeBook(identifier:(PerGuildBook)): boolean;
    getBook(identifier:(PerGuildBook)): Book | undefined;
    listBooks(identifier:(PerGuild)): Array<Book>;

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