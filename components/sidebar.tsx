"use client";

import { Code, ImageIcon, LayoutDashboard, MessageSquare, Music, Settings, VideoIcon } from "lucide-react";
import { Montserrat } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FC } from "react";

import { cn } from "@/lib/utils";
import FreeCounter from "./free-counter";

const montserrat = Montserrat({ weight: "600", subsets: ["latin"] });

const routes = [
  {
    label: "Dashboard",
    icon: LayoutDashboard,
    href: "/dashboard",
    color: "text-sky-500",
  },
  {
    label: "Conversation",
    icon: MessageSquare,
    href: "/conversation",
    color: "text-violet-500",
  },
  {
    label: "Image Generation",
    icon: ImageIcon,
    href: "/image",
    color: "text-pink-700",
  },
  {
    label: "Video Generation",
    icon: VideoIcon,
    href: "/video",
    color: "text-orange-700",
  },
  {
    label: "Music Generation",
    icon: Music,
    href: "/music",
    color: "text-emerald-500",
  },
  {
    label: "Code Generation",
    icon: Code,
    href: "/code",
    color: "text-green-700",
  },
  {
    label: "Settings",
    icon: Settings,
    href: "/settings",
  },
];

interface SidebarProps {
  apiLimitCount: number;
  isPro: boolean;
}

const Sidebar: FC<SidebarProps> = ({ apiLimitCount = 0, isPro = false }) => {
  const pathname = usePathname();

  return (
<div
  className="space-y-4 py-4 flex flex-col h-full text-white"
  style={{
    background: 'linear-gradient(180deg,rgba(0, 0, 0, 1) 0%, rgba(2, 5, 3, 1) 0%, rgba(26, 26, 26, 1) 71%, rgba(66, 66, 66, 1) 90%, rgba(163, 162, 162, 1) 100%)'
  }}
>

  <div className="px-3 py-2 flex-1">
    <Link href="/dashboard" className="flex items-center pl-3 mb-14">
      <div className="relative w-52 h-20 mr-4"> {/* Logo container size changed */}
        <Image
          fill
          alt="Logo"
          src="/logo.png"
          className="filter brightness-0 invert" // Makes the logo white
        />
      </div>
    </Link>
    <div className="space-y-1">
      {routes.map((route) => (
        <Link
          href={route.href}
          key={route.href}
          className={cn(
            "text-sm group flex p-3 w-full justify-start font-medium cursor-pointer hover:text-white hover:bg-white/20 rounded-lg transition",
            pathname === route.href ? "bg-white/20 text-white" : "text-zinc-400"
          )}
        >
          <div className="flex items-center flex-1">
            <route.icon className={cn("w-5 h-5 mr-3", route.color)} />
            {route.label}
          </div>
        </Link>
      ))}
    </div>
  </div>
  <FreeCounter apiLimitCount={apiLimitCount} isPro={isPro} />
</div>
  );
};

export default Sidebar;
