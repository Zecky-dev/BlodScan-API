import 'pdf-parse/worker';
import { CanvasFactory } from 'pdf-parse/worker';
import { PDFParse } from "pdf-parse";
import { cleanPdfText, extractResults } from "../utils/parseUtils.js";

export async function parsePdfBuffer(buffer) {
  const parser = new PDFParse({ data: buffer, CanvasFactory });
  const result = await parser.getText();
  await parser.destroy();

  const cleanText = cleanPdfText(result.text);
  const tests = extractResults(cleanText);

  return { cleanText, tests };
}
