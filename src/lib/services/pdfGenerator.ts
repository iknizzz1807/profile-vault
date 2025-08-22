import jsPDF from "jspdf";
import html2canvas from "html2canvas";

export async function generatePdf(
  element: HTMLElement,
  fileName: string = "cv.pdf"
) {
  // Tạm thời ẩn các phần tử không muốn in
  const controls = element.querySelectorAll<HTMLElement>("[data-no-print]");
  controls.forEach((el) => (el.style.display = "none"));

  const canvas = await html2canvas(element, {
    scale: 2, // Tăng độ phân giải cho nét hơn
    useCORS: true,
  });

  // Hiển thị lại các phần tử đã ẩn
  controls.forEach((el) => (el.style.display = ""));

  const imgData = canvas.toDataURL("image/png");
  const pdf = new jsPDF("p", "mm", "a4");

  const pdfWidth = pdf.internal.pageSize.getWidth();
  const pdfHeight = pdf.internal.pageSize.getHeight();

  const canvasWidth = canvas.width;
  const canvasHeight = canvas.height;

  const ratio = canvasWidth / canvasHeight;
  let imgWidth = pdfWidth;
  let imgHeight = pdfWidth / ratio;

  // Đảm bảo ảnh không bị tràn ra khỏi trang
  if (imgHeight > pdfHeight) {
    imgHeight = pdfHeight;
    imgWidth = imgHeight * ratio;
  }

  const x = (pdfWidth - imgWidth) / 2; // Căn giữa ảnh

  pdf.addImage(imgData, "PNG", x, 0, imgWidth, imgHeight);
  pdf.save(fileName);
}
