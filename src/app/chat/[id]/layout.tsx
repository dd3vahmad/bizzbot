import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Chat Title",
  description: "AI Chatbot to ask all your business legality questions.",
};

const ViewChatLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center">
      {children}
    </div>
  );
};

export default ViewChatLayout;
