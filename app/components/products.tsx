"use client"

import React, { use, useEffect, useState } from 'react';
import ProductCard from './productCard';
import styles from './products.module.scss';
import Link from 'next/link';
import jwt from 'jsonwebtoken';
// import { getEmailFromToken } from '../utility/authtoken'; 

interface Product {
  _id: string;
  id: number;
  Name: string;
  price?: string;
}

const Products = () => {
  const SECRET_KEY = process.env.SECRET_KEY || 'hello123';
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  // const email = getEmailFromToken();
  // console.log(email);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/data');
        if (!response.ok) {
          throw new Error('Failed to fetch products');
        }
        const result = await response.json();
        setProducts(result);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);


  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (products.length === 0) {
    return <div>No products available</div>;
  }

  return (
    <div style={{ padding: '100px' }} className={styles.body}>
      {products.map((product) => (
        <Link key={product._id} href={`/productdescription/${product._id}`}>
         
            <ProductCard product={product} />
         
        </Link>
      ))}
    </div>
  );
};

export default Products;
