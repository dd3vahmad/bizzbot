import { createServerClient } from "@supabase/ssr";
import { NextRequest } from "next/server";

const supabaseUrl =
  process.env.NODE_ENV === "development"
    ? process.env.SUPABASE_DEV_URL!
    : process.env.SUPABASE_URL!;

const supabaseAnonKey =
  process.env.NODE_ENV === "development"
    ? process.env.SUPABASE_DEV_ANON_KEY!
    : process.env.SUPABASE_ANON_KEY!;

const createClient = (req: NextRequest) => {
  return createServerClient(supabaseUrl, supabaseAnonKey, {
    cookies: {
      get(name: string) {
        return req.cookies.get(name)?.value;
      },
    },
  });
};

export default createClient;
