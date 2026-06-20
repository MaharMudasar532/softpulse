import { createClient as createSupabaseClient } from "@supabase/supabase-js";

/** Cookie-less client for build-time / static queries */
export function createStaticClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !key) {
    return null;
  }

  return createSupabaseClient(url, key);
}
