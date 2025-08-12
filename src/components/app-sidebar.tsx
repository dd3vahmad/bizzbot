import { ChevronUp, MessageCircle, PlusCircle, User2 } from "lucide-react";
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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import Logo from "./logo";
import Link from "next/link";

const items = [
  {
    title: "Cake business registration information.",
    id: 1,
  },
  {
    title: "Car business registration information.",
    id: 2,
  },
  {
    title: "Farming business registration information.",
    id: 3,
  },
  {
    title: "FINTECH componey launch procedures in Nigeria",
    id: 4,
  },
  {
    title: "Taxes related to FINTECH companies",
    id: 5,
  },
];

export function AppSidebar() {
  return (
    <Sidebar className="border-neutral-700/50">
      <SidebarHeader className="bg-neutral-800 w-full">
        <div className="flex items-center gap-x-2">
          <Logo size="xxs" />
          <h1 className="text-2xl font-semibold text-neutral-300">BizzBot</h1>
        </div>

        <div className="flex flex-col gap-y-1 mt-8">
          <Link
            href={"/chat"}
            className="flex items-center gap-x-3 px-2 cursor-pointer hover:bg-neutral-700/50 rounded py-2"
          >
            <PlusCircle size={20} className="text-amber-600" />
            <h1 className="font-semibold text-neutral-300">New Chat</h1>
          </Link>
          <Link
            href={"/chat/all"}
            className="flex items-center gap-x-3 px-2 cursor-pointer hover:bg-neutral-700/50 rounded py-2"
          >
            <MessageCircle size={20} className="text-amber-600" />
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
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    className="hover:bg-neutral-700/50 hover:text-neutral-300"
                  >
                    <Link href={`/chat/${item.id}`}>
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="bg-neutral-800 text-neutral-300 w-full">
        <SidebarMenu className="w-full">
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger
                asChild
                className="w-full hover:bg-neutral-800 cursor-pointer hover:text-neutral-300"
              >
                <SidebarMenuButton>
                  <User2 /> Username
                  <ChevronUp className="ml-auto" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                side="top"
                className="w-[--radix-popper-anchor-width] min-w-[240px] bg-neutral-700/70 text-neutral-300 border-0"
              >
                <DropdownMenuItem>
                  <span>Account</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <span>Billing</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <span>Sign out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
