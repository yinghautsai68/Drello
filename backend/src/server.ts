import express from 'express';
import cors from 'cors';
import { db } from './config/db';
import authRouter from './modules/auth/auth.routes';

const app = express();
app.use(express.json());
app.use(cors());

const testDB = async () => {
    try {
        const result = await db.query('SELECT 1');
        console.log(result);
    } catch (error) {
        console.error(error);
    }
}
testDB();

app.use('/api/auth', authRouter);

app.listen(5000, () => {
    console.log('server running');
});