import express from 'express';
import cors from 'cors';
import { db } from './config/db';
import authRouter from './modules/auth/auth.routes';
import boardsRouter from './modules/boards/boards.routes';
import listsRouter from './modules/lists/lists.routes';
import cardsRouter from './modules/cards/cards.routes';

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
app.use('/api/boards', boardsRouter);
app.use('/api/lists', listsRouter);
app.use('/api/cards', cardsRouter);

app.listen(5000, () => {
    console.log('server running');
});