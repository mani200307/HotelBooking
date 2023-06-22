import express from 'express'
import { countByCity, countByType, createHotel, deleteHotel, getCitiesCount, getHotel, getHotelByName, getHotelRoom, getHotels, getHotelsByType, updateHotel } from '../controllers/hotel.js';
import { verifyAdmin } from '../utils/verifyToken.js';

const router = express.Router();


//CREATE
router.post('/', createHotel);

//UPDATE
router.put('/:id', updateHotel);

//DELETE
router.delete('/:id', deleteHotel);

//GET
router.get('/type/:type', getHotelsByType);
router.get('/find/:id', getHotel);
router.get('/findCities', getCitiesCount);
router.get('/findHotel/:name', getHotelByName);

//GET ALL
router.get('/countByType', countByType);
router.get('/countByCity', countByCity);
router.get('/room/:id', getHotelRoom);
router.get('/', getHotels);

export default router;
