/**
 * Web Layout - Server Component
 * Layout for public-facing pages with dynamic menu fetching
 */

import { Suspense } from "react";
import { apiConfig } from "@/config/api";
import { navItems } from "@/config/site";
import { IslamicNavbar } from "@/components/Navbar/islamic-navbar";
import { IslamicFooter } from "@/components/Footer/islamic-footer";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import type { MenuItem } from "@/types";

export const dynamic = "force-dynamic";
export const revalidate = 300; // Revalidate menu every 5 minutes

async function getMenuData(): Promise<MenuItem[]> {
  try {
    const res = await fetch(
      `${apiConfig.baseUrl}${apiConfig.endpoints.categories.menu}`,
      { 
        next: { revalidate: 300 },
        cache: "force-cache"
      }
    );
    
    if (!res.ok) {
      console.error(`Failed to fetch menu data: ${res.status}`);
      return [];
    }
    
    return res.json();
  } catch (error) {
    console.error("Error fetching menu data:", error);
    return [];
  }
}

function addHrefToMenuItems(menuItems: any[]): MenuItem[] {
  return menuItems.map((item) => ({
    ...item,
    href: `/search?categoryId=${item.id}`,
    subcategories: item.subcategories
      ? addHrefToMenuItems(item.subcategories)
      : [],
  }));
}

export default async function WebLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const menusData = await getMenuData();
  const dynamicMenus = addHrefToMenuItems(menusData);

  // Combine static and dynamic menus, prioritizing items with submenus
  const staticMenus: MenuItem[] = navItems.map(item => ({
    name: item.name,
    href: item.href,
    subcategories: [],
  }));
  
  const combinedMenus = [...staticMenus, ...dynamicMenus];
  const menus: MenuItem[] = [
    ...combinedMenus.filter(
      (item) => Array.isArray(item.subcategories) && item.subcategories.length > 0
    ),
    ...combinedMenus.filter(
      (item) => !Array.isArray(item.subcategories) || item.subcategories.length === 0
    ),
  ];

  return (
    <>
      <IslamicNavbar menus={menus} />
      <Suspense
        fallback={
          <div className="flex items-center justify-center min-h-screen">
            <LoadingSpinner size="lg" />
          </div>
        }
      >
        {children}
      </Suspense>
      <IslamicFooter />
    </>
  );
}
