import express from 'express'
import { verifyAdmin } from '../utils/verifyToken.js';
import { createRoom, updateRoom, deleteRoom, getRoom, getRooms, updateRoomAvailability, findMainRoom } from '../controllers/room.js';

const router = express.Router();

//CREATE
router.post('/:hotelid', verifyAdmin, createRoom);

//UPDATE
router.put('/:id', verifyAdmin, updateRoom);

//DELETE
router.delete('/:id/:hotelid', verifyAdmin, deleteRoom);
router.put('/availability/:id', updateRoomAvailability);

//GET
router.get('/:id', getRoom);
router.get('/roomnum/:id', findMainRoom);

//GET ALL
router.get('/', getRooms);

export default router;