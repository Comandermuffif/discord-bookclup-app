export type User = {
    id: string,
};

export type Book = {
    id: string;
    name: string;
    link: string;

    sections: Array<Section>;
};

export type Section = {
    order: number;
    description: string;
};

export type Progress = {
    section: number;
    lastUpdated: Date;
};