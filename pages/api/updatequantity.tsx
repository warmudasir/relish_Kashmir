// import clientPromise from '../../utils/mongodb';
import { NextApiRequest, NextApiResponse } from 'next';
import { MongoClient } from 'mongodb';

const uri = 'mongodb://localhost:27017';
// const dbName = 'relishKashmir';

export default async function orderHandler(req:NextApiRequest, res:NextApiResponse) {
let client: MongoClient;
  if (req.method === 'POST') {
    
    const { updateQuantity,productName } = req.body;

    try {
      client = new MongoClient(uri);
      await client.connect();
      const db = client.db('relishKashmir');
      const itemsCollection = db.collection('items');
    
    // Update the quantity in the database
    const updateDoc = {
      $set: {
        quantity: updateQuantity,
      },
    };

    const result = await itemsCollection.updateOne({ name: productName }, updateDoc);

      res.status(200).json({ message: 'Form submitted successfully', result });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
