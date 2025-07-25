"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { signIn, signOut } from "next-auth/react";
import Link from "next/link";
import { MenuIcon, Search, ShoppingCart } from "lucide-react";

function Header(props: { cartCount: number }) {
  const { status, data } = useSession({
    required: false,
  });

  return (
    <header>
      {/* top now */}
      <div className="flex items-center bg-[#131921] p-2 flex-grow py-2">
        <div className="mt-2 flex items-center flex-grow sm:flex-grow-0">
          <Link href={"/"}>
            <Image
              src="https://links.papareact.com/f90"
              width={110}
              height={40}
              objectFit="contain"
              className="cursor-pointer mx-4"
              alt="Amazon Logo"
            />
          </Link>
        </div>

        {/* search bar */}
        <div className="hidden sm:flex items-center h-10 rounded-md flex-grow cursor-pointer bg-white">
          <input
            className="p-2 h-full w-6 flex-grow flex-shrink rounded-l-md focus:outline-none px-4"
            type="text"
            id="search"
            name="search"
            placeholder="Search Amazon"
          />
          <Search className="h-full bg-yellow-400 hover:bg-yellow-500 px-2 w-8 rounded-tr-md rounded-br-md" />
        </div>

        {/* right */}
        <div className="text-white flex items-center text-xs space-x-6 mx-6 whitespace-nowrap text-center">
          {status === "authenticated" ? (
            <div className="link">
              <p>Hello, {data.user.name}</p>
              <p
                className="font-extrabold md:text-sm"
                onClick={() => {
                  signOut();
                }}
              >
                Sign Out
              </p>
            </div>
          ) : (
            <div className="link">
              <p
                onClick={() => signIn("google")}
                className="font-extrabold md:text-sm"
              >
                Sign In
              </p>
              <p className="font-extrabold md:text-sm"></p>
            </div>
          )}
          <Link href={"/orders"}>
            <div className="link">
              <p>Returns</p>
              <p className="font-extrabold md:text-sm">& Orders</p>
            </div>
          </Link>
          <div className="relative link flex items-center">
            <span className="absolute top-0 right-0 md:right-6 h-4 w-4 bg-yellow-400 text-center rounded-full text-black font-bold">
              {props.cartCount}
            </span>
            <Link href={"/cart"}>
              <ShoppingCart className="h-10" />
            </Link>
            <p className="hidden md:inline font-extrabold md:text-sm mt-2">
              <Link href={"/cart"}>Cart</Link>
            </p>
          </div>
        </div>
      </div>

      {/* botton nav */}
      <div className="flex space-x-3 p-2 pl-6 items-center bg-[#232F3E] text-white text-sm">
        <p className="link flex items-center">
          <MenuIcon className="h-6 mr-1" />
          All
        </p>
        <p className="link">Prime Video</p>
        <p className="link">Amazon Business</p>
        <p className="link">Today's Deals</p>
        <p className="link hidden lg:inline-flex">Electronics</p>
        <p className="link hidden lg:inline-flex">Food & Grocery</p>
        <p className="link hidden lg:inline-flex">Prime</p>
        <p className="link hidden lg:inline-flex">Buy Again</p>
        <p className="link hidden lg:inline-flex">Shopper Toolkit</p>
        <p className="link hidden lg:inline-flex">Health & Personal Care</p>
      </div>
    </header>
  );
}

export default Header;
