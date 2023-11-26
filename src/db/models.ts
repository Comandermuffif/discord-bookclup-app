type Book = {
    /** 
     * The short ID of the book
     */
    key: string;

    /**
     * The human readable name
     */
    name: string;

    /**
     * The sections to the book
     */
    sections: Array<BookSection>;

    /**
     * The progress of all those reading this
     */
    readers: Array<BookProgress>;
}

type BookSection = {
    /**
     * The ID of the book this is for
     */
    bookID: string;

    /**
     * The sort order of the section
     */
    index: number;

    /**
     * The human readable decription of the section
     */
    description: string;
}

type BookProgress = {
    /**
     * The ID of the book this is for
     */
    bookID: string;

    /**
     * The ID of the user
     */
    userID: string;

    /**
     * The section number they are currently on
     */
    currentSection: number;
}

export {
    Book,
    BookSection,
    BookProgress,
};