'use client';

import { Card, CardContent, CardHeader } from '@/components/ui/card';

const QuestionsPageSkeleton = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 p-4 md:p-8 space-y-8 animate-pulse">
      {/* Header Skeleton */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="space-y-2">
            <div className="h-10 bg-gradient-to-r from-muted to-muted/50 rounded-lg w-80" />
            <div className="h-5 bg-muted rounded w-96" />
          </div>
          <div className="flex gap-3">
            <div className="h-9 bg-muted rounded w-20" />
            <div className="h-9 bg-muted rounded w-24" />
          </div>
        </div>
      </div>

      {/* Statistics Cards Skeleton */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {Array.from({ length: 4 }).map((_, index) => (
          <Card key={index} className="border-2 shadow-lg">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
              <div className="space-y-2">
                <div className="h-4 bg-muted rounded w-24" />
                <div className="flex items-center gap-2">
                  <div className="h-8 bg-muted rounded w-16" />
                  <div className="h-5 bg-muted rounded w-12" />
                </div>
              </div>
              <div className="w-12 h-12 bg-muted rounded-xl" />
            </CardHeader>
          </Card>
        ))}
      </div>

      {/* Search and Filter Skeleton */}
      <Card className="border-2 shadow-lg">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-muted rounded-lg" />
              <div className="space-y-2">
                <div className="h-6 bg-muted rounded w-32" />
                <div className="h-4 bg-muted rounded w-48" />
              </div>
            </div>
            <div className="flex gap-2">
              <div className="h-8 bg-muted rounded w-16" />
              <div className="h-8 bg-muted rounded w-20" />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4">
            <div className="flex-1 h-12 bg-muted rounded" />
            <div className="h-12 bg-muted rounded w-32" />
          </div>
        </CardContent>
      </Card>

      {/* Questions Grid Skeleton */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, index) => (
          <Card key={index} className="border-2">
            <CardHeader className="pb-3">
              <div className="space-y-2">
                <div className="h-4 bg-muted rounded w-full" />
                <div className="h-4 bg-muted rounded w-3/4" />
                <div className="h-3 bg-muted rounded w-full" />
                <div className="h-3 bg-muted rounded w-2/3" />
              </div>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="space-y-3">
                <div className="space-y-2">
                  <div className="h-3 bg-muted rounded w-20" />
                  <div className="flex gap-1">
                    <div className="h-5 bg-muted rounded w-16" />
                    <div className="h-5 bg-muted rounded w-20" />
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="h-3 bg-muted rounded w-16" />
                  <div className="flex gap-1">
                    <div className="h-5 bg-muted rounded w-14" />
                    <div className="h-5 bg-muted rounded w-18" />
                    <div className="h-5 bg-muted rounded w-16" />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default QuestionsPageSkeleton;