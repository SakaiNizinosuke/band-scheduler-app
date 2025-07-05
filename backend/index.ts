import express from "express";
import cors from "cors";
import { uploadCsvHandler } from "./uploadCsv";
import dotenv from "dotenv";
import path from "path";
import { getMembersHandler } from "./getMembersHandler";

dotenv.config({ path: path.resolve(__dirname, ".env") });

const app = express();

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
}));

app.use(express.text({ type: "text/csv" }));

app.post("/upload", uploadCsvHandler);
app.get("/members", getMembersHandler);

const PORT = 3001;
app.listen(PORT, () => {
    console.log(`Dev API server listening on http://localhost:${PORT}`);
})