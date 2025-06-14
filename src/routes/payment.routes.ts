import { Router } from 'express';
import { PaymentController } from '../controllers/payment.controller';
import { isAuthenticate } from '../middlewares/auth.middleware';

const router = Router();

router.post('/create-payment-intent', isAuthenticate, PaymentController.createPaymentIntent);
router.post('/confirm-payment', isAuthenticate, PaymentController.confirmPayment);

export default router; 