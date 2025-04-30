"use client";

import { useRef, useState } from "react";
import remarkGfm from "remark-gfm";
import Markdown from "react-markdown";
import AnalyzeForm from "./analyze-form";
import { Separator } from "./ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { BookPlusIcon, TextSearchIcon } from "lucide-react";
import ImproveForm from "./improve-form";

export default function SiteBody() {
  const resultRef = useRef<HTMLDivElement>(null);
  const [result, setResult] = useState("");

  return (
    <>
      <section className="max-w-[1536px] mx-auto p-6">
        <Tabs defaultValue="analyze">
          <TabsList>
            <TabsTrigger value="analyze" className="px-6">
              <p className="flex flex-row items-center gap-1">
                <TextSearchIcon />
                <span>Analyze CV</span>
              </p>
            </TabsTrigger>
            <TabsTrigger value="improve" className="px-6">
              <p className="flex flex-row items-center gap-1">
                <BookPlusIcon />
                <span>Improve CV</span>
              </p>
            </TabsTrigger>
          </TabsList>
          <TabsContent value="analyze" className="py-4">
            <div>
              <div className="space-y-2 mb-4 max-w-xl">
                <h2 className="font-medium text-lg">Analyze CV</h2>
                <p className="text-sm">
                  Provide a detailed evaluation of how well your skills and
                  experience match the requirements of a specific position,
                  delivering a structured and quantitative analysis to aid in
                  hiring decisions.
                </p>
              </div>
              <AnalyzeForm
                onSuccess={(result) => {
                  setResult(result);
                  resultRef.current?.scrollTo({ behavior: "smooth" });
                }}
                onClear={() => {
                  setResult("");
                }}
              />
            </div>
          </TabsContent>
          <TabsContent value="improve" className="py-4">
            <div>
              <div className="space-y-2 mb-4 max-w-xl">
                <h2 className="font-medium text-lg">Improve CV</h2>
                <p className="text-sm">
                  Optimize your CV to better align with the target job
                  description while maintaining complete honesty about your
                  actual skills and experience.
                </p>
              </div>
              <ImproveForm
                onSuccess={(result) => {
                  setResult(result);
                  resultRef.current?.scrollTo({ behavior: "smooth" });
                }}
                onClear={() => {
                  setResult("");
                }}
              />
            </div>
          </TabsContent>
        </Tabs>
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
