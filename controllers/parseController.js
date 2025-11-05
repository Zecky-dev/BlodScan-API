import { parsePdfBuffer } from "../services/parseService.js";

export async function handleParseRequest(req, res) {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, message: "PDF file missing." });
    }

    const { cleanText, tests } = await parsePdfBuffer(req.file.buffer);

    res.json({
      success: true,
      count: tests.length,
      results: tests,
    });
  } catch (error) {
    console.error("PDF parse error:", error);
    res.status(500).json({ success: false, error: error.message });
  }
}
