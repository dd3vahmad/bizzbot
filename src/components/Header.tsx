import { SignedIn, SignedOut, UserButton } from '@clerk/nextjs'
import Link from 'next/link'
import React from 'react'
import { Button } from './ui/button'
import Logo from './logo'
import { app } from '@/lib/constants'

const Header = () => {
  return (
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center">
            <Logo size="xxs" />
            <span className="font-heading font-bold text-xl text-gray-900">
              {app.name}
            </span>
          </div>
          <nav className="hidden md:flex items-center gap-6">
            <Link
              href="#features"
              className="text-gray-600 hover:text-amber-600 transition-colors"
            >
              Features
            </Link>
            <Link
              href="#how-it-works"
              className="text-gray-600 hover:text-amber-600 transition-colors"
            >
              How It Works
            </Link>
            <Link
              href="#testimonials"
              className="text-gray-600 hover:text-amber-600 transition-colors"
            >
              Reviews
            </Link>
          </nav>

          <div className="flex items-center gap-x-2 w-fit">
            <SignedIn>
              <UserButton signInUrl="/sign-in" />
            </SignedIn>
            <SignedOut>
              <Link href="/sign-in">
                <Button
                  variant={"outline"}
                  className="border border-amber-600 cursor-pointer hover:border-amber-500 hover:text-amber-600 text-amber-600"
                >
                  Login
                </Button>
              </Link>
              <Link href="/chat">
                <Button className="bg-amber-600 cursor-pointer hover:bg-amber-500 text-white">
                  Try Now
                </Button>
              </Link>
            </SignedOut>
          </div>
        </div>
      </header>
  )
}

export default Header