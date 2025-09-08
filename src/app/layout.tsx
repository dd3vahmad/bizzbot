import type { Metadata } from "next";
import "./globals.css";
import { app } from "@/lib/constants";
import { ClerkProvider } from "@clerk/nextjs";

export const metadata: Metadata = {
  title: `${app.name} - ${app.tagline}`,
  description: app.description,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body
          className={`antialiased bg-neutral-800 text-neutral-300`}
        >
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
