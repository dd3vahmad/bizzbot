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
          <div className="flex items-center gap-x-2">
            <Logo size="xs" className="w-8 h-8" />
            <h1 className="text-4xl font-semibold">{app.name}</h1>
          </div>

          {/* Features List */}
          <div className="flex flex-col gap-y-6">
            <FeatureItem
              icon={<Clock size={16} className="text-amber-600" />}
              title="Instant Support"
              description="Get answers 24/7, no waiting for business hours. Our AI is always ready to help you move forward."
            />
            <FeatureItem
              icon={<Target size={16} className="text-amber-600" />}
              title="Tailored Answers"
              description="Solutions specific to Nigerian regulations, from CAC registration to FIRS tax requirements."
            />
            <FeatureItem
              icon={<Users size={16} className="text-amber-600" />}
              title="User-Friendly"
              description="Simple chat interface designed with Nigerian entrepreneurs in mind. No technical jargon, just clear guidance."
            />
          </div>
        </div>

        {children}
      </div>
    </main>
  );
}

const FeatureItem = ({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) => {
  return (
    <div className="flex flex-col gap-y-2">
      <div className="flex items-center gap-x-2">
        {icon}
        <h2 className="font-semibold">{title}</h2>
      </div>
      <p className="text-sm text-neutral-300">{description}</p>
    </div>
  );
};
