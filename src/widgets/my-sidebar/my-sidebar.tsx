import { cn } from "@/shared/lib/utils";
import { Sidebar } from "@/shared/ui/sidebar";
import { Briefcase, Home, MessageSquare, Settings, User } from "lucide-react";

export const MySidebar = () => {
  const navItems = [
    { href: "/", label: "Главная", icon: Home },
    { href: "/projects", label: "Проекты", icon: Briefcase },
    { href: "/profile", label: "Профиль", icon: User },
    { href: "/messages", label: "Сообщения", icon: MessageSquare },
    { href: "/settings", label: "Настройки", icon: Settings },
  ];

  return (
    <Sidebar>
      <div className="h-full p-4 flex flex-col">
        <div className="mb-6">
          <Link href="/" className="text-xl font-bold text-foreground">
            JustWork
          </Link>
        </div>
        <nav className="flex-1">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 p-2 rounded-lg text-foreground hover:bg-muted transition-colors",
                "text-sm font-medium",
              )}
            >
              <item.icon className="h-5 w-5" />
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </Sidebar>
  );
};
