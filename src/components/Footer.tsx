import React from 'react'
import Logo from './logo'
import { app } from '@/lib/constants'

const Footer = () => {
  return (
     <footer className="bg-neutral-900 text-white py-12 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center mb-4">
                <Logo size="xxs" />
                <span className="font-heading font-bold text-xl">
                  {app.name}
                </span>
              </div>
              <p className="text-gray-400 leading-relaxed">
                Your trusted AI assistant for navigating Nigerian business
                regulations and requirements.
              </p>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Features</h4>
              <ul className="space-y-2 text-gray-400">
                <li>Business Registration</li>
                <li>Tax Guidance</li>
                <li>Trade Licensing</li>
                <li>24/7 Support</li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Resources</h4>
              <ul className="space-y-2 text-gray-400">
                <li>How It Works</li>
                <li>FAQ</li>
                <li>Contact Support</li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-gray-400">
                <li>Privacy Policy</li>
                <li>Terms of Service</li>
                <li>Data Protection</li>
              </ul>
            </div>
          </div>

          <div className="border-t border-neutral-800 mt-12 pt-8 text-center text-gray-400">
            <p>
              &copy; 2025 {app.name} . Built with ❤️ for Nigerian entrepreneurs.
            </p>
          </div>
        </div>
      </footer>
  )
}

export default Footer