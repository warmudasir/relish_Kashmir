"use client"

import React, { use, useEffect, useState } from 'react';
import Link from 'next/link';
import jwt from 'jsonwebtoken';
import Header from '../components/header';
import Footer from '../components/footer';
import saffron from "../../images/saffron.jpeg"
import Image from 'next/image';
import {getUserToken} from "../utility/authtoken";
import { useRouter } from 'next/navigation';

// import { getEmailFromToken } from '../utility/authtoken'; 

interface Product {
  _id: string;
  id: number;
  Name: string;
  price?: string;
}

const Products = () => {

    const router = useRouter();
    const userData=getUserToken();
    if(userData===null || userData.role==='user')
    {
    router.push('/');
    }

  const SECRET_KEY = process.env.SECRET_KEY || 'hello123';
  const [orders, setOrders] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
 
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
        // const filteredOrders = result.filter(order => order.email === userData.email);
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

  if (userData?.email && orders.length === 0) {
    return <div>No orders</div>;
  }

  if(userData?.email)
  {
    console.log(orders);
    
    return (
        <div>
          <Header/>
          {orders.map((order)=>(
          <div style={{padding:'100px'}}>
            <div style={{backgroundColor:'#FBE9D0',padding:'20px',display:'flex',justifyContent:'space-between',height:'300px',boxShadow:'1px 1px 1px 1px black'}}>
            <Image
                      src={order.imageUrl}
                      alt="Logo"
                      width={200}
                      height={200}
                    />
           <div className='mx-3'>
           <h2>Order Details</h2>
            <h1>Product Name: {order.productname}</h1>
            <h1>Total Quantity: {order.quantity}</h1>
            <h1>Unit Price: {order.productprice}</h1>
            <h1>Total Order Price: {order.productprice*order.quantity}</h1>

            <h2>Address Details</h2>
            <h1>Name: {order.firstName}</h1>
            <h1>Address: {order.address}</h1>
            <h1>Pincode: {order.pincode}</h1>
            <h1>Phone Number: {order.phone}</h1>
           </div>
            

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
