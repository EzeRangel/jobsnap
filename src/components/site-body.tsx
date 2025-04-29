"use client";

import { useRef, useState } from "react";
import remarkGfm from "remark-gfm";
import Markdown from "react-markdown";
import AnalyzeForm from "./analyze-form";
import { Separator } from "./ui/separator";

export default function SiteBody() {
  const resultRef = useRef<HTMLDivElement>(null);
  const [result, setResult] = useState("");

  return (
    <>
      <section className="max-w-[1536px] mx-auto p-6">
        <AnalyzeForm
          onSuccess={(result) => {
            setResult(result);
            resultRef.current?.scrollTo({ behavior: "smooth" });
          }}
          onClear={() => {
            setResult("");
          }}
        />
      </section>
      <Separator />
      <section
        ref={resultRef}
        id="results"
        className="max-w-[1536px] mx-auto p-6"
      >
        {result !== "" ? (
          <div className="prose max-w-full">
            <Markdown remarkPlugins={[remarkGfm]}>{result}</Markdown>
          </div>
        ) : null}
      </section>
    </>
  );
}
