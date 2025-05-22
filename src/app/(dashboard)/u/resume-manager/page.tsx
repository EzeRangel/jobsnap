import { UploadResume } from "./_components/upload-resume";
import { UploadsTable } from "./_components/uploads-table";

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
        <UploadsTable />
      </div>
    </>
  );
}
