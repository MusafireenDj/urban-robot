import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: 6 }).map((_, i) => (
        <Card key={i} className="flex flex-col">
          <Skeleton className="w-full h-48 rounded-md" />
          <CardHeader>
            <Skeleton className="h-8 w-32 rounded-md" />
          </CardHeader>
          <CardContent className="flex-grow">
            <Skeleton className="h-4 w-48 rounded-md" />
            <Skeleton className="h-4 w-32 rounded-md mt-2" />
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
