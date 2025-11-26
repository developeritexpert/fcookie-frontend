"use client";

import { usePathname } from "next/navigation";
import Header from "../components/layout/Header";
import Footer from "@/components/layout/Footer";

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // If you want to hide header/footer on specific pages later
  const pathname = usePathname();
  
  // Pages where you DON'T want header/footer (login, admin, etc.)
  const excludedPaths = [
    "/admin",
  ];

  const hideLayout = excludedPaths.some((path) =>
    pathname.startsWith(path)
  );

  return (
    <>
      {!hideLayout && <Header />}
      {children}
      {!hideLayout && <Footer />}
    </>
  );
}
