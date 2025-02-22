"use client";

import { Control, FieldValues, useFormContext } from "react-hook-form";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Textarea } from "../ui/textarea";
import { cn } from "@/lib/utils";
type FormInputProps = {
  name: string;
  label: string;
  type: string;
  placeholder: string;
  description?: string;
  inputClassName?: string;
  itemClassName?: string;
};

export default function FormTextarea({
  name,
  label,
  type,
  placeholder,
  description,
  inputClassName,
  itemClassName,
  ...props
}: FormInputProps) {
  const { control, register } = useFormContext();
  return (
    <FormField
      control={control}
      {...register(name)}
      render={({ field }) => (
        <FormItem className={itemClassName}>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <Textarea
              placeholder={placeholder}
              className={cn("resize-none", inputClassName)}
              {...props}
              {...field}
            />
          </FormControl>
          <FormDescription>{description}</FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
