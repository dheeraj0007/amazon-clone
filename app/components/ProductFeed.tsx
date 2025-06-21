"use client";
import React, { useEffect, useState } from "react";
import { ProductType } from "../types/product";
import Product from "./Product";

function ProductFeed(props: {
  products: ProductType[];
  addToCart: (productId: string) => void;
}) {
  const { products, addToCart } = props;
  const [productsArray, setProductsArray] = useState<ProductType[]>([]);
  useEffect(() => {
    const updateProductArrayWithCartState = async () => {
      try {
        const res = await fetch("/api/cart");
        const jsonData = await res.json();

        if (jsonData.status) {
          const productIdsInCart: string[] = jsonData.data.CartProduct.map(
            (p: any) => p.productId
          );

          const updatedArray: ProductType[] = products.map((product) => ({
            ...product,
            isAdded: productIdsInCart.includes(product.id),
          }));

          setProductsArray(updatedArray);
        } else {
          const fallbackArray = products.map((p) => ({ ...p, isAdded: false }));
          setProductsArray(fallbackArray);
        }
      } catch (err) {
        console.error("Failed to update product cart state", err);
      }
    };

    updateProductArrayWithCartState();
  }, [products]);

  return (
    <div className="grid grid-flow-row-dense md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 md:-mt-52 mx-auto">
      {productsArray
        .slice(0, 4)
        .map(({ id, title, price, description, category, image, isAdded }) => {
          return (
            <Product
              key={id}
              title={title}
              price={price}
              description={description}
              category={category}
              image={image}
              id={id}
              addToCart={addToCart}
              removeFromCart={() => {}}
              isAdded={isAdded ? isAdded : false}
            />
          );
        })}

      <img
        className="md:col-span-full"
        src="https://links.papareact.com/dyz"
        alt=""
      />

      <div className="md:col-span-2">
        {products
          .slice(4, 5)
          .map(
            ({ id, title, price, description, category, image, isAdded }) => {
              return (
                <Product
                  key={id}
                  title={title}
                  price={price}
                  description={description}
                  category={category}
                  image={image}
                  id={id}
                  removeFromCart={() => {}}
                  addToCart={addToCart}
                  isAdded={isAdded ? isAdded : false}
                />
              );
            }
          )}
      </div>

      {products
        .slice(5, products.length)
        .map(({ id, title, price, description, category, image, isAdded }) => {
          return (
            <Product
              key={id}
              title={title}
              price={price}
              description={description}
              category={category}
              image={image}
              id={id}
              addToCart={addToCart}
              removeFromCart={() => {}}
              isAdded={isAdded ? isAdded : false}
            />
          );
        })}
    </div>
  );
}

export default ProductFeed;
