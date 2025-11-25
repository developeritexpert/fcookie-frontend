import type { Metadata } from "next";
import "./globals.css";
import ClientComponent from "./ClientComponent";
import ClientLayout from "./ClientLayout";
import AOSWrapper from "@/components/aos/AOSWrapper";

export const metadata: Metadata = {
  title: "My New Project",
  description: "Beautiful eCommerce landing page",
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
