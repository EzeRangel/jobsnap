"use client";

import { useRef } from "react";
import useMutation from "~/hooks/useMutation";
import Submit from "./forms/submit";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { improveCV } from "~/common/actions/improve-cv";

interface Props {
  onSuccess: (result: string) => void;
  onClear: () => void;
}

export default function ImproveForm({ onSuccess, onClear }: Props) {
  const ref = useRef<HTMLFormElement>(null);
  const { execute, input } = useMutation(improveCV, {
    onSuccess,
  });

  const currentCV = input && input instanceof FormData ? input.get("cv") : "";

  return (
    <form ref={ref} action={execute}>
      <div className="grid grid-cols-12 gap-6">
        <div className="col-span-12 md:col-span-6">
          <div className="grid w-full gap-2">
            <Label htmlFor="cv">Your CV</Label>
            <span className="text-sm text-muted-foreground">
              Include your experience, skills, and education for better analysis
            </span>
            <Textarea
              placeholder="Paste your CV/resume"
              id="cv"
              name="cv"
              required
              defaultValue={currentCV as string}
              className="h-[250px] resize-none"
            />
          </div>
        </div>
        <div className="col-span-12 md:col-span-6">
          <div className="grid w-full gap-1.5">
            <Label htmlFor="description">Job description</Label>
            <span className="text-sm text-muted-foreground">
              The more detailed the description, the more accurate your results
              will be
            </span>
            <Textarea
              placeholder="Paste the job description you're interested"
              id="description"
              name="description"
              required
              className="h-[250px] resize-none"
            />
          </div>
        </div>
        <div className="col-span-12">
          <div className="flex flex-row items-center gap-3">
            <Submit>Generate improvements</Submit>
            <Button
              type="button"
              variant="secondary"
              onClick={() => {
                ref.current?.reset();
                onClear();
              }}
            >
              Clear
            </Button>
          </div>
        </div>
      </div>
    </form>
  );
}
