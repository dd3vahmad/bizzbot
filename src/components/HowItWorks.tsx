import { Bot, CheckCircle, FileText } from 'lucide-react'
import React from 'react'

const HowItWorks = () => {
  return (
    
     <section id="how-it-works" className="py-20 px-4 bg-slate-50">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="font-heading font-bold text-3xl md:text-5xl text-gray-900 mb-4">
              How It Works
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Simply ask your question, and let our AI guide you through the
              complexities of business in Nigeria.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-20 h-20 bg-amber-600 rounded-full flex items-center justify-center mx-auto mb-6 text-white text-2xl font-bold">
                1
              </div>
              <div className="mb-4">
                <FileText className="w-12 h-12 text-amber-600 mx-auto mb-4" />
              </div>
              <h3 className="text-neutral-800 font-bold text-xl mb-4">
                Ask Your Question
              </h3>
              <p className="text-gray-600">
                Type your business registration, tax, or trade question in plain
                English.
              </p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-amber-600 rounded-full flex items-center justify-center mx-auto mb-6 text-white text-2xl font-bold">
                2
              </div>
              <div className="mb-4">
                <Bot className="w-12 h-12 text-amber-600 mx-auto mb-4" />
              </div>
              <h3 className="text-neutral-800 font-bold text-xl mb-4">
                AI Processes
              </h3>
              <p className="text-gray-600">
                Our AI analyzes your question and searches through Nigerian
                business regulations.
              </p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-amber-600 rounded-full flex items-center justify-center mx-auto mb-6 text-white text-2xl font-bold">
                3
              </div>
              <div className="mb-4">
                <CheckCircle className="w-12 h-12 text-amber-600 mx-auto mb-4" />
              </div>
              <h3 className="text-neutral-800 font-bold text-xl mb-4">
                Get Clear Answers
              </h3>
              <p className="text-gray-600">
                Receive step-by-step guidance tailored to your specific
                situation and location.
              </p>
            </div>
          </div>
        </div>
      </section>
  )
}

export default HowItWorks