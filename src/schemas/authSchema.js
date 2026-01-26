import {z} from "zod";

export const registerSchema = z
  .object({
    fullname: z
      .string()
      .min(3, "El nombre debe tener al menos 3 caracteres")
      .regex(
        /^[a-zA-ZÀ-ÿ\s]+$/,
        "El nombre no puede contener números ni símbolos",
      ),
    email: z.string().email("Correo electrónico inválido"),
    password: z
      .string()
      .min(6, "La contraseña debe tener al menos 6 caracteres"),
    confirm_password: z.string(),
  })
  .refine((data) => data.password === data.confirm_password, {
    message: "Las contraseñas no coinciden",
    path: ["confirm_password"],
  });

export const loginSchema = z.object({
  email: z
    .string()
    .min(1, "El correo es obligatorio")
    .email("Correo electrónico inválido"),
  password: z.string().min(1, "La contraseña es obligatoria"),
});
