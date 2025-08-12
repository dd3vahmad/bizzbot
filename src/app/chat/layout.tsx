import { AppSidebar } from "@/components/app-sidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { app } from "@/lib/constants";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "New Chat",
  description: app.description,
};

const ViewChatLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarTrigger className="hover:bg-transparent hover:text-neutral-300 cursor-pointer" />
      <main className="min-h-screen w-full flex items-center justify-center">
        {children}
      </main>
    </SidebarProvider>
  );
};

export default ViewChatLayout;
