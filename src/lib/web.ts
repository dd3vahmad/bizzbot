import {
  CheerioWebBaseLoader,
  CheerioWebBaseLoaderParams,
} from "@langchain/community/document_loaders/web/cheerio";
import {
  PlaywrightWebBaseLoader,
  PlaywrightWebBaseLoaderOptions,
} from "@langchain/community/document_loaders/web/playwright";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import { getVectorStore } from "./store";
import { SelectorType } from "cheerio";

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

  const secDocs = await scrapeStatic(secUrls, "section");
  const cacDocs = await scrapeStatic(cacNewsPages, "article");
  const firsDocs = await scrapeDynamic(firsUrls, "main");

  const allDocs = [...secDocs, ...cacDocs, ...firsDocs];
  console.log("All Docs: ", allDocs)
  // const allDocs = [...secDocs, ...cacDocs];

  /** ---------- CLEAN CONTENT ---------- **/
  const cleanedDocs = allDocs.map((doc) => ({
    ...doc,
    pageContent: doc.pageContent.replace(/\s+/g, " ").trim(), // remove tabs, newlines, and collapse multiple spaces
  }));

  /** ---------- CHUNKING ---------- **/
  const splitter = new RecursiveCharacterTextSplitter({
    chunkSize: 500,
    chunkOverlap: 1,
  });
  const splitDocs = await splitter.splitDocuments(cleanedDocs);
  splitDocs.forEach((doc) => {
    doc.metadata.source = "web_data";
  });

  await store.addDocuments(splitDocs);
}
