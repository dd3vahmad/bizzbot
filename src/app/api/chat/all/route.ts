import { NextRequest } from "next/server";
import { _res } from "@/lib/utils";
import createClient from "@/lib/supabase/server";

export async function GET(req: NextRequest) {
  try {
    const supabase = await createClient(req);

    const { data: chats, error } = await supabase
      .from("chats")
      .select("*")
      .order("created_at", { ascending: false });
    if (error) {
      throw error;
    }

    return _res.success(200, "Chats fetched successfully", chats);
  } catch (error: any) {
    return _res.error(500, error.message ?? "Error fetching your chats");
  }
}
