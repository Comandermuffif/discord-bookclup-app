import { Book, BookProgress, BookSection, PerGuild, PerGuildBook } from "./models";
import { BookStorageInterface } from "./index";

class MemoryBookStorage implements BookStorageInterface {
    private books = new Array<Book>();
    private sections = new Array<BookSection>();
    private progresses = new Array<BookProgress>();

    addBook(book: Book, force=false): boolean {
        const existingBook = this.getBook({guildID: book.guildID, bookID: book.key});

        if (existingBook) {
            if (force) {
                this.removeBook({ guildID: book.guildID, bookID: book.key});
            } else {
                // This function does not overwrite existing books, unless forced
                return false; 
            }
        }

        this.books.push(book);
        return true;
    }
    removeBook({guildID, bookID}:PerGuildBook): boolean {
        const newBooks = this.books.filter((x) => x.guildID ==  guildID && x.key != bookID);
        if (newBooks.length != this.books.length) {
            this.books = newBooks;
            return true;
        }
        return false;
    }
    getBook({guildID, bookID}:PerGuildBook): Book | undefined {
        return this.books.find((x) => x.guildID == guildID && x.key == bookID);
    }
    listBooks({guildID}:PerGuild): Book[] {
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