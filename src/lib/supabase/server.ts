import { auth } from "@clerk/nextjs/server";
import { createClient as CC } from "@supabase/supabase-js";
import { NextRequest } from "next/server";
import { _res } from "../utils";

const supabaseUrl =
  process.env.NODE_ENV === "development"
    ? process.env.SUPABASE_DEV_URL!
    : process.env.SUPABASE_URL!;

const supabaseAnonKey =
  process.env.NODE_ENV === "development"
    ? process.env.SUPABASE_DEV_ANON_KEY!
    : process.env.SUPABASE_ANON_KEY!;

const createClient = async (req: NextRequest) => {
  const { getToken } = await auth();

  return CC(supabaseUrl, supabaseAnonKey, {
    accessToken: getToken,
  });
};

export default createClient;
