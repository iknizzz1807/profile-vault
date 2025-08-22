import saveAs from "file-saver";
import JSZip from "jszip";

export async function createZip(
  files: { name: string; content: string | Blob }[]
): Promise<Blob> {
  const zip = new JSZip();

  for (const file of files) {
    zip.file(file.name, file.content);
  }

  const blob = await zip.generateAsync({ type: "blob" });
  return blob;
}

export async function downloadZip(blob: Blob, fileName: string) {
  saveAs(blob, fileName);
}
