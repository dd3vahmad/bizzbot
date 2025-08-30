"use client";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import HowItWorks from "@/components/HowItWorks";
import UseCases from "@/components/UseCases";
import Testimonials from "@/components/Testimonials";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";
import Header from "@/components/Header";

export default async function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-gray-100">
      <Header />
      <Hero />
      <Features />
      <HowItWorks />
      <UseCases />
      <Testimonials />
      <CTA />
      <Footer />
    </div>
  );
}
