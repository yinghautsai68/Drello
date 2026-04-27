import type { Request, Response } from "express";
import { success } from "zod";
import { createCardSchema, updateCardSchema } from "./cards.schema";
import { createCard, deleteCard, getCards, updateCard } from "./cards.services";

export const handleCreateCard = async (req: Request, res: Response) => {
    const result = createCardSchema.safeParse(req.body);
    if (!result.success) {
        return res.status(400).json({ success: false, message: `所輸入有誤` });
    }
    const form = result.data;
    try {
        const data = await createCard(form);
        res.status(201).json({ success: true, message: `建立card成功`, data: data });
    } catch (error: any) {
        console.error(error);
        if (error.message === 'CREATE_CARD_FAILED') {
            return res.status(400).json({ success: false, message: `建立card失敗` });
        }
        res.status(500).json({ success: false, message: `SERVER ERROR` });
    }
}

export const handleGetCards = async (req: Request, res: Response) => {
    try {
        const data = await getCards();
        res.status(200).json({ success: true, message: `取得cards成功`, data: data });
    } catch (error: any) {
        console.error(error);
        res.status(500).json({ success: false, message: `SERVER ERROR` });
    }
}

export const handleUpdateCard = async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = updateCardSchema.safeParse(req.body);
    if (!result.success) {
        return res.status(400).json({ success: false, message: `所輸入的資料有誤` });
    }
    const form = result.data;
    try {
        const data = await updateCard(id as string, form);
        res.status(200).json({ success: true, message: `更新card成功`, data: data });
    } catch (error: any) {
        console.error(error);
        if (error.message === 'UPDATE_CARD_FAILED') {
            return res.status(400).json({ success: false, message: `更新card失敗` });
        }
        res.status(500).json({ success: false, message: `SERVER ERROR` });
    }
}


export const handleDeleteCard = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const data = await deleteCard(id as string);
        res.status(200).json({ success: true, message: `刪除card成功`, data: data });
    } catch (error: any) {
        console.error(error);
        if (error.message === 'DELETE_CARD_FAILED') {
            return res.status(400).json({ success: false, message: `刪除card失敗` });
        }
        res.status(500).json({ success: false, message: `SERVER ERROR` });
    }
}