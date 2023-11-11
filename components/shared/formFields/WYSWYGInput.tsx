import React, { useRef, useState } from "react";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useFormContext } from "react-hook-form";
import { Editor } from "@tinymce/tinymce-react";
import Loader from "../Loader";

type Props = {
  name: string;
  label: string;
  required?: boolean;
  description?: string;
};

const WyswygInput = ({ name, label, required = false, description }: Props) => {
  const [isEditorInit, setIsEditorInit] = useState(false);
  const formMethods = useFormContext();

  const editorRef = useRef(null);

  return (
    <FormField
      control={formMethods.control}
      name={name}
      render={({ field }) => (
        <FormItem className="font-inter">
          <FormLabel className="paragraph-semibold text-dark400_light800 ">
            {label} {required && <span className="text-red-500">*</span>}
          </FormLabel>
          <FormControl>
            <>
              {!isEditorInit && (
                <div className="flex-center h-24">
                  <Loader />
                </div>
              )}
              <Editor
                apiKey={process.env.NEXT_PUBLIC_TINY_EDITOR_KEY}
                onInit={(evt, editor) => {
                  setIsEditorInit(true);
                  // @ts-ignore
                  return (editorRef.current = editor);
                }}
                value={field?.value}
                onEditorChange={(val) => field?.onChange(val)}
                init={{
                  height: 500,
                  menubar: false,
                  plugins: [
                    "advlist",
                    "autolink",
                    "lists",
                    "link",
                    "image",
                    "charmap",
                    "print",
                    "preview",
                    "anchor",
                    "searchreplace",
                    "visualblocks",
                    "codesample",
                    "fullscreen",
                    "insertdatetime",
                    "media",
                  ],
                  toolbar:
                    "undo redo  | " +
                    "codesample | bold italic backcolor forecolor | alignleft aligncenter " +
                    "alignright alignjustify | bullist numlist outdent indent | " +
                    "removeformat",
                  content_style: "body { font-family:Inter; font-size:16px }",
                }}
              />
            </>
          </FormControl>
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

export default WyswygInput;
