import StatusAlert from "./StatusAlert";

export default {
  title: "UI/StatusAlert",
  component: StatusAlert,
};

export const ErrorDePrueba = {
  args: {
    type: "error",
    message: "Error: La clave es incorrecta (Prueba UCE)",
  },
};

export const ExitoDePrueba = {
  args: {
    type: "success",
    message: "¡Cita guardada correctamente!",
  },
};
