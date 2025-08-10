import express from "express";
import cors from "cors";
import { uploadCsvHandler } from "./uploadCsv";
import dotenv from "dotenv";
import path from "path";
import { getMembersHandler } from "./getMembersHandler";
import { uploadBandHandler } from "./uploadBand";
import { getBandsHandler } from "./getBandsHandler";
import { deleteBandHandler } from "./deleteBand";
import { getBandByIdHandler } from "./getBandById";
import { updateBandHandler } from "./updateBand";

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
app.post("/upload/band", uploadBandHandler);
app.get("/bands", getBandsHandler);
app.delete("/delete/band/:id", deleteBandHandler);
app.get("/getBand/:id", getBandByIdHandler);
app.put("/update/band/:id", updateBandHandler);


const PORT = 3001;
app.listen(PORT, () => {
    console.log(`Dev API server listening on http://localhost:${PORT}`);
})