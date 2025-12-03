import type { Metadata } from "next";
import "./globals.css";
import ClientComponent from "./ClientComponent";
import ClientLayout from "./ClientLayout";
import AOSWrapper from "@/components/aos/AOSWrapper";
import { Toaster } from "sonner"; 

export const metadata: Metadata = {
  title: "FCookie",
  description: "App",
  icons: {
    icon: "/favicon.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        {/* 🌟 GLOBAL TOASTER FOR THEME */}
        <Toaster
          position="top-right"
          theme="light"
          richColors
          closeButton
      
          toastOptions={{
            style: {
              background: "#000",
              color: "#fff",
              border: "1px solid #FACC15",
              padding: "12px 14px",
              borderRadius: "8px",
              fontSize: "14px",
            },
            // keep short duration for fast feedback, change if you want longer
            duration: 3500,
          }}
        />


        <ClientComponent>
          <ClientLayout>
            <AOSWrapper/>
            {children}
          </ClientLayout>
        </ClientComponent>
      </body>
    </html>
  );
}
