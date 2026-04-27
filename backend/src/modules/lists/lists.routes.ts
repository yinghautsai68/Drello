import express from 'express';
import { handleCreateList, handleDeleteList, handleGetLists, handleUpdateList } from './lists.controller';
import { authenticate } from '../../middlewares/authenticate';

const listsRouter = express.Router();

listsRouter.post('/', authenticate, handleCreateList);
listsRouter.get('/', authenticate, handleGetLists);
listsRouter.patch('/:id', authenticate, handleUpdateList);
listsRouter.delete('/:id', authenticate, handleDeleteList);
export default listsRouter;