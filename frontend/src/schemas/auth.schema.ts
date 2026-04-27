import z from "zod";

export const loginSchema = z.object({
    username: z.string().min(1, "請輸入用戶名稱"),
    password: z.string().min(1, "請輸入密碼")
});
