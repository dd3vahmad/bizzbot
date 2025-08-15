import { MessageCircle, PlusCircle } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import Logo from "./logo";
import Link from "next/link";
import { app } from "@/lib/constants";
import { UserButton } from "@clerk/nextjs";

const items = [
  {
    title: "Cake business registration information",
    id: 1,
    lastMessage: "NAFDAC registration process details",
    timestamp: "2h ago",
  },
  {
    title: "Car business registration information",
    id: 2,
    lastMessage: "Automotive dealer license requirements",
    timestamp: "1d ago",
  },
  {
    title: "Farming business registration information",
    id: 3,
    lastMessage: "Agricultural licenses needed",
    timestamp: "2d ago",
  },
  {
    title: "FINTECH company launch procedures",
    id: 4,
    lastMessage: "CBN regulatory sandbox application",
    timestamp: "3d ago",
  },
  {
    title: "Taxes related to FINTECH companies",
    id: 5,
    lastMessage: "Tax optimization strategies",
    timestamp: "1w ago",
  },
];

export function AppSidebar() {
  return (
    <Sidebar className="border-neutral-700/50">
      <SidebarHeader className="bg-neutral-800 w-full">
        <Link href={"/chat"} className="flex items-center gap-x-2">
          <Logo size="xxs" />
          <h1 className="text-2xl font-semibold text-neutral-300">
            {app.name}
          </h1>
        </Link>

        <div className="flex flex-col gap-y-1 mt-8">
          <Link
            href={"/chat"}
            className="flex items-center gap-x-3 px-2 cursor-pointer hover:bg-neutral-700/50 rounded py-2 transition-colors"
          >
            <PlusCircle size={20} className="text-[#E17100]" />
            <h1 className="font-semibold text-neutral-300">New Chat</h1>
          </Link>
          <Link
            href={"/chats"}
            className="flex items-center gap-x-3 px-2 cursor-pointer hover:bg-neutral-700/50 rounded py-2 transition-colors"
          >
            <MessageCircle size={20} className="text-[#E17100]" />
            <h1 className="font-semibold text-neutral-300">All Chats</h1>
          </Link>
        </div>
      </SidebarHeader>

      <SidebarContent className="bg-neutral-800 text-neutral-300 pt-5">
        <SidebarGroup>
          <SidebarGroupLabel className="text-neutral-300 font-bold">
            Recent Chats
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.id}>
                  <SidebarMenuButton
                    asChild
                    className="hover:bg-neutral-700/50 hover:text-neutral-300 group"
                  >
                    <Link
                      href={`/chat/${item.id}`}
                      className="flex flex-col items-start gap-1 py-2"
                    >
                      <span className="font-medium text-sm line-clamp-1 group-hover:text-[#E17100] transition-colors">
                        {item.title}
                      </span>
                      <div className="flex items-center justify-between w-full">
                        <span className="text-xs text-neutral-400 line-clamp-1 flex-1">
                          {item.lastMessage}
                        </span>
                        <span className="text-xs text-neutral-500 ml-2">
                          {item.timestamp}
                        </span>
                      </div>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="bg-neutral-800 text-neutral-300 w-full">
        <SidebarMenu className="bg-neutral-600 w-full flex items-center justify-between px-0 py-2 rounded-md">
          <div className="flex items-center gap-3">
            <UserButton
              appearance={{
                elements: {
                  avatarBox: "w-8 h-8",
                  userButtonPopoverCard: "bg-neutral-800 border-neutral-700",
                  userButtonPopoverActionButton:
                    "text-neutral-300 hover:bg-neutral-700",
                },
              }}
            />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-neutral-300">
                Business Owner
              </p>
              <p className="text-xs text-neutral-400">Free Plan</p>
            </div>
          </div>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
