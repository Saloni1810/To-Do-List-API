import express from 'express';
import { signup, login, signupPage, loginPage, logout } from '../controllers/authController.js';

const router = express.Router();

router.get('/signup', signupPage);
router.post('/signup', signup);
router.get('/login', loginPage);
router.post('/login', login);
router.get('/logout', logout);

export default router;
