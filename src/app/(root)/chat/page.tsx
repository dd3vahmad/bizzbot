"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import Logo from "@/components/logo"
import {
  Bot,
  Send,
  FileText,
  Calculator,
  Building,
  User,
  Sparkles,
  HelpCircle,
  ImageIcon,
  Paperclip,
  X,
} from "lucide-react"
import { UserButton } from "@clerk/nextjs"

interface Message {
  id: string
  content: string
  sender: "user" | "bot"
  timestamp: Date
  category?: "registration" | "tax" | "trade" | "general"
}

export default function DashboardPage() {
  const [messages, setMessages] = useState<Message[]>([])
  const [inputValue, setInputValue] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [attachedFile, setAttachedFile] = useState<File | null>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputValue,
      sender: "user",
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInputValue("")
    setIsLoading(true)

    // Simulate AI response
    setTimeout(() => {
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: generateBotResponse(inputValue),
        sender: "bot",
        timestamp: new Date(),
        category: detectCategory(inputValue),
      }
      setMessages((prev) => [...prev, botMessage])
      setIsLoading(false)
    }, 1500)
  }

  const detectCategory = (message: string): "registration" | "tax" | "trade" | "general" => {
    const lowerMessage = message.toLowerCase()
    if (lowerMessage.includes("register") || lowerMessage.includes("cac") || lowerMessage.includes("incorporation")) {
      return "registration"
    }
    if (lowerMessage.includes("tax") || lowerMessage.includes("vat") || lowerMessage.includes("firs")) {
      return "tax"
    }
    if (lowerMessage.includes("import") || lowerMessage.includes("export") || lowerMessage.includes("trade")) {
      return "trade"
    }
    return "general"
  }

  const generateBotResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase()

    if (lowerMessage.includes("register") || lowerMessage.includes("cac")) {
      return "To register your business in Nigeria, you'll need to follow these key steps:\n\n1. **Reserve your business name** with the Corporate Affairs Commission (CAC)\n2. **Complete Form CAC 1.1** for incorporation\n3. **Pay the required fees** (varies by business type)\n4. **Submit required documents** including memorandum and articles of association\n5. **Receive your Certificate of Incorporation**\n\nThe process typically takes 7-14 business days. Would you like me to explain any specific step in more detail?"
    }

    if (lowerMessage.includes("tax") || lowerMessage.includes("vat")) {
      return "For tax compliance in Nigeria, here are the main requirements:\n\n**VAT Registration:**\n• Required if annual turnover exceeds ₦25 million\n• Register with FIRS within 6 months of commencement\n• Current VAT rate is 7.5%\n\n**Income Tax:**\n• Companies pay 30% corporate income tax\n• Small companies (turnover < ₦25M) pay 20%\n• File returns annually by March 31st\n\nWould you like specific guidance on any of these tax obligations?"
    }

    if (lowerMessage.includes("import") || lowerMessage.includes("export")) {
      return "For import/export business in Nigeria:\n\n**Import Requirements:**\n• Register with Nigerian Customs Service\n• Obtain Form M (import permit)\n• Get Pre-Arrival Assessment Report (PAAR)\n• Pay applicable duties and taxes\n\n**Export Requirements:**\n• Register with Nigerian Export Promotion Council (NEPC)\n• Obtain Export Certificate\n• Complete shipping documentation\n\n**Key Agencies:**\n• Nigeria Customs Service\n• Standards Organisation of Nigeria (SON)\n• NAFDAC (for food/drugs)\n\nWhat specific product are you looking to import or export?"
    }

    return "I understand you're looking for business guidance. I can help you with:\n\n• **Business Registration** - CAC processes, name reservation, incorporation\n• **Tax Compliance** - VAT, income tax, PAYE requirements\n• **Trade & Licensing** - Import/export permits, professional licenses\n• **Regulatory Compliance** - Industry-specific requirements\n\nCould you please be more specific about what aspect of your business you need help with?"
  }

  const handleFileAttach = () => {
    fileInputRef.current?.click()
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setAttachedFile(file)
    }
  }

  const removeAttachment = () => {
    setAttachedFile(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  const quickActions = [
    { icon: Building, label: "Register Business", category: "registration" },
    { icon: Calculator, label: "Tax Questions", category: "tax" },
    { icon: FileText, label: "Trade License", category: "trade" },
    { icon: HelpCircle, label: "General Help", category: "general" },
  ]

  const getGreeting = () => {
    const hour = new Date().getHours()
    if (hour < 12) return "Good Morning"
    if (hour < 17) return "Good Afternoon"
    return "Good Evening"
  }

  const greeting = `${getGreeting()}, Ahmad`

  return (
    <div className="w-full h-screen flex flex-col">
      <header className="bg-neutral-800 border-b border-neutral-700 px-4 py-4 lg:px-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div>
              <h1 className="font-bold text-xl text-neutral-300">Business Assistant</h1>
              <p className="text-sm text-neutral-400">Get instant answers to your Nigerian business questions</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Badge className="text-white border-orange-200" style={{ backgroundColor: "#E17100" }}>
              🇳🇬 Nigeria
            </Badge>
            <div className="lg:hidden">
              <UserButton
                appearance={{
                  elements: {
                    avatarBox: "w-8 h-8",
                  },
                }}
              />
            </div>
          </div>
        </div>
      </header>

      {messages.length === 0 ? (
        <main className="flex-1 flex items-center justify-center p-4 bg-neutral-900">
          <div className="flex flex-col min-h-[400px] items-center max-w-2xl w-full">
            <div className="flex items-center gap-2 px-2 mb-8">
              <Logo size="xs" className="cursor-pointer" />
              <h1 className="text-3xl md:text-4xl font-bold text-neutral-300">{greeting}</h1>
            </div>

            <div className="flex flex-col bg-neutral-700 mt-5 w-full overflow-hidden rounded-xl p-1">
              {attachedFile && (
                <div className="flex items-center gap-2 p-2 bg-amber-600/20 border border-amber-600/30 rounded-lg mb-2">
                  <Paperclip className="w-4 h-4 text-amber-600" />
                  <span className="text-sm text-amber-600 flex-1 truncate">{attachedFile.name}</span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={removeAttachment}
                    className="h-6 w-6 p-0 text-amber-600 hover:text-amber-500"
                  >
                    <X className="w-3 h-3" />
                  </Button>
                </div>
              )}

              <Textarea
                rows={1}
                className="w-full outline-none border-none mb-2 resize-none bg-transparent text-neutral-300 placeholder:text-neutral-400"
                placeholder="How may I help you today?"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && !e.shiftKey && handleSendMessage()}
              />

              <div className="w-full flex items-center justify-between px-2 py-2 text-neutral-400">
                <div className="relative">
                  <Button
                    onClick={handleFileAttach}
                    className="cursor-pointer border p-2 rounded border-neutral-500 bg-transparent hover:bg-neutral-600 hover:border-amber-600 transition-colors"
                    variant="ghost"
                    size="sm"
                  >
                    <ImageIcon className="w-4 h-4" />
                  </Button>
                  <input
                    title="Attach a file"
                    ref={fileInputRef}
                    type="file"
                    accept="image/*,.pdf,.doc,.docx,.txt"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                </div>

                <Button
                  className="hover:opacity-80 py-2 px-4 text-white flex items-center gap-2 rounded cursor-pointer font-semibold transition-opacity bg-amber-600 hover:bg-amber-700"
                  onClick={handleSendMessage}
                  disabled={!inputValue.trim() || isLoading}
                >
                  <span>Send</span>
                  <Send size={16} />
                </Button>
              </div>
            </div>

            <div className="w-full mt-8">
              <h3 className="text-sm font-semibold text-neutral-400 mb-4 text-center">Quick Actions</h3>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
                {quickActions.map((action) => (
                  <Card
                    key={action.label}
                    className="cursor-pointer hover:shadow-md transition-all border-2 hover:border-amber-600/30 hover:bg-amber-600/10 bg-neutral-700 border-neutral-600"
                    onClick={() => setInputValue(`I need help with ${action.label.toLowerCase()}`)}
                  >
                    <CardContent className="p-4 text-center">
                      <action.icon className="w-6 h-6 mx-auto mb-2 text-amber-600" />
                      <p className="text-sm font-medium text-neutral-300">{action.label}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </main>
      ) : (
        <div className="flex-1 flex flex-col bg-neutral-900">
          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 lg:p-6">
            <div className="max-w-4xl mx-auto space-y-6">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex gap-4 ${message.sender === "user" ? "justify-end" : "justify-start"}`}
                >
                  {message.sender === "bot" && (
                    <Avatar className="w-8 h-8 mt-1">
                      <AvatarFallback className="bg-amber-600/20">
                        <Bot className="w-4 h-4 text-amber-600" />
                      </AvatarFallback>
                    </Avatar>
                  )}

                  <div className={`max-w-2xl ${message.sender === "user" ? "order-first" : ""}`}>
                    <div
                      className={`rounded-2xl px-4 py-3 ${
                        message.sender === "user"
                          ? "bg-amber-600 text-white rounded-tr-sm"
                          : "bg-neutral-700 border border-neutral-600 rounded-tl-sm text-neutral-300"
                      }`}
                    >
                      {message.sender === "bot" && (
                        <div className="flex items-center gap-2 mb-2">
                          <Sparkles className="w-4 h-4 text-amber-600" />
                          <span className="font-semibold text-sm text-amber-600">BizzBot</span>
                          {message.category && (
                            <Badge variant="secondary" className="text-xs bg-neutral-600 text-neutral-300">
                              {message.category}
                            </Badge>
                          )}
                        </div>
                      )}
                      <div className="whitespace-pre-wrap text-sm leading-relaxed">{message.content}</div>
                    </div>
                    <div
                      className={`text-xs text-neutral-500 mt-1 ${message.sender === "user" ? "text-right" : "text-left"}`}
                    >
                      {message.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                    </div>
                  </div>

                  {message.sender === "user" && (
                    <Avatar className="w-8 h-8 mt-1">
                      <AvatarFallback className="bg-neutral-600 text-neutral-300">
                        <User className="w-4 h-4" />
                      </AvatarFallback>
                    </Avatar>
                  )}
                </div>
              ))}

              {isLoading && (
                <div className="flex gap-4 justify-start">
                  <Avatar className="w-8 h-8 mt-1">
                    <AvatarFallback className="bg-amber-600/20">
                      <Bot className="w-4 h-4 text-amber-600" />
                    </AvatarFallback>
                  </Avatar>
                  <div className="bg-neutral-700 border border-neutral-600 rounded-2xl rounded-tl-sm px-4 py-3">
                    <div className="flex items-center gap-2">
                      <div className="flex gap-1">
                        <div className="w-2 h-2 rounded-full animate-bounce bg-amber-600"></div>
                        <div
                          className="w-2 h-2 rounded-full animate-bounce bg-amber-600"
                          style={{ animationDelay: "0.1s" }}
                        ></div>
                        <div
                          className="w-2 h-2 rounded-full animate-bounce bg-amber-600"
                          style={{ animationDelay: "0.2s" }}
                        ></div>
                      </div>
                      <span className="text-sm text-neutral-400">BizzBot is thinking...</span>
                    </div>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>
          </div>

          {/* Input Area for active chat */}
          <div className="border-t border-neutral-700 bg-neutral-800 p-4 lg:p-6">
            <div className="max-w-4xl mx-auto">
              <div className="flex gap-3">
                <div className="flex-1 relative">
                  <Textarea
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder="Ask about business registration, taxes, or trade regulations..."
                    className="pr-12 py-3 text-base border-2 border-neutral-600 bg-neutral-700 text-neutral-300 placeholder:text-neutral-400 focus:border-amber-600 resize-none"
                    onKeyPress={(e) => e.key === "Enter" && !e.shiftKey && handleSendMessage()}
                    disabled={isLoading}
                    rows={1}
                  />
                  <Button
                    size="sm"
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-amber-600 hover:bg-amber-700 text-white p-2"
                    onClick={handleSendMessage}
                    disabled={!inputValue.trim() || isLoading}
                  >
                    <Send className="w-4 h-4" />
                  </Button>
                </div>
              </div>
              <p className="text-xs text-neutral-500 mt-2 text-center">
                BizzBot can make mistakes. Please verify important information with official sources.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
