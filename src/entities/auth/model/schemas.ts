import { z } from "zod";

const baseSchema = z.object({
  name: z.string().min(2, "Имя должно быть минимум 2 символа"),
  email: z.string().email("Неверный email"),
});
const passwordSchema = z.object({
  password: z.string().min(6, "Пароль должен быть минимум 6 символов"),
  confirmPassword: z.string().min(6, "Подтвердите пароль"),
});
export const registerSchema = baseSchema
  .merge(passwordSchema)
  .merge(z.object({ role: z.enum(["FREELANCER", "EMPLOYER"]) }))
  .refine((data) => data.password === data.confirmPassword, {
    message: "Пароли не совпадают",
    path: ["confirmPassword"],
  });

export type RegisterFormData = z.infer<typeof registerSchema>;
