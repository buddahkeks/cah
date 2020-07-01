import express from 'express';
import { auth } from '../middleware';
import { cards } from '../controllers';

const router: express.Router = express.Router();

router.get('/next', auth.restrict, cards.getNext);  
router.get('/categories', auth.restrict, cards.getCategories);

export default router;