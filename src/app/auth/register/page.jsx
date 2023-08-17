"use client";
import React from "react";
import Button from "@/components/Button/Button";
import { Field } from "@/components/Field/Field";
import { IconClose } from "@/components/Icon/IconClose";
import { IconOpen } from "@/components/Icon/IconOpen";
import { Input } from "@/components/Input/Input";
import { Lable } from "@/components/Label/lable";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-toastify";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, db } from "@/firebase/firebaseConfig";
import { addDoc, collection, getDocs, query, where } from "firebase/firestore";
import { useRouter } from "next/navigation";
import Link from "next/link";

const schema = yup.object({
  fullname: yup.string().required("Please enter your fullname"),
  email: yup
    .string()
    .email("Email is not valid!")
    .required("Please enter your email address")
    .matches(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Please enter valid email address"),
  password: yup
    .string()
    .required("Please enter your password")
    .min(8, "Your password must be at least 8 characters or greater"),
});
const Register = () => {
  const router = useRouter();
  const [toogle, settoogle] = React.useState(false);
  const {
    control,
    handleSubmit,
    formState: { isValid, isSubmitting, errors },
    setFocus,
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(schema),
  });
  React.useEffect(() => {
    setFocus("fullname");
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
  const handlerRegister = async (values, e) => {
    // Kiểm tra xem tên và email đã tồn tại chưa
    const colRef = collection(db, "users");
    const querySnapshot = await getDocs(colRef);
    const existingUsers = querySnapshot.docs.map((doc) => doc.data());
    const isNameTaken = existingUsers.some(
      (user) => user.fullname === values.fullname
    );
    const isEmailTaken = existingUsers.some(
      (user) => user.email === values.email
    );
    if (isNameTaken) {
      toast.error("Name already exists. Please choose another name.");
    } else if (isEmailTaken) {
      toast.error("Email already exists. Please choose another email.");
    } else {
      // Nếu không trùng tên và email, thực hiện đăng ký
      try {
        await createUserWithEmailAndPassword(
          auth,
          values.email,
          values.password
        );
        // Cập nhật thông tin người dùng
        const user = auth.currentUser;
        if (user) {
          await updateProfile(user, {
            displayName: values.fullname,
          });
        }
        // Thêm dữ liệu mới vào Firestore
        await addDoc(colRef, {
          fullname: values.fullname,
          email: values.email,
          password: values.password,
        });
        toast.success("Register Success!!!", {
          delay: 0,
          pauseOnHover: false,
        });
        router.push("/");
      } catch (error) {
        toast.error("An error occurred while registering. Please try again.");
        console.error(error);
      }
    }
  };
  return (
    <>
      <div className="lg:w-[800px] container mx-auto px-10 min-h-screen w-[500px]">
        <h1 className="py-20 text-3xl font-bold text-center title">
          Create your account
        </h1>
        <form onSubmit={handleSubmit(handlerRegister)} autoComplete="off">
          <Field>
            <Lable htmlFor="fullname">FullName</Lable>
            <Input
              placeholder="Enter your fullname"
              type="text"
              name="fullname"
              control={control}
            />
          </Field>
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
            You already have a account?
            <Link href="/auth/login">
              <span className="inline-block font-semibold underline">
                login
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
export default Register;
