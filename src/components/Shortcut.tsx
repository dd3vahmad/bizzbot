"use client";

import { useEffect, useState } from "react";

const Shortcut = () => {
  const [showInfo, setShowInfo] = useState<boolean>(true);

  useEffect(() => {
    const saved = localStorage.getItem("showInfo");
    if (saved !== null) {
      setShowInfo(saved === "true");
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("showInfo", String(showInfo));
  }, [showInfo]);

  return (
    <p hidden={!showInfo} className="text-sm text-neutral-600 border border-neutral-700 space-x-2 rounded py-1">
      <span className="ms-2 font-semibold">Use Ctrl + b or Cmd + b to toggle sidebar</span>
      <span onClick={() => setShowInfo(false)} className="border p-0.5 border-neutral-700 rounded me-2 cursor-pointer">Ok</span>
    </p>
  )
}

export default Shortcut
