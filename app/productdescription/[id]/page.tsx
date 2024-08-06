"use client"
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Header from '@/app/components/header';
import Footer from '@/app/components/footer';
import ProductCard from '@/app/components/productCard';
import Quantity from '@/app/components/quantity';

interface Product {
  _id: string;
  id: number;
  Name: string;
  price?: string;
  imageUrl: string;
}

const ProductDescription = ({ params }: { params: { id: string } }) => {
  const { id } = params;
  const router = useRouter();

  const [product, setProduct] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [quantity, setQuantity] = useState(1); // State for quantity

  useEffect(() => {
    const fetchProduct = async () => {
      if (id) {
        try {
          const response = await fetch(`/api/data`);
          if (!response.ok) {
            throw new Error('Failed to fetch product');
          }
          const products: Product[] = await response.json();
          const foundProduct = products.find((product) => product._id === id);
          setProduct(foundProduct || null);
        } catch (error) {
          console.error('Error fetching product:', error);
        } finally {
          setIsLoading(false);
        }
      }
    };

    fetchProduct();
  }, [id]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!product) {
    return <div>Product not found</div>;
  }

  const buyprod = () => {
    console.log(product._id);
    console.log(quantity); // Use the quantity state here
    router.push(`/productbuy/${product._id}?quantity=${quantity}&name=${product.name}&price=${product.price}&imageUrl=${product.imageUrl}`);

  };

  return (
    <div>
      <Header />
      <div style={{ padding: '100px', display: 'flex', alignItems: 'center' }}>
        <ProductCard product={product} />
        <div style={{ marginLeft: '100px' }}>
          <h1 style={{ fontSize: '20px', fontWeight: 'bold' }}>Saffron contains antioxidants that may be good for the brain and nervous system.</h1>
          <p>Healthy and pure saffron from Kashmir. Enjoy the best taste and aroma.</p>
          <Quantity quantity={quantity} setQuantity={setQuantity} />
          <button style={{ backgroundColor: '#050A44', color: 'white', padding: '15px', borderRadius: '2px' }} onClick={buyprod} className='my-5'>
            Buy Now
          </button>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ProductDescription;
