import Logo from "@/components/logo";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Image, Send } from "lucide-react";

const Chat = () => {
  const greeting = "Good Afternoon, Ahmad";

  const options = [
    { label: "Business Registration" },
    { label: "Taxes" },
    { label: "Required Certifications" },
    { label: "Legals" },
  ];

  return (
    <main className="min-h-screen flex items-center justify-center">
      <div className="flex flex-col min-h-[400px] items-center">
        <div className="flex items-center gap-2 px-2">
          <Logo size="xs" className="cursor-pointer" />

          <h1 className="text-4xl">{greeting}</h1>
        </div>

        <div className="flex flex-col bg-neutral-700/30 mt-5 w-full overflow-hidden rounded-xl p-1">
          <Textarea
            rows={1}
            className="w-full outline-none border-none mb-2"
            placeholder="How may I help you today?"
          ></Textarea>

          <div className="w-full flex items-center justify-between px-2 py-2 text-neutral-500">
            <Button className="cursor-pointer border p-1 rounded border-neutral-500 bg-transparent hover:bg-transparent hover:opacity-80">
              <Image />
            </Button>

            <Button className="bg-amber-700 hover:bg-amber-700 hover:opacity-80 py-1 text-md px-3 text-neutral-300 flex items-center gap-2 rounded cursor-pointer font-semibold">
              <span>Send</span>
              <Send size={16} />
            </Button>
          </div>
        </div>

        <div className="flex justify-center items-center gap-2 w-full">
          {options.map((option, i) => (
            <div
              key={i}
              className="text-neutral-500 border border-neutral-600 py-1 px-2 mt-5 text-sm font-semibold cursor-pointer rounded"
            >
              {option.label}
            </div>
          ))}
        </div>
      </div>
    </main>
  );
};

export default Chat;
