import { Briefcase, LucideIcon } from "lucide-react";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/ui";
import { Control } from "react-hook-form";
import { RegisterFormData } from "@/entities/auth";

type SelectInputProps = {
  control: Control<RegisterFormData>;
  name: keyof RegisterFormData;
  label: string;
  placeholder: string;
  icon: LucideIcon;
  options: { value: string; label: string }[];
};

export const SelectInput = ({
  control,
  name,
  label,
  placeholder,
  icon: Icon = Briefcase,
  options,
}: SelectInputProps) => (
  <FormField
    control={control}
    name={name}
    render={({ field }) => (
      <FormItem>
        <FormLabel>{label}</FormLabel>
        <FormControl>
          <div className={"relative"}>
            <Icon
              className={
                "absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              }
              size={18}
            />
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <SelectTrigger className="pl-10 w-full">
                <SelectValue placeholder={placeholder} />
              </SelectTrigger>
              <SelectContent>
                {options.map(({ value, label }) => (
                  <SelectItem key={value} value={value}>
                    {label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </FormControl>
        <FormMessage />
      </FormItem>
    )}
  />
);
