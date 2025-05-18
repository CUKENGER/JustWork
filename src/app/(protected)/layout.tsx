import type { Metadata } from "next";
import "../globals.css";
import { ResizableLayout } from "@/widgets/resizable-layout/resizable-layout";
import Providers from "../providers";

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
