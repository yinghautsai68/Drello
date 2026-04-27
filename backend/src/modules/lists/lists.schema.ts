import z from "zod";

export const createListSchema = z.object({
    board_id: z.number(),
    name: z.string(),
    color: z.string().optional()
});

export type CreateListType = z.infer<typeof createListSchema>;