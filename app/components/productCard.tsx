import React from 'react';
import Image from 'next/image';

interface ProductType {
  name: string;
  price: number;
  quantity: number;
  imageUrl?: string;
}

const ProductCard = ({ product }: { product: ProductType }) => {
  const isOutOfStock = product.quantity === 0;

  return (
    <div style={{ width: '220px', padding: '10px', backgroundColor: "#FBE9D0", borderRadius: '2px', color: 'black', position: 'relative' }}>
      <div style={{ width: '100%' }}>
        <Image
          src={product.imageUrl || '/path/to/default/image.jpg'} // Provide a default image path if necessary
          alt={product.name}
          width={200}
          height={200}
        />
        {isOutOfStock && (
          <div style={{
            position: 'absolute',
            bottom: '10px',
            left: '50%',
            transform: 'translateX(-50%)',
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
            color: 'white',
            padding: '2px 6px',
            borderRadius: '3px',
            fontSize: '12px',
          }}>
            Out of Stock
          </div>
        )}
      </div>
      <div style={{ width: '100%', display: 'flex', justifyContent: 'space-between', marginTop: '10px' }}>
        <div>
          <span>{product.name}<br />*****</span>
        </div>
        <div>
          <span>{product.price}</span>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
