import { LucideIcon } from "lucide-react";
import { Input } from "./input";
import { cn } from "../lib/utils";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "./form";
import { RegisterFormData } from "@/entities/auth";
import { Control } from "react-hook-form";

type IconInputProps = {
  icon: LucideIcon;
  placeholder: string;
  type?: string;
  className?: string;
  control: Control<RegisterFormData>;
  name: keyof RegisterFormData;
  label: string;
};

export const IconInput = ({
  icon: Icon,
  placeholder,
  type = "text",
  className,
  name,
  label,
  control,
}: IconInputProps) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <div className="relative">
              <Icon
                className="absolute left-5 transform -translate-1/2 top-1/2 text-gray-400"
                size={18}
              />
              <Input
                type={type}
                className={cn(
                  "pl-10 bg-input text-foreground placeholder-muted-foreground",
                  className,
                )}
                placeholder={placeholder}
                {...field}
              />
            </div>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
