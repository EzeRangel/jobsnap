import {
  FileSearchIcon,
  FoldersIcon,
  LockKeyholeOpenIcon,
  TrendingUpIcon,
} from "lucide-react";
import { SignupForm } from "./_components/signup-form";
import Link from "next/link";

export default function SignupPage() {
  return (
    <div className="bg-muted flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
      <div className="flex w-full max-w-4xl flex-row gap-6">
        <div className="flex flex-col gap-6">
          <Link href="/">
            <div className="bg-primary text-primary-foreground flex size-8 items-center justify-center rounded-md">
              <FileSearchIcon className="size-6" />
            </div>
          </Link>
          <h1 className="font-bold text-3xl">Create a free account</h1>
          <p className="text-muted-foreground">
            Level Up Your Job Hunt with Pro Tools and Insights
          </p>
          <ul className="space-y-6">
            <li className="flex flex-row gap-2">
              <LockKeyholeOpenIcon className="shrink-0" />
              <p className="text-sm text-muted-foreground">
                <strong className="block text-base text-foreground mb-3">
                  Unlock Full AI Insights
                </strong>
                Get deeper, more personalized analysis to boost your job match
                potential.
              </p>
            </li>
            <li className="flex flex-row gap-2">
              <FoldersIcon className="shrink-0" />
              <p className="text-sm text-muted-foreground">
                <strong className="block text-base text-foreground mb-3">
                  Save & Manage Multiple Resumes
                </strong>
                Keep all your CV versions in one place for easy access and
                comparison.
              </p>
            </li>
            <li className="flex flex-row gap-2">
              <TrendingUpIcon className="shrink-0" />
              <p className="text-sm text-muted-foreground">
                <strong className="block text-base text-foreground mb-3">
                  Track Your Progress Over Time
                </strong>
                See how your resume improves with every tweak and suggestion.
              </p>
            </li>
          </ul>
        </div>
        <div className="flex w-full max-w-sm flex-col gap-6">
          <SignupForm />
        </div>
      </div>
    </div>
  );
}
