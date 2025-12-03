"use client";

import Image from "next/image";
import Link from "next/link";
import { Formik, Form, Field, ErrorMessage } from "formik";
import axiosWrapper from "@/utils/api";
import { API_URL } from "@/utils/apiUrl";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

import {
  registerInitialValues,
  registerValidationSchema,
} from "@/components/schemas/registerSchema";

export default function RegisterPageSection() {
  const router = useRouter();

  const handleSubmit = async (values: any, { setSubmitting, setErrors, resetForm }: any) => {
    try {
      const response: any = await axiosWrapper("post", API_URL.REGISTER_USER, {
        name: values.fullName,
        email: values.email,
        phoneNumber: values.phone,
        password: values.password,
      });

      if (response?.error) {
        toast.error(response.message || "Something went wrong");
        return;
      }

      toast.success("Registration successful!");
      resetForm();
      router.push("/login");

    } catch (error: any) {
      if (error?.validation?.body) {
        const keyErrors: any = {};
        error.validation.body.keys.forEach((field: string) => {
          keyErrors[field] = error.validation.body.message;
        });
        setErrors(keyErrors);
        toast.error(error.validation.body.message);
        return;
      }

      toast.error(error?.message || "Something went wrong");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="min-h-[calc(100vh-130px)] py-[50px] px-[20px] md:px-[30px] lg:px-[50px] flex items-center justify-center relative">
      <div className="mx-auto max-w-[1000px]">
        <div className="flex md:flex-row flex-col-reverse gap-[50px] items-center pb-[150px]">

          {/* LEFT IMAGE */}
          <div className="basis-[50%]">
            <Image
              src="/img/login-img.png"
              alt="Register"
              height={400}
              width={400}
              className="w-full"
            />
          </div>

          {/* RIGHT FORM */}
          <div className="basis-[50%]">
            <Formik
              initialValues={registerInitialValues}
              validationSchema={registerValidationSchema}
              onSubmit={handleSubmit}
            >
              {({ isSubmitting }) => (
                <Form>
                  <h1 className="font-semibold text-[30px] md:text-[40px] lg:text-[50px] leading-[1.2]">
                    Register
                  </h1>
                  <p className="mb-[20px]">
                    Sign up to access your collection, track your portfolio, and explore new drops.
                  </p>

                  {/* FULL NAME */}
                  <div className="mb-[15px]">
                    <Field
                      name="fullName"
                      type="text"
                      placeholder="Full Name"
                      className="w-full text-sm border border-[#E6E6E6] dark:border-[#FFFFFF1C] bg-[#FFFFFF0A] rounded-[7px] py-[15px] px-[15px] focus-visible:outline-none focus-visible:border-[#ffffff80] duration-300"
                    />
                    <ErrorMessage name="fullName" component="div" className="text-red-500 text-xs mt-1" />
                  </div>

                  {/* EMAIL */}
                  <div className="mb-[15px]">
                    <Field
                      name="email"
                      type="email"
                      placeholder="Email"
                      className="w-full text-sm border  border-[#E6E6E6] dark:border-[#FFFFFF1C] bg-[#FFFFFF0A] rounded-[7px] py-[15px] px-[15px] focus-visible:outline-none focus-visible:border-[#ffffff80] duration-300"
                    />
                    <ErrorMessage name="email" component="div" className="text-red-500 text-xs mt-1" />
                  </div>

                  {/* PHONE */}
                  <div className="mb-[15px]">
                    <Field
                      name="phone"
                      type="tel"
                      placeholder="Phone No."
                      className="w-full text-sm border border-[#E6E6E6] dark:border-[#FFFFFF1C] bg-[#FFFFFF0A] rounded-[7px] py-[15px] px-[15px] focus-visible:outline-none focus-visible:border-[#ffffff80] duration-300"
                    />
                    <ErrorMessage name="phone" component="div" className="text-red-500 text-xs mt-1" />
                  </div>

                  {/* PASSWORD */}
                  <div className="mb-[15px]">
                    <Field
                      name="password"
                      type="password"
                      placeholder="Password"
                      className="w-full text-sm border border-[#E6E6E6] dark:border-[#FFFFFF1C] bg-[#FFFFFF0A] rounded-[7px] py-[15px] px-[15px] focus-visible:outline-none focus-visible:border-[#ffffff80] duration-300"
                    />
                    <ErrorMessage name="password" component="div" className="text-red-500 text-xs mt-1" />
                  </div>
                  

                  {/* TERMS CHECKBOX */}
                  <div className="flex flex-col gap-1 mb-[20px] text-sm">
                    <label className="flex items-center gap-[5px] relative cursor-pointer">
                      <Field type="checkbox" name="terms" className="peer hidden" />
                      <div className="h-4 w-4 border border-[#E6E6E6] dark:border-[#FFFFFF1C] peer-checked:border-[#000] dark:peer-checked:border-[#FFFFFF80] rounded-[5px] flex items-center justify-center transition"></div>
                      <svg
                        className="hidden peer-checked:block w-3 h-3  text-black dark:text-white absolute left-0.5"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="3"
                        viewBox="0 0 24 24"
                      >
                        <path d="M5 13l4 4L19 7" />
                      </svg>
                      Remember me
                    </label>

                    {/* ERROR MESSAGE */}
                    <ErrorMessage
                      name="terms"
                      component="div"
                      className="text-red-500 text-xs"
                    />
                  </div>


                  {/* SUBMIT BUTTON */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="bg-gradient-to-b from-[#75DA5B] to-[#4DCE94] cursor-pointer w-full py-[15px] text-[#000] mb-[10px] font-semibold px-[30px] rounded-[7px]"
                  >
                    {isSubmitting ? "Registering..." : "Register"}
                  </button>

                  <p className="text-center text-sm">
                    Already have an account?{" "}
                    <Link href="/login" className="font-semibold">
                      Login
                    </Link>
                  </p>
                </Form>
              )}
            </Formik>
          </div>
        </div>

        {/* FOOTER */}
        <div className="border-t border-[#FFFFFF24] py-[30px] absolute bottom-0 right-0 left-0 max-w-[1000px] mx-auto">
          <p className="text-center">© 2025 Fcookie. All Rights Reserved</p>
        </div>
      </div>

      {/* BACKGROUND GLOW */}
      <div className="absolute top-[-50%] bottom-[30%] right-0 left-0 rounded-[50%] z-[-1] bg-[#EFB24D] opacity-[0.30] blur-[754px] pointer-events-none"></div>
    </section>
  );
}
