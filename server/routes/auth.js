import express from 'express';
import { signUp, signIn } from '../controllers/auth.js';

const router = express.Router();


// SIGN UP  --  CREATING A USER
router.post('/signUp', signUp);


// SIGN IN  --  LOGGING A USER
router.post('/signIn', signIn);

export default router;
