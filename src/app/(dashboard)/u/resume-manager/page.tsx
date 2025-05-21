import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { Input } from "~/components/ui/input";
import { UploadResume } from "./_components/upload-resume";

export default async function ResumeManagerPage() {
  return (
    <>
      <header className="border-b border-border pb-3 col-span-12 mb-10">
        <h1 className="text-3xl/normal font-bold text-foreground">
          Resume Manager
        </h1>
        <p className="text-lg text-muted-foreground">
          Upload, manage and keep track of your CVs
        </p>
      </header>
      <div className="flex flex-col gap-6">
        <UploadResume />
        <div className="grid grid-cols-12 gap-4">
          <Card className="col-span-6 md:col-span-3">
            <CardHeader>
              <CardTitle>Documents</CardTitle>
            </CardHeader>
            <CardContent>
              <Input readOnly defaultValue="120 items" />
            </CardContent>
            <CardFooter>
              <small>Last update: 10 days ago</small>
            </CardFooter>
          </Card>
          <Card className="col-span-6 md:col-span-3">
            <CardHeader>
              <CardTitle>Downloads</CardTitle>
            </CardHeader>
            <CardContent>
              <Input readOnly defaultValue="80 items" />
            </CardContent>
            <CardFooter>
              <small>Last update: Yesterday</small>
            </CardFooter>
          </Card>
          <Card className="col-span-6">
            <CardHeader>
              <CardTitle>Storage Space Used</CardTitle>
              <CardDescription>See your remaining file storage</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-row justify-between">
              <span className="text-sm">180Mib used</span>
              <span className="text-sm">3Gib total</span>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
}
