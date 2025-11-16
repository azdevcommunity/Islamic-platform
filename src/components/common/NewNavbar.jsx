"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { Menu } from "lucide-react"; // Kept Menu icon

import { cn } from "@/lib/utils";
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
    navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { Button } from "@/components/ui/button";
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import { ScrollArea } from "@/components/ui/scroll-area";

// --- Type Definition (Assuming from original, add if needed) ---
// interface MenuItem {
//   id?: string | number;
//   slug?: string;
//   name: string;
//   href?: string;
//   subcategories?: MenuItem[];
// }

// interface NewNavbarProps {
//   menus: MenuItem[];
// }


// --- Helper Function to generate Href ---
const generateHref = (item) => {
    if (item.href) return item.href;
    const identifier = item.slug || item.id;
    // MODIFY THIS BASED ON YOUR ROUTING (e.g., /dersler, /kitablar)
    return `/category/${identifier}`;
};

// --- Main Navbar Component (Redesigned) ---
export function NewNavbar({ menus }) {
    const pathname = usePathname();
    const router = useRouter();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

    const isLinkActive = (item) => {
        if (!pathname) return false;
        const itemHref = generateHref(item);
        const normalizedPath = pathname.endsWith('/') && pathname.length > 1 ? pathname.slice(0, -1) : pathname;
        const normalizedItemHref = itemHref.endsWith('/') && itemHref.length > 1 ? itemHref.slice(0, -1) : itemHref;

        if (normalizedPath === normalizedItemHref) return true;
        if (normalizedItemHref !== '/' && normalizedPath.startsWith(normalizedItemHref + '/')) {
            return true;
        }
        // Optional: Recursive check (can be slow for very deep menus)
        // if (item.subcategories?.length > 0) {
        //   return item.subcategories.some(subItem => isLinkActive(subItem));
        // }
        return false;
    };

    return (
        // Modern Header with gradient and enhanced shadow
        <header className="sticky top-0 z-50 w-full bg-gradient-to-r from-emerald-700 via-emerald-600 to-emerald-700 text-emerald-50 shadow-lg border-b border-emerald-800/20">
            <div className="flex h-20 items-center justify-between px-4 md:px-8 max-w-[1400px] mx-auto">
                {/* Logo and Brand - Enhanced Design */}
                <Link
                    href="/"
                    className="flex items-center gap-3 mr-6 flex-shrink-0 group transition-all duration-300 hover:scale-105"
                    onClick={() => setIsMobileMenuOpen(false)}
                >
                    {/* Logo with subtle glow effect */}
                    <div className="relative">
                        <div className="absolute inset-0 bg-white/20 rounded-full blur-md group-hover:bg-white/30 transition-all duration-300"></div>
                        <Image
                            height={48}
                            width={48}
                            src={"/esm_logo.png"}
                            alt="Nizamiyyə Mədrəsəsi Logo"
                            className="h-12 w-12 rounded relative z-10 drop-shadow-lg"
                        />
                    </div>
                    {/* Brand name with improved typography */}
                    <div className="hidden lg:flex flex-col">
                        <span className="font-bold text-xl text-white leading-tight group-hover:text-emerald-50 transition-colors">
                            Nizamiyyə Mədrəsəsi
                        </span>
                    </div>
                    {/* Compact version for medium screens */}
                    <span className="lg:hidden font-bold text-lg text-white group-hover:text-emerald-50 transition-colors">
                        Nizamiyyə Mədrəsəsi
                    </span>
                </Link>

                {/* Desktop Navigation */}
                <div className="hidden lg:flex flex-grow justify-center">
                    <NavigationMenu className={"rounded-md  "}>
                        <NavigationMenuList>
                            {menus.map((item) => {
                                const itemHref = generateHref(item);
                                const hasSubcategories = item.subcategories && item.subcategories.length > 0;
                                const isActive = isLinkActive(item);
                                const isDirectlyActive = pathname === itemHref; // Check exact match

                                return (
                                    <NavigationMenuItem key={item.name || item.id} value={itemHref} >
                                        {hasSubcategories ? (
                                            <>
                                                <NavigationMenuTrigger
                                                    onClick={() => router.push(itemHref)}
                                                    className={cn(
                                                        // Enhanced base styles with better hover effects
                                                        "text-sm font-medium bg-transparent px-4 py-2 text-emerald-50 hover:bg-white/10 hover:text-white focus:bg-white/10 focus:text-white data-[active]:bg-white/15 data-[state=open]:bg-white/15 transition-all duration-200 rounded-md",
                                                        // Active state (section active)
                                                        isActive && "text-white bg-white/10",
                                                        // More prominent if this specific link is active
                                                        isDirectlyActive && "font-semibold bg-white/20"
                                                    )}
                                                >
                                                    {item.name}
                                                </NavigationMenuTrigger>
                                                <NavigationMenuContent>
                                                    {/* Enhanced Mega Menu with modern styling */}
                                                    <div className="grid w-[550px] gap-x-8 gap-y-5 p-8 md:w-[650px] lg:w-[800px] grid-flow-col auto-cols-max bg-white text-slate-800 shadow-2xl rounded-lg border border-emerald-100">
                                                        {item.subcategories?.map((subItemL1) => (
                                                            <div key={subItemL1.name || subItemL1.id} className="flex flex-col space-y-2 items-start">
                                                                {/* Level 1 Subcategory Title with enhanced styling */}
                                                                <Link
                                                                    href={generateHref(subItemL1)}
                                                                    passHref
                                                                    legacyBehavior
                                                                >
                                                                    <NavigationMenuLink className={cn(
                                                                        "text-sm font-bold leading-none hover:text-emerald-600 pb-2 mb-1 border-b-2 transition-all duration-200",
                                                                        isLinkActive(subItemL1)
                                                                            ? "text-emerald-700 border-emerald-700"
                                                                            : "text-slate-800 border-transparent hover:border-emerald-200"
                                                                    )}>
                                                                        {subItemL1.name}
                                                                    </NavigationMenuLink>
                                                                </Link>

                                                                {/* Level 2 Subcategories */}
                                                                {subItemL1.subcategories?.length > 0 && (
                                                                    <ul className="flex flex-col space-y-0.5">
                                                                        {subItemL1.subcategories.map((subItemL2) => (
                                                                            <li key={subItemL2.name || subItemL2.id}>
                                                                                {/* Use updated ListItem for white bg */}
                                                                                <ListItem
                                                                                    title={subItemL2.name}
                                                                                    href={generateHref(subItemL2)}
                                                                                    active={pathname === generateHref(subItemL2)}
                                                                                />
                                                                            </li>
                                                                        ))}
                                                                    </ul>
                                                                )}
                                                            </div>
                                                        ))}
                                                    </div>
                                                </NavigationMenuContent>
                                            </>
                                        ) : (
                                            // Top-level item without subcategories
                                            <Link href={itemHref} legacyBehavior passHref>
                                                <NavigationMenuLink
                                                    className={cn(
                                                        navigationMenuTriggerStyle(), // Base style adapts
                                                        // Enhanced custom styling for links
                                                        "text-sm font-medium bg-transparent px-4 py-2 text-emerald-50 hover:bg-white/10 hover:text-white focus:bg-white/10 focus:text-white data-[active]:bg-white/15 data-[state=open]:bg-white/15 transition-all duration-200 rounded-md",
                                                        // Direct active state with stronger highlight
                                                        isDirectlyActive && "bg-white/20 text-white font-semibold"
                                                    )}
                                                >
                                                    {item.name}
                                                </NavigationMenuLink>
                                            </Link>
                                        )}
                                    </NavigationMenuItem>
                                );
                            })}
                            {/* Add static items if needed */}
                        </NavigationMenuList>
                    </NavigationMenu>
                </div>

                {/* Placeholder for right-side elements */}
                <div className="hidden lg:flex items-center justify-end  flex-shrink-0">
                    {/* Add Theme Toggle, Auth Button etc. here if needed */}
                </div>

                {/* Mobile Navigation Trigger - Enhanced */}
                <div className="lg:hidden flex items-center">
                    <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
                        <SheetTrigger asChild>
                            {/* Modern hamburger button with better styling */}
                            <Button
                                variant="ghost"
                                size="icon"
                                aria-label="Menyu aç"
                                className="text-white hover:text-white hover:bg-white/15 focus:bg-white/15 transition-all duration-200 rounded-md"
                            >
                                <Menu className="h-6 w-6" />
                            </Button>
                        </SheetTrigger>
                        {/* Mobile Menu Content with enhanced header */}
                        <SheetContent side="left" className="w-full max-w-xs sm:max-w-sm p-0 flex flex-col bg-white text-slate-800">
                            <SheetHeader className="border-b border-emerald-100 bg-gradient-to-r from-emerald-50 to-white p-5">
                                <SheetTitle className="flex items-center gap-3">
                                    <div className="relative">
                                        <Image height={40} width={40} src={"/esm_logo.png"} alt="Nizamiyyə Mədrəsəsi Logo" className="drop-shadow-md" />
                                    </div>
                                    <div className="flex flex-col items-start">
                                        <span className="font-bold text-emerald-700 text-base">Menyu</span>
                                        <span className="text-xs text-emerald-600/70 font-medium">Naviqasiya</span>
                                    </div>
                                </SheetTitle>
                            </SheetHeader>
                            <ScrollArea className="flex-1">
                                <div className="flex flex-col space-y-1 p-4">
                                    {menus.map((item) => (
                                        <MobileMenuItem
                                            key={item.name || item.id}
                                            item={item}
                                            pathname={pathname}
                                            level={0}
                                            closeMenu={() => setIsMobileMenuOpen(false)}
                                            isLinkActive={isLinkActive} // Pass the function itself
                                        />
                                    ))}
                                    {/* Add static mobile items if needed */}
                                </div>
                            </ScrollArea>
                            {/* Optional Footer */}
                        </SheetContent>
                    </Sheet>
                </div>
            </div>
        </header>
    );
}

