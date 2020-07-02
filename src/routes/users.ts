import express from 'express';
import { users } from '../controllers';

const router: express.Router = express.Router();

router.get('/u/:uname', users.getUser);
router.post('/login', users.login);
router.post('/register', users.register);

export default router;