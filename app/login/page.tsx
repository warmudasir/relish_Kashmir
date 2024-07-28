"use client";

import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import jwt from 'jsonwebtoken';


interface IFormInput {
  email: string;
  password: string;
}

const validateLogin = async (data: IFormInput, router: any) => {
    const SECRET_KEY='hello123';
  try {
    const response = await fetch('/api/validateLogin', {
      method: 'POST', // or 'POST' depending on your API endpoint
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    const result =await response.json();
    const {token} =result;
    // console.log(token);
    // console.log(result);

    // var decoded = jwt.verify(token, 'hello123');
    // console.log(decoded.email) // bar
    // console.log(decode);
    const decoded = jwt.verify(token,SECRET_KEY);
    // console.log(decoded.role);
    if (decoded.role=='admin') {
        console.log('Login successful');
        localStorage.setItem('token', token);
        router.push('/admin');
      } else if(decoded.role==='user') {
        localStorage.setItem('token', token);
        router.push('/');
      } 
      else{
        console.error('Invalid email or password');
        // Show an error message to the user
        alert('Invalid email or password');
      }

    // Match email and password
  } catch (error) {
    console.log("ero")
    console.error('Error:', error);
  }
};

const LoginPage: React.FC = () => {
  const router = useRouter();
  const { register, handleSubmit } = useForm<IFormInput>();

  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    validateLogin(data, router);
  };

  return (
    <>
      <Header />
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <div className="login" style={{ width: '300px', backgroundColor: '#FBE9D0', padding: '10px', borderRadius: '2px' }}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <label htmlFor="email">Email</label>
            <input type="email" style={{ width: '100%' }} {...register('email', { required: true })} />
            <label htmlFor="password">Password</label>
            <input type="password" style={{ width: '100%' }} {...register('password', { required: true })} />
            <button style={{ backgroundColor: 'black', padding: '5px',color:'white',width:'100%'}} className='my-2' type='submit'>Login</button>
            <p>Don't have an account? <Link href="/signup" style={{color:'blue'}}>Signup</Link></p>
            
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default LoginPage;
