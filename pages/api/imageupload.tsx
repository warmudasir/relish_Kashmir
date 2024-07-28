// pages/api/imageupload.js
import nextConnect from 'next-connect';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { MongoClient } from 'mongodb';

const uri = 'mongodb://localhost:27017';
const dbName = 'relishKashmir';


// Define the upload directory
const uploadDir = './public/uploads';

// Ensure the upload directory exists
if (!fs.existsSync(uploadDir)){
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Set up multer storage configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Append extension
  },
});

const upload = multer({ storage });

const apiRoute = nextConnect({
  onError(error, req, res) {
    res.status(501).json({ error: `Sorry, something went wrong! ${error.message}` });
  },
  onNoMatch(req, res) {
    res.status(405).json({ error: `Method '${req.method}' Not Allowed` });
  },
});

apiRoute.use(upload.single('file'));

apiRoute.post(async(req, res) => {
  const client = await new MongoClient(uri);
  await client.connect();
    
  const db = client.db(dbName);
  
  const collection = db.collection('items');
  const { name, description, price, quantity } = req.body;
  const imageUrl = `/uploads/${req.file.filename}`;

  const product = {
    name,
    description,
    price: parseFloat(price),
    quantity: parseInt(quantity, 10),
    imageUrl,
  };

  await collection.insertOne({ name,description,price,quantity,imageUrl });
  // console.log("Works");
  res.status(200).json({ imageUrl: `/uploads/${req.file.filename}` });
});

// apiRoute.post(async (req, res) => {
//   console.log("Works");
//   const client = await new MongoClient(uri);
//   await client.connect();
    
//   const db = client.db(dbName);
  
//   const collection = db.collection('images');

//   const imageUrl = `/uploads/${req.file.filename}`;
//   await collection.insertOne({ imageUrl });

//   res.status(200).json({ imageUrl });
// });


export default apiRoute;

export const config = {
  api: {
    bodyParser: false, // Disable body parsing, so `multer` can handle it
  },
};
