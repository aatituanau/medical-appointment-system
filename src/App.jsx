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
          </Routes>
        </main>

        <Footer />
      </div>
    </Router>
  );
}

export default App;
