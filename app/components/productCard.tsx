import React from 'react'
import Image from 'next/image'
import Saffron from "../../images/saffron.jpeg"

interface producttype{
  Name: String
  Price : Number
  Quantity: Number
  ImageUrl?:String

}

const productCard = ({product}:{product:producttype}) => {
  return (
    <div style={{width:'220px',padding:'10px',backgroundColor:"#FBE9D0",borderRadius:'2px',color:'black'}}>
      <div style={{width:'100%'}}>
      <Image
                  src={product.imageUrl}
                  alt="Logo"
                  width={200}
                  height={200}
                />
      </div>
      <div style={{width:'100%',display:'flex',justifyContent:'space-between'}}>
        <div>
          <span>{product.name}<br />*****</span>
        </div>
        <div>
        <span>{product.price}</span>
        </div>
      </div>
    </div>
  )
}

export default productCard
