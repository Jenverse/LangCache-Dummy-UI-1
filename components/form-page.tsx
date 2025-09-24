"use client"

import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import Link from "next/link"

export default function FormPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Full Page Image with Overlay Buttons */}
      <div className="relative w-full">
        {/* The Form Page image */}
        <img
          src="/images/Form Page .png"
          alt="Redis Form Page"
          className="w-full h-auto"
        />

        {/* Right-side overlay buttons - moved left and made wider */}
        <div className="absolute top-1/4 right-4 z-20 space-y-6">
          {/* Button 1: Email Activation Flow */}
          <div>
            <Link href="/email-activation">
              <Button
                size="lg"
                className="bg-red-600 text-white border-4 border-white hover:bg-red-700 hover:scale-105 shadow-2xl font-bold px-6 py-5 text-base rounded-xl transition-all duration-300 w-96 h-auto whitespace-normal leading-tight"
              >
                📧 Email Activation Flow After user fill this form
                <ArrowRight className="ml-2 h-6 w-6 flex-shrink-0" />
              </Button>
            </Link>
          </div>

          {/* Button 2: GitHub/Gmail Sign Up Flow */}
          <div>
            <Link href="/sso-continue">
              <Button
                size="lg"
                className="bg-red-600 text-white border-4 border-white hover:bg-red-700 hover:scale-105 shadow-2xl font-bold px-6 py-5 text-base rounded-xl transition-all duration-300 w-96 h-auto whitespace-normal leading-tight"
              >
                🔐 GitHub/Gmail sign Up flow
                <ArrowRight className="ml-2 h-6 w-6 flex-shrink-0" />
              </Button>
            </Link>
          </div>
        </div>

        {/* Back Button - Bottom Left */}
        <div className="absolute bottom-8 left-8 z-20">
          <Link href="/marketing-page">
            <Button variant="outline" size="lg" className="px-8 py-3 bg-white">
              ← Back to Marketing Page
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
