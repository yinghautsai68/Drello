import type { Request, Response } from "express";
import { createBoardSchema, updateBoardSchema } from "./boards.schema";
import { createBoard, deleteBoard, getBoards, updateBoard } from "./boards.service";

export const handleCreateBoard = async (req: Request, res: Response) => {
    const { user_id } = (req as any).user;
    const result = createBoardSchema.safeParse(req.body);
    if (!result.success) {
        return res.status(400).json({ success: false, message: `所輸入資料有誤` });
    }
    const { name, color, image_url } = result.data;

    try {
        await createBoard(user_id, { name, color, image_url });
        res.status(201).json({ success: true, message: `建立Board成功` });

    } catch (error: any) {
        console.error(error);
        if (error.message === 'CREATE_BOARD_FAILED') {
            return res.status(400).json({ success: false, message: `建立Board失敗` });
        }
        res.status(500).json({ success: false, message: `SERVER ERROR` });
    }
}

export const handleGetBoards = async (req: Request, res: Response) => {
    try {
        const data = await getBoards();
        res.status(200).json({ success: true, message: `取得boards成功`, data: data });
    } catch (error: any) {
        console.error(error);
        res.status(500).json({ success: false, message: `SERVER ERROR` });
    }
}

export const handleUpdateBoard = async (req: Request, res: Response) => {
    const { id } = req.params;

    const result = updateBoardSchema.safeParse(req.body);
    if (!result.success) {
        return res.status(400).json({ success: false, message: `所輸入資料有誤` });
    }
    const { name, color, image_url } = result.data;

    try {
        await updateBoard(id as string, { name, color, image_url });
        res.status(200).json({ success: true, message: `更新board成功` });
    } catch (error: any) {
        console.error(error);
        if (error.message === 'BOARD_NOT_FOUND') {
            return res.status(404).json({ success: false, message: "找不到該board" });
        }
        res.status(500).json({ success: false, message: `SERVER ERROR` });
    }
}

export const handleDeleteBoard = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
        await deleteBoard(id as string);
        res.status(200).json({ success: true, message: `刪除Board成功` });
    } catch (error: any) {
        console.error(error);
        if (error.message === 'BOARD_NOT_FOUND') {
            return res.status(404).json({ success: false, message: `Board不存在` });
        }
        res.status(500).json({ success: false, message: `SERVER ERROR` });
    }
}