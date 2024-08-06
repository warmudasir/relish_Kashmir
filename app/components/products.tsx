"use client";

import React, { useEffect, useState } from "react";
import ProductCard from "./productCard";
import styles from "./products.module.scss";
import Link from "next/link";

interface Product {
  _id: string;
  Name: string;
  price?: string;
  quantity: number;
}

const Products = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/data");
        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }
        const result = await response.json();
        setProducts(result);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (products.length === 0) {
    return <div>No products available</div>;
  }

  return (
    <div className={styles.body}>
      {products.map((product) => {
        const isOutOfStock = product.quantity === 0;

        return (
          <div
            key={product._id}
            className={styles.productWrapper}
            style={{
              opacity: isOutOfStock ? 0.5 : 1,
              cursor: isOutOfStock ? "not-allowed" : "pointer",
            }}
          >
            {isOutOfStock ? (
              <ProductCard product={product} />
            ) : (
              <Link href={`/productdescription/${product._id}`} passHref>
                <div style={{ textDecoration: "none", color: "inherit" }}>
                  <ProductCard product={product} />
                </div>
              </Link>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default Products;
