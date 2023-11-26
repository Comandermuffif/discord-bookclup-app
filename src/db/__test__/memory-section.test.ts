import { MemoryBookStorage } from "../memory";
import { getSampleBook, getSampleSection } from "./utils";

test("addSection", () => {
    const storage = new MemoryBookStorage();
    const book = getSampleBook();
    const section = getSampleSection(book, 1);

    expect(storage.addSection(section)).toBe(true);
    expect(storage.listSections(book.guildID, book.key)).toContain(section);
});

test("removeSection", () => {
    const storage = new MemoryBookStorage();
    const book = getSampleBook();
    const section = getSampleSection(book, 1);

    expect(storage.addSection(section)).toBe(true);
    expect(storage.listSections(book.guildID, book.key)).toContain(section);
    expect(storage.removeSection(book.guildID, book.key, section.index)).toBe(true);
    expect(storage.listSections(book.guildID, book.key)).not.toContain(section);
});

test("getSection", () => {
    const storage = new MemoryBookStorage();
    const book = getSampleBook();
    const section = getSampleSection(book, 1);

    expect(storage.addSection(section)).toBe(true);
    expect(storage.getSection(book.guildID, book.key, section.index)).toBe(section);
    expect(storage.getSection(book.guildID, book.key, section.index + 1)).toBeUndefined();
});