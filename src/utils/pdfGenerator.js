import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

export const generateAppointmentPDF = (cita, user) => {
  const doc = new jsPDF();
  const blueUCE = [19, 127, 236];

  // Header
  doc.setFillColor(...blueUCE);
  doc.rect(0, 0, 210, 40, "F");

  doc.setTextColor(255, 255, 255);
  doc.setFontSize(22);
  doc.setFont("helvetica", "bold");
  doc.text("UNIVERSIDAD CENTRAL DEL ECUADOR", 105, 20, {align: "center"});
  doc.setFontSize(16);
  doc.text("HOSPITAL DEL DÍA - COMPROBANTE", 105, 30, {align: "center"});

  // Student Information
  doc.setTextColor(40, 40, 40);
  doc.setFontSize(12);
  doc.setFont("helvetica", "normal");
  doc.text(`Fecha de emisión: ${new Date().toLocaleDateString()}`, 14, 50);
  doc.text(`Paciente: ${user?.displayName || user?.email}`, 14, 58);

  // IMPORTANT: We use autoTable(doc, {...})
  autoTable(doc, {
    startY: 70,
    head: [["Detalle de la Consulta", "Información"]],
    body: [
      ["Especialidad", cita.specialty.toUpperCase()],
      ["Médico Especialista", cita.doctorName],
      ["Fecha de la Cita", cita.date],
      [
        "Hora asignada",
        cita.time
          .toString()
          .padStart(4, "0")
          .replace(/^(\d{2})(\d{2})$/, "$1:$2"),
      ],
      ["Lugar", `Consultorio ${cita.office} — UCE`],
      ["Estado", cita.status || "CONFIRMADA"],
    ],
    headStyles: {
      fillColor: blueUCE,
      fontSize: 12,
      fontStyle: "bold",
    },
    bodyStyles: {
      fontSize: 11,
      cellPadding: 5,
    },
    alternateRowStyles: {
      fillColor: [245, 247, 250],
    },
    margin: {top: 70},
  });

  // Footer
  const finalY = doc.lastAutoTable.finalY;
  doc.setFontSize(10);
  doc.setTextColor(100, 100, 100);
  doc.text("IMPORTANTE:", 14, finalY + 15);
  doc.text(
    "- Por favor, preséntese 15 minutos antes de su cita.",
    14,
    finalY + 22,
  );
  doc.text(
    "- Presente su carnet universitario o cédula de identidad.",
    14,
    finalY + 29,
  );
  doc.text(
    "- Este documento es un comprobante válido de agendamiento.",
    14,
    finalY + 36,
  );

  // Download
  doc.save(`Cita_UCE_${cita.specialty}_${cita.date}.pdf`);
};
