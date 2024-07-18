// import clientPromise from '../../utils/mongodb';

import { NextApiRequest, NextApiResponse } from 'next';
import { MongoClient } from 'mongodb';
import jwt from 'jsonwebtoken';

const SECRET_KEY ='hello123';

const uri = 'mongodb://localhost:27017';
// const dbName = 'relishKashmir';

export default async function orderHandler(req:NextApiRequest, res:NextApiResponse) {
let client: MongoClient;
  if (req.method === 'POST') {
    
    const {email,password  } = req.body;

    try {
      client = new MongoClient(uri);
      await client.connect();
      const db = client.db('relishKashmir');

      const collection = db.collection('users');
    //   console.log(email,password);
    //   const result = await collection.insertOne({firstName, lastName, email, phone ,address , pincode, itemNumber  });
    const users = await collection.find({}).toArray();

    const user = users.find((user: any) => email === user.email && password === user.password);
    console.log(user);
    if (user) {
        const token = jwt.sign(
            { 
              email: user.email,
              firstName: user.firstName // Access the property directly
            },
            SECRET_KEY,
            { expiresIn: '1h' }
          );
          
      res.status(200).json({ token });
    } else {
      console.error('Invalid email or password');
      alert('Invalid email or password');
    }
    //   res.status(200).json({ message: 'Form submitted successfully', users });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
