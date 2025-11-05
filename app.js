import { GlobalWorkerOptions } from "pdfjs-dist/legacy/build/pdf.mjs";
import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
GlobalWorkerOptions.workerSrc = path.join(__dirname, 'pdf.worker.mjs');



// App
import express from "express";
import cors from "cors";
import multer from "multer";
import parseRoutes from "./routes/parseRoutes.js";

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

const upload = multer({ storage: multer.memoryStorage() });

app.use("/parse-pdf", upload.single("file"), parseRoutes);

app.get("/", (_, res) => res.send("✅ BloodScan PDF Parse API running"));

app.listen(port, () => {
  console.log(`🚀 Server running at http://localhost:${port}`);
});
