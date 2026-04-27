import { db } from "../../config/db"
import type { CreateListType } from "./lists.schema";

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

export const deleteList = async (list_id: string) => {
    const [result]: any = await db.query(
        `DELETE FROM lists WHERE id = ?`,
        [list_id]
    );

    if (result.affectedRows === 0) {
        throw new Error(`LIST_NOT_FOUND`);
    }
    return result.affectedRows;
}
