import { useAuth } from "@clerk/nextjs";
import { createClient } from "@supabase/supabase-js";

export function useSupabase() {
  const { getToken } = useAuth();

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      global: {
        headers: {
          Authorization: `Bearer ${getToken({ template: "supabase" })}`,
        },
      },
    }
  );

  return supabase;
}
