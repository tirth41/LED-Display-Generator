import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";

// Exported function to download a referenced UI as a PDF
const downloadPDF = (ref, fileName = "download.pdf") => {
  const input = ref.current; // Reference to the container you want to capture

  html2canvas(input, {
    scale: 2, // Higher resolution
    useCORS: true, // To handle external resources like fonts and images
  }).then((canvas) => {
    const imgData = canvas.toDataURL("image/png");

    // Get the canvas dimensions
    const imgWidth = canvas.width;
    const imgHeight = canvas.height;

    // Dynamically set PDF orientation and size
    const pdf = new jsPDF({
      orientation: imgWidth > imgHeight ? "l" : "p", // Landscape or Portrait
      unit: "px",
      format: [imgWidth, imgHeight], // Custom PDF size
    });

    // Add the image to the PDF
    pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight);

    // Trigger the download
    pdf.save(fileName);
  });
};

export default downloadPDF;
