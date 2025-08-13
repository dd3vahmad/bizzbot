import { CheerioWebBaseLoader } from "@langchain/community/document_loaders/web/cheerio";

const sec = new CheerioWebBaseLoader(
  "https://home.sec.gov.ng/for-businesses/register-a-company",
  { selector: "section" }
);

const cac_headlines = new CheerioWebBaseLoader("https://www.cac.gov.ng/news", {
  selector: "a",
});

const cac_news_summaries = new CheerioWebBaseLoader(
  "https://www.cac.gov.ng/news",
  { selector: "p" }
);

const sec_docs = await sec.load();
const cac_headlines_docs = await cac_headlines.load();
const cac_news_summaries_docs = await cac_news_summaries.load();
console.log(sec_docs[0], cac_headlines_docs[0], cac_news_summaries_docs[0]);

export { sec_docs, cac_headlines_docs, cac_news_summaries_docs };
