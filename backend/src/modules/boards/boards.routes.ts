import express from 'express';
import { handleCreateBoard, handleDeleteBoard, handleGetBoards, handleUpdateBoard } from './boards.controller';
import { authenticate } from '../../middlewares/authenticate';

const boardsRouter = express.Router();

boardsRouter.post('/', authenticate, handleCreateBoard);
boardsRouter.get('/', authenticate, handleGetBoards);
boardsRouter.patch('/:id', authenticate, handleUpdateBoard);
boardsRouter.delete('/:id', authenticate, handleDeleteBoard);
export default boardsRouter;