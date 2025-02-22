"use client";

import { cn } from "@/lib/utils";
import { useForm, useFormContext } from "react-hook-form";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";

type FormInputProps = {
  name: string;
  label: string;
  type: string;
  placeholder: string;
  description?: string;
  className?: string;
  required?: boolean;
};

export default function FormInput({
  name,
  label,
  type,
  placeholder,
  description,
  className,
  required,
}: FormInputProps) {
  const { control, register } = useFormContext();
  return (
    <FormField
      control={control}
      {...register(name)}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <Input
              {...field}
              type={type}
              placeholder={placeholder}
              className={cn("bg-background", className)}
            />
          </FormControl>
          <FormDescription>{description}</FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
