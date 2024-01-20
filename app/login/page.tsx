"use client";

import React from "react";
import Button from "../components/Button";
import TextInput from "../components/TextInput";
import { useFormik } from "formik";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../services/firebase";
import { useRouter } from "next/navigation";
import * as Yup from "yup";
import toast from "react-hot-toast";
const Login = () => {
  const router = useRouter();

  const logInWithEmailAndPassword = async (
    email: string,
    password: string,
    setSubmitting: any
  ) => {
    try {
      const { user }: { user: any } = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      setSubmitting(false);
      localStorage.setItem("email", user.email);

      router.push("/dashboard");
    } catch (err: any) {
      toast.error(err?.message);
      setSubmitting(false);
    }
  };

  const form = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    onSubmit: (values, { setSubmitting }) => {
      logInWithEmailAndPassword(
        values.username,
        values.password,
        setSubmitting
      );
    },
    validationSchema: Yup.object().shape({
      username: Yup.string()
        .email("Invalid email")
        .required("Email is required"),
      password: Yup.string().required("Password is required"),
    }),
  });

  return (
    <div className="flex justify-center h-screen w-screen bg-white  sm:items-center">
      <div className="h-[65%]  mt-10 bg-gray-100 px-3 py-14 sm:px-10 container flex justify-center items-center flex-col">
        <TextInput
          form={form}
          required={true}
          type="text"
          id="username"
          title="Enter User Name"
        />
        <TextInput
          form={form}
          required={true}
          type="password"
          id="password"
          title="Enter Password"
        />

        <Button
          disabled={!form.dirty || !form.isValid || form.isSubmitting}
          type="active"
          handleClick={() => form.handleSubmit()}
          loading={form.isSubmitting}
          title="Login"
        />
      </div>
    </div>
  );
};

export default Login;
