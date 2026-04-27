import { db } from "../../config/db";
import type { CreateCardType, UpdateCardType } from "./cards.schema";

export const createCard = async (form: CreateCardType) => {
    const [result]: any = await db.query(
        `INSERT INTO cards (list_id, name, position, color)
        VALUES(?, ? , ?,?)`,
        [form.list_id, form.name, form.position, form.color]
    );

    if (result.affectedRows === 0) {
        throw new Error(`CREATE_CARD_FAILED`);
    }

    return result.insertId;
}

export const getCards = async () => {
    const [result]: any = await db.query(
        `SELECT * FROM cards`
    );

    return result;
}

export const updateCard = async (card_id: string, form: UpdateCardType) => {
    const [result]: any = await db.query(
        `UPDATE cards SET 
            list_id = COALESCE(?,list_id),
            name = COALESCE(?, name),    
            position = COALESCE(?, position),
            color = COALESCE(?,color)
        WHERE id = ?    
        `,
        [form.list_id ?? null, form.name ?? null, form.position ?? null, form.color ?? null, card_id]
    );

    if (result.affectedRows === 0) {
        throw new Error(`UPDATE_CARD_FAILED`);
    }

    return true;
}

export const deleteCard = async (card_id: string) => {
    const [result]: any = await db.query(
        `DELETE FROM cards WHERE id = ?`,
        [card_id]
    );

    if (result.affectedRows === 0) {
        throw new Error(`DELETE_CARD_FAILED`);
    }

    return true;
}