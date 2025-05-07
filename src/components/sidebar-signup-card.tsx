import Link from "next/link";
import { Button } from "./ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";

export function SidebarSignupCard() {
  return (
    <Card className="shadow-none p-0 gap-0">
      <CardHeader className="p-4 pb-0">
        <CardTitle className="text-sm">Create a free account</CardTitle>
        <CardDescription>
          Unlock more AI analysis, store multiple resumes and track your
          improvement over time.
        </CardDescription>
      </CardHeader>
      <CardContent className="p-4">
        <Button
          asChild
          variant="outline"
          className="w-full shadow-none"
          size="sm"
        >
          <Link href="/login">Create a free account</Link>
        </Button>
      </CardContent>
    </Card>
  );
}
