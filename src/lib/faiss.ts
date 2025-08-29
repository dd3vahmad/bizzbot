import fs from "fs";
import { FaissStore } from "@langchain/community/vectorstores/faiss";
import { GoogleGenerativeAIEmbeddings } from "@langchain/google-genai";

export const embeddings = new GoogleGenerativeAIEmbeddings({
  model: "models/gemini-embedding-001",
  apiKey: process.env.GOOGLE_API_KEY,
});

export const directory = "./faiss_index";
const fileStore = "./faiss_index/docstore.json"

export async function getVectorStore() {
  if (fs.existsSync(fileStore)) {
    return await FaissStore.load(directory, embeddings);
  } else {
    return null;
  }
}
