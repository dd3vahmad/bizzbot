"use client";

import { useState, useRef, FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import Logo from "@/components/logo";
import {
  ImageIcon,
  Paperclip,
  X,
  SendHorizonal,
  CircleDashed,
  Mic,
  StopCircle,
} from "lucide-react";
import { useAuth, UserButton } from "@clerk/nextjs";
import { getGreeting } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { app } from "@/lib/constants";
import QuickActions from "@/components/QuickActions";

const SpeechRecognition =
  typeof window !== "undefined"
    ? (window as any).webkitSpeechRecognition ||
      (window as any).SpeechRecognition
    : null;

const Home = () => {
  const { userId } = useAuth();
  const router = useRouter();
  const [prompt, setPrompt] = useState("");
  const [isSending, setIsSending] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [attachedFile, setAttachedFile] = useState<File | null>(null);
  const [isRecording, setIsRecording] = useState(false);
  const recognitionRef = useRef<typeof SpeechRecognition | null>(null);

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
      setPrompt(transcript);
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

  const handleSubmit = async (
    e: FormEvent<HTMLFormElement> | KeyboardEvent
  ) => {
    e.preventDefault?.();

    stopRecognition();
    if (!prompt.trim()) return;

    try {
      setIsSending(true);

      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user_id: userId, message: prompt }),
      });

      const { data } = await res.json();

      sessionStorage.setItem("mono_prompt", prompt);
      setPrompt("");

      router.push(`/chat/${data.id}`);
      window.location.reload();
    } catch (error: any) {
      toast.error(error.message || `Unable to send ${app.name} a message`);
    } finally {
      setIsSending(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e as any);
    }
  };

  const handleFileAttach = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setAttachedFile(file);
    }
  };

  const removeAttachment = () => {
    setAttachedFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const greeting = `${getGreeting()}, Ahmad`;

  return (
    <div className="w-full h-screen flex flex-col">
      <header className="bg-neutral-800 border-b border-neutral-800 px-4 lg:px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex flex-col gap-1 md:mx-2">
            <h1 className="font-bold text-xl text-neutral-300">BizzBot</h1>
            <p className="text-sm hidden md:block text-neutral-400">
              Get instant answers to your business questions.
            </p>
          </div>
          <div className="flex items-center gap-2 me-6">
            <Badge
              className="text-white border-orange-200"
              style={{ backgroundColor: "#E17100" }}
            >
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

      <main className="flex-1 flex items-center justify-center p-4 bg-neutral-800">
        <div className="flex flex-col min-h-[400px] items-center max-w-2xl w-full">
          <div className="flex items-center gap-2 px-2 mb-8">
            <Logo size="xs" className="cursor-pointer" />
            <h1 className="text-3xl md:text-4xl font-bold text-neutral-300">
              {greeting}
            </h1>
          </div>

          <form
            onSubmit={handleSubmit}
            className="flex flex-col bg-neutral-700 mt-5 w-full overflow-hidden rounded-xl p-1"
          >
            {attachedFile && (
              <div className="flex items-center gap-2 p-2 bg-amber-600/20 border border-amber-600/30 rounded-lg mb-2">
                <Paperclip className="w-4 h-4 text-amber-600" />
                <span className="text-sm text-amber-600 flex-1 truncate">
                  {attachedFile.name}
                </span>
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
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              onKeyPress={handleKeyDown}
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

              <div className="flex items-center gap-2">
                {isRecording ? (
                  <StopCircle
                    size={20}
                    onClick={stopRecognition}
                    className="text-neutral-300 animate-pulse mx-2"
                  />
                ) : (
                  <Mic
                    size={20}
                    onClick={handleMicClick}
                    className="mx-2 cursor-pointer text-neutral-300"
                  />
                )}

                <Button
                  className="hover:opacity-80 py-2 px-4 text-white flex items-center gap-2 rounded cursor-pointer bg-amber-600 hover:bg-amber-700"
                  type="submit"
                  disabled={!prompt.trim() || isSending}
                >
                  {isSending ? (
                    <CircleDashed className="animate-spin" />
                  ) : (
                    <SendHorizonal size={20} />
                  )}
                </Button>
              </div>
            </div>
          </form>

          <QuickActions setPrompt={setPrompt} />
        </div>
      </main>
    </div>
  );
};

export default Home;
