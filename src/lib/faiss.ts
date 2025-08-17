import fs from "fs";
import { FaissStore } from "@langchain/community/vectorstores/faiss";
import { GoogleGenerativeAIEmbeddings } from "@langchain/google-genai";

const embeddings = new GoogleGenerativeAIEmbeddings({
  model: "models/gemini-embedding-001",
  apiKey: process.env.GOOGLE_API_KEY, // Assume set in env
});

const directory = "./faiss_index";

export async function getVectorStore() {
  if (fs.existsSync(directory)) {
    return await FaissStore.load(directory, embeddings);
  } else {
    const store = await FaissStore.fromTexts([], [], embeddings);
    await store.save(directory);
    return store;
  }
}
