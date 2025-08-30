import React from 'react'
import { Button } from './ui/button'
import { ArrowRight } from 'lucide-react'
import { app } from '@/lib/constants'

const CTA = () => {
  return (
    <section className="py-20 px-4 bg-amber-600">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="font-heading font-bold text-3xl md:text-5xl text-white mb-6">
            Ready to Simplify Your Business Journey?
          </h2>
          <p className="text-xl text-amber-100 mb-8 max-w-2xl mx-auto">
            Join thousands of Nigerian entrepreneurs who trust {app.name} for
            their business guidance.
          </p>
          <div className="flex flex-col gap-4 justify-center items-center">
            <Button
              size="lg"
              className="bg-white text-amber-600 hover:bg-gray-100 px-8 py-4 text-lg font-semibold group"
            >
              Start Your Free Chat
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            <p className="text-amber-100 text-sm">
              No signup required • Instant access
            </p>
          </div>
        </div>
      </section>
  )
}

export default CTA