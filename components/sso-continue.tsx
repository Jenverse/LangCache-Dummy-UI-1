"use client"

import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import Link from "next/link"

export default function SSOContinue() {
  return (
    <div className="min-h-screen bg-white">
      {/* Banner */}
      <div className="bg-green-100 border-b-4 border-green-500 py-3 px-4 text-center">
        <p className="text-green-800 font-bold text-base">
          🔐 User authenticates through SSO and sees the continue screen
        </p>
      </div>

      {/* Centered SSO Continue Image with Overlay Button */}
      <div className="flex justify-center items-center py-6 px-4">
        <div className="relative max-w-6xl w-full">
          {/* The SSO Continue image - properly sized */}
          <img 
            src="/images/SSO Continue.png" 
            alt="SSO Continue Screen"
            className="w-full h-auto rounded-lg shadow-xl border border-gray-200"
          />
          
          {/* Continue Button - positioned over the continue button in the image */}
          <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 z-20">
            <Link href="/dashboard?flow=quick-create">
              <Button 
                size="lg" 
                className="bg-red-600 text-white border-4 border-white hover:bg-red-700 hover:scale-105 shadow-2xl font-bold px-8 py-4 text-lg rounded-xl transition-all duration-300"
              >
                🚀 Continue
                <ArrowRight className="ml-2 h-6 w-6" />
              </Button>
            </Link>
          </div>

          {/* Pulsing animation overlay to make button more noticeable */}
          <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 z-10">
            <div className="w-32 h-16 bg-red-500 opacity-20 rounded-xl animate-pulse"></div>
          </div>
        </div>
      </div>

      {/* Back Button - Fixed position */}
      <div className="fixed bottom-8 left-8 z-30">
        <Link href="/form-page">
          <Button variant="outline" size="lg" className="px-8 py-3 bg-white">
            ← Back to Form Page
          </Button>
        </Link>
      </div>
    </div>
  )
}
