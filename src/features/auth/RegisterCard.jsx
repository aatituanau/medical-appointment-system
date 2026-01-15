import React, {useState} from "react";
import InputField from "../../components/ui/InputField";
import {Link, useNavigate} from "react-router-dom";
import logoH from "../../assets/logoH.png";
import Hosp from "../../assets/Hosp.jpg";
import {auth, db} from "../../firebase/config";
import {createUserWithEmailAndPassword, updateProfile} from "firebase/auth";
import {doc, setDoc} from "firebase/firestore";
import Footer from "../../components/layout/Footer";

const RegisterCard = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);

    const email = e.target.email.value;
    const password = e.target.password.value;
    const fullname = e.target.fullname.value;
    const confirmPassword = e.target.confirm_password.value;

    if (password !== confirmPassword) {
      alert("Las contraseñas no coinciden.");
      setLoading(false);
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      await updateProfile(user, {displayName: fullname});

      const role = email.endsWith("@uce.edu.ec") ? "student" : "user";

      await setDoc(doc(db, "users", user.uid), {
        fullname: fullname,
        email: email,
        role: role,
        createdAt: new Date(),
      });

      console.log("Usuario registrado con rol:", role);

      navigate("/dashboard");
    } catch (error) {
      console.error("Error completo:", error);
      setLoading(false);
      if (error.code === "auth/email-already-in-use") {
        alert("Este correo ya está registrado.");
      } else {
        alert("Error: " + error.message);
      }
    }
  };

  return (
    <div className="flex flex-col min-h-[calc(100vh-64px)] bg-slate-50">
      <div className="flex-grow flex items-center justify-center p-6">
        <div className="w-full max-w-[1100px] bg-white rounded-[2.5rem] shadow-2xl border border-white overflow-hidden flex flex-col md:flex-row min-h-[600px]">
          <div className="relative w-full md:w-5/12 hidden md:flex flex-col justify-center items-center p-12 text-center group overflow-hidden">
            <div className="absolute inset-0 bg-[#137fec]/85 mix-blend-multiply z-10"></div>
            <img
              alt="Hospital del Día"
              className="absolute inset-0 w-full h-full object-cover z-0 transition-transform duration-700 group-hover:scale-105"
              src={Hosp}
            />
            <div className="relative z-20 flex flex-col gap-6 text-white">
              <div className="size-16 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center mx-auto mb-2 border border-white/30">
                <img src={logoH} alt="Logo Hospital" className="h-14 w-auto" />
              </div>
              <h3 className="text-3xl font-black leading-tight tracking-tight">
                Bienvenido al Hospital del Día UCE
              </h3>
              <p className="text-white/90 text-base font-light leading-relaxed">
                Regístrate para acceder a citas médicas gratuitas (estudiantes)
                o servicios externos.
              </p>
            </div>
          </div>

          <div className="w-full md:w-7/12 p-8 md:p-12 lg:p-16 flex flex-col justify-center bg-white">
            <div className="max-w-md mx-auto w-full">
              <div className="mb-8">
                <h1 className="text-slate-900 text-3xl font-black tracking-tight mb-2">
                  Crear cuenta
                </h1>
                <p className="text-slate-500 text-sm font-medium">
                  Usa tu correo institucional para acceder a beneficios.
                </p>
              </div>

              <form className="flex flex-col gap-4" onSubmit={handleRegister}>
                <InputField
                  label="Nombre Completo"
                  icon="person"
                  type="text"
                  placeholder="Ej. Juan Pérez"
                  id="fullname"
                  required
                />

                <InputField
                  label="Correo Electrónico"
                  icon="school"
                  type="email"
                  placeholder="juan.perez@uce.edu.ec"
                  id="email"
                  required
                />

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <InputField
                    label="Contraseña"
                    icon="lock"
                    type="password"
                    placeholder="******"
                    id="password"
                    required
                  />
                  <InputField
                    label="Confirmar"
                    icon="lock_reset"
                    type="password"
                    placeholder="******"
                    id="confirm_password"
                    required
                  />
                </div>

                <div className="flex items-start gap-3 mt-2">
                  <input
                    required
                    type="checkbox"
                    id="terms"
                    className="mt-1 size-4 rounded border-slate-300 text-primary"
                  />
                  <label
                    htmlFor="terms"
                    className="text-xs font-medium text-slate-500 leading-tight"
                  >
                    Acepto los términos y condiciones del sistema médico.
                  </label>
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
                <p className="text-slate-500 text-sm font-medium">
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
