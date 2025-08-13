"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { SidebarMenuButton } from "@/components/ui/sidebar";
import {
  ChevronDown,
  Mic,
  SendHorizonal,
  Settings,
  StopCircle,
} from "lucide-react";
import { useParams } from "next/navigation";
import { Message, useChat } from "ai/react";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { Textarea } from "@/components/ui/textarea";

const SpeechRecognition =
  typeof window !== "undefined"
    ? (window as any).webkitSpeechRecognition ||
      (window as any).SpeechRecognition
    : null;

const ViewChat = () => {
  const { id: chatId } = useParams();
  const [title, setTitle] = useState<string>("");
  const [isRecording, setIsRecording] = useState(false);
  const recognitionRef = useRef<typeof SpeechRecognition | null>(null);

  const [chatsLoading, setChatsLoading] = useState(true);
  const [initialMessages, setInitialMessages] = useState<Message[]>([]);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const { input, messages, isLoading, handleSubmit, handleInputChange } =
    useChat({
      api: "/api/messages",
      body: { chatId, user_id: null },
      initialMessages,
    });

  useEffect(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = "auto";
      textarea.style.height = `${textarea.scrollHeight}px`;
    }
  }, [input]);

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
      const res = await fetch(`/api/messages/${chatId}`);
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

  return (
    <div className="flex flex-col items-center h-screen flex-1 w-full">
      <div className="flex w-full justify-between py-2 px-4">
        <DropdownMenu>
          <DropdownMenuTrigger
            asChild
            className="hover:bg-neutral-800 cursor-pointer hover:text-neutral-300 w-[240px]"
          >
            <SidebarMenuButton>
              FINTECH Business registration
              <ChevronDown className="ml-auto" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            side="bottom"
            className="w-[--radix-popper-anchor-width] min-w-[240px] bg-neutral-700 text-neutral-300 border-0 outline-0 focus:border-0"
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

      <div className="flex flex-col items-center border w-full flex-1 pe-5">
        {/* Hello */}

        <form
          onSubmit={handleSubmit}
          className="w-full flex items-start px-2 max-w-[800px]"
        >
          <Textarea
            ref={textareaRef}
            rows={1}
            value={input}
            placeholder="Ask me anything"
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

            <Button
              hidden={isRecording}
              type="submit"
              className="mr-3 text-neutral-600 border rounded p-1 cursor-pointer"
              disabled={!input.trim() || isLoading}
            >
              {isLoading ? (
                <span className="text-sm px-2">Sending...</span>
              ) : (
                <SendHorizonal size={20} />
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ViewChat;
