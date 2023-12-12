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
  async removeSection(section_id: number): Promise<number> {
    const response = await this.pool.query<{ id: number }>({
      text: "DELETE FROM sections WHERE id = $1 RETURNING id",
      values: [section_id],
    });
    return response.rows[0].id;
  }
  async getSection(section_id: number): Promise<Section> {
    const response = await this.pool.query<Section>({
      text: "SELECT * FROM sections WHERE id = $1",
      values: [section_id],
    });
    return response.rows[0];
  }
  async listSections(book_id: number): Promise<Section[]> {
    const response = await this.pool.query<Section>({
      text: "SELECT * FROM sections WHERE book_id = $1",
      values: [book_id],
    });
    return response.rows;
  }

  async addProgress(progress: Progress): Promise<number> {
    const response = await this.pool.query<{ id: number }>({
      text: "INSERT INTO progresses(user_id, section_id, updated) VALUES ($1, $2, $3) RETURNING id",
      values: [progress.user_id, progress.section_id, progress.updated],
    });
    return response.rows[0].id;
  }
  async removeProgress(progress_id: number): Promise<number> {
    const response = await this.pool.query<{ id: number }>({
      text: "DELETE FROM progresses WHERE id = $1 RETURNING id",
      values: [progress_id],
    });
    return response.rows[0].id;
  }
  async getProgress(progress_id: number): Promise<Progress> {
    const response = await this.pool.query<Progress>({
      text: "SELECT * FROM progresses WHERE id = $1",
      values: [progress_id],
    });
    return response.rows[0];
  }
  async listProgressByBook(book_id: number): Promise<Progress[]> {
    const response = await this.pool.query<Progress>({
      text: "SELECT * FROM progresses WHERE book_id = $1",
      values: [book_id],
    });
    return response.rows;
  }
  async listProgressByUser(user_id: string): Promise<Progress[]> {
    const response = await this.pool.query<Progress>({
      text: "SELECT * FROM progresses WHERE user_id = $1",
      values: [user_id],
    });
    return response.rows;
  }
}
