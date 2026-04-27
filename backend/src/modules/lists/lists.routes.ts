import express from 'express';
import { handleCreateList, handleDeleteList, handleGetLists, handleUpdateList } from './lists.controller';
import { authenticate } from '../../middlewares/authenticate';

const listsRouter = express.Router();

listsRouter.post('/', handleCreateList);
listsRouter.get('/', handleGetLists);
listsRouter.patch('/:id', authenticate, handleUpdateList);
listsRouter.delete('/:id', handleDeleteList);
export default listsRouter;