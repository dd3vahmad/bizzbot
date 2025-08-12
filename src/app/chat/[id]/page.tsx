"use client";

import { useParams } from "next/navigation";

const ViewChat = () => {
  const { id } = useParams();

  return (
    <div className="flex items-center justify-center">
      View a specific chat and also continue chatting - {id}
    </div>
  );
};

export default ViewChat;
