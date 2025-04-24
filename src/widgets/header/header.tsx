// src/widgets/header/header.tsx
"use client";

import { useTheme } from "@/shared/lib/theme-provider";
import { Button } from "@/shared/ui/button";
import { Sheet, SheetTrigger, SheetContent, SheetHeader, SheetDescription, SheetTitle } from "@/shared/ui/sheet";
import { Menu, Moon, Sun } from "lucide-react";
import Link from "next/link";
import { MySidebar } from "../my-sidebar/my-sidebar";

export const Header = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="border-b border-border sticky top-0 px-6 py-4 bg-background">
      <div className="max-w-7xl mx-auto flex items-center justify-between lg:justify-end">
        <Link href="/" className="text-xl font-bold text-foreground lg:hidden">
          JustWork
        </Link>

        <div className="flex items-center space-x-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            className="rounded-full cursor-pointer"
          >
            {theme === "light" ? (
              <Moon className="h-5 w-5" />
            ) : (
              <Sun className="h-5 w-5" />
            )}
            <span className="sr-only">Переключить тему</span>
          </Button>

          <div className="lg:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button
                  variant="outline"
                  size="icon"
                  className="rounded-full cursor-pointer"
                >
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Открыть меню</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="p-0 w-[18rem]">
                <SheetHeader className="sr-only">
                  <SheetTitle>Sidebar</SheetTitle>
                  <SheetDescription>
                    Displays the mobile sidebar.
                  </SheetDescription>
                </SheetHeader>
                <MySidebar isCollapsed={false} />
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
