import Logo from "@/components/logo";

const Chat = () => {
  const user = { name: "Ahmad" };

  return (
    <main className="min-h-screen flex items-center justify-center">
      <div className="flex flex-col">
        <div className="flex items-center gap-2">
          <Logo size="xs" className="cursor-pointer" />

          <h1 className="text-4xl font-bold">
            How may I help you?{user ? `, ${user.name}` : ""}
          </h1>
        </div>
      </div>
    </main>
  );
};

export default Chat;
