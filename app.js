// App
import 'dotenv/config'
import express from "express";
import cors from "cors";
import multer from "multer";
import parseRoutes from "./routes/parseRoutes.js";

// API Key Middleware
import { verifyApiKey } from "./middleware/verifyApiKey.js";

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(verifyApiKey);

const upload = multer({ storage: multer.memoryStorage() });

app.use("/parse-pdf", upload.single("file"), parseRoutes);

app.get("/", (_, res) => res.send("BlodScan API is running!"));

app.listen(port, () => {
  console.log(`🚀 Server running at http://localhost:${port}`);
});
