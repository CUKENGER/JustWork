import { cn } from "@/shared/lib/utils";
import { Sidebar } from "@/shared/ui/sidebar";
import {
  Briefcase,
  Home,
  LogIn,
  MessageSquare,
  RegexIcon,
  Settings,
  User,
} from "lucide-react";
import Link from "next/link";

export const MySidebar = ({
  isCollapsed,
  handleClose,
}: {
  isCollapsed: boolean;
  handleClose?: () => void;
}) => {
  const navItems = [
    { href: "/dashboard", label: "Главная", icon: Home },
    { href: "/projects", label: "Проекты", icon: Briefcase },
    { href: "/profile", label: "Профиль", icon: User },
    { href: "/messages", label: "Сообщения", icon: MessageSquare },
    { href: "/settings", label: "Настройки", icon: Settings },
    { href: "/login", label: "Login", icon: LogIn },
    { href: "/register", label: "Register", icon: RegexIcon },
  ];

  return (
    <Sidebar className="bg-background">
      <div className={cn("h-full p-4 flex flex-col", isCollapsed && "p-1")}>
        <div className={cn("mb-6", isCollapsed && "p-2")}>
          <Link
            href="/"
            className="text-xl font-bold text-foreground"
            onClick={handleClose}
          >
            {isCollapsed ? "JW" : "JustWork"}
          </Link>
        </div>
        {isCollapsed ? (
          <nav className="flex flex-col gap-4 items-center">
            {navItems.map((item) => (
              <Link
                onClick={handleClose}
                key={item.href}
                href={item.href}
                className={cn(
                  "p-2 rounded-md text-foreground hover:bg-muted transition-colors",
                  "text-sm font-medium w-full flex justify-center",
                )}
              >
                <item.icon className="h-5 w-5 flex-shrink-0" />
              </Link>
            ))}
          </nav>
        ) : (
          <nav className={cn("flex-1")}>
            {navItems.map((item) => (
              <Link
                onClick={handleClose}
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 p-2 rounded-lg text-foreground hover:bg-muted transition-colors",
                  "text-sm font-medium",
                  isCollapsed && "p-0",
                )}
              >
                <item.icon className="h-5 w-5 flex-shrink-0" />
                <span>{item.label}</span>
              </Link>
            ))}
          </nav>
        )}
      </div>
    </Sidebar>
  );
};
