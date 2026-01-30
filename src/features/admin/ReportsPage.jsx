import React, {useState, useMemo} from "react";
import Skeleton from "../../components/ui/Skeleton";
import StatCard from "../../components/ui-admin/StatCard";
import ReportCharts from "../../components/ui-admin/ReportCharts";
import AppointmentsTable from "../../components/ui-admin/AppointmentsTable";
import {useAllAppointmentsRealtime} from "../../hooks/useMedicalData";
import {downloadAppointmentsExcel} from "../../utils/excelGenerator";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
} from "chart.js";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
);

const ReportsPage = () => {
  const [filterStatus, setFilterStatus] = useState("todos");
  const [dateRange, setDateRange] = useState({start: "", end: ""});
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const {data: appointments, isLoading} = useAllAppointmentsRealtime();

  const stats = useMemo(() => {
    if (!appointments) {
      return {
        total: 0,
        confirmed: 0,
        cancelled: 0,
        specialties: {},
        filteredList: [],
        chartStats: {confirmed: 0, cancelled: 0},
      };
    }

    // --- LOGIC OF WEEKLY FILTERING FOR CHARTS ---
    const today = new Date();
    const firstDayOfWeek = new Date(
      today.setDate(today.getDate() - today.getDay()),
    ); // Sunday
    firstDayOfWeek.setHours(0, 0, 0, 0);

    const weeklyAppointments = appointments.filter((a) => {
      const appDate = new Date(a.date);
      return appDate >= firstDayOfWeek;
    });

    // Statistics for Charts (This Week Only)
    const chartConfirmed = weeklyAppointments.filter(
      (a) => a.status?.toLowerCase() === "confirmada",
    ).length;
    const chartCancelled = weeklyAppointments.filter(
      (a) => a.status?.toLowerCase() === "cancelada",
    ).length;

    const specialties = weeklyAppointments.reduce((acc, curr) => {
      const spec = curr.specialty || "General";
      acc[spec] = (acc[spec] || 0) + 1;
      return acc;
    }, {});

    // --- GENERAL LOGIC FOR CARDS AND TABLE ---
    const total = appointments.length;
    const confirmed = appointments.filter(
      (a) => a.status?.toLowerCase() === "confirmada",
    ).length;
    const cancelled = appointments.filter(
      (a) => a.status?.toLowerCase() === "cancelada",
    ).length;

    let filtered = [...appointments].sort(
      (a, b) => new Date(b.date) - new Date(a.date),
    );

    if (filterStatus !== "todos") {
      filtered = filtered.filter(
        (a) => a.status?.toLowerCase() === filterStatus,
      );
    }

    if (dateRange.start && dateRange.end) {
      filtered = filtered.filter((a) => {
        const appDate = new Date(a.date);
        const start = new Date(dateRange.start);
        const end = new Date(dateRange.end);
        appDate.setHours(0, 0, 0, 0);
        start.setHours(0, 0, 0, 0);
        end.setHours(0, 0, 0, 0);
        return appDate >= start && appDate <= end;
      });
    }

    return {
      total,
      confirmed,
      cancelled,
      specialties,
      filteredList: filtered,
      chartData: {confirmed: chartConfirmed, cancelled: chartCancelled},
    };
  }, [appointments, filterStatus, dateRange]);

  const exportToExcel = () => {
    downloadAppointmentsExcel(stats.filteredList, filterStatus);
  };

  if (isLoading) {
    return (
      <div className="p-8 space-y-8 animate-pulse">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Skeleton className="h-32 rounded-[2rem]" />
          <Skeleton className="h-32 rounded-[2rem]" />
          <Skeleton className="h-32 rounded-[2rem]" />
        </div>
        <Skeleton className="h-96 w-full rounded-[3rem]" />
      </div>
    );
  }

  const totalPages = Math.ceil(stats.filteredList.length / itemsPerPage);
  const currentItems = stats.filteredList.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  return (
    <div className="space-y-8 animate-fade-in pb-12 p-4 md:p-0">
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <h1 className="text-4xl font-black text-slate-800 tracking-tight">
            Reportes de Gestión
          </h1>
          <p className="text-slate-400 font-bold mt-1 text-sm uppercase tracking-widest">
            Hospital del Día — Los gráficos muestran datos de la SEMANA ACTUAL
          </p>
        </div>
      </header>

      {/* Global Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard
          label="Total Histórico"
          value={stats.total}
          color="bg-blue-600"
        />
        <StatCard
          label="Total Confirmadas"
          value={stats.confirmed}
          color="bg-emerald-500"
        />
        <StatCard
          label="Total Canceladas"
          value={stats.cancelled}
          color="bg-rose-500"
        />
      </div>

      {/* Analysis Charts (Weekly Filtered) */}
      <ReportCharts
        confirmed={stats.chartData.confirmed}
        cancelled={stats.chartData.cancelled}
        specialties={stats.specialties}
      />

      <AppointmentsTable
        items={currentItems}
        filterStatus={filterStatus}
        setFilterStatus={setFilterStatus}
        dateRange={dateRange}
        setDateRange={setDateRange}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        totalPages={totalPages}
        onExport={exportToExcel}
      />
    </div>
  );
};

export default ReportsPage;
