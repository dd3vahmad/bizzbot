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
      <div className="w-full relative">
        <SidebarTrigger className="hover:bg-transparent hover:text-neutral-300 cursor-pointer my-2 mx-1 hidden md:block absolute top-0 left-0 z-10" />
        <main className="min-h-screen w-full flex items-center justify-center">
          {children}
        </main>
        <SidebarTrigger
          size={"lg"}
          className="hover:bg-transparent hover:text-neutral-300 cursor-pointer my-2 mx-1 md:hidden absolute top-2 right-2 z-10"
        />
      </div>
    </SidebarProvider>
  );
};

export default ViewChatLayout;
