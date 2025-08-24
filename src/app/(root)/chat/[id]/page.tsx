"use client";

import type React from "react";

import { useState, useRef, useEffect } from "react";
import {
  Send,
  Paperclip,
  X,
  Bot,
  User,
  ChevronLeft,
  SendHorizonal,
  StopCircle,
  Mic,
  Loader,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { useParams } from "next/navigation";
import Logo from "@/components/logo";
import { Message, useChat } from "ai/react";
import { useAuth } from "@clerk/nextjs";
import QuickActions, { actions } from "@/components/QuickActions";
import { app } from "@/lib/constants";
import { toast } from "sonner";
import ChatMessage from "@/components/ChatMessage";

const mockChatData = {
  1: {
    title: "Cake business registration information",
    category: "Registration",
    messages: [
      {
        id: 1,
        type: "user",
        content:
          "What are the requirements for registering a cake business in Nigeria?",
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
};

const SpeechRecognition =
  typeof window !== "undefined"
    ? (window as any).webkitSpeechRecognition ||
      (window as any).SpeechRecognition
    : null;

const ViewChat = () => {
  const params = useParams();
  const chatId = params.id as string;
  const { userId } = useAuth();
  const [title, setTitle] = useState("View Chat");
  const [message, setMessage] = useState("");
  const [attachedFiles, setAttachedFiles] = useState<File[]>([]);
  const [chatsLoading, setChatsLoading] = useState(true);
  const [initialMessages, setInitialMessages] = useState<Message[]>([]);
  const [isRecording, setIsRecording] = useState(false);
  const recognitionRef = useRef<typeof SpeechRecognition | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const chatData = mockChatData[chatId as keyof typeof mockChatData] || {
    title: "Chat not found",
    category: "Unknown",
    messages: [],
  };

  const {
    input,
    handleInputChange,
    handleSubmit,
    messages,
    isLoading,
    append,
  } = useChat({
    api: "/api/chat/messages",
    body: { chatId, user_id: userId },
    initialMessages,
  });

  const startRecognition = () => {
    if (!SpeechRecognition) {
      toast.error("Speech recognition not supported in this browser.");
      return;
    }

    const recognition: typeof SpeechRecognition = new SpeechRecognition();
    recognitionRef.current = recognition;
    recognition.lang = "en-US";
    recognition.continuous = true;
    recognition.interimResults = false;

    recognition.onstart = () => setIsRecording(true);
    recognition.onerror = () => {
      toast.error("Speech recognition error");
      setIsRecording(false);
    };
    recognition.onend = () => {
      setIsRecording(false);
      recognitionRef.current = null;
    };
    recognition.onresult = (event: any) => {
      const transcript = event.results[event.results.length - 1][0].transcript;
      if (transcript) {
        handleInputChange({ target: { value: input + transcript } } as any);
      }
    };

    recognition.start();
  };

  const stopRecognition = () => {
    recognitionRef.current?.stop();
  };

  const handleMicClick = () => {
    if (isRecording) {
      stopRecognition();
    } else {
      startRecognition();
    }
  };

  const handleInputKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e as any);
    }
  };

  const fetchMessages = async () => {
    try {
      const res = await fetch(`/api/chat/messages/${chatId}`);
      const { data } = await res.json();
      setInitialMessages(data.messages);
      setTitle(data.title);
    } catch {
      toast.error("Error fetching chat messages");
      setInitialMessages([]);
    } finally {
      setChatsLoading(false);
    }
  };

  useEffect(() => {
    const msgContainer = document.getElementById("message-container");
    if (msgContainer)
      msgContainer.scrollTo({
        top: msgContainer.scrollHeight,
        behavior: "smooth",
      });
  }, [messages]);

  useEffect(() => {
    const bootstrap = async () => {
      const prompt = sessionStorage.getItem("mono_prompt");
      if (prompt) {
        await append(
          { role: "user", content: prompt, createdAt: new Date() },
          { body: { chatId } }
        );
        sessionStorage.removeItem("mono_prompt");
      } else {
        await fetchMessages();
      }
    };
    bootstrap();
  }, [chatId, append]);

  // const handleFileAttach = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   const files = Array.from(event.target.files || []);
  //   setAttachedFiles((prev) => [...prev, ...files]);
  // };

  // const removeFile = (index: number) => {
  //   setAttachedFiles((prev) => prev.filter((_, i) => i !== index));
  // };

  return (
    <div className="flex flex-col min-h-screen w-full">
      {/* Header */}
      <div className="border-b border-neutral-700/50 bg-neutral-800/50 py-4 px-8 flex items-center justify-between w-full">
        <div className="flex-1 min-w-0">
          <h1 className="text-lg font-semibold text-neutral-100 line-clamp-1">
            {title}
          </h1>
          <div className="flex items-center gap-2 mt-1">
            <Badge
              variant="secondary"
              className="bg-amber-600/20 text-amber-600 text-xs"
            >
              {chatData.category}
            </Badge>
            <span className="text-xs text-neutral-400">
              {messages.length} messages
            </span>
          </div>
        </div>

        <Button
          size="sm"
          className="bg-amber-600 hover:bg-amber-600/90 hidden sm:flex cursor-pointer"
          onClick={() => document.querySelector("textarea")?.focus()}
        >
          Continue Chat
        </Button>
      </div>

      <div
        hidden={chatsLoading || messages.length > 0}
        className="min-h-[200px] flex flex-col items-center justify-center mt-24"
      >
        <h2 className="text-2xl mb-2">
          Hi, I&apos;m <span className="font-semibold">{app.name}</span>
        </h2>
        <p className="font-semibold text-sm text-neutral-400">
          How may I help you today?
        </p>
      </div>

      <div className="text-sm flex-1 flex flex-col">
        <div
          id="message-container"
          className="w-full flex flex-col overflow-y-auto flex-1 scrollbar-thumb-rounded scrollbar-thumb-blue scrollbar-track-blue-lighter scrollbar-w-2 pb-24 pt-20"
        >
          {chatsLoading ? (
            <div className="flex-1 flex justify-center items-center">
              <Loader className="animate-spin" />
            </div>
          ) : (
            messages.map((m, i) => (
              <ChatMessage
                key={m.id}
                message={m}
                isLoading={isLoading}
                isLastMessage={messages.length - 1 === i}
              />
            ))
          )}
        </div>

        <div className="border rounded-t-2xl w-full min-h-[100px] fixed bg-neutral-900 bottom-0">
          <div
            hidden={!!input || isRecording}
            className="flex flex-wrap gap-2 text-xs items-center justify-center px-1 py-2"
          >
            {actions.map(({ icon: Icon, label }, i) => (
              <div
                key={i}
                className="px-2 py-1 border rounded border-neutral-700 cursor-pointer text-neutral-500 font-semibold flex items-center gap-1"
              >
                <Icon /> <h2 className="text-xs">{label}</h2>
              </div>
            ))}
          </div>

          <form
            onSubmit={handleSubmit}
            className="w-full flex items-start px-2"
          >
            <textarea
              ref={textareaRef}
              rows={1}
              value={input}
              placeholder="Ask me about your business..."
              onChange={handleInputChange}
              onKeyDown={handleInputKeyDown}
              className="w-full resize-none scrollbar-none overflow-hidden py-3 px-4 placeholder:font-semibold placeholder:text-neutral-700 outline-none flex-1 bg-transparent"
            />

            <div className="flex items-center py-2">
              {isRecording ? (
                <StopCircle
                  size={20}
                  onClick={stopRecognition}
                  className="text-neutral-500 animate-pulse mx-4"
                />
              ) : (
                <Mic
                  size={20}
                  onClick={handleMicClick}
                  className="mx-3 cursor-pointer text-neutral-600"
                />
              )}

              <button
                hidden={isRecording}
                type="submit"
                className="mr-3 text-neutral-600 border rounded p-1"
                disabled={!input.trim() || isLoading}
              >
                {isLoading ? (
                  <span className="text-sm px-2">Sending...</span>
                ) : (
                  <SendHorizonal size={20} />
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ViewChat;
