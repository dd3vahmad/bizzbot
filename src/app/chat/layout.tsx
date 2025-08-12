import { Metadata } from "next";

export const metadata: Metadata = {
  title: "New Chat",
  description: "AI Chatbot to ask all your business legality questions.",
};

const ViewChatLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      {children}
    </div>
  );
};

export default ViewChatLayout;
