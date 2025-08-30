'use client';

import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

const DashboardSkeleton = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 p-4 md:p-8 space-y-8 animate-pulse transition-colors duration-300">
      {/* Header Skeleton */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="space-y-2">
            <div className="h-10 bg-gradient-to-r from-muted to-muted/50 rounded-lg w-80"></div>
            <div className="h-5 bg-muted rounded w-64"></div>
          </div>
          <div className="h-5 bg-muted rounded w-32"></div>
        </div>
      </div>

      {/* Statistics Cards Skeleton */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {Array.from({ length: 4 }).map((_, index) => (
          <Card key={index} className="border-2 shadow-lg">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
              <div className="space-y-2">
                <div className="h-4 bg-muted rounded w-20"></div>
                <div className="flex items-center gap-2">
                  <div className="h-8 bg-muted rounded w-16"></div>
                  <div className="h-5 bg-muted rounded w-10"></div>
                </div>
              </div>
              <div className="w-12 h-12 bg-muted rounded-xl"></div>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="h-9 bg-muted rounded w-full"></div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Content Overview and Quick Actions Skeleton */}
      <div className="grid gap-8 lg:grid-cols-3">
        {/* Statistics Overview Skeleton */}
        <Card className="lg:col-span-2 border-2 shadow-lg">
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-muted rounded-lg"></div>
                <div className="space-y-2">
                  <div className="h-6 bg-muted rounded w-32"></div>
                  <div className="h-4 bg-muted rounded w-48"></div>
                </div>
              </div>
              <div className="h-8 bg-muted rounded w-24"></div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 sm:grid-cols-2">
              {Array.from({ length: 4 }).map((_, index) => (
                <div key={index} className="p-4 rounded-xl border-2 border-dashed border-muted">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-muted rounded-lg"></div>
                      <div className="space-y-2">
                        <div className="h-4 bg-muted rounded w-20"></div>
                        <div className="h-6 bg-muted rounded w-16"></div>
                      </div>
                    </div>
                    <div className="w-6 h-6 bg-muted rounded"></div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions Skeleton */}
        <Card className="border-2 shadow-lg">
          <CardHeader className="pb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-muted rounded-lg"></div>
              <div className="space-y-2">
                <div className="h-6 bg-muted rounded w-32"></div>
                <div className="h-4 bg-muted rounded w-40"></div>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {Array.from({ length: 4 }).map((_, index) => (
                <div key={index} className="h-12 bg-muted rounded"></div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity Skeleton */}
      <div className="grid gap-8 lg:grid-cols-2">
        {Array.from({ length: 2 }).map((_, cardIndex) => (
          <Card key={cardIndex} className="border-2 shadow-lg">
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-muted rounded-lg"></div>
                  <div className="space-y-2">
                    <div className="h-6 bg-muted rounded w-32"></div>
                    <div className="h-4 bg-muted rounded w-48"></div>
                  </div>
                </div>
                <div className="h-5 bg-muted rounded w-16"></div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {Array.from({ length: 3 }).map((_, itemIndex) => (
                  <div key={itemIndex} className="p-4 rounded-xl border-2 border-dashed border-muted">
                    <div className="flex items-start justify-between">
                      <div className="flex-1 space-y-2">
                        <div className="h-4 bg-muted rounded w-3/4"></div>
                        <div className="h-3 bg-muted rounded w-1/2"></div>
                        <div className="h-3 bg-muted rounded w-1/3"></div>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-12 h-6 bg-muted rounded"></div>
                        <div className="w-6 h-6 bg-muted rounded"></div>
                      </div>
                    </div>
                  </div>
                ))}
                <div className="h-9 bg-muted rounded w-full mt-4"></div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default DashboardSkeleton;