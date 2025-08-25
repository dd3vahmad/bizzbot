import { createBrowserClient } from "@supabase/ssr";

const supabase_url =
  process.env.NODE_ENV === "development"
    ? process.env.NEXT_PUBLIC_SUPABASE_DEV_URL!
    : process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabase_anon_url =
  process.env.NODE_ENV === "development"
    ? process.env.NEXT_PUBLIC_SUPABASE_DEV_ANON_KEY!
    : process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

const supabase = createBrowserClient(supabase_url, supabase_anon_url);

export default supabase;
