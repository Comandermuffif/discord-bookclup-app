import { MemoryBookStorage } from "./memory";
import { Book } from "./models";

interface BookStorageInterface {
    addBook(guildID:string, book:Book): void;
    removeBook(guildID:string, key:string): void;
    listBooks(guildID:string): Map<string, Book>;
}

const bookStorage:BookStorageInterface = new MemoryBookStorage();

export {
    Book,
    BookStorageInterface,
    bookStorage,
};