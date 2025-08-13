import React from "react";

import { SignUp } from "@clerk/nextjs";
const page = () => {
  return (
    <div className="flex items-center justify-center glassmorphism-auth h-screen w-full">
      <SignUp />
    </div>
  );
};

export default page;
