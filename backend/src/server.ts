import express from 'express';
import cors from 'cors';
import { db } from './config/db';

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
app.listen(5000, () => {
    console.log('server running');
});