"use client";

import Image from "next/image";
import Link from "next/link";
import { Formik, Form, Field, ErrorMessage } from "formik";
import axiosWrapper from "@/utils/api";
import { API_URL } from "@/utils/apiUrl";
import { toast } from "sonner";    // ✅ correct import

import { useRouter } from "next/navigation";

// ⭐ IMPORT REUSABLE FILES
import {
  registerInitialValues,
  registerValidationSchema,
} from "@/components/schemas/registerSchema";

export default function RegisterPageSection() {
  const router = useRouter();

const handleSubmit = async (values: any, { setSubmitting, setErrors, resetForm }: any) => {
  try {
    const response: any = await axiosWrapper(
      "post",
      API_URL.REGISTER_USER,
      {
        name: values.fullName,
        email: values.email,
        phone: values.phone,
        password: values.password,
      }
    );

    console.log("REGISTER API RESPONSE:", response);

    // ❗ Case 2: Backend error but not thrown
    if (response?.error) {
      toast.error(response.message || "Something went wrong");
      return;
    }

    // 🎉 SUCCESS
    toast.success("Registration successful!");
    resetForm();
    router.push("/login");

  } catch (error: any) {
    // ❗ Error thrown by axios wrapper
    console.log("REGISTER ERROR:", error);

    if (error?.validation?.body) {
      const keyErrors: any = {};
      error.validation.body.keys.forEach((field: string) => {
        keyErrors[field] = error.validation.body.message;
      });
      console.log(keyErrors);
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
  <section className="min-h-[calc(100vh-130px)] py-[50px] px-[20px] md:px-[30px] lg:px-[50px] flex items-center justify-center relative bg-black">

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
              {({ isSubmitting, errors, touched }) => (
                <Form>
                  <h1 className="font-semibold text-[30px] md:text-[40px] lg:text-[50px] leading-[1.2]">
                    Register
                  </h1>
                  <p className="mb-[20px]">
                    Sign up to access your collection, track your portfolio, and
                    explore new drops.
                  </p>

                  {/* FULL NAME */}
                  <div className="mb-[15px]">
                    <Field
                      name="fullName"
                      type="text"
                      placeholder="Full Name"
                      className={`w-full text-sm border bg-[#FFFFFF0A] rounded-[7px] py-[15px] px-[15px] 
                        focus-visible:outline-none 
                        ${
                          errors.fullName && touched.fullName
                            ? "border-red-500"
                            : "border-[#FFFFFF1C]"
                        }`}
                    />
                    <ErrorMessage
                      name="fullName"
                      component="div"
                      className="text-red-500 text-xs mt-1"
                    />
                  </div>

                  {/* EMAIL */}
                  <div className="mb-[15px]">
                    <Field
                      name="email"
                      type="email"
                      placeholder="Email"
                      className={`w-full text-sm border bg-[#FFFFFF0A] rounded-[7px] py-[15px] px-[15px] 
                        focus-visible:outline-none 
                        ${
                          errors.email && touched.email
                            ? "border-red-500"
                            : "border-[#FFFFFF1C]"
                        }`}
                    />
                    <ErrorMessage
                      name="email"
                      component="div"
                      className="text-red-500 text-xs mt-1"
                    />
                  </div>

                  {/* PHONE */}
                  <div className="mb-[15px]">
                    <Field
                      name="phone"
                      type="tel"
                      placeholder="Phone No."
                      className={`w-full text-sm border bg-[#FFFFFF0A] rounded-[7px] py-[15px] px-[15px] 
                        focus-visible:outline-none 
                        ${
                          errors.phone && touched.phone
                            ? "border-red-500"
                            : "border-[#FFFFFF1C]"
                        }`}
                    />
                    <ErrorMessage
                      name="phone"
                      component="div"
                      className="text-red-500 text-xs mt-1"
                    />
                  </div>

                  {/* PASSWORD */}
                  <div className="mb-[15px]">
                    <Field
                      name="password"
                      type="password"
                      placeholder="Password"
                      className={`w-full text-sm border bg-[#FFFFFF0A] rounded-[7px] py-[15px] px-[15px] 
                        focus-visible:outline-none 
                        ${
                          errors.password && touched.password
                            ? "border-red-500"
                            : "border-[#FFFFFF1C]"
                        }`}
                    />
                    <ErrorMessage
                      name="password"
                      component="div"
                      className="text-red-500 text-xs mt-1"
                    />
                  </div>

                  {/* TERMS */}
                  <div className="flex items-center gap-[10px] mb-[20px]">
                    <Field
                      type="checkbox"
                      name="terms"
                      className="w-[18px] h-[18px] cursor-pointer"
                    />
                    <p className="text-xs">
                      I agree to the{" "}
                      <span className="underline cursor-pointer">
                        terms and conditions
                      </span>
                    </p>
                  </div>
                  <ErrorMessage
                    name="terms"
                    component="div"
                    className="text-red-500 text-xs mt-1"
                  />

                  {/* SUBMIT BUTTON */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-[15px] bg-white text-black rounded-md font-bold hover:bg-[#FFFFFFCC] transition"
                  >
                    {isSubmitting ? "Registering..." : "Register"}
                  </button>

                  <p className="text-xs mt-3 text-center">
                    Already have an account?{" "}
                    <Link href="/login" className="underline">
                      Sign In
                    </Link>
                  </p>
                </Form>
              )}
            </Formik>

          </div>
        </div>
      </div>
    </section>
  );
}
