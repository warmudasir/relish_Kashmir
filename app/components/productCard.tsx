import React from 'react'
import Image from 'next/image'
import Saffron from "../../images/saffron.jpeg"

const productCard = () => {
  return (
    <div style={{width:'220px',padding:'10px',backgroundColor:"#FBE9D0",borderRadius:'2px',color:'black'}}>
      <div style={{width:'100%'}}>
      <Image
                  src={Saffron}
                  alt="Logo"
                  width={200}
                />
      </div>
      <div style={{width:'100%',display:'flex',justifyContent:'space-between'}}>
        <div>
          <span>Saffron<br />*****</span>
        </div>
        <div>
        <span>150$</span>
        </div>
      </div>
    </div>
  )
}

export default productCard
