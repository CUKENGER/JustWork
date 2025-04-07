import { ThemeProvider } from "@/shared/lib/theme-provider";
import { SidebarProvider } from "@/shared/ui/sidebar";
import { ReactNode } from "react";

export default function Providers({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider>
      <SidebarProvider>{children}</SidebarProvider>
    </ThemeProvider>
  );
}
