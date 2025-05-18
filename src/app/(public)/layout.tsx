
import type { Metadata } from "next";
import "../globals.css";
import Providers from "../providers";
import { Footer, Header } from "@/widgets";

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
          <div className="w-full min-h-screen">
            <div className="flex flex-col min-h-screen">
              <Header isPublic={true} />
              <main className="flex-1 p-6 overflow-auto flex items-center justify-center">{children}</main>
              <Footer />
            </div>
          </div>
        </Providers>
      </body>
    </html>
  );
}
