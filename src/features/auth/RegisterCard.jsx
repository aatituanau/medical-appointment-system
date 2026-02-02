import React, {useState, useEffect} from "react";
import {useForm} from "react-hook-form";
import {Link, useNavigate} from "react-router-dom";
import {zodResolver} from "@hookform/resolvers/zod";
import {createUserWithEmailAndPassword, updateProfile} from "firebase/auth";
import {doc, setDoc} from "firebase/firestore";
import {auth, db} from "../../firebase/config";
import {registerSchema} from "../../schemas/authSchema";
import InputField from "../../components/ui/InputField";
import Footer from "../../components/layout/Footer";
import StatusAlert from "../../components/ui/StatusAlert";
import Hosp from "../../assets/Hosp.jpg";
import logoH from "../../assets/logoH.png";
import {useAuth} from "../../context/AuthContext";

const RegisterCard = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [alertInfo, setAlertInfo] = useState({show: false, msg: "", type: ""});
  const {user, userData, loading: authLoading} = useAuth();

  // Configuration of React Hook Form with Zod
  const {
    register,
    handleSubmit,
    formState: {errors},
  } = useForm({
    resolver: zodResolver(registerSchema),
  });

  // Effect to display Zod errors in your StatusAlert
  useEffect(() => {
    // Get the first error if it exists
    const errorMessages = Object.values(errors);
    if (errorMessages.length > 0) {
      setAlertInfo({
        show: true,
        msg: errorMessages[0].message,
        type: "error",
      });
    }
  }, [errors]);

  useEffect(() => {
    if (!authLoading && user) {
      const destination =
        userData?.role === "admin" ? "/admin/specialties" : "/dashboard";
      navigate(destination, {replace: true});
    }
  }, [authLoading, user, userData, navigate]);

  const handleRegister = async (data) => {
    setLoading(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        data.email,
        data.password,
      );

      await updateProfile(userCredential.user, {displayName: data.fullname});

      // Role logic (UCE vs External)
      const role = data.email.endsWith("@uce.edu.ec") ? "student" : "user";

      await setDoc(doc(db, "users", userCredential.user.uid), {
        fullname: data.fullname,
        email: data.email,
        role: role,
        createdAt: new Date(),
      });

      navigate("/dashboard");
    } catch (error) {
      setLoading(false);
      if (error.code === "auth/email-already-in-use") {
        setAlertInfo({
          show: true,
          msg: "Este correo ya está registrado.",
          type: "error",
        });
      } else {
        setAlertInfo({
          show: true,
          msg: "Error al crear cuenta. Intenta de nuevo.",
          type: "error",
        });
      }
    }
  };

  // Blockade of numbers in the name field
  const handleNameKeyDown = (e) => {
    if (
      ["Backspace", "Tab", "ArrowLeft", "ArrowRight", "Delete"].includes(e.key)
    )
      return;
    if (/[0-9]/.test(e.key)) e.preventDefault();
  };

  return (
    <div className="flex flex-col min-h-[calc(100vh-64px)] bg-slate-50">
      <StatusAlert
        type={alertInfo.type}
        message={alertInfo.show ? alertInfo.msg : ""}
        onClose={() => setAlertInfo({...alertInfo, show: false})}
      />

      <div className="flex-grow flex items-center justify-center p-6">
        <div className="w-full max-w-[1100px] bg-white rounded-[2.5rem] shadow-2xl border border-white overflow-hidden flex flex-col md:flex-row min-h-[600px]">
          <div className="relative w-full md:w-5/12 hidden md:flex flex-col justify-center items-center p-12 text-center group overflow-hidden">
            <div className="absolute inset-0 bg-[#137fec]/85 mix-blend-multiply z-10"></div>
            <img
              alt="Hospital"
              className="absolute inset-0 w-full h-full object-cover z-0 transition-transform duration-700 group-hover:scale-105"
              src={Hosp}
            />
            <div className="relative z-20 flex flex-col gap-6 text-white">
              <div className="size-24 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center mx-auto mb-2 border border-white/30 overflow-hidden">
                <img
                  src={logoH}
                  alt="Logo Hospital"
                  className="w-full h-full object-contain scale-125"
                />
              </div>
              <h3 className="text-3xl font-black italic">
                Bienvenido al Hospital del Día UCE
              </h3>
              <p className="text-white/90 text-base font-light">
                Regístrate para acceder a citas médicas gratuitas o servicios
                externos.
              </p>
            </div>
          </div>

          <div className="w-full md:w-7/12 p-8 md:p-12 lg:p-16 flex flex-col justify-center bg-white">
            <div className="max-w-md mx-auto w-full">
              <h1 className="text-slate-900 text-3xl font-black mb-6">
                Crear cuenta
              </h1>
              <form
                className="flex flex-col gap-4"
                onSubmit={handleSubmit(handleRegister)}
              >
                <InputField
                  label="Nombre Completo"
                  icon="person"
                  placeholder="Ej. Juan Pérez"
                  {...register("fullname")}
                  onKeyDown={handleNameKeyDown}
                />

                <InputField
                  label="Correo Electrónico"
                  icon="school"
                  placeholder="juan.perez@uce.edu.ec"
                  {...register("email")}
                />

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <InputField
                    label="Contraseña"
                    icon="lock"
                    type="password"
                    placeholder="******"
                    {...register("password")}
                  />
                  <InputField
                    label="Confirmar"
                    icon="lock_reset"
                    type="password"
                    placeholder="******"
                    {...register("confirm_password")}
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="mt-4 w-full h-12 bg-slate-800 hover:bg-slate-900 text-white font-bold rounded-2xl shadow-lg transition-all flex items-center justify-center"
                >
                  <span>{loading ? "Registrando..." : "Crear mi cuenta"}</span>
                </button>
              </form>

              <div className="mt-8 text-center border-t border-slate-100 pt-6">
                <p className="text-slate-500 text-sm">
                  ¿Ya tienes una cuenta?{" "}
                  <Link
                    className="text-blue-600 font-bold hover:underline ml-1"
                    to="/login"
                  >
                    Inicia sesión aquí
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default RegisterCard;
