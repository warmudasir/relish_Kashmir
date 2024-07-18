// import clientPromise from '../../utils/mongodb';
import { NextApiRequest, NextApiResponse } from 'next';
import { MongoClient } from 'mongodb';
// import { useRouter } from 'next/router';


const uri = 'mongodb://localhost:27017';
// const dbName = 'relishKashmir';

export default async function orderHandler(req:NextApiRequest, res:NextApiResponse) {
let client: MongoClient;

// const router=useRouter();
    
  if (req.method === 'POST') {
    
    const { firstName, lastName, email, phone, password} = req.body;

    try {
      client = new MongoClient(uri);
      await client.connect();
      const db = client.db('relishKashmir');

      const collection = db.collection('users');
      const result = await collection.insertOne({firstName, lastName, email, phone,password });

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
