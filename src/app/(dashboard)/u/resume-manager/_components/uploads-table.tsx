import { FileStackIcon } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import EmptyTable from "./empty-table";

export async function UploadsTable() {
  return (
    <section className="grid grid-cols-12 gap-6">
      <aside className="col-span-12">
        <h2 className="text-xl/normal font-bold text-foreground">Your files</h2>
      </aside>
      <Card className="col-span-12">
        <CardHeader>
          <div className="flex flex-row gap-2">
            <span className="size-8 rounded-full flex items-center justify-center bg-primary/20 text-primary">
              <FileStackIcon className="size-4" />
            </span>
            <div>
              <CardTitle>Your CVs</CardTitle>
              <CardDescription>
                Keep track of all your resumes and cvs in a single place
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <EmptyTable />
        </CardContent>
      </Card>
    </section>
  );
}
