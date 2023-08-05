"use client";

import Field from "@/components/form/Field";
import Input from "@/components/form/Input";
import Label from "@/components/form/Label";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { auth, db } from "@/firebaseConfig/firebaseConfig";
import { addDoc, collection } from "firebase/firestore";
import { useRouter } from "next/navigation";

const schema = yup.object({
  email: yup.string().email("Please enter valid email").required("Please enter your email"),
  password: yup
    .string()
    .min(8, "Your password must be at least 8 charators or greater")
    .required("Please enter your password"),
});

const SignIn = () => {
  const router = useRouter();

  const {
    control,
    handleSubmit,
    watch,
    formState: { errors, isValid, isSubmitting },
  } = useForm({ mode: "onChange", resolver: yupResolver(schema) });

  const handleSignUp = async (values: any) => {
    try {
      await signInWithEmailAndPassword(auth, values.email, values.password);
    } catch (error) {
      alert("No account");
    }

    router.refresh();
    void router.push("/");
  };

  return (
    <div className="flex flex-col items-center justify-center mt-14 gap-y-16">
      <h1 className="text-3xl font-bold text-black">Sign In</h1>
      <form onSubmit={handleSubmit(handleSignUp)}>
        <Field>
          <Label htmlFor="email">Email</Label>
          <Input
            name="email"
            type="text"
            placeholder="Enter your fullname"
            control={control}
            className="p-4 w-[512px] border border-gray-500 rounded-2xl"
          />
          {errors.email && <p className="text-sm text-red-400">{errors.email.message}</p>}
        </Field>
        <Field>
          <Label htmlFor="password">Password</Label>
          <Input
            name="password"
            type="password"
            placeholder="Enter your password"
            control={control}
            className="p-4 w-[512px] border border-gray-500 rounded-2xl"
          />
          {errors.password && <p className="text-sm text-red-400">{errors.password.message}</p>}
        </Field>
        <button
          type="submit"
          className="px-6 py-2 rounded-xl text-white bg-black ml-[50%] -translate-x-2/4"
          disabled={isSubmitting}
        >
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default SignIn;
