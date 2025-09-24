"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

export default function LangCacheLanding() {
  return (
    <div className="min-h-screen bg-white">
      {/* Demo Banner */}
      <div className="bg-yellow-100 border-b-4 border-yellow-500 py-4 px-4 text-center">
        <p className="text-yellow-800 font-bold text-lg">
          🎯 DEMO PAGE to replicate the flow on what happens when user click on Redis "Try it Free" from Here
        </p>
      </div>

      {/* Full Page Image with Demo Button */}
      <div className="relative w-full">
        {/* The Redis LangCache page image */}
        <img
          src="/images/RedisLangcachepage.png"
          alt="Redis LangCache Page"
          className="w-full h-auto"
        />

        {/* Main Demo Button - Centered and Highly Visible */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20">
          <Link href="/form-page">
            <Button
              size="lg"
              className="bg-red-600 text-white border-4 border-white hover:bg-red-700 hover:scale-105 shadow-2xl font-bold px-12 py-6 text-xl rounded-xl transition-all duration-300"
            >
              🚀 CLICK HERE TO SIMULATE "TRY IT FREE"
              <ArrowRight className="ml-3 h-8 w-8" />
            </Button>
          </Link>
        </div>

        {/* Pulsing animation overlay to make button more noticeable */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
          <div className="w-80 h-20 bg-red-500 opacity-20 rounded-xl animate-pulse"></div>
        </div>
      </div>
    </div>
  )
}
