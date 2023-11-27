import { Book, BookProgress, BookSection } from "../models";

export function getSampleBook(): Book {
    return {
        guildID: "asdf",
        id: "fw",
        name: "Fourth Wing"
    };
}

export function getSampleProgress(book: Book, userID:string, section:number): BookProgress {
    return {
        guildID: book.guildID,
        bookID: book.id,
        userID,
        lastUpdated: new Date(Date.now()),
        sectionIndex: section,
    };
}

export function getSampleSection(book: Book, index:number, description=""): BookSection {
    return {
        guildID: book.guildID,
        bookID: book.id,
        index,
        description,
    };
}