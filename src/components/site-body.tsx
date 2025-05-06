"use client";

import { useRef, useState } from "react";
import remarkGfm from "remark-gfm";
import Markdown from "react-markdown";
import AnalyzeForm from "./analyze-form";
import { Separator } from "./ui/separator";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";

export default function SiteBody() {
  const resultRef = useRef<HTMLDivElement>(null);
  const [result, setResult] = useState("");

  return (
    <>
      <section className="max-w-[1536px] mx-auto p-6">
        <Card>
          <CardHeader>
            <CardTitle>Match Your Resume to the Job</CardTitle>
            <CardDescription>
              Discover how well your profile matches with the position
              you&apos;re interested in. Get a detailed analysis that helps you
              understand your strengths and areas for improvement for this
              specific role.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <AnalyzeForm
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
