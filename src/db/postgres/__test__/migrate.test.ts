import { PostgresBookStorage } from "..";

function getStorage(): PostgresBookStorage {
  return new PostgresBookStorage({
    host: "localhost",
    port: 5432,
    database: "postgres",
    user: "postgres",
    password: "test",
  });
}

describe("book", () => {
  test("add", async () => {
    const storage = getStorage();
    await expect(
      storage.addBook({
        name: "Fourth Wing",
        guild_id: "561981651981851351",
      })
    ).resolves.toBeGreaterThan(0);
  });

  test("get", async () => {
    const storage = getStorage();
    const id = await storage.addBook({
      name: "Fourth Wing",
      guild_id: "561981651981851351",
    });

    await expect(storage.getBook(id)).resolves.toEqual({
      id: id,
      name: "Fourth Wing",
      guild_id: "561981651981851351",
      link: null,
    });
  });

  test("list", async () => {
    const storage = getStorage();
    const id = await storage.addBook({
      name: "Fourth Wing",
      guild_id: "561981651981851351",
    });

    await expect(storage.getBook(id)).resolves.toEqual({
      id: id,
      name: "Fourth Wing",
      guild_id: "561981651981851351",
      link: null,
    });
  });

  test("remove", async () => {
    const storage = getStorage();
    const id = await storage.addBook({
      name: "Fourth Wing",
      guild_id: "561981651981851351",
    });

    await expect(storage.removeBook(id)).resolves.toEqual(id);
  });
});

test("migrate", async () => {
  const storage = getStorage();
  const migrations = await storage.migrate();
  expect(migrations.version).toBe(1);
});
