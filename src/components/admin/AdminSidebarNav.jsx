'use client'

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import {
  LayoutDashboard,
  FileText,
  FolderOpen,
  Users,
  Tag,
  BookOpen,
  HelpCircle,
  MessageSquare,
  TestTube
} from 'lucide-react'

// This defines the structure of the sidebar items
const sidebarItems = [
  {
    href: "/admin",
    label: "Dashboard",
    icon: LayoutDashboard,
  },
  {
    href: "/admin/articles",
    label: "Məqalələr",
    icon: FileText,
  },
  {
    href: "/admin/categories",
    label: "Kateqoriyalar",
    icon: FolderOpen,
  },
  {
    href: "/admin/authors",
    label: "Müəlliflər",
    icon: Users,
  },
  {
    href: "/admin/tags",
    label: "Taglər",
    icon: Tag,
  },
  {
    href: "/admin/books",
    label: "Kitablar",
    icon: BookOpen,
  },
  {
    href: "/admin/questions",
    label: "Suallar",
    icon: HelpCircle,
  },
  {
    href: "/admin/asked-questions",
    label: "Sorusulan Suallar",
    icon: MessageSquare,
  },
  {
    href: "/admin/test-editor",
    label: "Editor Test",
    icon: TestTube,
  },
];

const AdminSidebarNav = ({ isMobileSidebarOpen, onLinkClick }) => {
  const pathname = usePathname();

  return (
    <aside
      id="logo-sidebar"
      className={cn(
        "fixed top-0 left-0 z-40 w-72 h-screen pt-20 bg-white/95 dark:bg-slate-950/95 backdrop-blur-2xl border-r border-slate-200/60 dark:border-slate-800/60 transition-transform shadow-2xl shadow-slate-200/20 dark:shadow-slate-900/20",
        isMobileSidebarOpen ? 'translate-x-0' : '-translate-x-full',
        'sm:translate-x-0'
      )}
      aria-label="Sidebar"
    >
      <div className="h-full px-6 pb-6 overflow-y-auto">
        <div className="space-y-2 pt-8">
          <div className="px-4 mb-8">
            <h2 className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest">
              Əsas Bölmələr
            </h2>
            <div className="w-12 h-0.5 bg-gradient-to-r from-emerald-500 to-emerald-600 mt-2 rounded-full"></div>
          </div>
          {sidebarItems.map((item, index) => {
            const IconComponent = item.icon;
            const isActive = pathname === item.href || (item.href !== '/admin' && pathname.startsWith(item.href));

            return (
              <Link
                key={index}
                href={item.href}
                onClick={onLinkClick}
                className={cn(
                  "group flex items-center gap-4 px-4 py-3.5 rounded-2xl text-sm font-semibold transition-all duration-300 relative overflow-hidden hover:scale-[1.02]",
                  isActive
                    ? 'bg-gradient-to-r from-emerald-500 to-emerald-600 text-white shadow-xl shadow-emerald-500/25'
                    : 'text-slate-700 dark:text-slate-300 hover:bg-emerald-50/80 dark:hover:bg-emerald-900/20 hover:text-emerald-900 dark:hover:text-emerald-100'
                )}
              >
                {isActive && (
                  <>
                    <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/10 to-emerald-600/10 rounded-2xl" />
                    <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-white rounded-r-full" />
                  </>
                )}
                <div className={cn(
                  "p-2.5 rounded-xl transition-all duration-300 relative z-10 group-hover:scale-110",
                  isActive
                    ? 'bg-white/20 shadow-lg'
                    : 'bg-slate-100 dark:bg-slate-800 group-hover:bg-emerald-100 dark:group-hover:bg-emerald-900/30 group-hover:shadow-md'
                )}>
                  <IconComponent className="h-5 w-5 flex-shrink-0" />
                </div>
                <span className="flex-1 whitespace-nowrap relative z-10 tracking-wide">{item.label}</span>
                {item.badge && (
                  <span className="inline-flex items-center justify-center px-2.5 py-1 text-xs font-bold bg-white/20 text-current rounded-full relative z-10 shadow-sm">
                    {item.badge}
                  </span>
                )}
                {isActive && (
                  <div className="w-2 h-2 bg-white rounded-full absolute right-4 relative z-10 shadow-sm" />
                )}
              </Link>
            );
          })}
        </div>


      </div>
    </aside>
  );
};

export default AdminSidebarNav;
