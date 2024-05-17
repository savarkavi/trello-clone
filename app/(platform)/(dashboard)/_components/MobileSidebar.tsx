"use client";

import { Sheet, SheetContent } from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import Sidebar from "./Sidebar";
import { useMobileSidebar } from "@/hooks/use-mobile-sidebar";
import { useEffect } from "react";
import { usePathname } from "next/navigation";

const MobileSidebar = () => {
  const pathname = usePathname();

  const isOpen = useMobileSidebar((state) => state.isOpen);
  const onClose = useMobileSidebar((state) => state.onClose);
  const onOpen = useMobileSidebar((state) => state.onOpen);

  useEffect(() => {
    onClose();
  }, [pathname, onClose]);

  return (
    <div className="xl:hidden">
      <Menu className="cursor-pointer" onClick={onOpen} />
      <Sheet open={isOpen} onOpenChange={onClose}>
        <SheetContent side="left" className="z-[99]">
          <Sidebar storageKey="t-mobile-sidebar-state" />
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default MobileSidebar;
