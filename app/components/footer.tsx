import React from 'react'
import Image from 'next/image'
import facebook from "../../images/facebook-brands-solid.svg";
import instagram from "../../images/instagram-brands-solid.svg"
import youtube from "../../images/youtube-brands-solid.svg";
import { faC } from '@fortawesome/free-solid-svg-icons';

const footer = () => {
  return (
    <div style={{backgroundColor:"#FBE9D0",color:'black'}}>
      {/* <div style={{width:'90%',height:'2px',backgroundColor:'solid 1px black',zIndex:'100'}}></div>   */}
      <div style={{display:'flex',justifyContent:'space-between',padding:'10px',alignItems:'center'}}>
        <div>

        </div>
        <div style={{display:'flex'}} className='mx-10'>
        <Image
          src={instagram}
          alt="Center Logo"
          width={40}
          className='mx-5'
        /> 
        <Image
        src={facebook}
        alt="Center Logo"
        width={40}
        className='mx-5'
      /> 
       <Image
      src={youtube}
      alt="Center Logo"
      width={40}
      className='mx-5'
    />
        </div>
      </div>
      <div style={{display:'flex',justifyContent:'center',padding:'10px'}}>
      <hr style={{ border: 'solid 1px black',width:'95%' }} />
      </div>
      <div style={{display:'flex',justifyContent:'space-between',padding:'20px 50px 50px 50px'}}>
        <div>
          <ul>
            <li style={{marginBottom:'20px'}}><h2>BE THE FIRST TO KNOW</h2></li>
            <li style={{marginBottom:'20px'}}><p>Get to Know more about relish kashmir</p></li>
            <li style={{marginBottom:'10px'}}><input type='email' placeholder='Email' style={{width:'250px',height:'40px'}}></input></li>
            <li style={{marginBottom:'20px'}}><button style={{backgroundColor:'black',color:'white',padding:'10px',width:'250px'}}>Subscribe</button></li>
          </ul>
        </div>
        <div>
          <ul>
            <li style={{marginBottom:'20px'}}><h2>Contact us</h2></li>
            <li  style={{marginBottom:'20px'}}>support@relishKashmir.com</li>
            <li  style={{marginBottom:'20px'}}>+91-9797352800</li>
            {/* <li  style={{marginBottom:'20px'}}>h3</li> */}
          </ul>
        </div>
        <div>
          <ul>
            <li  style={{marginBottom:'20px'}}><h2>Support</h2></li>
            <li  style={{marginBottom:'20px'}}>Contact Us</li>
            <li  style={{marginBottom:'20px'}}>Shipping Status</li>
            <li  style={{marginBottom:'20px'}}>Frequently Asked Questions</li>
          </ul>
        </div>
        <div>
          <ul>
            <li  style={{marginBottom:'20px'}}><h2>About Relish Kashmir</h2></li>
            <li  style={{marginBottom:'20px'}}>Jobs</li>
            <li  style={{marginBottom:'20px'}}>Wholesale</li>
            <li  style={{marginBottom:'20px'}}>Blog</li>
          </ul>
        </div>
      </div>
      <div style={{display:'flex',justifyContent:'center',padding:'10px'}}>
      <hr style={{ border: 'solid 1px black',width:'95%' }} />
      </div>
      <div style={{display:'flex',justifyContent:'center'}}><p>
      Proprietor: Shayeeb Mohammad War
      </p></div>
<div style={{textAlign:'center'}}><h1>&copy; All rights reserved 2023-24</h1></div>
    </div>
  )
}

export default footer
