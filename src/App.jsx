import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import AppLayout from "./components/layout/AppLayout";
import Navbar from "./components/layout/Navbar";
import LoginCard from "./features/auth/LoginCard";
import RegisterCard from "./features/auth/RegisterCard";
import MainDashboard from "./features/user/pages/MainDashboard";
import ScheduleAppointment from "./features/user/pages/ScheduleAppointment";
import MyAppointments from "./features/user/pages/MyAppointments";
import SpecialtiesPage from "./features/admin/pages/SpecialtiesPage";
import DoctorsPage from "./features/admin/pages/DoctorsPage";
import ReportsPage from "./features/admin/pages/ReportsPage";
import AppointmentsPage from "./features/admin/pages/AppointmentsPage";
import LandingPage from "./features/public/LandingPage";

function App() {
  return (
    <Router>
      <Navbar />

      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginCard />} />
        <Route path="/register" element={<RegisterCard />} />

        <Route element={<AppLayout />}>
          <Route path="/dashboard" element={<MainDashboard />} />
          <Route path="/agendar" element={<ScheduleAppointment />} />
          <Route path="/citas" element={<MyAppointments />} />

          <Route path="/admin/specialties" element={<SpecialtiesPage />} />
          <Route path="/admin/doctors" element={<DoctorsPage />} />
          <Route path="/admin/appointments" element={<AppointmentsPage />} />
          <Route path="/admin/reports" element={<ReportsPage />} />
          <Route
            path="*"
            element={
              <div className="p-20 text-center font-bold">
                404 - No encontrado
              </div>
            }
          />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
