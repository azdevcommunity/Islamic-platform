/**
 * Islamic Navbar Component
 * Modern Islamic aesthetic navbar with soft green + white theme
 */

import Image from "next/image";
import Link from "next/link";
import { NavbarClient } from "./NavbarClient";
import { siteConfig } from "@/config/site";
import type { MenuItem } from "@/types";

interface IslamicNavbarProps {
  menus?: MenuItem[];
}

export function IslamicNavbar({ menus = [] }: IslamicNavbarProps) {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-primary-100/50 bg-white/95 backdrop-blur-md shadow-sm">
      <div className="flex h-20 items-center px-4 sm:px-6 lg:px-8 max-w-[1400px] mx-auto">
        {/* Logo and Brand */}
        <BrandLogo />

        {/* Navigation */}
        <NavbarClient menus={menus} />
      </div>  

      {/* Decorative bottom line */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary-200/30 to-transparent" />
    </header>
  );
}

function BrandLogo() {
  return (
    <Link
      href="/"
      className="mr-6 flex items-center gap-3 group transition-all duration-300"
    >
      {/* Logo with glow effect */}
      <div className="relative">
        <div className="absolute inset-0 bg-primary-500/10 rounded-full blur-md group-hover:bg-primary-500/20 transition-all duration-300" />
        <div className="relative h-12 w-12 overflow-hidden rounded-full border-2 border-primary-100 group-hover:border-primary-300 transition-colors duration-300 z-10">
          <Image
            src="/esm_logo.png"
            alt={siteConfig.name}
            fill
            className="object-contain p-1"
            priority
          />
        </div>
      </div>

      {/* Brand name */}
      <div className="hidden sm:flex flex-col">
        <div className="text-lg font-semibold text-stone-800 leading-tight group-hover:text-primary-600 transition-colors">
          {siteConfig.name}
        </div>
        <div className="text-xs text-stone-500 font-medium tracking-wide">
          İslami Təhsil Mərkəzi
        </div>
      </div>
    </Link>
  );
}
