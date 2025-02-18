import Link from "next/link";
import React from "react";

import { DesktopNavbar } from "./DesktopNavbar";
import { MobileNavbar } from "./MobileNavbar";
export function NavBar() {
  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="max-w-7xl mx-auto px-4 ">
        <div className="flex h-16 items-center justify-between ">
          <div className="flex items-center">
            <Link href="/">Watyappto</Link>
          </div>
          <div className="flex items-center">
            <DesktopNavbar />
            <MobileNavbar />
          </div>
        </div>
      </div>
    </nav>
  );
}
