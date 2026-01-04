import InputField from "../../components/ui/InputField";
import logoH from "../../assets/logoH.png";
import {Link} from "react-router-dom";

const LoginCard = () => (
  <div className="w-full max-w-[450px] bg-white rounded-[2.5rem] shadow-2xl shadow-blue-900/10 border border-white overflow-hidden animate-fade-in-up">
    <div className="px-10 pt-12 pb-6 text-center flex flex-col items-center">
      <div className="size-20 mb-4 rounded-full border border-slate-100 flex items-center justify-center bg-white shadow-sm overflow-hidden">
        <img src={logoH} alt="Logo Hospital" className="h-14 w-auto" />
      </div>
      <h1 className="text-slate-800 text-3xl font-black tracking-tight">
        Inicio de Sesión
      </h1>
      <p className="text-slate-400 text-sm mt-2">
        Gestiona tus citas médicas universitarias
      </p>
    </div>

    <form
      className="px-10 pb-8 flex flex-col gap-4"
      onSubmit={(e) => e.preventDefault()}
    >
      <InputField
        label="Correo Institucional"
        //icon="mail"
        type="email"
        placeholder="usuario@uce.edu.ec"
        id="email"
      />
      <InputField
        label="Contraseña"
        //icon="lock"
        type="password"
        placeholder="••••••••"
        id="password"
        forgotPassword
      />

      <div className="flex flex-col gap-3 mt-4">
        <button className="w-full h-12 bg-primary hover:bg-primary-dark text-white font-bold rounded-2xl shadow-lg shadow-primary/30 transition-all">
          Iniciar sesión
        </button>
        <button className="w-full h-12 border-2 border-primary text-primary hover:bg-primary/5 font-bold rounded-2xl transition-all">
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
        type="button"
        className="flex w-full items-center justify-center gap-3 h-12 bg-white border border-slate-200 hover:bg-slate-50 text-slate-600 rounded-2xl text-sm font-semibold transition-colors"
      >
        <img
          alt="Google"
          className="w-4 h-4"
          src="https://www.google.com/favicon.ico"
        />
        <span>Cuenta Institucional</span>
      </button>
    </form>

    <div className="bg-slate-50/80 px-10 py-6 text-center border-t border-slate-100">
      <p className="text-sm text-slate-600">
        ¿Eres nuevo?
        <Link
          to="/register"
          className="text-primary font-bold hover:underline ml-1"
        >
          Regístrate aquí
        </Link>
      </p>
    </div>
  </div>
);

export default LoginCard;
