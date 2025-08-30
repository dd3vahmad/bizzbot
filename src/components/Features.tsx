import React from 'react'
import { Card, CardContent } from "@/components/ui/card";
import { Clock, Target, Users } from 'lucide-react';
import { app } from "@/lib/constants";


const Features = () => {
  return (
    <section id="features" className="py-20 px-4 bg-white">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="font-heading font-bold text-3xl md:text-5xl text-gray-900 mb-4">
              Why Choose {app.name}?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Designed specifically for Nigerian entrepreneurs, with deep
              knowledge of local regulations and processes.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="border-2 hover:border-amber-200 transition-colors group">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-amber-100 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-amber-200 transition-colors">
                  <Clock className="w-8 h-8 text-amber-600" />
                </div>
                <h3 className="font-heading font-bold text-xl mb-4">
                  Instant Support
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  Get answers 24/7, no waiting for business hours. Our AI is
                  always ready to help you move forward.
                </p>
              </CardContent>
            </Card>

            <Card className="border-2 hover:border-amber-200 transition-colors group">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-amber-100 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-amber-200 transition-colors">
                  <Target className="w-8 h-8 text-amber-600" />
                </div>
                <h3 className="font-heading font-bold text-xl mb-4">
                  Tailored Answers
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  Solutions specific to Nigerian regulations, from CAC
                  registration to FIRS tax requirements.
                </p>
              </CardContent>
            </Card>

            <Card className="border-2 hover:border-amber-200 transition-colors group">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-amber-100 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-amber-200 transition-colors">
                  <Users className="w-8 h-8 text-amber-600" />
                </div>
                <h3 className="font-heading font-bold text-xl mb-4">
                  User-Friendly
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  Simple chat interface designed with Nigerian entrepreneurs in
                  mind. No technical jargon, just clear guidance.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
  )
}

export default Features