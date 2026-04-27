import { db } from "../../config/db"
import type { UpdateBoardType } from "../boards/boards.schema";
import type { CreateListType, UpdateListType } from "./lists.schema";

export const createList = async ({ board_id, name, color }: CreateListType) => {
    const [result]: any = await db.query(
        `
        INSERT INTO lists (board_id, name, position, color)
        VALUES (?,?,?,?)
        `,
        [board_id, name, 0, color]
    );
    if (result.affectedRows === 0) {
        throw new Error(`CREATE_LIST_FAILED`);
    }

    return result.insertId;
};

export const getLists = async () => {
    const [result]: any = await db.query(
        `SELECT * FROM lists`
    );

    return result;
};

export const updateList = async (list_id: string, form: UpdateListType) => {
    const [result]: any = await db.query(
        `UPDATE lists SET
            board_id = COALESCE(?, board_id),
            position = COALESCE(?, position),
            name = COALESCE(?, name),
            color = COALESCE(?,color)
        WHERE id = ?
        `,
        [form.board_id ?? null, form.position ?? null, form.name ?? null, form.color ?? null, list_id]
    );

    if (result.affectedRows === 0) {
        throw new Error(`CARD_NOT_FOUND`);
    }

    return true;
}

export const deleteList = async (list_id: string) => {
    const [result]: any = await db.query(
        `DELETE FROM lists WHERE id = ?`,
        [list_id]
    );

    if (result.affectedRows === 0) {
        throw new Error(`LIST_NOT_FOUND`);
    }
    return true;
}
