"use client";
import React, { useState } from 'react';
import Image from 'next/image';
import logo3 from "../../images/logot.png";
import cartlogo from "../../images/cartlogo.svg";
import userlogo from "../../images/user-solid.svg";
import Link from 'next/link';
import { useRouter } from 'next/navigation';  // Adjust the import path if necessary
import { getUserToken } from "../utility/authtoken";
import styles from './header.module.scss';

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const router = useRouter();
  const userData = getUserToken();

  const handleLogout = () => {
    localStorage.removeItem('token');  // Remove the user token
    router.push('/login');  // Redirect to login page
  };

  return (
    <>
    <div className={styles.header}>
      <div className={styles.topBar}>
        <div className={styles.logo}>
          <Image
            src={logo3}
            alt="Center Logo"
            width={200}
          />
        </div>
        <div className={styles.icons}>
          <Image
            src={cartlogo}
            alt="Cart Logo"
            width={25}
            className={styles.showOnDesktop}
          />
          <Image
            src={userlogo}
            alt="User Logo"
            width={25}
            className={styles.showOnDesktop}
          />
        </div>
        <div className={styles.hamburgerMenu}>
          <input type="checkbox" id="menu-toggle" checked={menuOpen} onChange={() => setMenuOpen(!menuOpen)} />
          <label htmlFor="menu-toggle" className={styles.menuIcon}>
            <div></div>
            <div></div>
            <div></div>
          </label>
        </div>
      </div>

      <nav className={`${styles.nav} ${menuOpen ? styles.showMenu : ''}`}>
        <ul>
          <li><Link href="/">All</Link></li>
          <li><Link href="/myorders">My Orders</Link></li>
          <li><Link href="./login">{userData?.email ? userData.email : 'Login/Signup'}</Link></li>
          <li onClick={handleLogout}>Logout</li>
        </ul>
      </nav>
    </div>
    <div style={{height:'50px'}}></div>
    </>
  );
};

export default Header;
