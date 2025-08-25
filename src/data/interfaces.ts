interface IChat {
  title: string;
  id: number;
  user_id: string;
  created_at: Date | string;
}

interface IMessage {
  files: string[];
  content: string;
  role: "user" | "assistant";
  id: number;
  chat_id: number;
  user_id: string;
  created_at: Date | string;
}
