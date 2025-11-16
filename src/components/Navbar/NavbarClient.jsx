"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, X, ChevronDown, ChevronRight } from "lucide-react"

/**
 * Modern İslami Estetik Navbar Client Component
 * Soft yeşil rəng paleti, minimal dizayn, sub-of-sub menu dəstəyi
 */
export function NavbarClient({ menus = [] }) {
    const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false)
    const pathname = usePathname()

    // Close mobile menu when pathname changes
    React.useEffect(() => {
        setMobileMenuOpen(false)
    }, [pathname])

    return (
        <div className="flex flex-1 items-center justify-end gap-4">
            {/* Desktop Navigation */}
            <nav className="hidden lg:flex lg:flex-1 lg:items-center lg:justify-center pt-1 pb-1">
                <ul className="flex items-center gap-1">
                    {menus.map((item, index) => (
                        <NavItem
                            key={index}
                            item={item}
                            pathname={pathname}
                        />
                    ))}
                </ul>
            </nav>

            {/* Mobile Menu Button - Modern dizayn */}
            <button
                className="inline-flex items-center justify-center rounded-xl p-2.5 text-stone-700 hover:bg-stone-100 focus:outline-none focus:ring-2 focus:ring-primary-500 lg:hidden transition-colors border border-stone-200"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                aria-expanded={mobileMenuOpen}
                aria-controls="mobile-menu"
                aria-label="Toggle menu"
            >
                {mobileMenuOpen ? (
                    <X className="h-5 w-5" />
                ) : (
                    <Menu className="h-5 w-5" />
                )}
            </button>

            {/* Mobile Menu - Modern overlay */}
            {mobileMenuOpen && (
                <MobileMenu
                    items={menus}
                    pathname={pathname}
                    onClose={() => setMobileMenuOpen(false)}
                />
            )}
        </div>
    )
}

/**
 * Desktop Navigation Item - Premium dizayn
 * Hover problemi həll edildi
 */
function NavItem({ item, pathname }) {
    const [open, setOpen] = React.useState(false)
    const ref = React.useRef(null)
    const timeoutRef = React.useRef(null)
    const hasChildren = item.subcategories && item.subcategories.length > 0

    // Check if current path matches this item
    const isActive = React.useMemo(() => {
        if (pathname === item.href) return true
        if (item.href !== '/' && pathname.startsWith(item.href)) return true
        return false
    }, [pathname, item.href])

    // Handle mouse enter with delay
    const handleMouseEnter = () => {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current)
        }
        if (hasChildren) {
            setOpen(true)
        }
    }

    // Handle mouse leave with delay to prevent flickering
    const handleMouseLeave = () => {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current)
        }
        timeoutRef.current = setTimeout(() => {
            setOpen(false)
        }, 150)
    }

    // Handle click outside to close dropdown
    React.useEffect(() => {
        const handleClickOutside = (event) => {
            if (ref.current && !ref.current.contains(event.target)) {
                setOpen(false)
            }
        }
        document.addEventListener("mousedown", handleClickOutside)
        return () => {
            document.removeEventListener("mousedown", handleClickOutside)
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current)
            }
        }
    }, [ref])

    return (
        <li
            ref={ref}
            className="relative group"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            <Link
                href={item.href}
                className={`flex items-center gap-1.5 rounded-xl px-4 py-2.5 text-sm font-medium transition-all duration-200
          ${isActive
                    ? "text-white bg-primary-600 shadow-md"
                    : "text-white hover:text-primary-700 hover:bg-primary-50"
                }`}
            >
                {item.name}
                {hasChildren && (
                    <ChevronDown className={`h-3.5 w-3.5 transition-transform duration-200 ${open ? 'rotate-180' : ''}`} />
                )}
            </Link>

            {/* Dropdown Menu - Premium dizayn */}
            {open && hasChildren && (
                <div
                    className="absolute left-0 top-full z-50 mt-1 min-w-[260px] rounded-2xl border border-stone-200/80 bg-white shadow-2xl animate-in fade-in slide-in-from-top-2"
                    style={{
                        boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)'
                    }}
                >
                    {/* İncə üst xətt - dekorativ */}
                    <div className="h-1 bg-gradient-to-r from-primary-500 via-primary-600 to-primary-500 rounded-t-2xl"></div>

                    <div className="p-2">
                        <DropdownMenu items={item.subcategories} level={0} />
                    </div>
                </div>
            )}
        </li>
    )
}

/**
 * Dropdown Menu Component - Recursive sub-of-sub menu dəstəyi
 */
function DropdownMenu({ items, level = 0 }) {
    return (
        <ul className="grid gap-0.5">
            {items.map((item, index) => (
                <DropdownItem key={index} item={item} level={level} />
            ))}
        </ul>
    )
}

/**
 * Dropdown Item Component - Premium dizayn
 * Hover problemi həll edildi, sub-of-sub menu dəstəyi
 */
