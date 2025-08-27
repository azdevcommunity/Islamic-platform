'use client'

import { useState } from 'react'
import Link from "next/link"
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { Sun, Moon, Monitor, LogOut, User, Settings, LayoutDashboard, RefreshCw, Menu, X, Bell, Search } from 'lucide-react'
import useTheme from '@/hooks/useTheme'

const AdminNavbar = ({
  isMobileSidebarOpen,
  onMobileSidebarToggle,
  onLogout
}) => {
  const [theme, setTheme] = useTheme()
  const [isRefreshing, setIsRefreshing] = useState(false)

  // Dummy user data (replace with actual data later)
  const user = { name: "Admin User", email: "admin@example.com" }

  const handleRefreshClick = async () => {
    if (isRefreshing) return

    console.log("API Call Triggered (Refresh Button)")
    setIsRefreshing(true)

    try {
      fetch(`${process.env.NEXT_PUBLIC_BASE_URL_YTB}/Youtube/sync`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then(response => response.json())
        .then(data => {
          alert("Successfully Updated Successfully")
          console.log(data)
        })
        .catch(error => {
          console.error("API Call Failed:", error)
        })
        .finally(() => {
          setIsRefreshing(false)
        })
    } catch (error) {
      console.error("API Call Failed:", error)
    } finally {
      setIsRefreshing(false)
    }
  }

  const handlePagesRefresh = async () => {
    if (isRefreshing) return
    setIsRefreshing(true)
    try {
      fetch(`/api/revalidate-all?secret=${process.env.NEXT_PUBLIC_REVALIDATE_SECRET}`)
        .then(() => alert("Successfully Refreshing Pages"))
        .catch((err) => console.error("Failed to revalidate /articles page."))
    } catch (error) {
      console.error('Pages API Call Failed:', error)
    } finally {
      setIsRefreshing(false)
    }
  }

  const getThemeIcon = () => {
    switch (theme) {
      case 'light':
        return <Sun className="h-4 w-4" />
      case 'dark':
        return <Moon className="h-4 w-4" />
      case 'system':
        return <Monitor className="h-4 w-4" />
      default:
        return <Sun className="h-4 w-4" />
    }
  }

  return (
    <nav style={{  background: "none"}} className="fixed top-0 z-50 w-full bg-white/95 dark:bg-slate-950/95 backdrop-blur-2xl border-b border-slate-200/60 dark:border-slate-800/60 shadow-lg shadow-slate-200/20 dark:shadow-slate-900/20">
      <div className="px-4 py-4 lg:px-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center justify-start rtl:justify-end">
            {/* Mobile Sidebar Toggle */}
            <Button
              variant="ghost"
              size="sm"
              onClick={onMobileSidebarToggle}
              className="inline-flex items-center p-2.5 text-sm sm:hidden hover:bg-slate-100/80 dark:hover:bg-slate-800/80 rounded-xl transition-all duration-200 hover:scale-105"
            >
              <span className="sr-only">Open sidebar</span>
              {isMobileSidebarOpen ? (
                <X className="w-5 h-5 text-slate-700 dark:text-slate-300" />
              ) : (
                <Menu className="w-5 h-5 text-slate-700 dark:text-slate-300" />
              )}
            </Button>

            {/* Logo and Title */}
            <Link href="/admin" className="flex ms-3 md:me-24 items-center group">
              <div className="relative mr-4">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-emerald-600 p-0.5 group-hover:scale-105 transition-transform duration-200">
                  <div className="w-full h-full rounded-lg bg-white dark:bg-slate-950 flex items-center justify-center">
                    <img src="/esm_logo.png" className="h-6 w-6" alt="Esm Logo" />
                  </div>
                </div>
                <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-xl opacity-0 group-hover:opacity-20 blur-lg transition-opacity duration-200"></div>
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-bold bg-gradient-to-r from-slate-900 via-slate-700 to-slate-900 dark:from-white dark:via-slate-200 dark:to-white bg-clip-text text-transparent">
                  Admin Panel
                </span>
                <span className="text-xs text-slate-500 dark:text-slate-400 hidden sm:block font-medium">
                  İslami Platform
                </span>
              </div>
            </Link>
          </div>

          {/* Right Side Icons */}
          <div className="flex items-center space-x-1">
            {/* Search Button */}
            <Button
              variant="ghost"
              size="sm"
              className="h-10 w-10 rounded-xl hover:bg-slate-100/80 dark:hover:bg-slate-800/80 transition-all duration-200 hover:scale-105"
            >
              <Search className="h-4 w-4 text-slate-600 dark:text-slate-400" />
              <span className="sr-only">Search</span>
            </Button>

            {/* Notifications */}
            <Button
              variant="ghost"
              size="sm"
              className="h-10 w-10 rounded-xl hover:bg-slate-100/80 dark:hover:bg-slate-800/80 transition-all duration-200 hover:scale-105 relative"
            >
              <Bell className="h-4 w-4 text-slate-600 dark:text-slate-400" />
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full flex items-center justify-center">
                <span className="text-[10px] text-white font-bold">3</span>
              </div>
              <span className="sr-only">Notifications</span>
            </Button>

            {/* Refresh Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  disabled={isRefreshing}
                  className="h-10 w-10 rounded-xl hover:bg-slate-100/80 dark:hover:bg-slate-800/80 transition-all duration-200 hover:scale-105 disabled:hover:scale-100"
                >
                  <RefreshCw className={`h-4 w-4 transition-colors ${isRefreshing ? 'animate-spin text-emerald-600 dark:text-emerald-400' : 'text-slate-600 dark:text-slate-400'}`} />
                  <span className="sr-only">Refresh Options</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-52 border-slate-200/60 dark:border-slate-800/60 shadow-xl">
                <DropdownMenuItem onClick={handleRefreshClick} className="flex items-center gap-3 py-2.5">
                  <div className="w-8 h-8 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                    <RefreshCw className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div>
                    <div className="font-medium">Videos</div>
                    <div className="text-xs text-muted-foreground">Sync video content</div>
                  </div>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handlePagesRefresh} className="flex items-center gap-3 py-2.5">
                  <div className="w-8 h-8 rounded-lg bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center">
                    <RefreshCw className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                  </div>
                  <div>
                    <div className="font-medium">Pages</div>
                    <div className="text-xs text-muted-foreground">Revalidate all pages</div>
                  </div>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Theme Switcher Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="h-10 w-10 rounded-xl hover:bg-slate-100/80 dark:hover:bg-slate-800/80 transition-all duration-200 hover:scale-105">
                  <div className="text-slate-600 dark:text-slate-400">
                    {getThemeIcon()}
                  </div>
                  <span className="sr-only">Change theme</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-52 border-slate-200/60 dark:border-slate-800/60 shadow-xl">
                <DropdownMenuItem
                  onClick={() => setTheme('light')}
                  className="flex items-center gap-3 py-2.5"
                >
                  <div className="w-8 h-8 rounded-lg bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center">
                    <Sun className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                  </div>
                  <div>
                    <div className="font-medium">Light Mode</div>
                    <div className="text-xs text-muted-foreground">Bright and clean</div>
                  </div>
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => setTheme('dark')}
                  className="flex items-center gap-3 py-2.5"
                >
                  <div className="w-8 h-8 rounded-lg bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
                    <Moon className="w-4 h-4 text-slate-600 dark:text-slate-400" />
                  </div>
                  <div>
                    <div className="font-medium">Dark Mode</div>
                    <div className="text-xs text-muted-foreground">Easy on the eyes</div>
                  </div>
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => setTheme('system')}
                  className="flex items-center gap-3 py-2.5"
                >
                  <div className="w-8 h-8 rounded-lg bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center">
                    <Monitor className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                  </div>
                  <div>
                    <div className="font-medium">System</div>
                    <div className="text-xs text-muted-foreground">Follow system preference</div>
                  </div>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* User Menu Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="relative h-10 w-10 rounded-xl hover:bg-slate-100/80 dark:hover:bg-slate-800/80 transition-all duration-200 hover:scale-105 ml-2">
                  <div className="h-7 w-7 rounded-lg bg-gradient-to-br from-emerald-500 to-emerald-600 flex items-center justify-center shadow-lg">
                    <User className="h-4 w-4 text-white" />
                  </div>
                  <span className="sr-only">Open user menu</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-72 border-slate-200/60 dark:border-slate-800/60 shadow-xl">
                <DropdownMenuLabel className="font-normal p-0">
                  <div className="flex items-center gap-4 p-4 bg-gradient-to-r from-emerald-50/50 to-emerald-100/50 dark:from-emerald-900/20 dark:to-emerald-800/20 rounded-t-lg">
                    <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-emerald-500 to-emerald-600 flex items-center justify-center shadow-lg">
                      <User className="h-6 w-6 text-white" />
                    </div>
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-semibold leading-none">{user.name}</p>
                      <p className="text-xs leading-none text-muted-foreground">{user.email}</p>
                      <div className="flex items-center gap-1 mt-1">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <span className="text-xs text-green-600 dark:text-green-400 font-medium">Online</span>
                      </div>
                    </div>
                  </div>
                </DropdownMenuLabel>
                <div className="p-2">
                  <DropdownMenuItem asChild>
                    <Link href="/admin" className="flex items-center gap-3 cursor-pointer py-2.5 px-3 rounded-lg">
                      <div className="w-8 h-8 rounded-lg bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center">
                        <LayoutDashboard className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                      </div>
                      <div>
                        <div className="font-medium">Dashboard</div>
                        <div className="text-xs text-muted-foreground">Overview and stats</div>
                      </div>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/admin/settings" className="flex items-center gap-3 cursor-pointer py-2.5 px-3 rounded-lg">
                      <div className="w-8 h-8 rounded-lg bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
                        <Settings className="w-4 h-4 text-slate-600 dark:text-slate-400" />
                      </div>
                      <div>
                        <div className="font-medium">Settings</div>
                        <div className="text-xs text-muted-foreground">Preferences and config</div>
                      </div>
                    </Link>
                  </DropdownMenuItem>
                </div>
                <DropdownMenuSeparator className="mx-2" />
                <div className="p-2">
                  <DropdownMenuItem onClick={onLogout} className="flex items-center gap-3 text-red-600 dark:text-red-400 focus:text-red-600 dark:focus:text-red-400 py-2.5 px-3 rounded-lg">
                    <div className="w-8 h-8 rounded-lg bg-red-100 dark:bg-red-900/30 flex items-center justify-center">
                      <LogOut className="w-4 h-4 text-red-600 dark:text-red-400" />
                    </div>
                    <div>
                      <div className="font-medium">Sign out</div>
                      <div className="text-xs text-muted-foreground">End your session</div>
                    </div>
                  </DropdownMenuItem>
                </div>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default AdminNavbar
