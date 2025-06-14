import { stripe } from '../config/stripe.config';
import { HttpException } from '../exceptions/httpException';

export class PaymentService {
  static async createPaymentIntent(amount: number, currency: string = 'eur') {
    try {
      const paymentIntent = await stripe.paymentIntents.create({
        amount: amount * 100,
        currency,
        automatic_payment_methods: {
          enabled: true,
        },
      });

      return {
        clientSecret: paymentIntent.client_secret,
      };
    } catch (error) {
      throw new HttpException(500, 'Error creating payment intent');
    }
  }

  static async confirmPayment(paymentIntentId: string) {
    try {
      const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);
      return paymentIntent;
    } catch (error) {
      throw new HttpException(500, 'Error confirming payment');
    }
  }
} 