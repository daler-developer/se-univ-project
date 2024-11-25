import { drizzle } from "drizzle-orm/node-postgres";
import pg from "pg";

const client = new pg.Client({
  host: "127.0.0.1",
  port: 5432,
  user: "dalersaidov",
  password: "",
  database: "se-project",
});

(async () => {
  await client.connect();
})();

const db = drizzle(client);

export default db;
