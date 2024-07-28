"use client";
import React from 'react';
import Image from 'next/image';
import logo3 from "../../images/logot.png";
import cartlogo from "../../images/cartlogo.svg";
import userlogo from "../../images/user-solid.svg";
import Link from 'next/link';
import { useRouter } from 'next/navigation';  // Adjust the import path if necessary
import { getUserToken } from "../utility/authtoken";

const Header = () => {
  const router = useRouter();
  const userData = getUserToken();
  console.log(userData);

  const handleLogout = () => {
    localStorage.removeItem('token');  // Remove the user token
    router.push('/login');  // Redirect to login page
  };

  return (
    <>
      <div style={{ position: 'fixed', width: '100%' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: "#FBE9D0" }}>
          <div style={{ flexGrow: 1 }} />
          <div style={{ display: 'flex', justifyContent: 'center', flexGrow: 1 }}>
            <Image
              src={logo3}
              alt="Center Logo"
              width={400}
            />
          </div>
          <div style={{ display: 'flex', alignItems: 'center' }}>
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
              style={{ marginLeft: '80px', marginRight: '10px' }}
            />
            {userData?.firstName ? <h2 style={{ marginRight: '30px' }}>{userData.firstName}</h2> : <h2 style={{ marginRight: '30px' }}>Guest</h2>}
          </div>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px', backgroundColor: 'black', alignItems: 'center', color: 'white' }}>
          <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
            <ul style={{ width: '60%', display: 'flex', justifyContent: 'space-between' }}>
              <Link href='/'><li>All</li></Link>
              <Link href="/myorders"><li>My Orders</li></Link>
              <Link href='./login'>{userData?.email ? userData.email : <li>Login/Signup</li>}</Link>
              <li onClick={handleLogout} style={{ cursor: 'pointer' }}>Logout</li> {/* Add onClick handler */}
            </ul>
          </div>
        </div>
      </div>
      <div style={{ height: '80px' }}></div>
    </>
  );
};

export default Header;
