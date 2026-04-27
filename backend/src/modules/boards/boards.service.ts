import { db } from "../../config/db";
import type { CreateBoardType, UpdateBoardType } from "./boards.schema";

export const createBoard = async (user_id: number, { name, color, image_url }: CreateBoardType) => {
    const [insertResult]: any = await db.query(
        `INSERT INTO boards (user_id, name, color, image_url) VALUES (1,?,?,?)`,
        [name, color, image_url]
    );
    if (insertResult.affectedRows === 0) {
        throw new Error(`CREATE_BOARD_FAILED`);
    }
}

export const getBoards = async () => {
    const [boardsResult]: any = await db.query(
        `SELECT * FROM boards`
    )
    return boardsResult;
}

export const updateBoard = async (board_id: string, { name, color, image_url }: UpdateBoardType) => {
    const [updateResult]: any = await db.query(
        `
        UPDATE boards SET
            name = COALESCE(?,name),
            color = COALESCE(?, color),
            image_url = COALESCE(?, image_url) 
        WHERE id = ?
        `,
        [name ?? null, color ?? null, image_url ?? null, board_id]
    );

    if (updateResult.affectedRows === 0) {
        throw new Error(`BOARD_NOT_FOUND`);
    }
}

export const deleteBoard = async (board_id: string) => {
    const [deleteResult]: any = await db.query(
        `
        DELETE FROM boards
        WHERE id = ?
        `,
        [board_id]
    );
    if (deleteResult.affectedRows === 0) {
        throw new Error(`BOARD_NOT_FOUND`);
    }
}
