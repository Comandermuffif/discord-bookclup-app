import { MemoryBookStorage } from "../memory";
import { getSampleBook, getSampleProgress } from "./utils";

test("addProgress", () => {
    const storage = new MemoryBookStorage();
    const book = getSampleBook();
    const progress = getSampleProgress(book, "userA", 4);

    expect(storage.addBook(book)).toBe(true);
    expect(storage.addProgress(progress)).toBe(true);
    expect(storage.getProgress(progress.guildID, progress.userID, progress.bookID)).toBe(progress);
});

test("removeProgress", () => {
    const storage = new MemoryBookStorage();
    const book = getSampleBook();
    const progress = getSampleProgress(book, "userA", 4);

    expect(storage.addBook(book)).toBe(true);
    expect(storage.addProgress(progress)).toBe(true);
    expect(storage.getProgress(progress.guildID, progress.userID, progress.bookID)).toBe(progress);
    expect(storage.removeProgress(progress.guildID, progress.userID, book.key)).toBe(true);
    expect(storage.getProgress(progress.guildID, progress.userID, book.key)).toBeUndefined();
});

test("getProgressByUser", () => {
    const storage = new MemoryBookStorage();
    const book = getSampleBook();
    const progress = getSampleProgress(book, "userA", 5);

    expect(storage.addBook(book)).toBe(true);
    expect(storage.addProgress(progress)).toBe(true);
    expect(storage.listProgressByUser(book.guildID, progress.userID)).toHaveLength(1);
    expect(storage.listProgressByUser(book.guildID, progress.userID)).toContainEqual(progress);
});

test("getProgressByBook", () => {
    const storage = new MemoryBookStorage();
    const book = getSampleBook();
    const progressA = getSampleProgress(book, "userA", 1);
    const progressB = getSampleProgress(book, "userB", 3);

    expect(storage.addBook(book)).toBe(true);
    expect(storage.addProgress(progressA)).toBe(true);
    expect(storage.addProgress(progressB)).toBe(true);
    expect(storage.listProgressByBook(book.guildID, book.key)).toHaveLength(2);
    expect(storage.listProgressByBook(book.guildID, book.key)).toContainEqual(progressA);
    expect(storage.listProgressByBook(book.guildID, book.key)).toContainEqual(progressB);
});