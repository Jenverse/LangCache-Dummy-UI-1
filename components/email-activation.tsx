"use client"

import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import Link from "next/link"

export default function EmailActivation() {
  return (
    <div className="min-h-screen bg-white">
      {/* Banner */}
      <div className="bg-blue-100 border-b-4 border-blue-500 py-4 px-4 text-center">
        <p className="text-blue-800 font-bold text-lg">
          📧 User receives the email to activate their Redis account
        </p>
      </div>

      {/* Centered Email Image with Overlay Button */}
      <div className="flex justify-center items-center min-h-screen p-8">
        <div className="relative max-w-2xl w-full">
          {/* The Email Activation image - much smaller */}
          <img
            src="/images/Activiation Email.png"
            alt="Redis Activation Email"
            className="w-full h-auto rounded-lg shadow-xl border border-gray-200"
          />

          {/* Two Path Options - positioned over the email button */}
          <div className="absolute bottom-16 left-1/2 transform -translate-x-1/2 z-20 w-full max-w-4xl">
            <div className="text-center mb-6">
              <h3 className="text-xl font-bold text-gray-800 mb-2">Choose Your User Journey:</h3>
              <p className="text-gray-600">Click on either path to experience different UX flows</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 px-4">
              {/* Option 1: Landing Page + One-Click Creation */}
              <div className="bg-white rounded-xl shadow-xl border-4 border-blue-500 p-6 hover:shadow-2xl transition-all duration-300 hover:scale-105">
                <Link href="/dashboard">
                  <div className="cursor-pointer">
                    <div className="flex items-center justify-center mb-4">
                      <div className="bg-blue-500 text-white rounded-full p-3 mr-3">
                        <ArrowRight className="h-6 w-6" />
                      </div>
                      <h4 className="text-lg font-bold text-blue-700">Landing Page + One-Click Creation</h4>
                    </div>
                    <p className="text-sm text-gray-600 text-center mb-3">User chooses to create</p>
                    <div className="bg-blue-50 rounded-lg p-3 text-xs text-blue-800">
                      Go to dashboard with Quick Create and Customize Create options
                    </div>
                  </div>
                </Link>
              </div>

              {/* Option 2: Auto-Create LangCache (Current Activate Account Flow) */}
              <div className="bg-white rounded-xl shadow-xl border-4 border-green-500 p-6 hover:shadow-2xl transition-all duration-300 hover:scale-105">
                <Link href="/dashboard?flow=quick-create">
                  <div className="cursor-pointer">
                    <div className="flex items-center justify-center mb-4">
                      <div className="bg-green-500 text-white rounded-full p-3 mr-3">
                        <ArrowRight className="h-6 w-6" />
                      </div>
                      <h4 className="text-lg font-bold text-green-700">Auto-Create LangCache</h4>
                    </div>
                    <p className="text-sm text-gray-600 text-center mb-3">Auto-provisioned</p>
                    <div className="bg-green-50 rounded-lg p-3 text-xs text-green-800">
                      Directly start the service creation process (current Activate Account flow)
                    </div>
                  </div>
                </Link>
              </div>
            </div>

            {/* Back to Email Button */}
            <div className="text-center mt-6">
              <Button
                variant="outline"
                size="sm"
                className="bg-white border-gray-300 text-gray-600 hover:bg-gray-50"
                onClick={() => window.location.reload()}
              >
                ↻ Back to Email (Try Both Flows)
              </Button>
            </div>
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
