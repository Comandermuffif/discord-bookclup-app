import { MemoryBookStorage } from "../memory";
import { Book, BookProgress } from "../models";

function getSampleBook(): Book {
    return { key: "fw", name: "Fourth Wing", sections: [], readers: [] };
}

test("addBook", () => {
    const storage = new MemoryBookStorage();
    const book = getSampleBook();
    const guildID = "asdf";

    expect(storage.addBook(guildID, book)).toBe(true);
    expect(storage.listBooks(guildID)).toContain(book);
});

test("removeBook", () => {
    const storage = new MemoryBookStorage();
    const book = getSampleBook();
    const guildID = "asdf";

    expect(storage.addBook(guildID, book)).toBe(true);
    expect(storage.listBooks(guildID)).toContain(book);
    expect(storage.removeBook(guildID, book.key)).toBe(true);
    expect(storage.listBooks(guildID)).not.toContain(book);
});

test("getBook", () => {
    const storage = new MemoryBookStorage();
    const book = getSampleBook();
    const guildID = "asdf";

    expect(storage.addBook(guildID, book)).toBe(true);
    expect(storage.getBook(guildID, book.key)).toBe(book);
});

test("addProgress", () => {
    const storage = new MemoryBookStorage();
    const book = getSampleBook();
    const guildID = "asdf";
    const userID = "test";

    expect(storage.addBook(guildID, book)).toBe(true);
    expect(storage.addProgress(guildID, userID, book.key, 2)).toBe(true);
    expect(storage.getProgress(guildID, userID, book.key)?.currentSection).toBe(2);
});

test("removeProgress", () => {
    const storage = new MemoryBookStorage();
    const book = getSampleBook();
    const guildID = "asdf";
    const userID = "test";

    expect(storage.addBook(guildID, book)).toBe(true);
    expect(storage.addProgress(guildID, userID, book.key, 2)).toBe(true);
    expect(storage.getProgress(guildID, userID, book.key)?.currentSection).toBe(2);
    expect(storage.removeProgress(guildID, userID, book.key)).toBe(true);
    expect(storage.getProgress(guildID, userID, book.key)).toBeUndefined();
});

test("getProgressByUser", () => {
    const storage = new MemoryBookStorage();
    const book = getSampleBook();
    const guildID = "asdf";
    const userID = "test";

    expect(storage.addBook(guildID, book)).toBe(true);
    expect(storage.addProgress(guildID, userID, book.key, 2)).toBe(true);
    expect(storage.getProgressByUser(guildID, userID)).toHaveLength(1);
    expect(storage.getProgressByUser(guildID, userID)?.at(0)?.currentSection).toBe(2);
});

test("getProgressByBook", () => {
    const storage = new MemoryBookStorage();
    const book = getSampleBook();
    const guildID = "asdf";
    const progressA:BookProgress = { bookID: book.key, userID: "test", currentSection: 2 };
    const progressB:BookProgress = { bookID: book.key, userID: "waffle", currentSection: 3 };

    expect(storage.addBook(guildID, book)).toBe(true);
    expect(storage.addProgress(guildID, "test", book.key, 2)).toBe(true);
    expect(storage.addProgress(guildID, "waffle", book.key, 3)).toBe(true);
    expect(storage.getProgressByBook(guildID, book.key)).toHaveLength(2);
    expect(storage.getProgressByBook(guildID, book.key)).toContainEqual(progressA);
    expect(storage.getProgressByBook(guildID, book.key)).toContainEqual(progressB);
});