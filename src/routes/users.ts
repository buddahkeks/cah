import express from 'express';
import { users } from '../controllers';
import { auth } from '../middleware';

const router: express.Router = express.Router();

router.get('/u/:uname', users.getUser);
router.post('/login', users.login);
router.post('/register', users.register);
router.get('/status', auth.restrict, users.status);

export default router;