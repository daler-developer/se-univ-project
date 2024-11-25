import express from "express";
import cors from "cors";
import { init } from "./controllers/createCompany.js";

const app = express();

app.use(express.json());

app.use(cors());

init(app);

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
