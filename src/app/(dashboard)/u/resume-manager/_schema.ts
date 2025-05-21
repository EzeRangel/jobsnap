import { z } from "zod";
import { zfd } from "zod-form-data";

export const uploadResumeSchema = zfd.formData({
  filename: zfd.text(z.string({ message: "Required field" })),
  fullPath: zfd.text(z.string({ message: "Please upload a file" })),
});
