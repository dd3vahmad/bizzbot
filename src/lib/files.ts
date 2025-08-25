import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import { getVectorStore } from "./faiss";
import supabase from "./supabase/client";
import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf";
import { DocxLoader } from "@langchain/community/document_loaders/fs/docx";
import { PPTXLoader } from "@langchain/community/document_loaders/fs/pptx";
import { TextLoader } from "langchain/document_loaders/fs/text";

export async function ingestFile(filePath: string, fileName: string) {
  const store = await getVectorStore();

  // Delete old if exists
  const { data: existing } = await supabase
    .from("embedded_documents")
    .select("chunk_ids")
    .eq("file_name", fileName)
    .single();

  if (existing && existing.chunk_ids.length > 0) {
    await store.delete(existing.chunk_ids);
  }

  // Choose loader based on extension
  const ext = fileName.split(".").pop()!.toLowerCase();
  let loader;
  if (ext === "pdf") {
    loader = new PDFLoader(filePath);
  } else if (ext === "docx") {
    loader = new DocxLoader(filePath);
  } else if (ext === "pptx") {
    loader = new PPTXLoader(filePath);
  } else if (ext === "txt") {
    loader = new TextLoader(filePath);
  } else {
    throw new Error(`Unsupported file type: ${ext}`);
  }

  const docs = await loader.load();

  const splitter = new RecursiveCharacterTextSplitter({
    chunkSize: 1000,
    chunkOverlap: 100,
  });
  const splitDocs = await splitter.splitDocuments(docs);

  // Set metadata source
  splitDocs.forEach((d) => (d.metadata.source = fileName));

  // Get old keys
  const oldKeys = new Set(Object.keys((store as any).docstore._dict));

  await store.addDocuments(splitDocs);

  // Get new ids
  const allKeys = Object.keys((store as any).docstore._dict);
  const newIds = allKeys.filter((k) => !oldKeys.has(k));

  await store.save("./faiss_index");

  // Upsert metadata
  await supabase.from("embedded_documents").upsert({
    file_name: fileName,
    uploaded_at: new Date().toISOString(),
    chunk_ids: newIds,
  });
}
