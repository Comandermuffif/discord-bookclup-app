import { MemoryBookStorage } from "../memory";
import { getSampleBook } from "./utils";

test("addBook", () => {
    const storage = new MemoryBookStorage();
    const book = getSampleBook();

    expect(storage.addBook(book)).toBe(true);
    expect(storage.listBooks(book.guildID)).toContain(book);
});

test("removeBook", () => {
    const storage = new MemoryBookStorage();
    const book = getSampleBook();

    expect(storage.addBook(book)).toBe(true);
    expect(storage.listBooks(book.guildID)).toContain(book);
    expect(storage.removeBook(book.guildID, book.key)).toBe(true);
    expect(storage.listBooks(book.guildID)).not.toContain(book);
});

test("getBook", () => {
    const storage = new MemoryBookStorage();
    const book = getSampleBook();

    expect(storage.addBook(book)).toBe(true);
    expect(storage.getBook(book.guildID, book.key)).toBe(book);
});