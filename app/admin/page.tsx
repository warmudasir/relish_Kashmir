"use client";
import { useState } from 'react';
import {getUserToken} from "../utility/authtoken";
import { useRouter } from 'next/navigation';
import Header from '../components/header';
import Footer from '../components/footer';

export default function Home() {
  const router = useRouter();
  const userData=getUserToken(); 
  const [file, setFile] = useState(null);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [quantity, setQuantity] = useState('');
  const [imageUrl, setImageUrl] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      alert('Please select a file to upload.');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);
    formData.append('name', name);
    formData.append('description', description);
    formData.append('price', price);
    formData.append('quantity', quantity);

    const res = await fetch('/api/imageupload', {
      method: 'POST',
      body: formData,
    });

    if (res.ok) {
      const data = await res.json();
      setImageUrl(data.imageUrl);
    } else {
      console.error('Error uploading image');
    }
  };

  // console.log(userData);

  if(userData===null || userData.role==='user')
  {
    router.push('/');
  }

  return (
    
    <div>
      <Header/>
      <div className="form" style={{padding:'100px'}}>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <br />
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <br />
        <input
          type="number"
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
        <br />
        <input
          type="number"
          placeholder="Quantity"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
        />
        <br />
        <input type="file" onChange={(e) => setFile(e.target.files[0])} />
        <br />
        <button type="submit">Submit Product</button>
      </form>
      {imageUrl && <img src={imageUrl} alt="Uploaded image" />}
      </div>
      <Footer/>
    </div>
  );
}
