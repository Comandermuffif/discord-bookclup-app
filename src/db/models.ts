export type PerGuild = {
    /**
     * The ID of the guild this is from
     */
    guildID: string;
};

export type PerBook = {
    /**
     * The ID of the book this is from
     */
    bookID: string;
};

export type PerUser = {
    /**
     * The ID of the user this is from
     */
    userID: string;
};

export type PerGuildBook = PerGuild & PerBook;
export type PerGuildBookUser = PerGuild & PerBook & PerUser;
export type PerGuildUser = PerGuild & PerUser;

export type Book = PerGuild & {
    /** 
     * The short ID of the book
     */
    id: string;

    /**
     * The human readable name
     */
    name: string;
}

export type BookSection = PerGuildBook & {
    /**
     * The sort order of the section
     */
    index: number;

    /**
     * The human readable decription of the section
     */
    description: string;
}

export type BookProgress = PerGuildBookUser & {
    /**
     * The section number they are currently on
     */
    sectionIndex: number;

    /**
     * The last time this was updated
     */
    lastUpdated: Date;
}