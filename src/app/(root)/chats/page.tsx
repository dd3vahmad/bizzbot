"use client";

import { useEffect, useState } from "react";
import { Search, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import Logo from "@/components/logo";
import { toast } from "sonner";
import NoData from "@/components/no-data";
import { convertToWordDate } from "@/lib/utils";
import Loading from "@/components/loading";

export default function AllChatsPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [chats, setChats] = useState<IChat[]>([]);
  const fetchChats = async () => {
    try {
      const res = await fetch("/api/chat/all", {
        method: "GET",
        headers: { "Content-Type": "application/json" }
      });
      const data = await res.json();
      setChats(data.data);
    } catch (error: any) {
      toast.error(error.message || "Oops an error occurred")
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchChats();
  }, []);

  return (
    <div className="flex flex-col h-screen w-full">
      {/* Header */}
      <div className="border-b border-neutral-700/50 bg-neutral-800/50 p-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <Logo className="text-amber-600" size={"xxs"} />
            <h1 className="text-lg sm:text-xl font-bold text-neutral-100">
              Chat History
            </h1>
          </div>
          <Badge
            variant="secondary"
            className="bg-neutral-700 text-neutral-300 text-xs sm:text-sm"
          >
            {chats.length} conversations
          </Badge>
        </div>

        {/* Search and Filter */}
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400"
              size={16}
            />
            <Input
              placeholder="Search chats..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-neutral-800 border-neutral-600 text-neutral-100 placeholder:text-neutral-400"
            />
          </div>
        </div>
      </div>

      {/* Chat List */}
      <div className="flex-1 overflow-y-auto p-4">
        {isLoading ? <Loading /> : chats.length === 0 ? (
          <NoData textBelow="No chat found" />
        ) : (
          <div className="space-y-3">
            {chats.map((chat) => (
              <Link
                key={chat.id}
                href={`/chat/${chat.id}`}
                className="block p-2 bg-neutral-800/50 hover:bg-neutral-700/50 rounded-lg border border-neutral-700/30 transition-all duration-200 hover:border-amber-600/30 group"
              >
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold text-neutral-100 line-clamp-1 flex-1 group-hover:text-amber-600 transition-colors">
                    {chat.title}
                  </h3>
                  <Button
                    size="sm"
                    variant="ghost"
                    className="text-amber-600 hover:bg-amber-600/10 h-6 text-xs sm:text-sm opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <span className="hidden sm:inline">Continue</span>
                    <ArrowRight size={16} />
                  </Button>
                </div>

                <span className="text-sm font-semibold">{convertToWordDate(chat.created_at)}</span>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
