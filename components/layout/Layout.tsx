"use client";

import { AuthProvider } from "@/context/authContext";
import React from "react";
import Navbar from "../navbar/Navbar";

type Props = {
  children: React.ReactNode;
};

const Layout = ({ children }: Props) => {
  return (
    <>
      <AuthProvider>
        <Navbar />
        {children}
      </AuthProvider>
    </>
  );
};

export default Layout;
