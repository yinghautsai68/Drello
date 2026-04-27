import express from 'express';
import { handleCreateCard, handleDeleteCard, handleGetCards, handleUpdateCard } from './cards.controller';

const cardsRouter = express.Router();

cardsRouter.post('/', handleCreateCard);
cardsRouter.get('/', handleGetCards);
cardsRouter.patch('/:id', handleUpdateCard);
cardsRouter.delete('/:id', handleDeleteCard);

export default cardsRouter;