import { z } from "zod";

export const safeActionResponseSchema = <Data extends z.ZodTypeAny>(
  dataSchema: Data
) =>
  z
    .object({
      result: dataSchema.optional(),
      error: z.unknown().optional(),
      id: z.number().optional(),
    })
    .refine(
      (data) => {
        if (!data.error) {
          // Si success es true, result debe estar definido y error debe ser undefined
          return data.result !== undefined;
        } else {
          // Si success es false, error debe estar definido y result debe ser undefined
          return data.result === undefined;
        }
      },
      {
        message:
          "Respuesta inválida: success, result, y error deben estar correctamente estructurados",
      }
    );
