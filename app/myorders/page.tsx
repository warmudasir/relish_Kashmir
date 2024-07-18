"use client"

import React, { use, useEffect, useState } from 'react';
import Link from 'next/link';
import jwt from 'jsonwebtoken';
import Header from '../components/header';
import Footer from '../components/footer';
import saffron from "../../images/saffron.jpeg"
import Image from 'next/image';
import {getUserToken} from "../utility/authtoken";

// import { getEmailFromToken } from '../utility/authtoken'; 

interface Product {
  _id: string;
  id: number;
  Name: string;
  price?: string;
}

const Products = () => {
  const SECRET_KEY = process.env.SECRET_KEY || 'hello123';
  const [orders, setOrders] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const userData=getUserToken();
  // const email = getEmailFromToken();
  // console.log(email);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/myorders');
        if (!response.ok) {
          throw new Error('Failed to fetch products');
        }
        const result = await response.json();
        setOrders(result);
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

  if (orders.length === 0) {
    return <div>No orders</div>;
  }

  if(userData?.email)
  {
    return (
        <div>
          <Header/>
          {orders.map((order)=>(
          <div style={{padding:'100px'}}>
            <div style={{backgroundColor:'#FBE9D0',padding:'20px',display:'flex',justifyContent:'space-between',height:'200px',boxShadow:'1px 1px 1px 1px black'}}>
            <Image
                      src={saffron}
                      alt="Logo"
                      width={200}
                    />
            <p>Healthy and pure saffron from kashmir. Enjoy the best taste and aroma</p>
            <h2>Order Status</h2>
            </div>
          </div>
          ))}
          <Footer/>
        </div>
      );
  }
  return(
    <>
    <Header/>
    <div style={{padding:'100px'}}>
        <h2>Please Login In First to check your orders</h2>
    </div>
    <Footer/>
    </>
  )
  
};

export default Products;
