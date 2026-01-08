import React from "react";
import {Link, useNavigate} from "react-router-dom";
import InputField from "../../components/ui/InputField";
import logoH from "../../assets/logoH.png";
import {auth, db} from "../../firebase/config";
import {
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import {doc, setDoc, getDoc} from "firebase/firestore";

const LoginCard = () => {
  const navigate = useNavigate();

  // --- Google ---
  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      const userDoc = await getDoc(doc(db, "users", user.uid));
      if (!userDoc.exists()) {
        await setDoc(doc(db, "users", user.uid), {
          fullname: user.displayName,
          email: user.email,
          role: "student",
          createdAt: new Date(),
        });
      }

      navigate("/dashboard");
    } catch (error) {
      console.error("Error con Google:", error.message);
      alert("Error al conectar con Google");
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/dashboard");
    } catch (error) {
      alert("Usuario o contraseña incorrectos.");
    }
  };

  return (
    <div className="relative w-full max-w-[450px] bg-white rounded-[2.5rem] shadow-2xl border border-slate-100 overflow-hidden z-10 animate-fade-in-up">
      <div className="px-8 pt-10 pb-6 text-center flex flex-col items-center">
        <div className="w-16 h-16 mb-4 rounded-full bg-blue-50 flex items-center justify-center border border-blue-100 shadow-sm">
          <img src={logoH} alt="Logo UCE" className="h-10 w-auto" />
        </div>
        <h1 className="text-slate-800 text-3xl font-black leading-tight tracking-tight mb-2">
          Inicio de Sesión
        </h1>
        <p className="text-slate-400 text-sm font-normal">
          Gestiona tus citas médicas universitarias
        </p>
      </div>

      <form
        className="px-10 pb-8 pt-2 flex flex-col gap-4"
        onSubmit={handleLogin}
      >
        <InputField
          label="Correo Institucional"
          icon="mail"
          type="email"
          id="email"
          placeholder="usuario@uce.edu.ec"
        />
        <InputField
          label="Contraseña"
          icon="lock"
          type="password"
          id="password"
          placeholder="••••••••"
          forgotPassword
        />

        <div className="flex flex-col gap-3 mt-4">
          <button
            type="submit"
            className="w-full h-12 bg-primary hover:bg-primary-dark text-white font-bold rounded-2xl shadow-lg transition-all active:scale-[0.98]"
          >
            Iniciar sesión
          </button>
          <button
            type="button"
            className="w-full h-12 border-2 border-primary text-primary hover:bg-primary/5 font-bold rounded-2xl transition-all"
          >
            Iniciar sesión Admin
          </button>
        </div>

        <div className="relative flex py-4 items-center">
          <div className="flex-grow border-t border-slate-100"></div>
          <span className="mx-4 text-[10px] font-bold text-slate-300 uppercase tracking-widest">
            O accede con
          </span>
          <div className="flex-grow border-t border-slate-100"></div>
        </div>

        <button
          onClick={handleGoogleLogin}
          type="button"
          className="flex w-full items-center justify-center gap-3 rounded-2xl h-12 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 text-sm font-semibold transition-colors"
        >
          <img
            alt="Google"
            className="size-5"
            src="https://www.google.com/favicon.ico"
          />
          <span>Cuenta Google</span>
        </button>
      </form>

      <div className="bg-slate-50 px-8 py-6 text-center border-t border-slate-100 text-sm">
        ¿Eres nuevo?{" "}
        <Link
          to="/register"
          className="text-primary font-bold hover:underline ml-1"
        >
          Regístrate aquí
        </Link>
      </div>
    </div>
  );
};

export default LoginCard;
