"use client"
import Footer from '@/app/components/footer';
import Header from '@/app/components/header';
import React from 'react'
import styles from './productbuy.module.scss'
import { useForm } from 'react-hook-form';

const page = ({ params }: { params: { id: string } }) => {
  const { id } = params;
  // console.log(id);

  const {register,handleSubmit}=useForm();

  const orderInfo =async (orderInfo)=>{
    const itemdata={itemNumber:id}
    const finaldata={...orderInfo,...itemdata}
    // console.log(orderInfo);
    const response = await fetch('/api/orderdata', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(finaldata),
    });

    if (response.ok) {
      const result = await response.json();
      console.log(result);
    } else {
      console.error('Failed to submit form');
    }
  }
  return (
    <div>
      <Header/>
      <div style={{padding:'100px',textAlign:'center',display:'flex',justifyContent:'center'}}>
        <div style={{width:'60%'}}>

        <form action="" style={{width:'100%',border:'2px solid black',padding:'15px'}} onSubmit={handleSubmit(orderInfo)}>
          <input type="Name" placeholder='FirstName' className={styles.input} {...register('firstName')}/>
          <input type="Name"  placeholder='LastName' style={{border:'1px solid black',width:'49%',marginTop:'20px', marginLeft:'2px'}} {...register('lastName')}/>
          <input type="Name"   placeholder='Email' style={{border:'1px solid black',display:'block',width:'100%',marginTop:'20px'}} {...register('email')}/>
          <input type="Name"  placeholder='Phone Number' style={{border:'1px solid black',display:'block',width:'100%',marginTop:'20px'}} {...register('phone')}/>
          <input type="Name"  placeholder='Address' style={{border:'1px solid black',display:'block',width:'100%',marginTop:'20px'}} {...register('address')}/>
          <input type="Name"  placeholder='Pincoded' style={{border:'1px solid black',display:'block',width:'100%',marginTop:'20px'}} {...register('pincode')}/>
          {/* <input type="button"  placeholder='Submit'/> */}
          <button className='btn btn-secondary my-3'>Order Now</button>
        </form>
        </div>
      </div>
      <Footer/>
    </div>
  )
}

export default page
