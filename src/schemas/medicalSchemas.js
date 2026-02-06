import {z} from "zod";

const nameRegex = /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s.]+$/;

export const doctorSchema = z.object({
  name: z
    .string()
    .min(3, "El nombre debe tener al menos 3 caracteres.")
    .regex(nameRegex, "Solo se permiten letras, espacios y puntos."),
  email: z.string().email("Ingresa un correo institucional válido."),
  specialty: z.string().min(1, "Selecciona una especialidad."),
});

export const specialtySchema = z.object({
  name: z.string().min(3, "El nombre debe tener al menos 3 caracteres."),
  description: z.string().optional(),
});
