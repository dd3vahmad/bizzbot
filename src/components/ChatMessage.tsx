"use client";

import { cn } from "@/lib/utils";
import { Message } from "ai";
import { CheckSquare2, Copy, Volume2 } from "lucide-react";
import FormatMarkdown from "./Markdown";
import { useState } from "react";
import { toast } from "sonner";
import Typing from "./Typing";

type Props = {
  message: Message;
  isLoading: boolean;
  isLastMessage: boolean;
};

const speak = (text: string) => {
  if (typeof window === "undefined") return;
  const synth = window.speechSynthesis;
  if (!synth) return;

  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = "en-US";
  utterance.pitch = 1;
  utterance.rate = 1;
  synth.cancel();
  synth.speak(utterance);
};

const ChatMessage = ({ message, isLoading, isLastMessage }: Props) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(message.content);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast.error("Failed to copy text");
    }
  };

  return (
    <div
      className={cn("flex w-full items-start mb-4", {
        "justify-end": message.role === "user",
        "justify-start": message.role === "assistant",
      })}
    >
      <div
        className={cn(
          "px-3 py-2 mx-2 rounded max-w-[320px] lg:max-w-[520px] overflow-x-hidden",
          {
            "bg-neutral-800/80": message.role === "user",
            "text-white": message.role === "assistant",
          }
        )}
      >
        {message.role === "user" ? (
          <p>{message.content}</p>
        ) : (
          <>
            {isLoading && isLastMessage ? (
              <Typing />
            ) : (
              <FormatMarkdown content={message.content} />
            )}
          </>
        )}

        <div className="text-xs w-full flex items-center justify-between gap-x-2 mt-2 text-neutral-500">
          <div className="flex items-center gap-x-2">
            {message.role === "user" ? (
              copied ? (
                <CheckSquare2 size={16} />
              ) : (
                <Copy
                  size={16}
                  className="cursor-pointer hover:text-white"
                  onClick={handleCopy}
                />
              )
            ) : (
              <>
                {copied ? (
                  <CheckSquare2 size={16} />
                ) : (
                  <Copy
                    size={16}
                    className="cursor-pointer hover:text-white"
                    onClick={handleCopy}
                  />
                )}
                <Volume2
                  size={18}
                  className="cursor-pointer hover:text-white"
                  onClick={() => speak(message.content)}
                />
              </>
            )}
          </div>

          <span>{message.createdAt?.toLocaleString()}</span>
        </div>
      </div>
    </div>
  );
};

export default ChatMessage;
