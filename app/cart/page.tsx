"use client";
import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Image from "next/image";
import { useSession } from "next-auth/react";
function CartPage() {
  const [items, setItems] = useState([]);
  const session = useSession({ required: true });
  const { status } = session;
  const [cartCount, setCartCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const cartDataFetcher = async () => {
    setLoading(true);
    const resData = await fetch("/api/cart");
    const jsonData = await resData.json();
    console.log(jsonData);
    if (jsonData.status) {
      console.log("changed cart");
      setLoading(false);
      setCartCount(jsonData.cartCount);
      setItems(jsonData.data.CartProduct.map((cp: any) => cp.product));
    } else {
      setLoading(false);
    }
  };

  useEffect(() => {
    cartDataFetcher();
  }, []);
  return (
    <div className="bg-gray-100">
      <Header cartCount={cartCount} />

      <main className="lg:flex max-w-screen-2xl mx-auto">
        <div className="flex-grow m-5 shadow-sm">
          <Image
            src="https://links.papareact.com/ikj"
            width={1020}
            height={250}
            objectFit="contain"
            alt="cart header"
          />

          <div className="flex flex-col p-5 space-y-50 bg-white">
            <h1
              className={`text-3xl ${
                items.length > 0 ? "border-b pb-4" : "pb-2"
              }`}
            >
              {items.length === 0
                ? "Your Amazon Basket is empty."
                : "Shopping Basket"}
            </h1>

            {items.map((item: any, i) => {
              console.log("item is ", item);
              return <div key={i}>Hello {item.id}</div>;
            })}
          </div>
        </div>
      </main>
    </div>
  );
}

export default CartPage;
