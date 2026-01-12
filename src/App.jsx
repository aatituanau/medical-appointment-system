import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import LoginCard from "./features/auth/LoginCard";
import RegisterCard from "./features/auth/RegisterCard";
import DashboardLayout from "./components/layout/DashboardLayout";
import MainDashboard from "./features/user/MainDashboard";
import ScheduleAppointment from "./features/user/ScheduleAppointment";
import MyAppointments from "./features/user/MyAppointments";
import SpecialtiesPage from "./features/admin/SpecialtiesPage";
import AdminLayout from "./components/layout/AdminLayout";
import DoctorsPage from "./features/admin/DoctorsPage";
import ReportsPage from "./features/admin/ReportsPage";
import AppointmentsPage from "./features/admin/AppointmentsPage";

function App() {
  return (
    <Router>
      <div className="bg-background-light dark:bg-background-dark flex flex-col min-h-screen">
        <Navbar />

        <main className="flex-grow flex items-center justify-center p-4 relative">
          <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10">
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-100/50 rounded-full blur-[120px]"></div>
          </div>

          <Routes>
            <Route path="/" element={<Navigate to="/login" />} />
            <Route path="/login" element={<LoginCard />} />
            <Route path="/register" element={<RegisterCard />} />

            <Route element={<DashboardLayout />}>
              <Route path="/dashboard" element={<MainDashboard />} />
              <Route path="/agendar" element={<ScheduleAppointment />} />
              <Route path="/citas" element={<MyAppointments />} />
              <Route path="/perfil" element={<div>Página de Perfil</div>} />
              <Route path="*" element={<div>404 Not Found</div>} />
            </Route>

            <Route path="/admin" element={<AdminLayout />}>
              <Route path="/admin/specialties" element={<SpecialtiesPage />} />
              <Route path="/admin/doctors" element={<DoctorsPage />} />
              <Route
                path="/admin/appointments"
                element={<AppointmentsPage />}
              />
              <Route path="/admin/reports" element={<ReportsPage />} />
            </Route>
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
