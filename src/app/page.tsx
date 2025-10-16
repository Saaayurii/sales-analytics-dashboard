import Link from "next/link";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ImportButton } from "@/components/import/ImportButton";
import { ArrowRight, BarChart3, TrendingUp, Users } from "lucide-react";

const HomePage = async () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-950">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold tracking-tight mb-4">
            Sales Analytics Dashboard
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Comprehensive sales analytics with real-time data visualization, performance tracking, and actionable insights
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 max-w-5xl mx-auto">
          <Card>
            <CardHeader>
              <BarChart3 className="h-10 w-10 mb-2 text-primary" />
              <CardTitle>Real-time Analytics</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Track sales performance with live data updates and interactive charts
              </CardDescription>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <TrendingUp className="h-10 w-10 mb-2 text-primary" />
              <CardTitle>Performance Metrics</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Monitor KPIs, revenue trends, and category performance at a glance
              </CardDescription>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <Users className="h-10 w-10 mb-2 text-primary" />
              <CardTitle>Manager Insights</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Analyze manager performance and identify top performers
              </CardDescription>
            </CardContent>
          </Card>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link href="/dashboard">
            <Button size="lg" className="gap-2">
              View Dashboard
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
          <ImportButton />
        </div>

        <div className="mt-16 text-center">
          <Card className="max-w-2xl mx-auto">
            <CardHeader>
              <CardTitle>Getting Started</CardTitle>
            </CardHeader>
            <CardContent className="text-left space-y-3">
              <p className="text-muted-foreground">
                <span className="font-semibold">1. Import Data:</span> Upload your CSV files (sales, managers, prices) to populate the dashboard
              </p>
              <p className="text-muted-foreground">
                <span className="font-semibold">2. View Analytics:</span> Navigate to the dashboard to see comprehensive sales insights
              </p>
              <p className="text-muted-foreground">
                <span className="font-semibold">3. Apply Filters:</span> Customize your view by filtering data by manager, time period, or category
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
