if (typeof global.DOMMatrix === 'undefined') {
  global.DOMMatrix = class MockDOMMatrix {};
}

if (typeof global.ImageData === 'undefined') {
  global.ImageData = class MockImageData {
    constructor(data, width, height) { /* constructor beklenirse */ }
  };
}

if (typeof global.Path2D === 'undefined') {
  global.Path2D = class MockPath2D {};
}

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
