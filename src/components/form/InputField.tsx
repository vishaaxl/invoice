import { Field, useField } from "formik";
import React from "react";

interface InputFieldProps {
  name: string;
  placeholder: string;
  gap?: boolean;
  type?: string;
  disabled?: boolean;
}

const InputField: React.FC<InputFieldProps> = ({
  name,
  placeholder,
  gap,
  type,
  disabled,
}) => {
  const [field, meta] = useField(name);
  return (
    <div className={`pb-2 ${gap && "last:ml-4"}`}>
      <label className="text-fontGamma mb-2 inline-block" htmlFor={name}>
        {placeholder}
      </label>

      <Field
        className={`${
          disabled ? "bg-background" : "bg-backgroundLight"
        } w-full rounded-lg p-4 caret-accent ${
          !disabled && "border-animation"
        }`}
        id={name}
        type={type || "text"}
        {...field}
        disabled={disabled}
      />
      {meta.touched && meta.error ? (
        <div className="text-red-600">{meta.error}</div>
      ) : null}
    </div>
  );
};

export default InputField;
