import {
  RegisterFormData,
  registerSchema,
  RegisterApiResponse,
} from "@/entities/auth";
import { API_ROUTES, ERROR_MESSAGES } from "@/shared/model";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";

/**
 * Хук для управления формой регистрации
 * @returns Объект с функцией регистрации, состоянием загрузки, ошибкой и формой
 */
export const useRegister = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const form = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      role: "FREELANCER",
    },
  });

  const register = async (data: RegisterFormData) => {
    try {
      setIsLoading(true);
      setError(null);
      const res = await fetch(API_ROUTES.REGISTER, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const result: RegisterApiResponse = await res.json();
      if (!res.ok)
        throw new Error(result.error || ERROR_MESSAGES.REGISTRATION_FAILED);

      const signInRes = await signIn("credentials", {
        redirect: false,
        email: data.email,
        password: data.password,
      });
      if (signInRes?.ok) router.push("/dashboard");
      else throw new Error(ERROR_MESSAGES.LOGIN_FAILED);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Неизвестная ошибка");
    } finally {
      setIsLoading(false);
    }
  };

  return { register: form.handleSubmit(register), isLoading, error, form };
};
