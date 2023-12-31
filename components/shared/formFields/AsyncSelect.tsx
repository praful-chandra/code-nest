import React, { useEffect, useState } from "react";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useFormContext } from "react-hook-form";
import AsyncSelect from "react-select/async";
import { DropdownOption } from "@/types";

type Props = {
  name: string;
  label: string;
  required?: boolean;
  placeholder?: string;
  description?: string;
  isOptionsLoading?: boolean;
  isMulti?: boolean;
  onInputChange: (
    inputVal: string,
    callback: (options: DropdownOption[]) => void
  ) => Promise<DropdownOption[]>;
  noOptionComp?:
    | ((obj: { inputValue: string }) => React.ReactNode | string)
    | undefined;
};

const MultiSelect = ({
  name,
  label,
  required = false,
  description,
  placeholder,
  isOptionsLoading = false,
  isMulti = false,
  onInputChange,
  noOptionComp,
}: Props) => {
  const formMethods = useFormContext();
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => setIsMounted(true), []);

  return (
    <FormField
      control={formMethods.control}
      name={name}
      render={({ field }) =>
        isMounted ? (
          <FormItem className="font-inter">
            <FormLabel className="paragraph-semibold text-dark400_light800">
              {label} {required && <span className="text-red-500">*</span>}
            </FormLabel>
            <FormControl>
              {/* <Input
            className="background-light800_dark300 text-dark300_light800 paragraph-regular border-light-800 p-4 dark:border-dark-400"
            onChange={onInputChange}
          /> */}

              <AsyncSelect
                isMulti={isMulti}
                cacheOptions
                loadOptions={onInputChange}
                placeholder={placeholder}
                value={field.value}
                onChange={field.onChange}
                isLoading={isOptionsLoading}
                noOptionsMessage={noOptionComp}
                id={`AsyncSelect ${name}`}
                className="my-react-select-container"
                classNamePrefix="my-react-select"
              />
            </FormControl>
            {description && (
              <FormDescription className="body-regular text-xs text-light-500">
                {description}
              </FormDescription>
            )}
            <FormMessage className="text-xs text-red-500" />
          </FormItem>
        ) : (
          <></>
        )
      }
    />
  );
};

export default MultiSelect;
