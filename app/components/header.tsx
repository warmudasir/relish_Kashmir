import React from 'react'

const header = () => {
  return (
    <div style={{display:'flex',justifyContent:'space-between',padding:'30px'}}>
      <div>
        <h1>Image</h1>
      </div>
      <div>
        <input type="text-area"/>
      </div>
      <div style={{width:'200px'}}>
        <ul style={{width:'100%',display:'flex',justifyContent:'space-between'}}>
            <li>l1</li>
            <li>l2</li>
            <li>l3</li>
        </ul>
      </div>
    </div>
  )
}

export default header
