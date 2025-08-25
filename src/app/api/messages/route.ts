import { d_prompt, getContextPrompt, getTitlePrompt } from "@/data/prompts";
import createClient from "@/lib/supabase/server";
import { _res } from "@/lib/utils";
import { google } from "@ai-sdk/google";
import { generateText, streamText } from "ai";
import { NextRequest } from "next/server";

export const maxDuration = 30;

export async function POST(req: NextRequest) {
  try {
    const supabase = await createClient(req);
    const { messages, chatId, user_id } = await req.json();
    const lastMessage = messages.at(-1);

    let chat_id: string = chatId;

    if (!chat_id) {
      const { text: suggestedTitle } = await generateText({
        model: google("gemini-2.0-flash"),
        prompt: getTitlePrompt(lastMessage.content),
      });
      const title = suggestedTitle.replace(/[".]/g, "").trim();

      const { data: chat, error } = await supabase
        .from("chats")
        .insert({ title, user_id })
        .select()
        .single();

      if (error) throw error;
      chat_id = chat.id;
    } else {
      const { data } = await supabase
        .from("chats")
        .select("id")
        .eq("id", chat_id)
        .maybeSingle();
      if (!data) throw new Error("Chat not found or not owned by user");
    }

    const { error } = await supabase.from("messages").insert({
      chat_id,
      user_id,
      role: "user",
      content: lastMessage.content,
    });
    if (error) {
      throw error;
    }

    const context = ""; // TODO: load RAG context here
    const systemPrompt = context ? getContextPrompt(context) : d_prompt;

    let assistantText = "";

    const result = await streamText({
      model: google("gemini-2.0-flash"),
      system: systemPrompt,
      messages,
      onChunk({ chunk }) {
        if (chunk.type === "text-delta") {
          assistantText += chunk.textDelta;
        }
      },
      onFinish: async () => {
        const { error } = await supabase.from("messages").insert({
          chat_id,
          user_id,
          role: "assistant",
          content: assistantText,
        });
        if (error) {
          throw error;
        }
      },
    });

    return result.toDataStreamResponse();
  } catch (err: any) {
    return _res.error(500, err.message ?? "BizzBot failed.");
  }
}
