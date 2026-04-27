import express from 'express';
import { handleCreateCard, handleDeleteCard, handleGetCards, handleUpdateCard } from './cards.controller';
import { authenticate } from '../../middlewares/authenticate';

const cardsRouter = express.Router();

cardsRouter.post('/', authenticate, handleCreateCard);
cardsRouter.get('/', authenticate, handleGetCards);
cardsRouter.patch('/:id', authenticate, handleUpdateCard);
cardsRouter.delete('/:id', authenticate, handleDeleteCard);

export default cardsRouter;