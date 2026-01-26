import React, {useState, useEffect} from "react";
import {useForm} from "react-hook-form";
import {Link, useNavigate} from "react-router-dom";
import {zodResolver} from "@hookform/resolvers/zod"; // IMPORTANTE
import {loginSchema} from "../../schemas/authSchema"; // IMPORTANTE
import {auth, db} from "../../firebase/config";
import {
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import {doc, getDoc, setDoc} from "firebase/firestore";
import InputField from "../../components/ui/InputField";
import logoH from "../../assets/logoH.png";
import Footer from "../../components/layout/Footer";
import StatusAlert from "../../components/ui/StatusAlert";

const LoginCard = () => {
  const navigate = useNavigate();
  const [alertInfo, setAlertInfo] = useState({show: false, msg: "", type: ""});

  // 1. Configure React Hook Form with Zod
  const {
    register,
    handleSubmit,
    formState: {errors},
  } = useForm({
    resolver: zodResolver(loginSchema),
  });

  // 2. Effect to show validation errors in the alert
  useEffect(() => {
    const errorMessages = Object.values(errors);
    if (errorMessages.length > 0) {
      setAlertInfo({
        show: true,
        msg: errorMessages[0].message,
        type: "error",
      });
    }
  }, [errors]);

  const handleLogin = async (data) => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        data.email,
        data.password,
      );
      const userDoc = await getDoc(doc(db, "users", userCredential.user.uid));

      if (userDoc.exists()) {
        const userData = userDoc.data();
        if (userData.role === "admin") navigate("/admin/specialties");
        else navigate("/dashboard");
      }
    } catch (error) {
      setAlertInfo({
        show: true,
        msg: "Credenciales incorrectas. Verifica tu correo y contraseña.",
        type: "error",
      });
    }
  };

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
          role: "user",
          createdAt: new Date(),
        });
      }
      navigate("/dashboard");
    } catch (error) {
      setAlertInfo({
        show: true,
        msg: "No se pudo conectar con Google. Intenta nuevamente.",
        type: "error",
      });
    }
  };

  return (
    <div className="flex flex-col min-h-[calc(100vh-64px)] bg-slate-50">
      <StatusAlert
        type={alertInfo.type}
        message={alertInfo.show ? alertInfo.msg : ""}
        onClose={() => setAlertInfo({...alertInfo, show: false})}
      />
      <div className="flex-grow flex items-center justify-center p-4 md:p-10">
        <div className="relative w-full max-w-[450px] bg-white rounded-[2.5rem] shadow-2xl border border-slate-100 overflow-hidden z-10">
          <div className="px-8 pt-10 pb-6 text-center flex flex-col items-center">
            <div className="w-20 h-20 mb-4 rounded-full bg-blue-50 flex items-center justify-center border border-blue-100 shadow-sm overflow-hidden">
              <img
                src={logoH}
                alt="Logo UCE"
                className="w-full h-full object-contain scale-110"
              />
            </div>
            <h1 className="text-slate-800 text-3xl font-black">
              Inicio de Sesión
            </h1>
            <p className="text-slate-400 text-sm">
              Gestiona tus citas médicas universitarias
            </p>
          </div>
          <form
            className="px-10 pb-8 pt-2 flex flex-col gap-4"
            onSubmit={handleSubmit(handleLogin)}
          >
            <InputField
              label="Correo Institucional"
              icon="mail"
              type="email"
              placeholder="usuario@uce.edu.ec"
              {...register("email")} // Validate whith Zod
            />
            <InputField
              label="Contraseña"
              icon="lock"
              type="password"
              placeholder="******"
              {...register("password")} // Validate whith Zod
            />
            <button
              type="submit"
              className="w-full h-12 bg-slate-800 hover:bg-slate-900 text-white font-bold rounded-2xl shadow-lg transition-all active:scale-[0.98]"
            >
              Iniciar sesión
            </button>
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
              className="text-blue-600 font-bold hover:underline ml-1"
            >
              Regístrate aquí
            </Link>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default LoginCard;
