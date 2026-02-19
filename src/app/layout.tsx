import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Unbound - Interactive PDF Learning Platform",
  description: "Transform Your Textbooks Into Interactive Learning Experiences",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="font-sans bg-bg-body text-text-primary transition-colors duration-300 antialiased selection:bg-primary/30 selection:text-text-primary">
        {children}
      </body>
    </html>
  );
}
