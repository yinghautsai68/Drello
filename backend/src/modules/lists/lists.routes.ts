import express from 'express';
import { handleCreateList, handleDeleteList, handleGetLists } from './lists.controller';

const listsRouter = express.Router();

listsRouter.post('/', handleCreateList);
listsRouter.get('/', handleGetLists);
listsRouter.delete('/:id', handleDeleteList);
export default listsRouter;