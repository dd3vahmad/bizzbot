"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Send, Paperclip, X, ArrowLeft, Bot, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { useParams } from "next/navigation"
import Logo from "@/components/logo"

const mockChatData = {
  1: {
    title: "Cake business registration information",
    category: "Registration",
    messages: [
      {
        id: 1,
        type: "user",
        content: "What are the requirements for registering a cake business in Nigeria?",
        timestamp: "10:30 AM",
      },
      {
        id: 2,
        type: "bot",
        content:
          "To register a cake business in Nigeria, you'll need to follow these steps:\n\n1. **Business Name Registration**: Register your business name with the Corporate Affairs Commission (CAC)\n2. **Business Registration**: Choose between sole proprietorship, partnership, or limited liability company\n3. **Tax Identification**: Obtain a Tax Identification Number (TIN) from FIRS\n4. **NAFDAC Registration**: Since you're dealing with food products, you'll need NAFDAC certification\n5. **Local Government Permit**: Get necessary permits from your local government area\n\nWould you like me to explain any of these steps in detail?",
        timestamp: "10:31 AM",
      },
      {
        id: 3,
        type: "user",
        content: "Can you tell me more about the NAFDAC registration process?",
        timestamp: "10:35 AM",
      },
      {
        id: 4,
        type: "bot",
        content:
          "NAFDAC registration for food businesses involves:\n\n**Requirements:**\n• Completed application form\n• Certificate of incorporation (for companies)\n• Product samples and specifications\n• Manufacturing process flow chart\n• Laboratory analysis report\n• Facility inspection certificate\n\n**Process:**\n1. Submit application with required documents\n2. Pay registration fees (₦50,000 - ₦200,000 depending on business size)\n3. Facility inspection by NAFDAC officials\n4. Product testing and evaluation\n5. Certificate issuance (valid for 5 years)\n\n**Timeline:** 6-8 weeks for processing\n\nDo you need information about any other registration requirements?",
        timestamp: "10:36 AM",
      },
    ],
  },
  2: {
    title: "Car business registration information",
    category: "Registration",
    messages: [
      {
        id: 1,
        type: "user",
        content: "How do I register an automotive business with CAC?",
        timestamp: "Yesterday 2:15 PM",
      },
      {
        id: 2,
        type: "bot",
        content:
          "To register an automotive business with CAC, follow these steps:\n\n**Business Name Registration:**\n• Search for name availability on CAC portal\n• Pay ₦500 for name search\n• Reserve approved name for 60 days\n\n**Company Registration:**\n• Choose business structure (Ltd, PLC, etc.)\n• Prepare incorporation documents\n• Pay registration fees (₦10,000 - ₦50,000)\n\n**Additional Requirements:**\n• Automotive dealer license from NADDC\n• Import permit (if importing vehicles)\n• Environmental compliance certificate\n\nWould you like details on any specific aspect?",
        timestamp: "Yesterday 2:16 PM",
      },
    ],
  },
  3: {
    title: "Farming business registration information",
    category: "Registration",
    messages: [
      {
        id: 1,
        type: "user",
        content: "What licenses do I need for agricultural business?",
        timestamp: "2 days ago",
      },
      {
        id: 2,
        type: "bot",
        content:
          "For agricultural business in Nigeria, you'll need:\n\n**Basic Registration:**\n• CAC business registration\n• Tax Identification Number (TIN)\n• Bank account opening\n\n**Agricultural Specific Licenses:**\n• Agricultural Development Program (ADP) registration\n• Cooperative society membership (optional but beneficial)\n• Land use permit/certificate of occupancy\n\n**For Specific Activities:**\n• Pesticide dealer license (NAFDAC)\n• Seed certification (if selling seeds)\n• Export permit (for export farming)\n• Organic certification (for organic farming)\n\n**Incentives Available:**\n• CBN agricultural loans\n• NIRSAL credit guarantee\n• Tax holidays for large-scale farming\n\nWhat type of agricultural business are you planning?",
        timestamp: "2 days ago",
      },
    ],
  },
  4: {
    title: "FINTECH company launch procedures in Nigeria",
    category: "Fintech",
    messages: [
      {
        id: 1,
        type: "user",
        content: "What are the CBN requirements for fintech startups?",
        timestamp: "3 days ago",
      },
      {
        id: 2,
        type: "bot",
        content:
          "CBN requirements for fintech startups include:\n\n**Regulatory Sandbox:**\n• Apply for CBN Regulatory Sandbox\n• Minimum ₦50 million capital requirement\n• Technical infrastructure assessment\n• Risk management framework\n\n**Licensing Options:**\n• Payment Service Bank (PSB) License\n• Mobile Money Operator (MMO) License\n• Switching & Processing License\n• Super Agent License\n\n**Key Requirements:**\n• Fit and proper test for directors\n• IT security and data protection compliance\n• Anti-money laundering (AML) policies\n• Customer due diligence procedures\n• Business continuity plan\n\n**Timeline:** 6-12 months for full licensing\n\nWhich specific fintech service are you planning to offer?",
        timestamp: "3 days ago",
      },
    ],
  },
  5: {
    title: "Taxes related to FINTECH companies",
    category: "Tax",
    messages: [
      {
        id: 1,
        type: "user",
        content: "How are fintech companies taxed in Nigeria?",
        timestamp: "1 week ago",
      },
      {
        id: 2,
        type: "bot",
        content:
          "Fintech companies in Nigeria are subject to:\n\n**Corporate Income Tax:**\n• 30% on profits for large companies\n• 20% for small companies (turnover ≤ ₦25M)\n• 0% for first 3 years (pioneer status eligible)\n\n**Value Added Tax (VAT):**\n• 7.5% on qualifying services\n• Some financial services are VAT-exempt\n\n**Other Taxes:**\n• Withholding tax on payments\n• Personal income tax for employees\n• Capital gains tax on asset disposal\n\n**Tax Incentives:**\n• Pioneer status (3-5 years tax holiday)\n• Investment tax credit\n• Accelerated capital allowance\n\n**Compliance:**\n• Monthly VAT returns\n• Annual income tax returns\n• Audited financial statements\n\nWould you like details on tax optimization strategies?",
        timestamp: "1 week ago",
      },
    ],
  },
}

