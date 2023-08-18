import express from "express";
import { verifyUser, adminOnly } from "../middleware/AuthUser.js";
import {
    getUSers,
    getUserById,
    createUser,
    updateUser,
    deleteUser
} from '../controllers/Users.js'

const router = express.Router();

router.get('/users',verifyUser, adminOnly ,getUSers);
router.get('/user/:id',verifyUser, adminOnly, getUserById);
router.post('/user/add',verifyUser, adminOnly, createUser);
router.patch('/user/edit/:id',verifyUser, adminOnly, updateUser);
router.delete('/user/delete/:id',verifyUser, adminOnly, deleteUser);

export default router;