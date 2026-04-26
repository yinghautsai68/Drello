import z from "zod";

export const registerSchema = z.object({
    username: z.string(),
    password: z.string(),
    confirm_password: z.string()
});

export const loginSchema = z.object({
    username: z.string(),
    password: z.string()
});