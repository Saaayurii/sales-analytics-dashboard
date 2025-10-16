"use client";

import { useEffect } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AlertCircle } from "lucide-react";

type ErrorProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

const ErrorPage = ({ error, reset }: ErrorProps) => {
  useEffect(() => {
    console.error("Application error:", error);
  }, [error]);

  const handleReset = () => {
    reset();
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Card className="max-w-md w-full">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-destructive/10">
            <AlertCircle className="h-6 w-6 text-destructive" />
          </div>
          <CardTitle>Something went wrong!</CardTitle>
          <CardDescription>
            An error occurred while loading the application
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-md bg-destructive/10 p-4">
            <p className="text-sm font-mono text-destructive break-words">
              {error.message || "An unexpected error occurred"}
            </p>
            {error.digest ? (
              <p className="text-xs text-muted-foreground mt-2">
                Error ID: {error.digest}
              </p>
            ) : null}
          </div>
        </CardContent>
        <CardFooter className="flex justify-center gap-4">
          <Button variant="outline" onClick={() => window.location.href = "/"}>
            Go Home
          </Button>
          <Button onClick={handleReset}>
            Try Again
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default ErrorPage;
