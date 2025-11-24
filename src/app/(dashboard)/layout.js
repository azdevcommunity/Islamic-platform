"use client"

import AdminLayoutWrapper from "@/components/admin/SideBar"
import { usePathname } from 'next/navigation';

const Layout = ({ children }) => {
    const pathname = usePathname();

    const noAdminLayoutPaths = ['/admin/login', '/admin/register'];
    const useAdminLayout = pathname.startsWith('/admin') && !noAdminLayoutPaths.includes(pathname);

    return (
        <>
            {useAdminLayout ? (
                <AdminLayoutWrapper>
                    {children}
                </AdminLayoutWrapper>
            ) : (
                children
            )}
        </>
    )
}

export default Layout

