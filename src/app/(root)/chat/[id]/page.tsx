"use client";

import type React from "react";

import { useState, useRef, useEffect } from "react";
import { SendHorizonal, StopCircle, Mic } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { useParams } from "next/navigation";
import Logo from "@/components/logo";
import { Message, useChat } from "ai/react";
import { useAuth, useUser } from "@clerk/nextjs";
import { actions } from "@/components/QuickActions";
import { toast } from "sonner";
import ChatMessage from "@/components/ChatMessage";
import { getGreeting } from "@/lib/utils";
import Loading from "@/components/loading";

const SpeechRecognition =
  typeof window !== "undefined"
    ? (window as any).webkitSpeechRecognition ||
      (window as any).SpeechRecognition
    : null;

const ViewChat = () => {
  const params = useParams();
  const chatId = params.id as string;
  const { userId } = useAuth();
  const { user } = useUser();
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

  const {
    input,
    handleInputChange,
    handleSubmit,
    messages,
    isLoading,
    append,
  } = useChat({
    api: "/api/messages",
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

  useEffect(() => {
    const bootstrap = async () => {
      const prompt = sessionStorage.getItem("bizzbot_prompt");
      if (prompt) {
        await append(
          { role: "user", content: prompt, createdAt: new Date() },
          { body: { chatId } }
        );
        sessionStorage.removeItem("bizzbot_prompt");
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
  const greeting = `${getGreeting()}, ${user?.firstName}`;

  return (
    <div className="flex flex-col min-h-screen w-full relative">
      {/* Header */}
      <div className="border-b border-neutral-700/50 bg-neutral-800/50 py-4 px-8 flex items-center justify-between w-full">
        <h1 className="text-lg font-semibold text-neutral-100 line-clamp-1">
          {title}
        </h1>
      </div>

      <div
        hidden={chatsLoading || messages.length > 0}
        className="min-h-[200px] flex flex-col items-center justify-center mt-24"
      >
        <div className="flex items-center gap-2 px-2 mb-8">
          <Logo size="xs" className="cursor-pointer" />
          <h1 className="text-3xl md:text-4xl font-bold text-neutral-300">
            {greeting}
          </h1>
        </div>
      </div>

      <div className="text-sm flex-1 flex flex-col items-center w-full relative max-w-[580px] mx-auto">
        <div
          id="message-container"
          className="w-full flex flex-col overflow-y-auto flex-1 scrollbar-thumb-rounded scrollbar-thumb-blue scrollbar-track-blue-lighter scrollbar-w-2 pb-24 pt-20"
        >
          {chatsLoading ? (
            <div className="flex-1 flex justify-center items-center">
              <Loading />
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

        <div
          className={`w-full ${message.length ? "border-t border-x" : "border"} border-neutral-700 bg-neutral-800 rounded-t-2xl min-h-[100px] absolute ${messages.length ? "bottom-0" : "top-0"} px-4 pt-2 pb-4`}
        >
          <div
            hidden={!!input || isRecording}
            className="flex flex-wrap gap-2 text-xs items-center justify-center px-1 py-2"
          >
            {actions.map(({ icon: Icon, label, query }, i) => (
              <div
                key={i}
                onClick={() =>
                  handleInputChange({ target: { value: query } } as any)
                }
                className="px-2 py-1 border rounded border-neutral-700 cursor-pointer text-neutral-500 font-semibold flex items-center gap-1"
              >
                <Icon /> <h2 className="text-xs">{label}</h2>
              </div>
            ))}
          </div>

          <form
            onSubmit={handleSubmit}
            className="w-full flex items-start px-1 mt-2"
          >
            <Textarea
              ref={textareaRef}
              rows={1}
              value={input}
              placeholder="Ask me about your business..."
              onChange={handleInputChange}
              onKeyDown={handleInputKeyDown}
              className="w-full border border-neutral-700 resize-none scrollbar-none overflow-hidden py-3 px-4 placeholder:font-semibold placeholder:text-neutral-700 outline-none flex-1 bg-transparent"
            />

            <div className="flex items-center">
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
                className="text-white bg-amber-600 rounded"
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
    </div>
  );
};

export default ViewChat;
