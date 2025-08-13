import Logo from "@/components/logo";
import { app } from "@/lib/constants";
import { Clock, Target, Users } from "lucide-react";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="h-screen w-full">
      <div className="w-full h-screen flex items-center justify-center gap-5">
        <div className="flex flex-col w-[320px] gap-y-12">
          <div className="flex items-center">
            <Logo size="xs" className="w-8 h-8" />
            <h1 className="text-4xl font-semibold">{app.name}</h1>
          </div>

          <div className="flex flex-col gap-y-6">
            <div className="flex flex-col gap-y-2">
              <div className="flex items-center gap-x-2">
                <Clock size={16} className="text-amber-600" />
                <h1 className="font-semibold">Instant Support</h1>
              </div>

              <p className="text-sm text-neutral-300">
                Get answers 24/7, no waiting for business hours. Our AI is
                always ready to help you move forward.
              </p>
            </div>

            <div className="flex flex-col gap-y-2">
              <div className="flex items-center gap-x-2">
                <Target size={16} className="text-amber-600" />
                <h1 className="font-semibold">Tailored Answers</h1>
              </div>

              <p className="text-sm text-neutral-300">
                Solutions specific to Nigerian regulations, from CAC
                registration to FIRS tax requirements.
              </p>
            </div>

            <div className="flex flex-col gap-y-2">
              <div className="flex items-center gap-x-2">
                <Users size={16} className="text-amber-600" />
                <h1 className="font-semibold">User-Friendly</h1>
              </div>

              <p className="text-sm text-neutral-300">
                Simple chat interface designed with Nigerian entrepreneurs in
                mind. No technical jargon, just clear guidance.
              </p>
            </div>

            <div className="flex flex-col gap-y-2">
              <div className="flex items-center gap-x-2">
                <Users size={16} className="text-amber-600" />
                <h1 className="font-semibold">User-Friendly</h1>
              </div>

              <p className="text-sm text-neutral-300">
                Simple chat interface designed with Nigerian entrepreneurs in
                mind. No technical jargon, just clear guidance.
              </p>
            </div>
          </div>
        </div>

        {children}
      </div>
    </main>
  );
}
