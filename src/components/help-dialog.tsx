"use client";

import { CircleHelpIcon } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";

export default function HelpDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <span className="flex h-full items-center gap-2">
          <CircleHelpIcon className="size-4" />
          Help
        </span>
      </DialogTrigger>
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle>How it works</DialogTitle>
        </DialogHeader>
        <div className="space-y-3">
          <ol className="list-decimal list-inside space-y-2 text-sm">
            <li>
              <strong>Input Your Information</strong>
              <p>
                Simply paste the text of your CV/resume and the job description
                you&apos;re interested in.
              </p>
            </li>
            <li>
              <strong>AI-Powered Analysis</strong>
              <p>
                The AI breaks down the content, identifying key categories such
                as technical skills, experience levels, soft skills, and
                industry knowledge.
              </p>
            </li>
            <li>
              <strong>Quantitative Matching</strong>
              <p>
                Each skill and requirement is evaluated on a percentage scale
                (0-100%), showing exactly where you&apos;re a perfect match and
                where there might be gaps.
              </p>
            </li>
            <li>
              <strong>Comprehensive Report</strong>
              <p>
                Within seconds, you&apos;ll receive a detailed compatibility
                report that includes:
              </p>
              <ul className="list-disc list-inside">
                <li>
                  A comparative table of your qualifications versus job
                  requirements
                </li>
                <li>
                  Your overall compatibility score Highlighted strengths to
                  emphasize in your application
                </li>
                <li>Identified areas for development</li>
                <li>Personalized recommendations to improve your chances</li>
              </ul>
            </li>
          </ol>
        </div>
      </DialogContent>
    </Dialog>
  );
}
