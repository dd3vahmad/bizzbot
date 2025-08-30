import { Star } from 'lucide-react'
import React from 'react'
import { Card } from './ui/card'
import { app } from '@/lib/constants'

const Testimonials = () => {
  return (
    <section id="testimonials" className="py-20 px-4 bg-slate-50">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="font-heading font-bold text-3xl md:text-5xl text-gray-900 mb-4">
              Trusted by Nigerian Entrepreneurs
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Hear from fellow business owners who&apos;ve streamlined their
              processes with {app.name} .
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="p-8">
              <div className="flex items-center gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-5 h-5 fill-yellow-400 text-yellow-400"
                  />
                ))}
              </div>
              <p className="text-gray-600 mb-6 leading-relaxed">
                &quot;{app.name} saved me weeks of research. I got my business
                registered in Lagos within days instead of months!&quot;
              </p>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center">
                  <span className="font-semibold text-amber-600">AO</span>
                </div>
                <div>
                  <p className="font-semibold">Adebayo Ogundimu</p>
                  <p className="text-sm text-gray-500">Tech Startup Founder</p>
                </div>
              </div>
            </Card>

            <Card className="p-8">
              <div className="flex items-center gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-5 h-5 fill-yellow-400 text-yellow-400"
                  />
                ))}
              </div>
              <p className="text-gray-600 mb-6 leading-relaxed">
                &quot;The tax guidance was incredibly helpful. Finally
                understood my VAT obligations without hiring an expensive
                consultant.&quot;
              </p>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center">
                  <span className="font-semibold text-amber-600">FI</span>
                </div>
                <div>
                  <p className="font-semibold">Fatima Ibrahim</p>
                  <p className="text-sm text-gray-500">Fashion Designer</p>
                </div>
              </div>
            </Card>

            <Card className="p-8">
              <div className="flex items-center gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-5 h-5 fill-yellow-400 text-yellow-400"
                  />
                ))}
              </div>
              <p className="text-gray-600 mb-6 leading-relaxed">
                &quot;As someone new to business in Nigeria, this AI assistant
                was like having a knowledgeable mentor available 24/7.&quot;
              </p>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center">
                  <span className="font-semibold text-amber-600">CE</span>
                </div>
                <div>
                  <p className="font-semibold">Chidi Eze</p>
                  <p className="text-sm text-gray-500">
                    Import/Export Business
                  </p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>
  )
}

export default Testimonials