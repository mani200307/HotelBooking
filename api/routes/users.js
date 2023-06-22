import express from 'express'
import { createUser, deleteUser, getUser, getUsers, updateUser } from '../controllers/user.js';
import { verifyAdmin, verifyToken, verifyUser } from '../utils/verifyToken.js';

const router = express.Router();

// router.get('/checkauthentication', verifyToken, (req, res, next) => {
//     res.send("You logged in!");
// });

// router.get('/checkuser/:id', verifyUser, (req, res, next) => {
//     res.send("User, logged in and you can delete your account!");
// });

// router.get('/checkadmin/:id', verifyUser, (req, res, next) => {
//     res.send("Admin, logged in and you can delete your account!");
// });

//CREATE
router.post('/', createUser);

//UPDATE
router.put('/:id', verifyUser, updateUser);

//DELETE
router.delete('/:id', verifyUser, deleteUser);

//GET
router.get('/:id', verifyUser, getUser);

//GET ALL
router.get('/', verifyAdmin, getUsers);

export default router;