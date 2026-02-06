import * as XLSX from "xlsx";

export const downloadAppointmentsExcel = (data, filterStatus) => {
  const dataToExport = data.map((item) => ({
    "FECHA DE CITA": item.date,
    HORA: item.time,
    PACIENTE: item.studentName?.toUpperCase(),
    "MÉDICO ESPECIALISTA": item.doctorName?.toUpperCase(),
    ESPECIALIDAD: item.specialty?.toUpperCase(),
    CONSULTORIO: `N° ${item.office}`,
    ESTADO: item.status?.toUpperCase(),
    "FECHA DE REGISTRO": item.createdAt?.seconds
      ? new Date(item.createdAt.seconds * 1000).toLocaleString()
      : "N/A",
  }));

  const worksheet = XLSX.utils.json_to_sheet(dataToExport);

  // column width
  worksheet["!cols"] = [
    {wch: 15},
    {wch: 10},
    {wch: 30},
    {wch: 15},
    {wch: 30},
    {wch: 20},
    {wch: 15},
    {wch: 15},
    {wch: 25},
  ];

  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Reporte de Citas");

  const fileName = `Reporte_UCE_${filterStatus.toUpperCase()}_${new Date().toISOString().split("T")[0]}.xlsx`;
  XLSX.writeFile(workbook, fileName);
};
