import { Request, Response, NextFunction } from 'express';
import { PaymentService } from '../services/payment.service';

export class PaymentController {
  static async createPaymentIntent(req: Request, res: Response, next: NextFunction) {
    try {
      const { amount } = req.body;
      
      if (!amount || amount <= 0) {
        return res.status(400).json({ error: 'Invalid amount' });
      }

      const paymentIntent = await PaymentService.createPaymentIntent(amount);
      res.status(200).json(paymentIntent);
    } catch (error) {
      next(error);
    }
  }

  static async confirmPayment(req: Request, res: Response, next: NextFunction) {
    try {
      const { paymentIntentId } = req.body;
      
      if (!paymentIntentId) {
        return res.status(400).json({ error: 'Payment intent ID is required' });
      }

      const payment = await PaymentService.confirmPayment(paymentIntentId);
      res.status(200).json(payment);
    } catch (error) {
      next(error);
    }
  }
} 