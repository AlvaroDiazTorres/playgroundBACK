import Stripe from 'stripe';
const stripeSecretKey = process.env.STRIPE_SECRET_KEY || 'secret_key';

export const stripe = new Stripe(stripeSecretKey); 