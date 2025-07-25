"use client";

import React, { useEffect, useState } from "react";
import { ProductType } from "../types/product";
import { signIn, useSession } from "next-auth/react";
import Image from "next/image";
import { StarIcon } from "lucide-react";
import TopBarProgress from "react-topbar-progress-indicator";

function Product(props: {
  id: string;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  addToCart: (productId: string) => void;
  removeFromCart: (productId: string) => void;
  isAdded: boolean;
}) {
  const {
    id,
    title,
    price,
    description,
    category,
    image,
    addToCart,
    removeFromCart,
    isAdded,
  } = props;
  const [rating] = useState(Math.floor(Math.random() * 5) + 1);

  const [hasPrime] = useState(Math.random() < 0.5);

  const [button, setButton] = useState("add");
  const [showTopLoader, setShowTopLoader] = useState(false);

  const session = useSession();

  const { status } = session;

  useEffect(() => {
    if (isAdded) {
      setButton("remove");
    }
  });
  return (
    <div className="relative flex flex-col m-5 bg-white z-30 p-10">
      <p className="absolute top-2 right-2 text-xs italic text-gray-400">
        {category}
      </p>
      {showTopLoader && <TopBarProgress />}
      <Image
        src={image}
        height={200}
        width={200}
        objectFit="contain"
        alt="imaggg"
      />

      <h4 className="my-3">{title}</h4>

      <div className="flex">
        {Array(rating)
          .fill(0)
          .map((_, i) => {
            return (
              <StarIcon
                key={`star-${id}-${i}`}
                className="h-5 text-yellow-500 fill-yellow-500"
              />
            );
          })}
      </div>

      <p className="text-xs my-2 line-clamp-2">{description}</p>

      <div className="mb-5">
        <span>₹{price}</span>
      </div>

      {hasPrime && (
        <div className="flex items-center space-x-2 -mt-5">
          <img className="w-12" src="https://links.papareact.com/fdw" alt="" />
          <p className="text-xs text-gray-500">FREE Next-day Delivery</p>
        </div>
      )}

      {button == "add" && (
        <button
          onClick={async () => {
            console.log("adding ", id);
            setShowTopLoader(true);
            if (status == "authenticated") {
              setButton("loading");
              await addToCart(id);
              setButton("remove");
            } else {
              signIn("google");
            }
            setShowTopLoader(false);
          }}
          className="mt-auto button cursor-pointer p-2 text-xs md:text-sm bg-gradient-to-b from-yellow-200 to-yellow-400 border border-yellow-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-yellow-500 active:from-yellow-500"
        >
          Add to Cart
        </button>
      )}

      {button == "loading" && (
        <button
          disabled
          onClick={async () => {
            console.log("adding ", id);
            setButton("loading");
            setShowTopLoader(true);
            await addToCart(id);
            setButton("remove");
            setShowTopLoader(false);
          }}
          className="mt-auto  button cursor-not-allowed  p-2 text-xs md:text-sm bg-gradient-to-b from-yellow-100 to-yellow-200 border border-yellow-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-yellow-300 active:from-yellow-500"
        >
          Loading!!!
        </button>
      )}

      {button == "remove" && (
        <button
          onClick={async () => {
            setButton("loading");
            setShowTopLoader(true);
            await removeFromCart(id);
            setButton("add");
            setShowTopLoader(false);
          }}
          className="mt-auto button cursor-pointer text-white  p-2 text-xs md:text-sm bg-gradient-to-b from-red-200 to-red-400 border border-red-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-red-500 active:from-red-500"
        >
          Remove
        </button>
      )}
    </div>
  );
}

export default Product;
