# BizzBot – Your Nigerian Business Assistant

*An AI-powered chatbot that helps Nigerian entrepreneurs and business owners navigate trade, business registration, and tax-related questions with accuracy and clarity.*

---

## Table of Contents

* [About the Project](#about-the-project)
* [Hackathon Details](#hackathon-details)
* [Features](#features)
* [Tech Stack](#tech-stack)
* [Architecture](#architecture)
* [Setup Instructions](#setup-instructions)
* [Environment Variables](#environment-variables)
* [Data Sources & Citations](#data-sources--citations)
* [Demo](#demo)
* [Future Improvements](#future-improvements)
* [Team](#team)
* [License](#license)

---

## About the Project

Running a business in Nigeria often requires navigating **complex rules around trade, registration, and taxation**. Many small businesses lack easy access to trustworthy information, which leads to mistakes, delays, and missed opportunities.

**BizzBot** solves this by providing an **AI-powered chatbot** that answers business-related questions with **accuracy, clarity, and context**. It acts as a free, always-available assistant for entrepreneurs, helping them make informed decisions.

---

## Hackathon Details

* **Hackathon**: Altschool Hackathon Program 2025
* **Challenge**: AI Chatbot for Business FAQs in Nigeria
* **Date**: August 2025
* **Category**: Technology

---

## Features

* ✅ **AI Chatbot** trained to answer Nigerian business questions
* ✅ **Speech Recognition** support for speech recording for bot query.
* ✅ **Context-aware responses** about trade, business registration, and taxation
* ✅ **User authentication** with Clerk (for history & personalization)
* ✅ **Real-time conversation interface** built with Next.js
* ✅ **Secure data storage** for chat history and feedback

---

## Tech Stack

* **Frontend**: [Next.js 14](https://nextjs.org/), [ShadcnUI]("https://ui.shadcn.com") x [TailwindCSS](https://tailwindcss.com/)
* **Backend**: [Supabase](https://supabase.com/) (Postgres Data Storage + RLS)
* **Vercel AI SDK**: For AI response streaming effect
* **RAG**: Langchain
* **Vector Storage**: FAISS - Facebook AI Similarity Search
* **Web Scraping**: Playwright & Cheerio
* **AI**: [Gemini LLM (gemini-2.0-flash)](https://aistudio.google.com/) (for conversational intelligence)
* **Deployment**: Vercel

---

## Architecture

* **Next.js (App Router)** → Handles UI & API endpoints
* **Supabase** → Chat history and messages storage
* **Langchain** → For retrieval argumented generation of response
* **FAISS** → For storing vector embeddings of the scraped data
* **Gemini API** → Provides conversational AI responses
* **Vercel AI SDK** → For AI response streaming effect
* **Deployed on Vercel** → Seamless hosting & edge functions

---

## Setup Instructions

### 1. Clone the repo

```bash
git clone https://github.com/dd3vahmad/bizzbot-eta.git
cd bizzbot
```

### 2. Install dependencies

```bash
npm install
# or
yarn install
```

### 3. Setup environment variables

Create a `.env.local` file in the root directory and add:

```env
# App
NODE_ENV=development

# Supabase Keys
## Live
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_live_anon_key
NEXT_PUBLIC_SUPABASE_URL=your_supabase_live_url
SUPABASE_URL=your_supabase_live_url
SUPABASE_ANON_KEY=your_supabase_live_anon_key

## Development
NEXT_PUBLIC_SUPABASE_DEV_URL=your_supabase_dev_url
NEXT_PUBLIC_SUPABASE_DEV_ANON_KEY=your_supabase_dev_anon_key
SUPABASE_DEV_URL=your_supabase_dev_url
SUPABASE_DEV_ANON_KEY=your_supabase_dev_anon_key

# Clerk Keys
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLERK_SECRET_KEY=your_clerk_secret_key

# AI
GOOGLE_API_KEY=your_live_google_api_key
GOOGLE_GENERATIVE_AI_API_KEY=your_dev_google_api_key
```

### 4. Run locally

```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000)

---

## Environment Variables

### 🔹 Supabase (Live)
* `NEXT_PUBLIC_SUPABASE_URL` → Supabase live project URL
* `NEXT_PUBLIC_SUPABASE_ANON_KEY` → Supabase live public client key
* `SUPABASE_URL` → Supabase live project URL (server-side)
* `SUPABASE_ANON_KEY` → Supabase live public client key (server-side)

### 🔹 Supabase (Development)
* `NEXT_PUBLIC_SUPABASE_DEV_URL` → Supabase development project URL
* `NEXT_PUBLIC_SUPABASE_DEV_ANON_KEY` → Supabase development public client key
* `SUPABASE_DEV_URL` → Supabase development project URL (server-side)
* `SUPABASE_DEV_ANON_KEY` → Supabase development public client key (server-side)

### 🔹 Clerk
* `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` → Clerk publishable key (frontend)
* `CLERK_SECRET_KEY` → Clerk secret key (server-side only)

### 🔹 AI
* `GOOGLE_API_KEY` → Google AI live API key
* `GOOGLE_GENERATIVE_AI_API_KEY` → Google AI development API key

---

## Data Sources & Citations

* [Corporate Affairs Commission (CAC Nigeria)](https://www.cac.gov.ng/) – Business registration info
* [Federal Inland Revenue Service (FIRS)](https://www.firs.gov.ng/) – Tax policies & guidelines
* [Nigerian Customs Service](https://customs.gov.ng/) – Import/export regulations
* [OpenAI Documentation](https://platform.openai.com/docs) – For chatbot intelligence
* [Supabase Documentation](https://supabase.com/docs) – Database, Auth, Realtime

---

## Demo

* **Live Demo**: [Click to visit](https://bizzbot-eta.vercel.app)
* **Screenshots**:

![Chat UI Screenshot](./assets/demo1.png)
![Business Q\&A Example](./assets/demo2.png)

---

## Future Improvements

* [ ] Add support for **local Nigerian languages** (Yoruba, Hausa, Igbo)
* [ ] Provide **verified business document templates**

---

## Team

* **Ahmad Rabiu** – Fullstack Developer – [GitHub](https://github.com/dd3vahmad) | [LinkedIn](#)
* **Aderemi Adedeji** – Fullstack Developer – [GitHub](https://github.com/Oreolion) | [LinkedIn](#)

---

## License

This project is licensed under the MIT License – see the [LICENSE](./LICENSE) file for details.
