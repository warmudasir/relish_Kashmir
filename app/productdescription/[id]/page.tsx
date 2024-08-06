"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Header from "@/app/components/header";
import Footer from "@/app/components/footer";
import ProductCard from "@/app/components/productCard";
import Quantity from "@/app/components/quantity";

interface Product {
  _id: string;
  id: number;
  name: string;
  price?: string;
  imageUrl: string;
  availableQuantity: number; // Include available quantity in the product type
}

const ProductDescription = ({ params }: { params: { id: string } }) => {
  const { id } = params;
  const router = useRouter();

  const [product, setProduct] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [quantity, setQuantity] = useState(1); // State for quantity
  const [maxQuantityReached, setMaxQuantityReached] = useState(false); // State for max quantity message

  useEffect(() => {
    const fetchProduct = async () => {
      if (id) {
        try {
          const response = await fetch(`/api/data`);
          if (!response.ok) {
            throw new Error("Failed to fetch product");
          }
          const products: Product[] = await response.json();
          const foundProduct = products.find((product) => product._id === id);
          setProduct(foundProduct || null);
        } catch (error) {
          console.error("Error fetching product:", error);
        } finally {
          setIsLoading(false);
        }
      }
    };

    fetchProduct();
  }, [id]);

  const handleIncreaseQuantity = () => {
    if (product && quantity < product.quantity) {
      setQuantity(quantity + 1);
      setMaxQuantityReached(false); // Reset max quantity message when increasing within limits
    } else {
      setMaxQuantityReached(true); // Show max quantity message
    }
  };

  const handleDecreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
      setMaxQuantityReached(false); // Reset max quantity message when decreasing
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!product) {
    return <div>Product not found</div>;
  }

  const buyprod = () => {
    router.push(
      `/productbuy/${product._id}?quantity=${quantity}&name=${product.name}&price=${product.price}&imageUrl=${product.imageUrl}`
    );
  };

  return (
    <div>
      <Header />
      <div className="product-container">
        <ProductCard product={product} />
        <div className="product-details">
          <h1 className="product-title">
            Saffron contains antioxidants that may be good for the brain and
            nervous system.
          </h1>
          <p>
            Healthy and pure saffron from Kashmir. Enjoy the best taste and
            aroma.
          </p>
          <Quantity
            quantity={quantity}
            handleIncreaseQuantity={handleIncreaseQuantity}
            handleDecreaseQuantity={handleDecreaseQuantity}
          />
          {maxQuantityReached && (
            <p className="max-quantity-message">
              Maximum available quantity reached
            </p>
          )}
          <button onClick={buyprod} className="buy-now-button">
            Buy Now
          </button>
        </div>
      </div>
      <Footer />
      <style jsx>{`
        .product-container {
          padding: 100px 50px 50px;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .product-details {
          margin-top: 30px;
          text-align: center;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 10px;
        }

        .product-title {
          font-size: 16px;
          font-weight: bold;
        }

        .max-quantity-message {
          color: red;
          font-size: 14px;
          margin-top: 10px;
        }

        .buy-now-button {
          background-color: #050a44;
          color: white;
          padding: 15px;
          border-radius: 2px;
          margin-top: 20px;
          cursor: pointer;
          width: 100%;
        }

        @media (min-width: 768px) {
          .product-container {
            flex-direction: row;
            align-items: flex-start;
            justify-content: center;
            padding-top: 150px;
          }

          .product-details {
            margin-left: 100px;
            text-align: left;
            align-items: flex-start;
          }

          .product-title {
            font-size: 20px;
          }

          .buy-now-button {
            width: auto;
          }
        }
      `}</style>
    </div>
  );
};

export default ProductDescription;
