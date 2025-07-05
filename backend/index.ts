import express from "express";
import cors from "cors";
import { uploadCsvHandler } from "./uploadCsv";
import dotenv from "dotenv";
import path from "path";
import { getMembersHandler } from "./getMembersHandler";
import { uploadBandHander } from "./uploadBand";
import { getBandsHandler } from "./getBandsHandler";

dotenv.config({ path: path.resolve(__dirname, ".env") });

const app = express();

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
}));

app.use(express.text({ type: "text/csv" }));
app.use(express.json())

app.post("/upload/csv", uploadCsvHandler);
app.get("/members", getMembersHandler);
app.post("/upload/band", uploadBandHander);
app.get("/bands", getBandsHandler)

const PORT = 3001;
app.listen(PORT, () => {
    console.log(`Dev API server listening on http://localhost:${PORT}`);
})