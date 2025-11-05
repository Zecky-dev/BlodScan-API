// text cleanup
export function cleanPdfText(raw) {
  return raw
    .replace(/T\.C\..*?BAKANLIĞI.*?\n/g, "")
    .replace(/enabiz\.gov\.tr.*/g, "")
    .replace(/Sayfa\s\d+\s\/\s\d+/g, "")
    .replace(/--\s*\d+\s*of\s*\d+\s*--/g, "")
    .replace(/\n+/g, "\n")
    .replace(/\s{2,}/g, " ")
    .trim();
}

// extract blood test results
export function extractResults(cleanText) {
  const lines = cleanText.split("\n");
  const results = [];

  const regex =
    /^([A-Za-zĞÜŞİÖÇğüşıöç0-9%\#\/\-\s]+)\s([\d,\.]+)\s?([^\s]*)\s?([HNL]?)\(([^)]+)\)/i;

  for (const line of lines) {
    const match = line.match(regex);
    if (match) {
      results.push({
        test: match[1].trim(),
        value: parseFloat(match[2].replace(",", ".")),
        unit: match[3]?.trim() || null,
        status: match[4] || "N",
        range: match[5].trim(),
      });
    }
  }

  return results;
}
