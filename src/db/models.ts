export type Book = {
  id?: number;
  name: string;
  link?: string;
  guild_id: string;
};

export type Section = {
  id: number;
  description: string;
  order: number;
  book_id: number;
};

export type Progress = {
  id: number;
  user_id: string;
  section_id: number;
  updated: Date;
};
