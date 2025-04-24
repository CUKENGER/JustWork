import type { Metadata } from "next";
import "./globals.css";
import Providers from "./providers";
import { ResizableLayout } from "@/widgets/resizable-layout/resizable-layout";

export const metadata: Metadata = {
  title: "Just Work",
  description: "Best free & lance platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`antialiased`}>
        <Providers>
          <ResizableLayout>{children}</ResizableLayout>
        </Providers>
      </body>
    </html>
  );
}
