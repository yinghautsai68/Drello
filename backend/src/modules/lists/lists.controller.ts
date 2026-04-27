import type { Request, Response } from "express";
import { createListSchema } from "./lists.schema";
import { createList, deleteList, getLists } from "./lists.services";
import { success } from "zod";

export const handleCreateList = async (req: Request, res: Response) => {
    const result = createListSchema.safeParse(req.body);
    if (!result.success) {
        return res.status(400).json({ success: false, message: `所輸入資料有誤` });
    }
    const { board_id, name, color } = result.data;
    try {
        await createList({ board_id, name, color });
        res.status(201).json({ success: true, message: `建立list成功` });
    } catch (error: any) {
        console.error(error);
        if (error.message === 'CREATE_LIST_FAILED') {
            return res.status(400).json({ success: false, message: `建立list失敗` });
        }
        res.status(500).json({ success: false, message: `SERVER ERROR` });
    }
};

export const handleGetLists = async (req: Request, res: Response) => {
    try {
        const data = await getLists();
        res.status(200).json({ success: true, messaeg: `取得lists成功`, data: data });
    } catch (error: any) {
        console.error(error);
        res.status(500).json({ success: false, message: `SERVER ERROR` });
    }
}

export const handleDeleteList = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
        await deleteList(id as string);
        res.status(200).json({ success: true, message: `刪除list成功` });
    } catch (error: any) {
        console.error(error);
        if (error.message === 'LIST_NOT_FOUND') {
            res.status(404).json({ success: false, message: `該list不存在` });
        }
        res.status(500).json({ success: false, message: `SERVER ERROR` });
    }
}