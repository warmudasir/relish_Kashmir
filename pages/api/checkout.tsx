import { NextApiRequest, NextApiResponse } from 'next';
import Razorpay from 'razorpay';

const razorpay = new Razorpay({
  key_id: 'rzp_test_AlDHhT9lXcsjQf',
  key_secret: '7hQJ3SjhnFVtpsK0OLYfioPr',
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {
      const { amount } = req.body; // Amount should be in the smallest currency unit, e.g., paise for INR

      const options = {
        amount: amount, // Amount in paise
        currency: 'INR',
        receipt: 'order_rcptid_11',
      };

      const order = await razorpay.orders.create(options);

      res.status(200).json(order);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
