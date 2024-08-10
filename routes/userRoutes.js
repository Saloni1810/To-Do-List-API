import express from 'express';
import {createUser, handleUserLogin} from "../controllers/userController.js";


const router = express.Router();

router.post("/", createUser )
router.post("/login", handleUserLogin )


export default router;