import { Sidebar } from "@/shared/ui/sidebar";
import { ReactNode } from "react";

export const Main = ({ children }: { children: ReactNode }) => {
  return (
    <main className="flex ml-10">
      <div className="hidden lg:block flex-shrink-0">
        <Sidebar />
      </div>
      <div className="flex-1 mx-auto">{children}</div>
    </main>
  );
};
