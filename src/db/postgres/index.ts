import Postgrator from "postgrator";
import pg from "pg";

export const client = new pg.Client({
  host: "localhost",
  port: 5432,
  database: "bot",
  user: "admin",
  password: "test",
});

export async function migrate(client:pg.Client): Promise<void> {
    // Establish a database connection
    await client.connect();

    // Create postgrator instance
    const postgrator = new Postgrator({
      migrationPattern: "/Users/vincentcoffey/Desktop/Personal Code/discord-bookclup-app/src/db/postgres/migrations/*",
      driver: "pg",
      database: "bot",
    });

    // Or migrate to max version (optionally can provide 'max')
    await postgrator.migrate();

    // Once done migrating, close your connection.
    await client.end();
};