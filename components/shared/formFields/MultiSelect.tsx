import React from "react";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useFormContext } from "react-hook-form";

type Props = {
  name: string;
  label: string;
  required?: boolean;
  description?: string;
};

const MultiSelect = ({ name, label, required = false, description }: Props) => {
  const formMethods = useFormContext();

  return (
    <FormField
      control={formMethods.control}
      name={name}
      render={({ field }) => (
        <FormItem className="font-inter">
          <FormLabel className="paragraph-semibold text-dark400_light800 ">
            {label} {required && <span className="text-red-500">*</span>}
          </FormLabel>
          <FormControl></FormControl>
          {description && (
            <FormDescription className="body-regular text-xs text-light-500">
              {description}
            </FormDescription>
          )}
          <FormMessage className="text-xs text-red-500" />
        </FormItem>
      )}
    />
  );
};

export default MultiSelect;
