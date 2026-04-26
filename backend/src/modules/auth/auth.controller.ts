import type { Request, Response } from "express";
import { loginSchema, registerSchema } from "./auth.schema";
import { login, register } from "./auth.services";
export const handleRegister = async (req: Request, res: Response) => {
    const result = registerSchema.safeParse(req.body);
    if (!result.success) {
        return res.status(400).json({ success: false, message: `所輸入資料有誤` })
    }

    const { username, password, confirm_password } = result.data;
    if (password !== confirm_password) {
        return res.status(400).json({ success: false, message: "密碼不一致" });
    }

    try {
        await register(username, password);
        res.status(201).json({ success: true, message: `註冊成功` });
    } catch (error: any) {
        if (error.message === 'USERNAME_EXISTS') {
            return res.status(400).json({ success: false, message: `用戶名稱已存在` });
        }
        res.status(500).json({ success: false, message: `SERVER ERROR` });
    }
}

export const handleLogin = async (req: Request, res: Response) => {
    const result = loginSchema.safeParse(req.body);
    if (!result.success) {
        return res.status(400).json({ success: false, message: `所輸入資料有誤` });
    }
    const { username, password } = result.data;
    try {
        const data = await login(username, password);
        res.status(200).json({ success: true, message: `登入成功`, data: data });

    } catch (error: any) {
        console.error(error);
        if (error.message === 'USER_NOT_FOUND') {
            return res.status(400).json({ success: false, message: `用戶不存在` });
        }
        if (error.message === 'PASSWORD_INCORRECT') {
            return res.status(400).json({ success: false, message: `密碼錯誤` });
        }
        res.status(500).json({ success: false, message: `SERVER ERROR` });
    }
}