import z from "zod";

export const createCardSchema = z.object({
    list_id: z.number(),
    name: z.string(),
    position: z.number(),
    color: z.string()
});

export type CreateCardType = z.infer<typeof createCardSchema>;

export const updateCardSchema = z.object({
    list_id: z.number().optional(),
    name: z.string().optional(),
    position: z.number().optional(),
    color: z.string().optional()
});

export type UpdateCardType = z.infer<typeof updateCardSchema>;