function DropdownItem({ item, level = 0 }) {
    const [open, setOpen] = React.useState(false)
    const hasChildren = item.subcategories && item.subcategories.length > 0
    const ref = React.useRef(null)
    const timeoutRef = React.useRef(null)

    // Handle mouse enter with delay
    const handleMouseEnter = () => {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current)
        }
        if (hasChildren) {
            setOpen(true)
        }
    }

    // Handle mouse leave with delay
    const handleMouseLeave = () => {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current)
        }
        timeoutRef.current = setTimeout(() => {
            setOpen(false)
        }, 150)
    }

    // Handle click outside to close submenu
    React.useEffect(() => {
        const handleClickOutside = (event) => {
            if (ref.current && !ref.current.contains(event.target)) {
                setOpen(false)
            }
        }
        document.addEventListener("mousedown", handleClickOutside)
        return () => {
            document.removeEventListener("mousedown", handleClickOutside)
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current)
            }
        }
    }, [ref])

    return (
        <li
            ref={ref}
            className="relative"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            <Link
                href={item.href}
                className="flex items-center justify-between rounded-xl px-4 py-2.5 text-sm text-stone-700 hover:bg-primary-50 hover:text-primary-700 transition-all duration-200 group"
            >
                <span className="font-medium">{item.name}</span>
                {hasChildren && (
                    <ChevronRight className="ml-auto h-3.5 w-3.5 text-stone-400 group-hover:text-primary-600 transition-colors" />
                )}
            </Link>

            {/* Submenu - Recursive sub-of-sub menu */}
            {open && hasChildren && (
                <div
                    className="absolute left-full top-0 z-50 ml-1 min-w-[260px] rounded-2xl border border-stone-200/80 bg-white shadow-2xl animate-in fade-in slide-in-from-left-2"
                    style={{
                        boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)'
                    }}
                >
                    {/* İncə sol xətt - dekorativ */}
                    <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-primary-500 via-primary-600 to-primary-500 rounded-l-2xl"></div>

                    {/* İslami naxış - çox subtle */}
                    <div className="absolute inset-0 bg-islamic-subtle opacity-5 pointer-events-none rounded-2xl"></div>

                    <div className="p-2 relative">
                        <DropdownMenu items={item.subcategories} level={level + 1} />
                    </div>
                </div>
            )}
        </li>
    )
}

/**
 * Mobile Menu Component - Modern full screen overlay
 * İslami estetik ilə
 */
function MobileMenu({ items, pathname, onClose }) {
    return (
        <>
            {/* Backdrop */}
            <div
                className="fixed inset-0 top-20 z-40 bg-stone-900/50 backdrop-blur-sm animate-in fade-in lg:hidden"
                onClick={onClose}
            />

            {/* Menu Panel */}
            <div className="fixed inset-x-0 top-20 z-50 max-h-[calc(100vh-5rem)] overflow-auto bg-white border-t border-stone-200 shadow-2xl animate-in slide-in-from-top-4 lg:hidden">
                {/* İslami naxış arxa fon */}
                <div className="absolute inset-0 bg-islamic-pattern opacity-5 pointer-events-none"></div>

                <div className="relative p-4">
                    <ul className="grid gap-1">
                        {items.map((item, index) => (
                            <MobileNavItem
                                key={index}
                                item={item}
                                pathname={pathname}
                                onClose={onClose}
                                level={0}
                            />
                        ))}
                    </ul>
                </div>
            </div>
        </>
    )
}

/**
 * Mobile Navigation Item - Modern minimal dizayn
 * Recursive sub-of-sub menu dəstəyi
 */
function MobileNavItem({ item, pathname, onClose, level = 0 }) {
    const [open, setOpen] = React.useState(false)
    const hasChildren = item.subcategories && item.subcategories.length > 0

    // Check if current path matches this item
    const isActive = React.useMemo(() => {
        if (pathname === item.href) return true
        if (item.href !== '/' && pathname.startsWith(item.href)) return true
        return false
    }, [pathname, item.href])

    return (
        <li className="border-b border-stone-100 last:border-none">
            <div className="flex flex-col">
                <div className="flex items-center justify-between gap-2">
                    <Link
                        href={hasChildren ? "#" : item.href}
                        onClick={(e) => {
                            if (hasChildren) {
                                e.preventDefault()
                                setOpen(!open)
                            } else {
                                onClose()
                            }
                        }}
                        className={`flex-1 flex items-center py-3 text-sm transition-colors ${
                            level === 0 ? "font-semibold" : "font-medium"
                        } ${
                            isActive 
                                ? "text-primary-700" 
                                : "text-stone-700 hover:text-primary-700"
                        }`}
                        style={{ paddingLeft: `${level * 1}rem` }}
                    >
                        {level > 0 && (
                            <span className="mr-2 text-stone-400">→</span>
                        )}
                        <span className="truncate">{item.name}</span>
                    </Link>

                    {hasChildren && (
                        <button
                            className="rounded-lg p-2 text-stone-600 hover:bg-stone-100 transition-colors"
                            onClick={() => setOpen(!open)}
                        >
                            <ChevronDown
                                className={`h-4 w-4 transition-transform duration-200 ${
                                    open ? "rotate-180" : ""
                                }`}
                            />
                        </button>
                    )}
                </div>

                {/* Submenu - Recursive */}
                {open && hasChildren && (
                    <div className="mt-1 ml-4 border-l-2 border-primary-200 pl-3 animate-in slide-in-from-top-2">
                        <ul className="grid gap-1 py-2">
                            {item.subcategories.map((child, index) => (
                                <MobileNavItem
                                    key={index}
                                    item={child}
                                    pathname={pathname}
                                    onClose={onClose}
                                    level={level + 1}
                                />
                            ))}
                        </ul>
                    </div>
                )}
            </div>
        </li>
    )
}
