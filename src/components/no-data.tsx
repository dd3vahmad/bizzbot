import { LucideArchiveX } from "lucide-react";
import React from "react";

const NoData = ({ textBelow }: { textBelow?: string }) => {
  return (
    <div className="flex-1 w-full h-full min-h-[400px] flex flex-col items-center justify-center text-neutral-600">
      <LucideArchiveX size={40} />
      <span className="text-xs font-semibold mt-2">
        {textBelow || "You have no data here yet."}
      </span>
    </div>
  );
};

export default NoData;
