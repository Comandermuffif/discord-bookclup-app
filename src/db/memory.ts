import { Book, BookProgress, BookSection } from "./models";
import { BookStorageInterface } from "./index";

class MemoryBookStorage implements BookStorageInterface {
    private books = new Array<Book>();
    private sections = new Array<BookSection>();
    private progresses = new Array<BookProgress>();

    addBook(book: Book): boolean {
        const existingBook = this.getBook(book.guildID, book.key);
        if (existingBook) {
            // This function does not overwrite existing books 
            return false;
        }
        this.books.push(book);
        return true;
    }
    removeBook(guildID: string, key: string): boolean {
        const newBooks = this.books.filter((x) => x.guildID ==  guildID && x.key != key);
        if (newBooks.length != this.books.length) {
            this.books = newBooks;
            return true;
        }
        return false;
    }
    getBook(guildID: string, key: string): Book | undefined {
        return this.books.find((x) => x.guildID == guildID && x.key == key);
    }
    listBooks(guildID: string): Book[] {
        return this.books.filter((x) => x.guildID == guildID);
    }

    addSection(section: BookSection): boolean {
        const existingSection = this.getSection(section.guildID, section.bookID, section.index);
        if (existingSection) {
            // Don't override existing sections
            return false;
        }
        this.sections.push(section);
        return true;
    }
    removeSection(guildID: string, bookID: string, sectionIndex: number): boolean {
        const newSections = this.sections.filter((x) => !(x.guildID == guildID && x.bookID == bookID && x.index == sectionIndex));
        if (newSections.length != this.sections.length) {
            this.sections = newSections;
            return true;
        }
        return false;
    }
    getSection(guildID: string, bookID: string, sectionIndex: number): BookSection | undefined {
        return this.sections.find((x) => x.guildID == guildID && x.bookID == bookID && x.index == sectionIndex);
    }
    listSections(guildID: string, bookID: string): BookSection[] {
        return this.sections.filter((x) => x.guildID == guildID && x.bookID == bookID);
    }

    addProgress(progress:BookProgress): boolean {
        const existingProgress = this.getProgress(progress.guildID, progress.userID, progress.bookID);
        if (existingProgress) {
            // This function does not overwrite progresses
            return false;
        }
        this.progresses.push(progress);
        return true;
    }
    removeProgress(guildID: string, userID: string, bookID: string): boolean {
        const newProgresses = this.progresses.filter((x) => !(x.guildID == guildID && x.bookID == bookID && x.userID == userID));
        if (newProgresses.length != this.books.length) {
            this.progresses = newProgresses;
            return true;
        }
        return false;
    }
    getProgress(guildID: string, userID: string, bookID: string): BookProgress | undefined {
        return this.progresses.find((x) => x.guildID == guildID && x.bookID == bookID && x.userID == userID);
    }
    listProgressByUser(guildID: string, userID: string): BookProgress[] {
        return this.progresses.filter((x) => x.guildID == guildID && x.userID == userID);
    }
    listProgressByBook(guildID: string, bookID: string): BookProgress[] {
        return this.progresses.filter((x) => x.guildID == guildID && x.bookID == bookID);
    }
};

export {
    MemoryBookStorage,
};