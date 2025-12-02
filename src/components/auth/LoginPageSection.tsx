"use client";

import Image from "next/image";
import Link from "next/link";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { toast } from "sonner";
import axiosWrapper from "@/utils/api";
import { API_URL } from "@/utils/apiUrl";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/components/store/useAuthStore";

// ✅ import your validation schema
import { LoginSchema } from "@/components/schemas/loginSchema";

export default function LoginPageSection() {
  const router = useRouter();
  const setAuth = useAuthStore((state) => state.setAuth);

  const handleSubmit = async (values: any, { setSubmitting }: any) => {
    try {
      const payload = {
        email: values.email,
        password: values.password,
        rememberMe: values.rememberMe,
      };

      const response: any = await axiosWrapper("post", API_URL.LOGIN_USER, payload);

      // CASE 1: Backend sends error response (no exception)
      if (response?.result === "error") {
        toast.error(response?.desc || "Invalid credentials");
        return;
      }

      // Extract success data (covers both API structures)
      const data = response?.data?.user ? response.data : response;

      if (!data?.user) {
        toast.error("Unexpected response from server");
        return;
      }

      const { user, token, expiresIn } = data;

      // Save to Zustand
      setAuth({
        user,
        token,
        expiresIn,
        rememberMe: values.rememberMe,
      });

      toast.success("Login successful!");

      // ⭐ ROLE-BASED REDIRECT
      if (user.role === "ADMIN") {
        router.push("/admin/dashboard");
      } else {
        router.push("/dashboard");
      }

    } catch (error: any) {
      const serverError = error?.response?.data;

      toast.error(
        serverError?.desc ||
        serverError?.message ||
        error?.message ||
        "Something went wrong"
      );
    } finally {
      setSubmitting(false);
    }
  };




  return (
    <>
      <section className="min-h-[calc(100vh-130px)] py-[50px] px-[20px] md:px-[30px] lg:px-[50px] flex items-center justify-center relative">
        <div className="mx-auto max-w-[1000px]">
          <div className="flex md:flex-row flex-col-reverse gap-[50px] items-center pb-[150px]">

            {/* LEFT IMAGE */}
            <div className="basis-[50%]">
              <Image
                src="/img/login-img.png"
                alt="Login"
                height={400}
                width={400}
                className="w-full"
              />
            </div>

            {/* RIGHT FORM */}
            <div className="basis-[50%]">
              <Formik
                initialValues={{ email: "", password: "", rememberMe: false }}
                validationSchema={LoginSchema}  
                onSubmit={handleSubmit}
              >
                {({ isSubmitting }: { isSubmitting: boolean })  => (
                  <Form>
                    <h1 className="font-semibold text-[30px] md:text-[40px] lg:text-[50px] leading-[1.2]">
                      Welcome back!
                    </h1>
                    <p className="mb-[20px]">
                      Sign in to access your collection, track your portfolio, and explore new drops.
                    </p>

                    {/* EMAIL */}
                    <div className="mb-[15px]">
                      <Field
                        name="email"
                        type="email"
                        placeholder="Email"
                        className="w-full text-sm border border-[#FFFFFF1C] bg-[#FFFFFF0A] rounded-[7px] py-[15px] px-[15px]
                        focus-visible:outline-none focus-visible:border focus-visible:border-[#ffffff80] duration-300"
                      />
                      <ErrorMessage
                        name="email"
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
                        className="w-full text-sm border border-[#FFFFFF1C] bg-[#FFFFFF0A] rounded-[7px] py-[15px] px-[15px]
                        focus-visible:outline-none focus-visible:border focus-visible:border-[#ffffff80] duration-300"
                      />
                      <ErrorMessage
                        name="password"
                        component="div"
                        className="text-red-500 text-xs mt-1"
                      />
                    </div>

                    {/* REMEMBER ME */}
                    <div className="flex justify-between items-center mb-[20px] text-sm">
                      <label className="flex items-center gap-[5px] relative cursor-pointer">
                        <Field type="checkbox" name="rememberMe" className="peer hidden" />

                        <div
                          className="h-4 w-4 border border-[#FFFFFF1C] duration-300 
                          peer-checked:border-[#FFFFFF80] rounded-[5px] flex items-center justify-center transition"
                        ></div>

                        <svg
                          className="hidden peer-checked:block w-3 h-3 text-white absolute left-0.5"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="3"
                          viewBox="0 0 24 24"
                        >
                          <path d="M5 13l4 4L19 7" />
                        </svg>

                        Remember me
                      </label>
                      <p className="cursor-pointer">Forgot Password?</p>
                    </div>

                    {/* LOGIN BUTTON */}
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="bg-gradient-to-b from-[#75DA5B] to-[#4DCE94] w-full cursor-pointer py-[15px] text-[#000]
                      mb-[10px] font-semibold px-[30px] rounded-[7px]"
                    >
                      {isSubmitting ? "Logging in..." : "Login"}
                    </button>

                    {/* REGISTER */}
                    <p className="text-center text-sm">
                      Don’t have an account?{" "}
                      <Link href="/register" className="font-semibold">Create one</Link>
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

        {/* GLOW BG */}
        <div className="absolute top-[-50%] bottom-[30%] right-0 left-0 rounded-[50%] z-[-1] bg-[#EFB24D] opacity-[0.30] blur-[754px] pointer-events-none"></div>
      </section>
    </>
  );
}
