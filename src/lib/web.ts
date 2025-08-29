import {
  CheerioWebBaseLoader,
  CheerioWebBaseLoaderParams,
} from "@langchain/community/document_loaders/web/cheerio";
import {
  PlaywrightWebBaseLoader,
  PlaywrightWebBaseLoaderOptions,
} from "@langchain/community/document_loaders/web/playwright";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import { directory, embeddings, getVectorStore } from "./faiss";
import { SelectorType } from "cheerio";
import supabase from "./supabase/client";
import { FaissStore } from "@langchain/community/vectorstores/faiss";

/** ---------- HELPERS ---------- **/
const cheerio = (webPath: string, params?: CheerioWebBaseLoaderParams) =>
  new CheerioWebBaseLoader(webPath, params);

const playwright = (
  webPath: string,
  options?: PlaywrightWebBaseLoaderOptions
) => new PlaywrightWebBaseLoader(webPath, options);

async function scrapeStatic(urls: string[], selector?: SelectorType) {
  const docs = [];
  for (const url of urls) {
    const loader = cheerio(url, selector ? { selector } : undefined);
    const data = await loader.load();
    docs.push(...data);
  }
  return docs;
}

async function scrapeDynamic(urls: string[], selector?: string) {
  const docs = [];
  for (const url of urls) {
    const loader = playwright(url, {
      gotoOptions: { waitUntil: "domcontentloaded" },
      launchOptions: { headless: true },
      ...(selector && { selector }),
    });
    const data = await loader.load();
    docs.push(...data);
  }
  return docs;
}

/** ---------- SCRAPING ---------- **/

// SEC (static)
const secUrls = [
  "https://home.sec.gov.ng/for-businesses/register-a-company",
  // add more SEC URLs here
];

// CAC News (static, multiple pages)
const cacNewsPages = Array.from(
  { length: 4 },
  (_, i) => `https://www.cac.gov.ng/news/page/${i + 1}`
);

// FIRS (dynamic pages)
const firsUrls = [
  "https://www.firs.gov.ng/",
  "https://www.firs.gov.ng/company-income-tax",
  "https://www.firs.gov.ng/petroluem-profit-tax",
  "https://www.firs.gov.ng/vat",
  "https://www.firs.gov.ng/paye",
  "https://www.firs.gov.ng/capital-gains-tax",
  "https://www.firs.gov.ng/education-tax",
  "https://www.firs.gov.ng/national-housing-fund",
  "https://www.firs.gov.ng/nitdl",
  "https://www.firs.gov.ng/stamp-duty",
];

// Run scrapers
export async function ingestData() {
  let store = await getVectorStore();

  console.log("Scraping SEC (static)...");
  // const secDocs = await scrapeStatic(secUrls, "section");

  console.log("Scraping CAC News (static)...");
  const cacDocs = await scrapeStatic(cacNewsPages, "article");

  // console.log("Scraping FIRS (dynamic)...");
  // const firsDocs = await scrapeDynamic(firsUrls, "main");

  // const allDocs = [...secDocs, ...cacDocs, ...firsDocs];
  const allDocs = cacDocs;
  // const allDocs = [...secDocs, ...cacDocs];
  console.log(`Scraped ${allDocs.length} documents`);

  /** ---------- CHUNKING ---------- **/
  const splitter = new RecursiveCharacterTextSplitter({
    chunkSize: 500,
    chunkOverlap: 1,
  });
  const splitDocs = await splitter.splitDocuments(allDocs);
  console.log("Split Docs: ", splitDocs);
  // Set source to 'web_data' for all
  splitDocs.forEach((doc) => {
    doc.metadata.source = "web_data";
  });

  /** ---------- STORE IN FAISS ---------- **/
  console.log("Saving to FAISS...");
  if (!store) {
    store = await FaissStore.fromDocuments(splitDocs, embeddings);
  } else {
    await store.addDocuments(splitDocs);
  }

  await store.save(directory);

  // Get old keys
  const oldKeys = new Set(Object.keys((store as any).docstore._dict));

  // Get new ids
  const allKeys = Object.keys((store as any).docstore._dict);
  const newIds = allKeys.filter((k) => !oldKeys.has(k));

  // Upsert metadata
  await supabase.from("embedded_documents").upsert({
    file_name: "web_data",
    uploaded_at: new Date().toISOString(),
    chunk_ids: newIds,
  });

  console.log(`Data ingestion complete. FAISS index saved`);
}
