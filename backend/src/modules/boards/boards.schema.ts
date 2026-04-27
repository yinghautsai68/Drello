import z from "zod";

export const createBoardSchema = z.object({
    name: z.string(),
    color: z.string(),
    image_url: z.string().optional(),
});
export type CreateBoardType = z.infer<typeof createBoardSchema>;

export const updateBoardSchema = z.object({
    name: z.string().optional(),
    color: z.string().optional(),
    image_url: z.string().optional()
});
export type UpdateBoardType = z.infer<typeof updateBoardSchema>;