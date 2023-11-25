import { MemoryBookStorage } from "../memory";
import { Book } from '../models';

test('addBook', () => {
    const storage = new MemoryBookStorage();
    const book = new Book("fw", "Fourth Wing", 5);
    const guildID = "asdf";

    expect(storage.addBook(guildID, book)).toBe(true);
    expect(storage.listBooks(guildID)).toContain(book);
});

test('removeBook', () => {
    const storage = new MemoryBookStorage();
    const book = new Book("fw", "Fourth Wing", 5);
    const guildID = "asdf";

    expect(storage.addBook(guildID, book)).toBe(true);
    expect(storage.listBooks(guildID)).toContain(book);
    expect(storage.removeBook(guildID, book.key)).toBe(true);
    expect(storage.listBooks(guildID)).not.toContain(book);
});

test('addProgress', () => {
    const storage = new MemoryBookStorage();
    const book = new Book("fw", "Fourth Wing", 5);
    const guildID = "asdf";
    const userID = "test"

    expect(storage.addBook(guildID, book)).toBe(true);
    expect(storage.addProgress(guildID, userID, book.key, 2)).toBe(true);
    expect(storage.getProgress(guildID, userID, book.key)).toBe(2);
});

test('removeProgress', () => {
    const storage = new MemoryBookStorage();
    const book = new Book("fw", "Fourth Wing", 5);
    const guildID = "asdf";
    const userID = "test"

    expect(storage.addBook(guildID, book)).toBe(true);
    expect(storage.addProgress(guildID, userID, book.key, 2)).toBe(true);
    expect(storage.getProgress(guildID, userID, book.key)).toBe(2);
    expect(storage.removeProgress(guildID, userID, book.key)).toBe(true);
    expect(storage.getProgress(guildID, userID, book.key)).toBeUndefined();
});