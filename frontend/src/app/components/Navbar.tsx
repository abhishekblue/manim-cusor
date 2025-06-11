"use client"

import { useState } from "react"
import { SignInButton, SignOutButton, useAuth } from "@clerk/nextjs"
import { Menu, X } from "lucide-react"
import UsageTracker from "./UsageTracker"
import { FaBolt, FaGithub, FaXTwitter } from "react-icons/fa6";

export default function Navbar({ usageTrigger, onCreditExhausted }: { usageTrigger: number, onCreditExhausted: () => void }) {
  const { userId } = useAuth()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-gray-700 bg-black/90 backdrop-blur supports-[backdrop-filter]:bg-black/70">
      <div className="w-full px-4 flex h-16 items-center">
        <div className="flex items-center space-x-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-purple-600">
              <div className="h-4 w-4 rounded-sm bg-white/90" />
            </div>
            <h1 className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
              MANIM ANIMATOR
            </h1>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4 ml-auto">
            {/* UsageTracker */}

              <div className="flex items-center space-x-2 rounded-full bg-gradient-to-r from-blue-900/30 to-purple-900/30 px-4 py-2 border border-blue-500/20">
                <FaBolt className="h-4 w-4 text-blue-400" />
                <UsageTracker 
                  trigger={usageTrigger} 
                  onCreditExhausted={onCreditExhausted}
                />
              </div>
            

            {/* GitHub Button */}
            <a
              href="https://github.com/abhishekblue/manim-cusor"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center px-3 py-2 text-sm font-medium border border-purple-600 text-gray-300 hover:bg-gray-800/50 rounded-md transition-colors"
            >
              <FaGithub className="h-5 w-5" />
            </a>

            <a
              href="https://x.com/jainwinperson"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center px-3 py-2 text-sm font-medium border border-purple-600 text-gray-300 hover:bg-gray-800/50 rounded-md transition-colors"
            >
              <FaXTwitter className="h-5 w-5" />
            </a>

            {/* Sign In/Out */}
            <div
              className={`px-4 py-2 rounded text-sm font-medium ${
                userId
                  ? "bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800"
                  : "bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
              } transition-colors`}
            >
              {userId ? <SignOutButton /> : <SignInButton />}
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-md text-gray-300 hover:bg-gray-800/50 transition-colors"
            >
              {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-gray-800/20 bg-black/90 backdrop-blur">
            <div className="px-4 py-4 space-y-4">
              {/* UsageTracker - Mobile */}
              {userId && (
                <div className="flex items-center justify-between p-3 rounded-lg bg-gradient-to-r from-blue-900/30 to-purple-900/30 border border-blue-500/20">
                  <div className="flex items-center space-x-2">
                    <FaBolt className="h-4 w-4 text-blue-400" />
                    <span className="text-sm font-medium text-gray-300">Credits</span>
                  </div>
                  <UsageTracker trigger={usageTrigger} onCreditExhausted={onCreditExhausted}/>
                </div>
              )}

              {/* GitHub Button - Mobile */}
              <a
                href="https://github.com/abhishekblue/manim-cusor"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center px-3 py-2 text-left text-gray-300 hover:bg-gray-800/50 rounded-md transition-colors"
              >
                <FaGithub className="h-4 w-4" />
              </a>

              <a
                href="https://x.com/jainwinperson"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center px-3 py-2 text-left text-gray-300 hover:bg-gray-800/50 rounded-md transition-colors"
              >
                <FaXTwitter className="h-4 w-4" />
              </a>

              {/* Sign In/Out - Mobile */}
              <div
                className={`w-full px-4 py-2 rounded text-center ${
                  userId
                    ? "bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800"
                    : "bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                } transition-colors`}
              >
                {userId ? <SignOutButton /> : <SignInButton />}
              </div>
            </div>
          </div>
        )}
    </nav>
    
  )
}
