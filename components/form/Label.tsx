import React from "react";

type Props = {
  htmlFor?: string;
  children: React.ReactNode;
};

const Label = ({ htmlFor, children }: Props) => {
  return (
    <label htmlFor={htmlFor} className="text-base font-bold cursor-pointer">
      {children}
    </label>
  );
};

export default Label;
