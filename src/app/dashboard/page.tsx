import { Suspense } from "react";
import { Dashboard } from "@/components/dashboard/Dashboard";
import { getAnalyticsData } from "@/actions/get-analytics";
import { getManagers } from "@/actions/get-sales-data";
import type { AnalyticsData, Manager } from "@/types";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

// Force dynamic rendering (no static generation)
export const dynamic = 'force-dynamic';
export const revalidate = 0;

const DashboardLoadingSkeleton = () => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {Array.from({ length: 4 }).map((_, i) => (
          <Card key={i}>
            <CardHeader>
              <Skeleton className="h-4 w-24" />
            </CardHeader>
            <CardContent>
              <Skeleton className="h-8 w-32 mb-2" />
              <Skeleton className="h-3 w-20" />
            </CardContent>
          </Card>
        ))}
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {Array.from({ length: 4 }).map((_, i) => (
          <Card key={i}>
            <CardHeader>
              <Skeleton className="h-6 w-40" />
            </CardHeader>
            <CardContent>
              <Skeleton className="h-[400px] w-full" />
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

type DashboardContentProps = {
  initialData: AnalyticsData;
  managers: Manager[];
};

const DashboardContent = ({ initialData, managers }: DashboardContentProps) => {
  return <Dashboard initialData={initialData} managers={managers} />;
};

const DashboardPage = async () => {
  const [initialData, managers] = await Promise.all([
    getAnalyticsData({}),
    getManagers(),
  ]);

  return (
    <Suspense fallback={<DashboardLoadingSkeleton />}>
      <DashboardContent initialData={initialData} managers={managers} />
    </Suspense>
  );
};

export default DashboardPage;
