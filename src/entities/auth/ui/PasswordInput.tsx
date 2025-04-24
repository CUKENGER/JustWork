import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  Input,
} from "@/shared/ui";
import { EyeOff, Eye, Lock } from "lucide-react";
import { useState } from "react";
import { Control } from "react-hook-form";
import { RegisterFormData } from "../model/schemas";

type PasswordInputProps = {
  control: Control<RegisterFormData>;
  name: keyof RegisterFormData;
  label: string;
  placeholder: string;
};

export const PasswordInput = ({
  control,
  name,
  label,
  placeholder,
}: PasswordInputProps) => {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <div className="relative">
              <Lock
                className="absolute left-5 transform -translate-1/2 top-1/2 text-gray-400"
                size={18}
              />
              <Input
                type={showPassword ? "text" : "password"}
                className={
                  "pl-10 bg-input text-foreground placeholder-muted-foreground"
                }
                placeholder={placeholder}
                {...field}
              />
              <button
                type="button"
                className="absolute right-2 top-1/2 transform -translate-y-1/2 cursor-pointer"
                onClick={() => setShowPassword(!showPassword)}
                aria-label={showPassword ? "Скрыть пароль" : "Показать пароль"}
              >
                {showPassword ? (
                  <EyeOff size={18} className="text-gray-400" />
                ) : (
                  <Eye size={18} className="text-gray-400" />
                )}
              </button>
            </div>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
