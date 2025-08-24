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
import NoData from "./no-data";

// const chats = [
//   {
//     title: "Cake business registration information",
//     id: 1,
//   },
//   {
//     title: "Car business registration information",
//     id: 2,
//   },
//   {
//     title: "Farming business registration information",
//     id: 3,
//   },
//   {
//     title: "FINTECH company launch procedures",
//     id: 4,
//   },
//   {
//     title: "Taxes related to FINTECH companies",
//     id: 5,
//   },
// ];

const chats: any[] = [];

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
              {chats.length ? (
                chats.map((item) => (
                  <SidebarMenuItem key={item.id}>
                    <SidebarMenuButton
                      asChild
                      className="hover:bg-neutral-700/50 hover:text-neutral-300"
                    >
                      <Link
                        href={`/chat/${item.id}`}
                        className="flex items-center gap-1"
                      >
                        <span className="text-sm truncate hover:text-[#E17100] transition-colors">
                          {item.title}
                        </span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))
              ) : (
                <NoData textBelow="You have no chat yet." />
              )}
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
