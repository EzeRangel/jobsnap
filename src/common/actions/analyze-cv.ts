"use server";

import { z } from "zod";
import { zfd } from "zod-form-data";
import { generateText } from "ai";
import { actionClient } from "~/lib/safe-action/create-action-client";
import groq from "~/ai";
import { SYSTEM_PROMPT } from "~/ai/prompts/system-prompt";

const schema = zfd.formData({
  cv: zfd.text(z.string({ required_error: "Please type your cv" })),
  description: zfd.text(
    z.string({ required_error: "The job description is required" })
  ),
});

export const analyzeCV = actionClient
  .schema(schema)
  .action(async ({ parsedInput }) => {
    const { text } = await generateText({
      model: groq("llama-3.3-70b-versatile"),
      system: SYSTEM_PROMPT,
      temperature: 0.7,
      maxTokens: 4096,
      prompt: `
        #CV
        ${parsedInput.cv}

        #JOB DESCRIPTION
        ${parsedInput.description}
      `,
    });

    return text;
  });
