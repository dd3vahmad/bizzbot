"use client"

import { useState } from "react"
import { MessageCircle, Clock, Search, Filter } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"

// Mock data for chats
const mockChats = [
  {
    id: 1,
    title: "Cake business registration information",
    lastMessage: "What are the requirements for registering a cake business in Nigeria?",
    timestamp: "2 hours ago",
    messageCount: 8,
    category: "Registration",
  },
  {
    id: 2,
    title: "Car business registration information",
    lastMessage: "How do I register an automotive business with CAC?",
    timestamp: "1 day ago",
    messageCount: 12,
    category: "Registration",
  },
  {
    id: 3,
    title: "Farming business registration information",
    lastMessage: "What licenses do I need for agricultural business?",
    timestamp: "2 days ago",
    messageCount: 6,
    category: "Registration",
  },
  {
    id: 4,
    title: "FINTECH company launch procedures in Nigeria",
    lastMessage: "What are the CBN requirements for fintech startups?",
    timestamp: "3 days ago",
    messageCount: 15,
    category: "Fintech",
  },
  {
    id: 5,
    title: "Taxes related to FINTECH companies",
    lastMessage: "How are fintech companies taxed in Nigeria?",
    timestamp: "1 week ago",
    messageCount: 9,
    category: "Tax",
  },
  {
    id: 6,
    title: "Import/Export business setup",
    lastMessage: "What permits do I need for import business?",
    timestamp: "1 week ago",
    messageCount: 7,
    category: "Trade",
  },
  {
    id: 7,
    title: "Restaurant business licensing",
    lastMessage: "NAFDAC requirements for food business?",
    timestamp: "2 weeks ago",
    messageCount: 11,
    category: "Registration",
  },
  {
    id: 8,
    title: "E-commerce business registration",
    lastMessage: "How to register online business in Nigeria?",
    timestamp: "2 weeks ago",
    messageCount: 5,
    category: "Registration",
  },
]

const categories = ["All", "Registration", "Tax", "Trade", "Fintech"]

export default function AllChatsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")

  const filteredChats = mockChats.filter((chat) => {
    const matchesSearch =
      chat.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      chat.lastMessage.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory === "All" || chat.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  return (
    <div className="flex flex-col h-full bg-neutral-900">
      {/* Header */}
      <div className="border-b border-neutral-700/50 bg-neutral-800/50 p-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <MessageCircle className="text-[#E17100]" size={24} />
            <h1 className="text-xl sm:text-2xl font-bold text-neutral-100">All Chats</h1>
          </div>
          <Badge variant="secondary" className="bg-neutral-700 text-neutral-300 text-xs sm:text-sm">
            {filteredChats.length} conversations
          </Badge>
        </div>

        {/* Search and Filter */}
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400" size={16} />
            <Input
              placeholder="Search chats..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-neutral-800 border-neutral-600 text-neutral-100 placeholder:text-neutral-400"
            />
          </div>
          <div className="flex gap-2 overflow-x-auto pb-2 sm:pb-0">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(category)}
                className={
                  selectedCategory === category
                    ? "bg-[#E17100] hover:bg-[#E17100]/90 text-white whitespace-nowrap"
                    : "border-neutral-600 text-neutral-300 hover:bg-neutral-700 whitespace-nowrap"
                }
              >
                <Filter size={14} className="mr-1" />
                {category}
              </Button>
            ))}
          </div>
        </div>
      </div>

      {/* Chat List */}
      <div className="flex-1 overflow-y-auto p-4">
        {filteredChats.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-64 text-neutral-400">
            <MessageCircle size={48} className="mb-4" />
            <p className="text-lg font-medium">No chats found</p>
            <p className="text-sm text-center">Try adjusting your search or filter criteria</p>
          </div>
        ) : (
          <div className="space-y-3">
            {filteredChats.map((chat) => (
              <Link
                key={chat.id}
                href={`/chat/${chat.id}`}
                className="block p-4 bg-neutral-800/50 hover:bg-neutral-700/50 rounded-lg border border-neutral-700/30 transition-all duration-200 hover:border-[#E17100]/30 group"
              >
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-semibold text-neutral-100 line-clamp-1 flex-1 mr-3 group-hover:text-[#E17100] transition-colors">
                    {chat.title}
                  </h3>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <Badge variant="secondary" className="bg-[#E17100]/20 text-[#E17100] text-xs">
                      {chat.category}
                    </Badge>
                    <span className="text-xs text-neutral-400 hidden sm:inline">{chat.messageCount} msgs</span>
                  </div>
                </div>
                <p className="text-sm text-neutral-400 line-clamp-2 mb-3">{chat.lastMessage}</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-xs text-neutral-500">
                    <Clock size={12} />
                    <span>{chat.timestamp}</span>
                  </div>
                  <Button
                    size="sm"
                    variant="ghost"
                    className="text-[#E17100] hover:bg-[#E17100]/10 h-6 px-2 text-xs sm:text-sm opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <span className="hidden sm:inline">Continue →</span>
                    <span className="sm:hidden">→</span>
                  </Button>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
