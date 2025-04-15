"use client";

import {
  ResizablePanelGroup,
  ResizablePanel,
  ResizableHandle,
} from "@/shared/ui/resizable";
import { RefObject, useState, useEffect, ReactNode, useRef } from "react";
import Header from "../header/header";
import { MySidebar } from "../my-sidebar/my-sidebar";
import { ImperativePanelHandle } from "react-resizable-panels";

function usePanelWidth(ref: RefObject<HTMLElement> | null) {
  const [isCollapsed, setIsCollapsed] = useState(false);

  useEffect(() => {
    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const width = entry.contentRect.width;
        setIsCollapsed(width < 141);
      }
    });

    if (ref?.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref?.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [ref]);

  return isCollapsed;
}

export function ResizableLayout({ children }: { children: ReactNode }) {
  const sidebarRef = useRef<ImperativePanelHandle>(null);
  const containerRef = useRef<HTMLElement>(null);
  const isCollapsed = usePanelWidth(containerRef);

  return (
    <ResizablePanelGroup direction="horizontal" className="min-h-svh w-full">
      <ResizablePanel
        ref={sidebarRef}
        defaultSize={20}
        minSize={5}
        maxSize={20}
        className="hidden lg:block"
      >
        <section ref={containerRef} className="h-full">
          <MySidebar isCollapsed={isCollapsed} />
        </section>
      </ResizablePanel>
      <ResizableHandle withHandle className="hidden lg:flex" />
      <ResizablePanel defaultSize={80} className="flex flex-col">
        <Header />
        <main className="flex-1 p-6 max-w-7xl mx-auto">{children}</main>
        <footer className="bg-background border-t border-border py-4 text-center text-muted-foreground">
          <p>© 2025 JustWork</p>
        </footer>
      </ResizablePanel>
    </ResizablePanelGroup>
  );
}
