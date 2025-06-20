"use client";

import { useSession } from "next-auth/react";
import Banner from "./components/Banner";
import Footer from "./components/Footer";
import Header from "./components/Header";
import { useEffect, useState } from "react";
import { getProducts } from "@/utils/functions";
import ProductFeed from "./components/ProductFeed";

export default function Home() {
  const { data, status } = useSession({
    required: false,
  });

  const [products, setProducts] = useState([]);

  const fetchProducts = async () => {
    try {
      const res = await fetch("/api/getProducts");
      if (res.status) {
        const json = await res.json();
        setProducts(json.data);
      }
    } catch (err) {}
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const [cartCount, setCartCount] = useState(0);
  return (
    <div className="bg-gray-100">
      <Header cartCount={0} />
      <main className="max-w-screen-2xl mx-auto">
        <Banner />
        <ProductFeed
          products={products}
          // addToCart={addToCart}
          // removeFromCart={removeFromCart}
        />
      </main>
      <Footer />
    </div>
  );
}
