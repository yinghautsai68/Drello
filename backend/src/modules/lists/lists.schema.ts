import z from "zod";

export const createListSchema = z.object({
    board_id: z.number(),
    name: z.string(),
    color: z.string().optional()
});

export type CreateListType = z.infer<typeof createListSchema>;

export const updateListSchema = z.object({
    board_id: z.number().optional(),
    position: z.number().optional(),
    name: z.string().optional(),
    color: z.string().optional(),
});

export type UpdateListType = z.infer<typeof updateListSchema>;