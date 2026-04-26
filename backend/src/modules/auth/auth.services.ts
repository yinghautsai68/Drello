import { db } from "../../config/db";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { env } from "../../config/env";

export const register = async (username: string, password: string) => {
    const [usernameResult]: any = await db.query(
        `SELECT id FROM users WHERE username = ?`,
        [username]
    );
    if (usernameResult.length > 0) {
        throw new Error(`USERNAME_EXISTS`);
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const [insertResult]: any = await db.query(
        `INSERT INTO users (username, password) VALUES(?,?)`,
        [username, hashedPassword]
    );
    if (insertResult.affectedRows === 0) {
        throw new Error(`REGISTER_FAILED`);
    }
};

export const login = async (username: string, password: string) => {
    const [userResult]: any = await db.query(
        `SELECT id, password FROM users WHERE username = ?`,
        [username]
    );
    if (userResult.length === 0) {
        throw new Error(`USER_NOT_FOUND`);
    }

    const isPasswordMatch = await bcrypt.compare(password, userResult[0].password);
    if (!isPasswordMatch) {
        throw new Error(`PASSWORD_INCORRECT`);
    }

    const token = jwt.sign(
        { user_id: userResult[0].id },
        env.JWT_SECRET,
        { expiresIn: '1h' }
    );

    return token;
} 