import { z } from "zod";

export const userSignupSchema = z.object({
  firstName: z
    .string({ required_error: "Nombre es requerido" })
    .min(3, { message: "Longitud mínima 3." }),
  lastName: z
    .string({ required_error: "Apellido es requerido" })
    .min(3, { message: "Longitud mínima 3" }),
  email: z
    .string({ required_error: "Email es requerido" })
    .email({ message: "No tiene el formato yyy@email.com" }),
  password: z
    .string({ required_error: "Contraseña es requerida" })
    .min(8, { message: "Mínimo 8 caracteres" }),
});

export type userSignupForm = z.infer<typeof userSignupSchema>;

export const userLoginSchema = z.object({
  email: z
    .string({ required_error: "Email es requerido" })
    .email({ message: "No tiene el formato xyz@gmail.com" }),
  password: z
    .string({ required_error: "Password es requerida." })
    .min(1, { message: "La contraseña debe tener 8 carácteres mínimo." }),
});

export type userLoginForm = z.infer<typeof userLoginSchema>;
