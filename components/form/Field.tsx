import React from "react";

type Props = {
  children: React.ReactNode;
};

const Field = ({ children }: Props) => {
  return <div className="flex flex-col gap-y-3 mb-3">{children}</div>;
};

export default Field;
