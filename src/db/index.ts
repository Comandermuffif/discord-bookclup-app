import { Book, Progress, Section } from "./models";
import { PostgresBookStorage } from "./postgres";

interface BookStorageInterface {
  addBook(book: Book): Promise<number>;
  removeBook(book_id: number): Promise<number>;
  getBook(book_id: number): Promise<Book>;
  listBooks(guild_id: string): Promise<Array<Book>>;

  addSection(section: Section): Promise<number>;
  removeSection(section_id: number): Promise<number>;
  getSection(section_id: number): Promise<Section>;
  listSections(book_id: number): Promise<Array<Section>>;

  addProgress(progress: Progress): Promise<number>;
  removeProgress(progress_id: number): Promise<number>;
  getProgress(progress_id: number): Promise<Progress>;
  listProgressByUser(user_id: string): Promise<Array<Progress>>;
  listProgressByBook(book_id: number): Promise<Array<Progress>>;
}

const bookStorage: BookStorageInterface = new PostgresBookStorage({
  host: "localhost",
  port: 5432,
  database: "postgres",
  user: "postgres",
  password: "test",
});

export { Book, BookStorageInterface, bookStorage };
