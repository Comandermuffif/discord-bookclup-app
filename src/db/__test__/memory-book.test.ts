import { MemoryBookStorage } from "../memory";
import { getSampleBook } from "./utils";

test("addBook", () => {
    const storage = new MemoryBookStorage();
    const book = getSampleBook();

    expect(storage.addBook(book)).toBe(true);
    expect(storage.listBooks({guildID: book.guildID})).toContain(book);
});

test("addBook - duplicate", () => {
    const storage = new MemoryBookStorage();
    const book = getSampleBook();

    expect(storage.addBook(book)).toBe(true);
    expect(storage.addBook(book)).toBe(false);
    expect(storage.listBooks({guildID: book.guildID})).toContain(book);
    expect(storage.listBooks({guildID: book.guildID})).toHaveLength(1);
});

test("addBook - force", () => {
    const storage = new MemoryBookStorage();
    const book = getSampleBook();

    expect(storage.addBook(book)).toBe(true);
    expect(storage.addBook(book, true)).toBe(true);
    expect(storage.listBooks({guildID: book.guildID})).toContain(book);
    expect(storage.listBooks({guildID: book.guildID})).toHaveLength(1);
});

test("removeBook", () => {
    const storage = new MemoryBookStorage();
    const book = getSampleBook();

    expect(storage.addBook(book)).toBe(true);
    expect(storage.listBooks({guildID: book.guildID})).toContain(book);
    expect(storage.removeBook({guildID: book.guildID, bookID: book.key})).toBe(true);
    expect(storage.listBooks({guildID: book.guildID})).not.toContain(book);
});

test("getBook", () => {
    const storage = new MemoryBookStorage();
    const book = getSampleBook();

    expect(storage.addBook(book)).toBe(true);
    expect(storage.getBook({guildID: book.guildID, bookID: book.key})).toBe(book);
});