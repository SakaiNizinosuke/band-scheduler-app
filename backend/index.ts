import express from "express";
import { uploadCsvHandler } from "./uploadCsv";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(express.text({ type: "text/csv" }));

app.post("/upload", uploadCsvHandler);

const PORT = 3001;
app.listen(PORT, () => {
    console.log(`Dev API server listening on http://localhost:${PORT}`);
})