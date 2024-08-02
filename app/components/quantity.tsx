"use client"
import React from 'react';

const Quantity = ({ quantity, setQuantity }) => {
  return (
    <div style={{width:'80px',display:'flex',justifyContent:'space-between',border:'solid 1px black'}} >
      <button style={{backgroundColor:'grey',width:'20px'}} onClick={() => setQuantity(quantity <= 1 ? 1 : quantity - 1)}>-</button>
      <span>{quantity}</span>
      <button style={{backgroundColor:'grey',width:'20px'}} onClick={() => setQuantity(quantity + 1)}>+</button>
    </div>
  );
};

export default Quantity;
