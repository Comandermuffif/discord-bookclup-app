import { Client } from "pg";
import { migrate } from "..";

function getClient(): Client {
    return new Client({
        host: "localhost",
        port: 5432,
        database: "postgres",
        user: "postgres",
        password: "test",
      });
};

test("migrate", async () => {
    const client = getClient();
    await expect(migrate(client)).resolves.toBe([]);
});