import React from 'react'
import ProductCard from './productCard'
import styles from './products.module.scss'

const products = () => {
  return (
    <div style={{padding:'100px'}} className={styles.body}>
      <ProductCard/>
      <ProductCard/>
      <ProductCard/>
      <ProductCard/>
      <ProductCard/>
    </div>
  )
}

export default products
