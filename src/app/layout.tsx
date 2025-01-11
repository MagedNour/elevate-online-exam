import type { Metadata } from "next";
import "@fortawesome/fontawesome-free/css/all.min.css"
import "./globals.css";
import AuthProvider from "@/context/AuthProvider";


export const metadata: Metadata = {
  title: "Elevate Online Exam",
  description: "Elevate Online Exam",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          {children}
        </AuthProvider>

      </body>
    </html>
  );
}
