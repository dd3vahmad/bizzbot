import { FaissStore } from "@langchain/community/vectorstores/faiss";
// import { OpenAIEmbeddings } from "@langchain/openai";
import { GoogleGenerativeAIEmbeddings } from "@langchain/google-genai";

// const embeddings = new OpenAIEmbeddings({
//   model: "text-embedding-3-small",
// });

const embeddings = new GoogleGenerativeAIEmbeddings({
  model: "models/gemini-embedding-001",
});

const store = new FaissStore(embeddings, {});

export default store;
