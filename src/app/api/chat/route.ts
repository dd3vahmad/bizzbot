import { generateText } from "ai";
import { google } from "@ai-sdk/google";
import createClient from "@/lib/supabase/server";
import { _res } from "@/lib/utils";
import { NextRequest } from "next/server";
import { getTitlePrompt } from "@/data/prompts";

export async function POST(req: NextRequest) {
  try {
    const supabase = await createClient(req);
    const { message, user_id } = await req.json();
    if (!message || !user_id) {
      return _res.error(400, "Missing message or user_id");
    }

    const { text: suggestedTitle } = await generateText({
      model: google("gemini-2.0-flash"),
      prompt: getTitlePrompt(message),
    });

    const title = suggestedTitle.replace(/[".]/g, "").trim();

    const { data: chat, error } = await supabase
      .from("chats")
      .insert({ title, user_id })
      .select()
      .single();
    if (error) {
      throw error;
    }

    return _res.success(200, "Chat created successfully", chat);
  } catch (err: any) {
    return _res.error(500, err.message ?? "Chat creation failed.");
  }
}

export async function GET(req: NextRequest) {
  try {
    const supabase = await createClient(req);

    const { data: chats, error } = await supabase
      .from("chats")
      .select("*")
      .limit(15)
      .order("created_at", { ascending: false });
    if (error) {
      throw error;
    }

    return _res.success(200, "Chats fetched successfully", chats);
  } catch (error: any) {
    return _res.error(500, error.message ?? "Error fetching your chats");
  }
}
