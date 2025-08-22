import * as pdfjs from "pdfjs-dist/legacy/build/pdf.mjs";
import mammoth from "mammoth";

// Copy file `pdf.worker.mjs` từ `node_modules/pdfjs-dist/legacy/build/` vào thư mục `static`
pdfjs.GlobalWorkerOptions.workerSrc = `/pdf.worker.mjs`;

export async function extractTextFromFiles(files: File[]): Promise<string> {
  let combinedText = "";

  for (const file of files) {
    let text = "";
    try {
      if (file.type === "application/pdf") {
        const arrayBuffer = await file.arrayBuffer();
        const pdf = await pdfjs.getDocument(arrayBuffer).promise;
        for (let i = 1; i <= pdf.numPages; i++) {
          const page = await pdf.getPage(i);
          const content = await page.getTextContent();
          text += content.items
            .map((item) => ("str" in item ? item.str : ""))
            .join(" ");
        }
      } else if (
        file.type ===
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
      ) {
        const arrayBuffer = await file.arrayBuffer();
        const result = await mammoth.extractRawText({ arrayBuffer });
        text = result.value;
      } else if (file.type.startsWith("text/")) {
        text = await file.text();
      } else {
        console.warn(`Định dạng file không được hỗ trợ: ${file.name}`);
        continue;
      }
      combinedText += `--- Dữ liệu từ file: ${file.name} ---\n\n${text}\n\n`;
    } catch (e: any) {
      console.error(`Lỗi khi xử lý file ${file.name}:`, e);
      continue;
    }
  }
  return combinedText;
}
