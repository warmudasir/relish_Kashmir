import React from 'react'
import Image from 'next/image'
import logo from "../../images/logo.png"

const header = () => {
  return (
    <div style={{display:'flex',justifyContent:'space-between',padding:'10px',backgroundColor:'#124E66',position:'fixed',width:'100%',alignItems:'center',color:'white'}}>
      <div>
      <Image
                  src={logo}
                  alt="Logo"
                  width={200}
                />
      </div>
      <div>
        <input type="text-area"/>
      </div>
      <div style={{width:'300px'}}>
        <ul style={{width:'100%',display:'flex',justifyContent:'space-between'}}>
            <li>Cart</li>
            <li>Orders</li>
            <li>Login/Signup</li>
        </ul>
      </div>
    </div>
  )
}

export default header
