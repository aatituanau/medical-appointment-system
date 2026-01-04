import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import LoginCard from "./features/auth/LoginCard";

function App() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Navbar />

      <main className="flex-grow flex items-center justify-center p-6 relative">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-200/30 rounded-full blur-[100px] -z-10"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-primary/10 rounded-full blur-[100px] -z-10"></div>

        <LoginCard />
      </main>

      <Footer />
    </div>
  );
}

export default App;
