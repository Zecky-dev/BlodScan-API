import { PDFParse } from "pdf-parse";
import { cleanPdfText, extractResults } from "../utils/parseUtils.js";

export async function parsePdfBuffer(buffer) {
  const parser = new PDFParse({ data: buffer });
  const result = await parser.getText();
  await parser.destroy();

  const cleanText = cleanPdfText(result.text);
  const tests = extractResults(cleanText);

  return { cleanText, tests };
}
