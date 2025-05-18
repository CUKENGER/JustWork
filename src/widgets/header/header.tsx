// src/widgets/header/header.tsx
"use client";

import { useTheme } from "@/shared/lib/theme-provider";
import { Button } from "@/shared/ui/button";
import { Moon, Sun } from "lucide-react";
import Link from "next/link";

interface PropTypes {
	handleOpen: () => void
}

export const Header = ({handleOpen}: PropTypes) => {
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

          <div className="lg:hidden" onClick={handleOpen}>
            <Button>Menu</Button>
          </div>
        </div>
      </div>
    </header>
  );
};
