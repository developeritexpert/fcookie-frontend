import { Metadata } from "next";
import LoginPageSection from "@/components/auth/LoginPageSection";

export default function Login() {
  return <LoginPageSection />;
}

export const metadata: Metadata = {
  title: "Login | fcookie",
  description:
    "Access your fcookie dashboard.",
};
