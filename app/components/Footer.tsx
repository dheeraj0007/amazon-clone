import {
  ArrowRight,
  GithubIcon,
  InstagramIcon,
  TwitterIcon,
  XIcon,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

function Footer() {
  return (
    <div className="text-sm md:text-base bg-[#232F3E] h-full py-20 mt-10 text-white grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 p-10 space-y-2 md:space-y-0">
      <div className="space-y-3">
        <p className="text-shadow-amber-500 text-shadow-2xs">Amazon 2.0</p>
        <p className="md:w-[80%]">
          We are here to help people buy their loved items.
        </p>
      </div>
      <div className="flex flex-col space-y-3">
        <h3 className="underline leading-2 decoration-[#FF9800] decoration-2">
          Quick Links
        </h3>
        <Link href={"/"}>Home</Link>
        <Link href={"/cart"}>Cart</Link>
        <Link href={"/orders"}>Orders</Link>
      </div>
      <div className="flex flex-col space-y-3">
        <h3 className="underline leading-2 decoration-[#FF9800] decoration-2">
          Collaborators
        </h3>
        <p>Dheeraj Gulati</p>
      </div>

      <div className="flex flex-col space-y-3">
        <h3 className="underline leading-2 decoration-[#FF9800] decoration-2">
          Contact Me
        </h3>
        <p>Dheeraj Gulati</p>
        <Link href="mailto:dheerajgulati544@email.com">
          dheerajgulati544@email.com
        </Link>
        <p className="flex items-center space-x-2 cursor-pointer">
          <span>Socials</span>
          <Link href={"https://github.com/dheeraj0007"} target="_blank">
            <Image
              src={"/github-mark-white.png"}
              width={20}
              height={20}
              alt="github"
            />
          </Link>
          <Link href={"https://x.com/dheeraj_gulati7"} target="_blank">
            <Image
              src={"/twitter-x-logo.jpg"}
              width={30}
              height={30}
              alt="twitter-x"
              className="invert"
            />
          </Link>
          <Link href={"https://instagram.com/dheeraj_gulati7"} target="_blank">
            <InstagramIcon className="h-5 w-5" />
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Footer;
