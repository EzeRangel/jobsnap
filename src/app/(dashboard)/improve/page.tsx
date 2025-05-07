import { Metadata } from "next";
import { SiteHeader } from "~/components/site-header";
import PageBody from "./_components/page-body";

export const metadata: Metadata = {
  title: "Job Snap | A CV/Job Compatibility Analysis Tool",
  description:
    "Our CV-Job Compatibility Analyzer uses advanced AI technology to provide you with precise, data-driven insights into how well your qualifications align with job requirements—all from simple text input.",
};

export default function ImprovePage() {
  return (
    <main className="w-full">
      <SiteHeader title="Improve CV" />
      <PageBody />
    </main>
  );
}
