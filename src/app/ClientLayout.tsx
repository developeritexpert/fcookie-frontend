"use client";

import { usePathname } from "next/navigation";
import Header from "../components/layout/Header";
import Footer from "@/components/layout/Footer";

const publicPaths = ["/"];

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const showHeaderFooter = publicPaths.includes(pathname);

  return (
    <>
      {showHeaderFooter && <Header />}
      {children}
      {showHeaderFooter && <Footer />}
    </>
  );
}
