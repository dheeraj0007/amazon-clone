"use client";

import { useSession } from "next-auth/react";
import Banner from "./components/Banner";
import Footer from "./components/Footer";
import Header from "./components/Header";
import { useEffect, useState } from "react";
import ProductFeed from "./components/ProductFeed";
import toast from "react-hot-toast";
import { ProductType } from "./types/product";

export default function Home() {
  const { data, status } = useSession({
    required: false,
  });

  const [products, setProducts] = useState([]);
  const [cartCount, setCartCount] = useState(0);
  const addToCart = async (productId: string) => {
    try {
      console.log("adding product to cart ", productId);
      const res = await fetch(`/api/cart/addProduct?productId=${productId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      });
      let data = await res.json();
      setCartCount(data.cartCount);
      console.log("add to cart response", data);
      if (data.status) {
        toast.success("Product added to cart successfully!");
      }
    } catch (error) {}
  };
  const fetchProducts = async () => {
    try {
      const res = await fetch("/api/getProducts");
      if (res.status) {
        const json = await res.json();
        const productsWithFlag = json.data.map((p: ProductType) => ({
          ...p,
          isAdded: false,
        }));
        setProducts(productsWithFlag);
      }
    } catch (err) {}
  };

  const cartDataFetcher = async () => {
    const resData = await fetch("/api/cart");
    const jsonData = await resData.json();
    console.log(jsonData);
    if (jsonData.status) {
      console.log("changed cart");
      setCartCount(jsonData.cartCount);
    }
  };

  useEffect(() => {
    fetchProducts();
    cartDataFetcher();
  }, []);

  return (
    <div className="bg-gray-100">
      <Header cartCount={cartCount} />
      <main className="max-w-screen-2xl mx-auto">
        <Banner />
        <ProductFeed
          products={products}
          addToCart={addToCart}
          // removeFromCart={removeFromCart}
        />
      </main>
      <Footer />
    </div>
  );
}