export default function ChatPage() {
  const params = useParams()
  const chatId = params.id as string
  const [message, setMessage] = useState("")
  const [attachedFiles, setAttachedFiles] = useState<File[]>([])
  const [messages, setMessages] = useState<any[]>([])
  const fileInputRef = useRef<HTMLInputElement>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const chatData = mockChatData[chatId as keyof typeof mockChatData] || {
    title: "Chat not found",
    category: "Unknown",
    messages: [],
  }

  useEffect(() => {
    if (chatData.messages.length > 0) {
      setMessages(chatData.messages)
    }
  }, [chatId])

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSend = () => {
    if (message.trim() || attachedFiles.length > 0) {
      const newMessage = {
        id: messages.length + 1,
        type: "user",
        content: message,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      }

      setMessages((prev) => [...prev, newMessage])

      // Simulate bot response after a delay
      setTimeout(() => {
        const botResponse = {
          id: messages.length + 2,
          type: "bot",
          content:
            "Thank you for your question! I'm processing your request and will provide you with detailed information about Nigerian business regulations shortly.",
          timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        }
        setMessages((prev) => [...prev, botResponse])
      }, 1000)

      setMessage("")
      setAttachedFiles([])
    }
  }

  const handleFileAttach = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || [])
    setAttachedFiles((prev) => [...prev, ...files])
  }

  const removeFile = (index: number) => {
    setAttachedFiles((prev) => prev.filter((_, i) => i !== index))
  }

  return (
    <div className="flex flex-col h-full bg-neutral-900">
      {/* Header */}
      <div className="border-b border-neutral-700/50 bg-neutral-800/50 p-4">
        <div className="flex items-center gap-3">
          <Link href="/chats" className="p-2 hover:bg-neutral-700/50 rounded-lg transition-colors">
            <ArrowLeft className="text-neutral-400 hover:text-[#E17100]" size={20} />
          </Link>
          <div className="flex-1 min-w-0">
            <h1 className="text-lg font-semibold text-neutral-100 line-clamp-1">{chatData.title}</h1>
            <div className="flex items-center gap-2 mt-1">
              <Badge variant="secondary" className="bg-[#E17100]/20 text-[#E17100] text-xs">
                {chatData.category}
              </Badge>
              <span className="text-xs text-neutral-400">{messages.length} messages</span>
            </div>
          </div>
          <Button
            size="sm"
            className="bg-[#E17100] hover:bg-[#E17100]/90 hidden sm:flex"
            onClick={() => document.querySelector("textarea")?.focus()}
          >
            Continue Chat
          </Button>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center">
            <Logo size="lg" />
            <h2 className="text-2xl font-bold text-neutral-100 mt-4 mb-2">Chat not found</h2>
            <p className="text-neutral-400 mb-6">This chat doesn&apos;t exist or has been deleted.</p>
            <Link href="/chats">
              <Button className="bg-[#E17100] hover:bg-[#E17100]/90">Back to All Chats</Button>
            </Link>
          </div>
        ) : (
          <>
            {messages.map((msg) => (
              <div key={msg.id} className={`flex ${msg.type === "user" ? "justify-end" : "justify-start"}`}>
                <div className={`flex gap-3 max-w-[85%] sm:max-w-[80%]`}>
                  {msg.type === "bot" && (
                    <div className="flex-shrink-0 w-8 h-8 bg-[#E17100] rounded-full flex items-center justify-center">
                      <Bot size={16} className="text-white" />
                    </div>
                  )}
                  <div
                    className={`p-3 rounded-lg ${
                      msg.type === "user"
                        ? "bg-[#E17100] text-white rounded-br-sm"
                        : "bg-neutral-800 text-neutral-100 border border-neutral-700/50 rounded-bl-sm"
                    }`}
                  >
                    <p className="whitespace-pre-wrap text-sm sm:text-base leading-relaxed">{msg.content}</p>
                    <span
                      className={`text-xs mt-2 block ${msg.type === "user" ? "text-orange-100" : "text-neutral-400"}`}
                    >
                      {msg.timestamp}
                    </span>
                  </div>
                  {msg.type === "user" && (
                    <div className="flex-shrink-0 w-8 h-8 bg-neutral-700 rounded-full flex items-center justify-center">
                      <User size={16} className="text-neutral-300" />
                    </div>
                  )}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </>
        )}
      </div>

      {/* Input Area */}
      {messages.length > 0 && (
        <div className="border-t border-neutral-700/50 bg-neutral-800/50 p-4">
          {/* Attached Files */}
          {attachedFiles.length > 0 && (
            <div className="mb-3 flex flex-wrap gap-2">
              {attachedFiles.map((file, index) => (
                <div
                  key={index}
                  className="flex items-center gap-2 bg-neutral-700 text-neutral-300 px-3 py-1 rounded-full text-sm"
                >
                  <span className="truncate max-w-32">{file.name}</span>
                  <button onClick={() => removeFile(index)} className="text-neutral-400 hover:text-neutral-200">
                    <X size={14} />
                  </button>
                </div>
              ))}
            </div>
          )}

          <div className="flex gap-2">
            <div className="flex-1 relative">
              <Textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Continue the conversation about business registration, taxes, or trade..."
                className="min-h-[50px] max-h-32 bg-neutral-800 border-neutral-600 text-neutral-100 placeholder:text-neutral-400 pr-12 resize-none"
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault()
                    handleSend()
                  }
                }}
              />
              <button
              title="input"
                onClick={() => fileInputRef.current?.click()}
                className="absolute right-3 top-3 text-neutral-400 hover:text-[#E17100] transition-colors"
              >
                <Paperclip size={18} />
              </button>
              <input
              title="Attach files"
                ref={fileInputRef}
                type="file"
                multiple
                onChange={handleFileAttach}
                className="hidden"
                accept="image/*,.pdf,.doc,.docx,.txt"
              />
            </div>
            <Button
              onClick={handleSend}
              disabled={!message.trim() && attachedFiles.length === 0}
              className="bg-[#E17100] hover:bg-[#E17100]/90 disabled:bg-neutral-700 disabled:text-neutral-500 px-4"
            >
              <Send size={18} />
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}
