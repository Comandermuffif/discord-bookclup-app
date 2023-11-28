import Postgrator, { Migration } from "postgrator";
import pg from "pg";

export const client = new pg.Client({
  host: "localhost",
  port: 5432,
  database: "postgres",
  user: "postgres",
  password: "test",
});

export async function migrate(client: pg.Client): Promise<Migration[]> {
  try {
    await client.connect();
  
    const postgrator = new Postgrator({
      migrationPattern: "/Users/vincentcoffey/Desktop/Personal Code/discord-bookclup-app/src/db/postgres/migrations/*",
      driver: "pg",
      execQuery: (query) => client.query(query),
    });

    return await postgrator.migrate();
  } finally {
    await client.end();
  }
};