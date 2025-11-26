import { Metadata } from "next";
import RegisterPageSection from "@/components/auth/RegisterPageSection";

export default function Register() {
  return <RegisterPageSection />;
}

export const metadata: Metadata = {
  title: "Register | fcookie",
  description: "Create your fcookie account to get started.",
};
