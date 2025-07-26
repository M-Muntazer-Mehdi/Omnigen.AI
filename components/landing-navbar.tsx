"use client";

import { useAuth } from "@clerk/nextjs";
import { Montserrat } from "next/font/google";
import Image from "next/image";
import Link from "next/link";

import { cn } from "@/lib/utils";
import { Button } from "./ui/button";

const font = Montserrat({
  weight: "600",
  subsets: ["latin"],
});

export const LandingNabvbar = () => {
  const { isSignedIn } = useAuth();

  return (
    <nav className="p-0 bg-transparent flex items-center justify-between">
      <Link href="/" className="flex items-center">
      <div className="relative h-16 w-48">
        <Image fill src="/logo.png" alt="Logo" />
      </div>
      </Link>
<div className="flex items-center gap-x-2">
 <Link href={isSignedIn ? "/dashboard" : "/sign-up"}>
   <Button
     variant="outline"
     className="rounded-full px-7 py-3 text-lg font-semibold border-2 border-gray-500 text-gray-700
                relative overflow-hidden group transition-all duration-500 ease-in-out
                hover:text-white"
   >
     <span className="absolute inset-0 bg-gradient-to-r from-black via-gray-500 to-white transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ease-in-out origin-left"></span>
     <span className="relative z-10">Get Started</span>
   </Button>
 </Link>
</div>
    </nav>
  );
};
