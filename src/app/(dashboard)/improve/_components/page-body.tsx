"use client";

import { useRef, useState } from "react";
import remarkGfm from "remark-gfm";
import Markdown from "react-markdown";
import ImproveForm from "~/components/improve-form";
import { Separator } from "~/components/ui/separator";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";

export default function PageBody() {
  const resultRef = useRef<HTMLDivElement>(null);
  const [result, setResult] = useState("");

  return (
    <>
      <section className="max-w-[1536px] mx-auto p-6">
        <Card>
          <CardHeader>
            <CardTitle>Enhance Your Resume</CardTitle>
            <CardDescription>
              Refine your resume to better match the job you want, while staying
              true to your actual skills and experience. Our suggestions help
              you highlight relevant strengths without embellishment.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ImproveForm
              onSuccess={(result) => {
                setResult(result);
                resultRef.current?.scrollTo({ behavior: "smooth" });
              }}
              onClear={() => {
                setResult("");
              }}
            />
          </CardContent>
        </Card>
      </section>
      <Separator />
      <section
        ref={resultRef}
        id="results"
        className="max-w-[1536px] mx-auto p-6"
      >
        {result !== "" ? (
          <Card className="p-6">
            <div className="prose max-w-full">
              <Markdown remarkPlugins={[remarkGfm]}>{result}</Markdown>
            </div>
          </Card>
        ) : null}
      </section>
    </>
  );
}
