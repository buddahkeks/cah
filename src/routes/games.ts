import express from 'express';
import { games } from '../controllers';
import { auth } from '../middleware';

const router: express.Router = express.Router();

router.get('/', auth.restrict, games.getAllGames);
router.post('/new', auth.restrict, games.newGame);
router.get('/g/:name/players', auth.restrict, games.getUsers);

export default router;