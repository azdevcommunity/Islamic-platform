'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

const AdminDashboardPage = () => {
  const router = useRouter();

  useEffect(() => {
    // Check login status from localStorage
    const isLoggedIn = localStorage.getItem('isAdminLoggedIn') === 'true';
    if (!isLoggedIn) {
      router.push('/admin/login'); // Redirect to login if not logged in
    }
  }, [router]);

  // Optional: Add a loading state or return null while checking auth
  // This prevents briefly showing the admin content before redirecting
  if (typeof window !== 'undefined' && localStorage.getItem('isAdminLoggedIn') !== 'true') {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="space-y-4">
          <Skeleton className="h-12 w-[250px]" />
          <Skeleton className="h-4 w-[200px]" />
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 p-6">
      <Card>
        <CardHeader>
          <CardTitle>Admin Dashboard</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            Welcome to the admin dashboard. Use the sidebar to navigate through different sections.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminDashboardPage; 