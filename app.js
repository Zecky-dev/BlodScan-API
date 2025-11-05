if (typeof global.DOMMatrix === 'undefined') {
  global.DOMMatrix = class MockDOMMatrix {
    constructor() {}
  };
}

if (typeof global.ImageData === 'undefined') {
  global.ImageData = class MockImageData {
    constructor(data, width, height) {
      if (typeof width === 'number' && typeof height === 'number') {
        this.width = width;
        this.height = height;
        this.data = new Uint8ClampedArray(width * height * 4); 
      }
    }
  };
}

if (typeof global.Path2D === 'undefined') {
  global.Path2D = class MockPath2D {
    constructor() {}
  };
}

if (typeof global.document === 'undefined') {
  global.document = {};
}

if (typeof global.Worker === 'undefined') {
    global.Worker = class MockWorker {
        constructor() {}
    };
}


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
