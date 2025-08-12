import Logo from "@/components/logo";
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
      <div className="flex flex-col items-center">
        <div className="flex items-center gap-2 px-2">
          <Logo size="xs" className="cursor-pointer" />

          <h1 className="text-4xl">{greeting}</h1>
        </div>

        {/* Input Box */}
        <div className="flex flex-col bg-neutral-700/30 mt-5 w-full overflow-hidden rounded-xl p-1 max-w-[400px]">
          <Textarea
            rows={1}
            className="w-full outline-none border-none"
            placeholder="How may I help you today?"
          ></Textarea>

          <div className="w-full flex items-center justify-between px-2 py-2 text-neutral-500">
            <button className="cursor-pointer border p-1 rounded border-neutral-500">
              <Image />
            </button>

            <button className="bg-amber-700 py-1 text-md px-2 text-neutral-300 flex items-center gap-2 rounded cursor-pointer font-semibold">
              <span>Send</span>
              <Send size={16} />
            </button>
          </div>
        </div>

        {/* Starting Options */}
        <div className="flex justify-center items-center gap-2 w-full">
          {options.map((option, i) => (
            <div
              key={i}
              className="text-neutral-600 border border-neutral-600 py-1 px-2 mt-5 text-sm font-semibold cursor-pointer rounded"
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
