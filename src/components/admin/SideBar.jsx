"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import AdminNavbar from "./AdminNavbar"
import AdminSidebarNav from "./AdminSidebarNav"

// This component now acts as the main layout wrapper for the admin area
function AdminLayoutWrapper({ children }) {
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const router = useRouter();

  const handleMobileSidebarToggle = () => {
    setIsMobileSidebarOpen(!isMobileSidebarOpen);
  };

  const handleSidebarLinkClick = () => {
     setIsMobileSidebarOpen(false); // Close mobile sidebar when a link is clicked
  }

  const handleLogout = () => {
    console.log("Logout action triggered");
    localStorage.removeItem('isAdminLoggedIn');
    router.push('/admin/login');
  };

  return (
    <>
      <AdminNavbar
        isMobileSidebarOpen={isMobileSidebarOpen}
        onMobileSidebarToggle={handleMobileSidebarToggle}
        onLogout={handleLogout}
      />

      <AdminSidebarNav
          isMobileSidebarOpen={isMobileSidebarOpen}
          onLinkClick={handleSidebarLinkClick}
      />

      <main className="sm:ml-72 mt-20 min-h-screen bg-gradient-to-b from-gray-50 via-white to-white dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
        {children}
      </main>

      {/* Mobile Sidebar Overlay */}
      {isMobileSidebarOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/20 backdrop-blur-sm sm:hidden"
          onClick={handleMobileSidebarToggle}
        ></div>
      )}
    </>
  )
}

export default AdminLayoutWrapper;

