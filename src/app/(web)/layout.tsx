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
export const revalidate = 3600; // Revalidate menu every 5 minutes

async function getMenuData(): Promise<MenuItem[]> {
  try {
      const res = await fetch(
      `${apiConfig.baseUrl}${apiConfig.endpoints.categories.menu}`,
      { 
        next: { revalidate: 3600 }
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

function addHrefToMenuItems(menuItems: any[], isArticleCategory = false): MenuItem[] {
  return menuItems
    .filter((item) => item.name !== "İslam elmləri") // Filter out "İslam elmləri"
    .map((item) => ({
      ...item,
      href: isArticleCategory ? `/articles?categoryId=${item.id}` : `/search?categoryId=${item.id}`,
      // API returns 'children', but we need 'subcategories'
      subcategories: item.children && item.children.length > 0
        ? addHrefToMenuItems(item.children, isArticleCategory)
        : [],
    }));
}

export default async function WebLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const menusData = await getMenuData();
  
  // Find "İslam elmləri" and extract its children for articles
  const islamElmleriMenu = menusData.find((item: any) => item.name === "İslam elmləri");
  const islamElmleriChildren = islamElmleriMenu?.children || [];
  
  // Filter out "İslam elmləri" from navbar
  const dynamicMenus = addHrefToMenuItems(menusData);

  // Combine static and dynamic menus, prioritizing items with submenus
  const staticMenus: MenuItem[] = navItems.map(item => {
    // Add İslam elmləri children to Məqalələr menu
    if (item.name === "Məqalələr" && islamElmleriChildren.length > 0) {
      return {
        name: item.name,
        href: item.href,
        subcategories: addHrefToMenuItems(islamElmleriChildren, true), // true = use /articles route
      };
    }
    return {
      name: item.name,
      href: item.href,
      subcategories: [],
    };
  });
  
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
