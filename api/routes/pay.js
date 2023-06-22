import express from 'express'
import { paymentStripe } from '../controllers/payment.js';

const router = express.Router();

router.post('/gateway', paymentStripe);

export default router;