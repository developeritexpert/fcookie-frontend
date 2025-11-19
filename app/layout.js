import "./globals.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import localFont from "next/font/local";
import { Providers } from "./providers";

const sfPro = localFont({
  src: [
    {
      path: "./fonts/SFProDisplay-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "./fonts/SFProDisplay-Medium.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "./fonts/SFProDisplay-Bold.woff2",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-sfpro",
});

export const metadata = {
  title: "Fcookie - Discover Collect Trade",
  description: "A digital marketplace built for the future of collectibles.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning className={sfPro.variable}> 
      <body
        className={` antialiased`}
      >
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
