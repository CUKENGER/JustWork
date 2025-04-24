'use client'
import { ThemeProvider } from "@/shared/lib/theme-provider";
import { SidebarProvider } from "@/shared/ui/sidebar";
import { SessionProvider } from "next-auth/react";
import { ReactNode } from "react";

export default function Providers({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider>
      <SessionProvider>
        <SidebarProvider>{children}</SidebarProvider>
      </SessionProvider>
    </ThemeProvider>
  );
}
