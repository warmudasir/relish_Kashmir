"use client";

import React from 'react';
import Footer from '@/app/components/footer';
import Header from '@/app/components/header';
import styles from './signup.module.scss';
import { useForm } from 'react-hook-form';
// import { useRouter } from 'next/router';
import { useRouter } from 'next/navigation';

const SignupPage = () => {
  const router = useRouter();

  const { register, handleSubmit } = useForm();

  const orderInfo = async (data: any) => {
    const response = await fetch('/api/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (response.ok) {
      const result = await response.json();
      console.log(result);
      router.push("/login");
    } else {
      console.error('Failed to submit form');
    }
  };

  return (
    <div>
      <Header />
      <div style={{ padding: '100px', textAlign: 'center', display: 'flex', justifyContent: 'center' }}>
        <div style={{ width: '60%',backgroundColor: '#FBE9D0' }}>
          <form onSubmit={handleSubmit(orderInfo)} style={{ width: '100%', border: '2px solid black', padding: '15px' }}>
            <input type="text" placeholder='FirstName' className={styles.input} {...register('firstName')} />
            <input type="text" placeholder='LastName' style={{ border: '1px solid black', width: '49%', marginTop: '20px', marginLeft: '2px' }} {...register('lastName')} />
            <input type="email" placeholder='Email' style={{ border: '1px solid black', display: 'block', width: '100%', marginTop: '20px' }} {...register('email')} />
            <input type="text" placeholder='Phone Number' style={{ border: '1px solid black', display: 'block', width: '100%', marginTop: '20px' }} {...register('phone')} />
            <input type="text" placeholder='Password' style={{ border: '1px solid black', display: 'block', width: '100%', marginTop: '20px' }} {...register('password')} />
            <button className='btn btn-secondary my-3'>Sign Up</button>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default SignupPage;
