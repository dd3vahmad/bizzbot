"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { SidebarMenuButton } from "@/components/ui/sidebar";
import { ChevronDown, Settings } from "lucide-react";
import { useParams } from "next/navigation";

const ViewChat = () => {
  const { id } = useParams();

  return (
    <div className="flex flex-col items-center h-screen flex-1 w-full">
      <div className="flex w-full justify-between py-2 px-4">
        <DropdownMenu>
          <DropdownMenuTrigger
            asChild
            className="hover:bg-neutral-800 cursor-pointer hover:text-neutral-300 w-[240px]"
          >
            <SidebarMenuButton>
              Username
              <ChevronDown className="ml-auto" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            side="bottom"
            className="w-[--radix-popper-anchor-width] min-w-[240px] bg-neutral-700/70 text-neutral-300 border-0 outline-0 focus:border-0"
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

        <Button className="w-8 h-8 flex items-center rounded-full bg-transparent hover:bg-transparent border border-neutral-700 cursor-pointer">
          <Settings className="text-neutral-500" size={16} />
        </Button>
      </div>

      <h1>View a specific chat and also continue chatting - {id}</h1>
    </div>
  );
};

export default ViewChat;
