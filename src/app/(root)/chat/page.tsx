"use client";

import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import Logo from "@/components/logo";
import {
  Send,
  FileText,
  Calculator,
  Building,
  HelpCircle,
  ImageIcon,
  Paperclip,
  X,
} from "lucide-react";
import { UserButton } from "@clerk/nextjs";
import { getGreeting } from "@/lib/utils";

const Home = () => {
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [attachedFile, setAttachedFile] = useState<File | null>(null);

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    setInputValue("");
    setIsLoading(true);
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

  const quickActions = [
    {
      icon: Building,
      label: "Register Business",
      query: "How do I register my business in Nigeria?",
    },
    {
      icon: Calculator,
      label: "Tax Questions",
      query: "What's Tax structure in Nigeria?",
    },
    {
      icon: FileText,
      label: "Trade License",
      query: "Tell me about business licensing in Nigeria.",
    },
    { icon: HelpCircle, label: "General Help", query: "" },
  ];

  const greeting = `${getGreeting()}, Ahmad`;

  return (
    <div className="w-full h-screen flex flex-col">
      <header className="bg-neutral-800 border-b border-neutral-800 px-4 lg:px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex flex-col gap-1">
            <h1 className="font-bold text-xl text-neutral-300">BizzBot</h1>
            <p className="text-sm text-neutral-400">
              Get instant answers to your business questions.
            </p>
          </div>
          <div className="flex items-center gap-2">
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

          <div className="flex flex-col bg-neutral-700 mt-5 w-full overflow-hidden rounded-xl p-1">
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
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={(e) =>
                e.key === "Enter" && !e.shiftKey && handleSendMessage()
              }
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
            <h3 className="text-sm font-semibold text-neutral-400 mb-4 text-center">
              Quick Actions
            </h3>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
              {quickActions.map((action) => (
                <Card
                  key={action.label}
                  className="cursor-pointer hover:shadow-md transition-all border-2 hover:border-amber-600/30 hover:bg-amber-600/10 bg-neutral-700 border-neutral-600"
                  onClick={() => setInputValue(action.query)}
                >
                  <CardContent className="p-4 text-center">
                    <action.icon className="w-6 h-6 mx-auto mb-2 text-amber-600" />
                    <p className="text-sm font-medium text-neutral-300">
                      {action.label}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Home;
