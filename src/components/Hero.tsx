import React from 'react'
import Logo from './logo'
import { app } from "@/lib/constants";
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import Link from 'next/link';
import { Play } from 'lucide-react';


const Hero = () => {

//     const ingestData = async () => {
//     try {
//       const res = await fetch("/api/ingest", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" }
//       })
//       const data = await res.json();

//       console.log("Data: ", data);
//     } catch (error) {
//       console.log("Error: ", error);
//     }
//   }


  return (
    <section className="py-20 px-4">
        <div className="container mx-auto max-w-6xl text-center">
          <Badge className="mb-6 bg-amber-100 text-amber-700 border-amber-200">
            🇳🇬 Built for Nigerian Entrepreneurs
          </Badge>
          <h1 className="font-heading font-bold text-4xl md:text-6xl lg:text-7xl text-gray-900 mb-6 leading-tight">
            Unlock Your Business
            <span className="text-amber-600 block">Potential with AI</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
            Get instant answers to your registration, tax, and trade questions.
            Navigate Nigerian business regulations with confidence.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <Button
              size="lg"
              className="bg-amber-600 hover:bg-amber-500 text-white px-8 py-4 text-lg font-semibold group"
            >
              <Link href="/chat" className="flex items-center gap-2">
                Talk to {app.name}
                <Logo
                  size="xxs"
                  className="ml-2 w-5 h-5 group-hover:scale-110 transition-transform"
                />
              </Link>
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="border-amber-600 text-amber-600 cursor-pointer hover:text-amber-600 hover:bg-amber-50 px-8 py-4 text-lg bg-transparent"
            >
              <Play />
              Watch Demo
            </Button>
          </div>

          {/* Hero Image/Mockup */}
          <div className="relative max-w-4xl mx-auto">
            <div className="bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden">
              <div className="bg-gray-50 px-6 py-4 border-b flex items-center gap-3">
                <div className="flex gap-2">
                  <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                  <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                  <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                </div>
                <span className="text-sm text-gray-600 font-medium">
                  {app.name}
                </span>
              </div>
              <div className="p-6 space-y-4">
                <div className="flex justify-end">
                  <div className="bg-amber-600 text-white px-4 py-2 rounded-2xl rounded-tr-sm max-w-xs">
                    How do I register my business in Lagos State?
                  </div>
                </div>
                <div className="flex justify-start">
                  <div className="bg-gray-100 text-gray-800 px-4 py-2 rounded-2xl rounded-tl-sm max-w-md">
                    <div className="flex items-center gap-2 mb-2">
                      <Logo size="xxs" />
                      <span className="font-semibold text-amber-600">
                        {app.name}
                      </span>
                    </div>
                    To register your business in Lagos State, you&apos;ll need
                    to follow these steps:
                    <br />• Reserve your business name with CAC
                    <br />• Complete Form CAC 1.1 for incorporation
                    <br />• Pay the required fees...
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
  )
}

export default Hero