// --- Recursive Mobile Menu Item Component (Adjusted for White Background) ---
const MobileMenuItem = ({ item, pathname, level, closeMenu, isLinkActive }) => {
    const itemHref = generateHref(item);
    const hasSubcategories = item.subcategories && item.subcategories.length > 0;
    const isActive = isLinkActive(item); // Section active
    const isExactlyActive = pathname === itemHref; // Exact link active

    const paddingLeft = `${1 + level * 1.25}rem`; // Indentation

    if (!hasSubcategories) {
        // Leaf node: Enhanced Simple Link
        return (
            <SheetClose asChild>
                <Link
                    href={itemHref}
                    style={{ paddingLeft }}
                    className={cn(
                        "flex items-center rounded-lg px-4 py-3 text-sm transition-all duration-200", // Enhanced base styles
                        // Better hover/active states
                        "hover:bg-emerald-50 hover:text-emerald-700 hover:translate-x-1",
                        isExactlyActive
                            ? "bg-emerald-100 font-semibold text-emerald-700 shadow-sm" // Active state
                            : "text-slate-700 font-medium" // Default text color
                    )}
                >
                    {item.name}
                </Link>
            </SheetClose>
        );
    }

    // Node with subcategories: Accordion
    const accordionValue = `mobile-item-${item.id || item.slug || item.name}`;

    return (
        <Accordion type="single" collapsible className="w-full">
            <AccordionItem value={accordionValue} className="border-b-0">
                <AccordionTrigger
                    style={{ paddingLeft }}
                    className={cn(
                        "py-3 px-4 text-sm font-medium hover:no-underline hover:bg-emerald-50 rounded-lg [&[data-state=open]>svg]:rotate-180 transition-all duration-200 w-full justify-between",
                        // Enhanced highlight for active states
                        isActive ? "text-emerald-700 bg-emerald-50/50" : "text-slate-700 hover:text-emerald-700",
                        isExactlyActive && "bg-emerald-100 font-semibold text-emerald-700 shadow-sm" // Stronger highlight for exact match
                    )}
                >
                    {/* Wrap link text to navigate, but allow chevron area to toggle accordion */}
                    <Link
                        href={itemHref}
                        onClick={(e) => {
                            // Navigate and close menu when clicking the text part
                            e.stopPropagation(); // Prevent accordion toggle if link clicked
                            closeMenu();
                        }}
                        className="flex-1 text-left mr-2 hover:text-emerald-600 transition-colors" // Take up space
                    >
                        {item.name}
                    </Link>
                    {/* Chevron is part of AccordionTrigger */}
                </AccordionTrigger>

                <AccordionContent className="pb-0 overflow-hidden data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down">
                    <div className="flex flex-col space-y-1 pt-1">
                        {item.subcategories.map((subItem) => (
                            <React.Fragment key={subItem.id || subItem.slug || subItem.name}>
                                <MobileMenuItem
                                    item={subItem}
                                    pathname={pathname}
                                    level={level + 1}
                                    closeMenu={closeMenu}
                                    isLinkActive={isLinkActive}
                                />
                            </React.Fragment>
                        ))}
                    </div>
                </AccordionContent>
            </AccordionItem>
        </Accordion>
    );
};

// --- Desktop Mega Menu List Item (Adjusted for White Background) ---
const ListItem = React.forwardRef(
    ({ className, title, active, href, ...props }, ref) => {
        return (
            <NavigationMenuLink asChild>
                <Link
                    ref={ref}
                    href={href}
                    className={cn(
                        "block select-none rounded-lg px-4 py-2.5 leading-none no-underline outline-none transition-all duration-200",
                        // Enhanced hover/active styles
                        "text-sm hover:bg-emerald-50 hover:text-emerald-700 hover:translate-x-1 focus:bg-emerald-50 focus:text-emerald-700",
                        active
                            ? "bg-emerald-100 font-semibold text-emerald-700 shadow-sm" // Active state
                            : "text-slate-600 font-medium", // Default state
                        className
                    )}
                    {...props}
                >
                    <div className="text-sm leading-snug">{title}</div>
                </Link>
            </NavigationMenuLink>
        );
    }
);
ListItem.displayName = "ListItem";
