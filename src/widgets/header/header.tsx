// src/widgets/header/header.tsx
"use client";

import { useTheme } from "@/shared/lib/theme-provider";
import { Button } from "@/shared/ui/button";
import { Sheet, SheetTrigger, SheetContent } from "@/shared/ui/sheet";
import { Menu, Moon, Sun } from "lucide-react";
import Link from "next/link";
import { MySidebar } from "../my-sidebar/my-sidebar";

export default function Header() {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="border-b border-border sticky top-0 px-6 py-4 bg-background">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link href="/" className="text-xl font-bold text-foreground">
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
                <Button variant="outline" size="icon" className="rounded-full cursor-pointer">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Открыть меню</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="p-0">
                <MySidebar/>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
