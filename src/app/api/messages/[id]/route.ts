import type { NextRequest } from "next/server";
import { _res } from "@/lib/utils";
import createClient from "@/lib/supabase/server";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const supabase = createClient(req);

    const { data: chat, error: chatError } = await supabase
      .from("chats")
      .select("id, title")
      .eq("id", id)
      .single();

    if (chatError) throw chatError;

    const { data: messages, error: msgError } = await supabase
      .from("messages")
      .select("*")
      .eq("chat_id", id);

    if (msgError) throw msgError;

    return _res.success(200, "Messages fetched successfully", {
      ...chat,
      messages: messages?.map((m: any) => ({
        ...m,
        createdAt: m.created_at,
      })),
    });
  } catch (err: any) {
    return _res.error(500, err.message ?? "Error getting chat messages.");
  }
}
