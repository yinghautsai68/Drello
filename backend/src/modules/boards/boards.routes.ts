import express from 'express';
import { handleCreateBoard, handleDeleteBoard, handleGetBoards, handleUpdateBoard } from './boards.controller';

const boardsRouter = express.Router();

boardsRouter.post('/', handleCreateBoard);
boardsRouter.get('/', handleGetBoards);
boardsRouter.patch('/:id', handleUpdateBoard);
boardsRouter.delete('/:id', handleDeleteBoard);
export default boardsRouter;