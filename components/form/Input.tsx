import React from "react";
import { Control, FieldValues, useController, UseControllerProps } from "react-hook-form";

type FieldProps = {
  type: string;
  name: any;
  control: any;
  defaultValue?: string;
  placeholder: string;
  className?: string;
};

const Input = ({ type, name = "email", control, placeholder, className }: FieldProps) => {
  const { field } = useController({
    name,
    control,
    defaultValue: "",
  });

  return <input type={type} id={name} {...field} placeholder={placeholder} className={className} />;
};

export default Input;
