const entities = require('./entities');

export default {
  schema: "./entities.js",
  out: "./drizzle",
  dialect: "postgresql",
  dbCredentials: {
    host: "127.0.0.1",
    port: 5432,
    user: "dalersaidov",
    password: "",
    database: "se-project",
  },
}
