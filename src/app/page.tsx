import { Metadata } from "next";
import SiteBody from "~/components/site-body";
import { SiteHeader } from "~/components/site-header";

export const metadata: Metadata = {
  title: "Job Snap | A CV/Job Compatibility Analysis Tool",
  description:
    "Our CV-Job Compatibility Analyzer uses advanced AI technology to provide you with precise, data-driven insights into how well your qualifications align with job requirements—all from simple text input.",
};

export default function Home() {
  return (
    <main className="w-full">
      <SiteHeader title="Analyze CV" />
      <SiteBody />
    </main>
  );
}
