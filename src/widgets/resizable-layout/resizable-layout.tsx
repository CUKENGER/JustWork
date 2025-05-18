"use client";

import {
  ResizablePanelGroup,
  ResizablePanel,
  ResizableHandle,
} from "@/shared/ui/resizable";
import { RefObject, useState, useEffect, ReactNode, useRef } from "react";
import { ImperativePanelHandle } from "react-resizable-panels";
import { Header } from "../header/header";
import { MySidebar } from "../my-sidebar/my-sidebar";
import { SideModal } from "@/shared/ui/side-modal";

export const ResizableLayout = ({ children }: { children: ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false);
  const sidebarRef = useRef<ImperativePanelHandle>(null);
  const containerRef = useRef<HTMLElement>(null);
  const isCollapsed = usePanelWidth(containerRef);

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleOpen = () => {
    setIsOpen(true);
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <ResizablePanelGroup
      direction="horizontal"
      className="w-full min-h-svh lg:h-auto"
    >
      <ResizablePanel
        ref={sidebarRef}
        defaultSize={20}
        minSize={5}
        maxSize={20}
        className="hidden lg:block"
      >
        <section ref={containerRef} className="">
          <MySidebar isCollapsed={isCollapsed} />
        </section>
      </ResizablePanel>
      <ResizableHandle withHandle className="hidden lg:flex" />
      <ResizablePanel defaultSize={80} className="flex flex-col">
        <Header handleOpen={handleOpen} />
        <main className="flex-1 p-6 overflow-auto">{children}</main>
        <footer className="bg-background border-t border-border py-4 text-center text-muted-foreground">
          <p>© 2025 JustWork</p>
        </footer>
      </ResizablePanel>
      <SideModal isOpen={isOpen} handleClose={handleClose}>
        <MySidebar isCollapsed={false} handleClose={handleClose} />
      </SideModal>
    </ResizablePanelGroup>
  );
};

function usePanelWidth(ref: RefObject<HTMLElement | null>) {
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
