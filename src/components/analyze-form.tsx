"use client";

import useMutation from "~/hooks/useMutation";
import Submit from "./forms/submit";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { analyzeCV } from "~/common/actions/analyze-cv";

interface Props {
  onSuccess: (result: string) => void;
}

export default function AnalyzeForm({ onSuccess }: Props) {
  const { execute } = useMutation(analyzeCV, {
    onSuccess,
  });

  return (
    <form action={execute}>
      <div className="grid grid-cols-12 gap-6">
        <div className="col-span-6">
          <div className="grid w-full gap-1.5">
            <Label htmlFor="cv">Your CV</Label>
            <Textarea
              placeholder="Paste your current CV here"
              id="cv"
              name="cv"
              required
              className="h-[250px] resize-none"
            />
          </div>
        </div>
        <div className="col-span-6">
          <div className="grid w-full gap-1.5">
            <Label htmlFor="description">Job description</Label>
            <Textarea
              placeholder="Paste the job description you're applying"
              id="description"
              name="description"
              required
              className="h-[250px] resize-none"
            />
          </div>
        </div>
        <div className="col-span-12">
          <div className="flex flex-row items-center gap-3">
            <Submit>Analyze CV</Submit>
            <Button variant="secondary">Clear</Button>
          </div>
        </div>
      </div>
    </form>
  );
}
