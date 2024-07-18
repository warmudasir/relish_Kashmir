"use client"
import React from 'react'
import Image from 'next/image'
import logo3 from "../../images/logot.png"
import logo2 from "../../images/logo2.png"
import Link from 'next/link'
import cartlogo from "../../images/cartlogo.svg"
import userlogo from "../../images/user-solid.svg"
import {getUserToken} from "../utility/authtoken";


const header = () => {

  const userData=getUserToken();
  console.log(userData);
  // console.log(email);
  return (
    <>
    <div style={{position:'fixed',width:'100%'}}>
     <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center',backgroundColor:"#FBE9D0"}}>
      <div style={{ flexGrow: 1 }} />
      <div style={{ display: 'flex', justifyContent: 'center', flexGrow: 1 }}>
        <Image
          src={logo3}
          alt="Center Logo"
          width={400}
        />
      </div>
      <div style={{ display: 'flex', alignItems: 'center'}}>
        <Image
          src={cartlogo}
          alt="Logo 1"
          width={25}
          style={{ marginLeft: '30px' }}
        />
        <Image
          src={userlogo}
          alt="Logo 3"
          width={18}
          style={{ marginLeft: '80px',marginRight:'10px' }}
        
        />
        {
          userData?.firstName?<h2 style={{marginRight:'30px'}}>{userData.firstName}</h2 >:<h2 style={{marginRight:'30px'}}>Guest</h2>
        }
      </div>
    </div>
    <div style={{display:'flex',justifyContent:'space-between',padding:'10px',backgroundColor:'black',alignItems:'center',color:'white'}}>
      <div style={{width:'100%',display:'flex',justifyContent:'center'}}>
        <ul style={{width:'60%',display:'flex',justifyContent:'space-between'}}>
            <Link href='/'><li>All</li></Link>
            <Link href="/myorders"><li>My Orders</li></Link>
           <Link href='./login'>{userData?.email?userData.email:<li>Login/Signup</li>}</Link>
        </ul>
      </div>
    </div>
    </div>
    <div style={{height:'80px'}}></div>
    </>
  )
}

export default header
