import {
  Code,
  ImageIcon,
  LayoutDashboard,
  MessageSquare,
  Music,
  Settings,
  VideoIcon,
} from "lucide-react";
import { Route } from "@/types";

export const routes: Route[] = [
  {
    label: "Dashboard",
    icon: LayoutDashboard,
    href: "/dashboard",
    color: "text-sky-500",
    hideOnDashboard: true,
  },
  {
    label: "Conversation",
    icon: MessageSquare,
    href: "/conversation",
    color: "text-violet-500",
    bgColor: "bg-violet-500/10",
  },
  {
    label: "Image Generation",
    icon: ImageIcon,
    href: "/image",
    color: "text-red-400",
    bgColor: "bg-red-400/10",
  },
  {
    label: "Code Generation",
    icon: Code,
    href: "/code",
    color: "text-amber-400",
    bgColor: "bg-amber-400/10",
  },
  {
    label: "Video Generation",
    icon: VideoIcon,
    href: "/video",
    color: "text-orange-500",
    bgColor: "bg-orange-500/10",
  },
  {
    label: "Music Generation",
    icon: Music,
    href: "/music",
    color: "text-teal-500",
    bgColor: "bg-teal-500/10",
  },
  {
    label: "Settings",
    icon: Settings,
    href: "/settings",
    hideOnDashboard: true,
  },
];
