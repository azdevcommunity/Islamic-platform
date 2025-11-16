// This is the main server component file: navbar.jsx
import Image from "next/image"
import Link from "next/link"
import {NavbarClient} from "@/components/Navbar/NavbarClient";

/**
 * Modern Navbar component with SSR support
 * This is the main server component that handles the static parts
 */
export function ModernNavbar({ menus = [] }) {
    return (
        <header className="sticky top-0 z-50 w-full border-b border-emerald-800/20 bg-gradient-to-r from-emerald-700 via-emerald-600 to-emerald-700 shadow-lg backdrop-blur">
            <div className="flex h-20 items-center px-4 sm:px-6 lg:px-8 max-w-[1400px] mx-auto">
                {/* Logo and Brand Name - Server Component */}
                <BrandLogo />

                {/* Navigation - Client Component (required for interactivity) */}
                <NavbarClient menus={menus} />
            </div>
        </header>
    )
}

/**
 * Brand Logo Component - Server Component (no client interactivity needed)
 */
function BrandLogo() {
    return (
        <Link href="/" className="mr-6 flex items-center gap-3 group transition-all duration-300 hover:scale-105">
            {/* Logo with enhanced styling */}
            <div className="relative">
                <div className="absolute inset-0 bg-white/20 rounded-full blur-md group-hover:bg-white/30 transition-all duration-300"></div>
                <div className="relative h-12 w-12 overflow-hidden rounded-full sm:h-12 sm:w-12 z-10">
                    <Image
                        src="/esm_logo.png"
                        alt="Logo"
                        fill
                        className="object-contain drop-shadow-lg"
                        priority
                    />
                </div>
            </div>
            {/* Enhanced brand name with subtitle */}
            <div className="hidden sm:flex flex-col">
                <div className="text-xl font-bold text-white leading-tight group-hover:text-emerald-50 transition-colors">
                    Nizamiyyə Mədrəsəsi
                </div>
                <div className="text-xs text-emerald-100/80 font-medium">İslami Təhsil Platforması</div>
            </div>
        </Link>
    )
}
