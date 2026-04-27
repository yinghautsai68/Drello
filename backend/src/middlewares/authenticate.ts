import type { NextFunction, Request, Response } from "express";
import { env } from "../config/env";
import jwt from 'jsonwebtoken'

export const authenticate = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers['authorization'];
    if (!authHeader) {
        return res.status(400).json({ success: false, message: `沒有堤共headers: Authorization` });
    }
    const token = authHeader.split(' ')[1];
    if (!token) {
        return res.status(401).json({ success: false, message: `沒有堤共token` });
    }

    try {
        const payload = jwt.verify(token, env.JWT_SECRET);
        (req as any).user = payload;
        next();
    } catch (error) {
        console.error(error);
        return res.status(403).json({ success: false, message: `token有誤` });
    }
}