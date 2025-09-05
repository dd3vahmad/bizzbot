import { SupabaseVectorStore } from "@langchain/community/vectorstores/supabase";
import { GoogleGenerativeAIEmbeddings } from "@langchain/google-genai";
import { createClient } from "@supabase/supabase-js";

const client = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export const embeddings = new GoogleGenerativeAIEmbeddings({
  model: "models/gemini-embedding-001",
  apiKey: process.env.GOOGLE_GENERATIVE_AI_API_KEY,
});

export async function getVectorStore() {
  return new SupabaseVectorStore(embeddings, {
    client,
    tableName: "documents",
    queryName: "match_documents",
  });
}
