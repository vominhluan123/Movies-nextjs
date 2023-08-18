"use client";
import Button from "@/components/Button/Button";
import { Field } from "@/components/Field/Field";
import { IconClose } from "@/components/Icon/IconClose";
import { IconOpen } from "@/components/Icon/IconOpen";
import { Input } from "@/components/Input/Input";
import { Lable } from "@/components/Label/lable";
import { useRouter } from "next/navigation";
import React from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-toastify";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/firebase/firebaseConfig";
import Link from "next/link";

const schema = yup.object({
  email: yup
    .string()
    .email()
    .required("Please enter your email address")
    .matches(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Please enter valid email address"),
  password: yup.string().required("Please enter your password"),
});
const Login = () => {
  const router = useRouter();
  const [toogle, settoogle] = React.useState(false);
  const {
    handleSubmit,
    control,
    setFocus,
    formState: { isSubmitting, isValid, errors },
  } = useForm({
    resolver: yupResolver(schema),
    mode: "onChange",
  });
  React.useEffect(() => {
    setFocus("email");
  }, [setFocus]);
  React.useEffect(() => {
    const arrErrors = Object.values(errors);
    if (arrErrors.length > 0) {
      toast.error(arrErrors[0]?.message, {
        pauseOnHover: false,
        delay: 0,
      });
    }
  }, [errors]);
  const handlerLogin = async (values) => {
    if (!isValid) return;
    try {
      await signInWithEmailAndPassword(auth, values.email, values.password);
      toast.success("Login Success!!!", {
        delay: 0,
        pauseOnHover: false,
      });
      router.push("/");
    } catch (error) {
      toast.error("Wrong password or email", {
        delay: 0,
        pauseOnHover: false,
      });
    }
  };

  return (
    <>
      <div className="container min-h-screen px-10">
        <h1 className="py-20 text-3xl font-bold text-center title">Login</h1>
        <form
          onSubmit={handleSubmit(handlerLogin)}
          autoComplete="off"
          className="w-[300px] mx-auto md:w-[500px]"
        >
          <Field>
            <Lable htmlFor="email">Email</Lable>
            <Input
              placeholder="Enter your email address"
              type="email"
              name="email"
              control={control}
            />
          </Field>
          <Field>
            <Lable htmlFor="password">Password</Lable>
            <Input
              placeholder="Enter your password"
              type={toogle ? "text" : "password"}
              name="password"
              control={control}
            >
              {!toogle ? (
                <IconClose onClick={() => settoogle(true)}></IconClose>
              ) : (
                <IconOpen onClick={() => settoogle(false)}></IconOpen>
              )}
            </Input>
          </Field>
          <div className="mb-5">
            You have not had an account?
            <Link href="/auth/register">
              <span className="inline-block font-semibold underline">
                register
              </span>
            </Link>
          </div>
          <Button
            type="submit"
            isloading={isSubmitting}
            disabled={isSubmitting}
            className="max-w-[350px] w-full mx-auto block"
          >
            Continue
          </Button>
        </form>
      </div>
    </>
  );
};

export default Login;
