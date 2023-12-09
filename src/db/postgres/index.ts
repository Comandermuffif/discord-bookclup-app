import Postgrator, { Migration } from "postgrator";
import pg from "pg";
import { Book, BookStorageInterface } from "..";
import { Section, Progress } from "../models";
import path from "path";

export class PostgresBookStorage implements BookStorageInterface {
  private pool: pg.Pool;

  constructor(config: pg.ClientConfig) {
    this.pool = new pg.Pool(config);
  }

  async migrate(): Promise<{ migrations: Migration[]; version: number }> {
    const connection = await this.pool.connect();
    const postgrator = new Postgrator({
      migrationPattern: path.join(__dirname, "./migrations/*"),
      driver: "pg",
      execQuery: (query) => connection.query(query),
    });
    connection.release();
    return {
      migrations: await postgrator.migrate(),
      version: await postgrator.getDatabaseVersion(),
    };
  }

  async addBook(book: Book): Promise<number> {
    const response = await this.pool.query<{ id: number }>({
      text: "INSERT INTO books(name, link, guild_id) VALUES ($1, $2, $3) RETURNING id",
      values: [book.name, book.link, book.guild_id],
    });
    return response.rows[0].id;
  }
  async removeBook(book_id: number): Promise<number> {
    const response = await this.pool.query<{ id: number }>({
      text: "DELETE FROM books WHERE id = $1 RETURNING id",
      values: [book_id],
    });
    return response.rows[0].id;
  }
  async getBook(book_id: number): Promise<Book> {
    const response = await this.pool.query<Book>({
      text: "SELECT * FROM books WHERE id = $1",
      values: [book_id],
    });
    return response.rows[0];
  }
  async listBooks(guild_id: string): Promise<Book[]> {
    const response = await this.pool.query<Book>({
      text: "SELECT * FROM books WHERE guild_id = $1",
      values: [guild_id],
    });
    return response.rows;
  }
  async addSection(section: Section): Promise<number> {
    const response = await this.pool.query<{ id: number }>({
      text: "INSERT INTO sections(description, \"order\", book_id) VALUES ($1, $2, $3) RETURNING id",
      values: [section.description, section.order, section.book_id],
    });
    return response.rows[0].id;
  }
  removeSection(section_id: number): Promise<number> {
    throw new Error("Method not implemented.");
  }
  getSection(section_id: number): Promise<Section> {
    throw new Error("Method not implemented.");
  }
  async listSections(book_id: number): Promise<Section[]> {
    const response = await this.pool.query<Section>({
      text: "SELECT * FROM books WHERE book_id = $1",
      values: [book_id],
    });
    return response.rows;
  }
  addProgress(progress: Progress): Promise<number> {
    throw new Error("Method not implemented.");
  }
  removeProgress(progress_id: number): Promise<number> {
    throw new Error("Method not implemented.");
  }
  getProgress(progress_id: number): Promise<Progress> {
    throw new Error("Method not implemented.");
  }
  listProgressByUser(book_id: number): Promise<Progress[]> {
    throw new Error("Method not implemented.");
  }
  listProgressByBook(user_id: string): Promise<Progress[]> {
    throw new Error("Method not implemented.");
  }
}
