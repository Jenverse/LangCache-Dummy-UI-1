"use client"

import { Button } from "@/components/ui/button"
import { ArrowRight, Check } from "lucide-react"
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

      {/* Two Email Images Side by Side */}
      <div className="flex justify-center items-center min-h-screen p-8">
        <div className="w-full max-w-7xl">
          {/* Header */}
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-gray-800 mb-3">We need to pick Option 1 or Option 2 for what happens when user clicks on Activate button</h3>
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 max-w-4xl mx-auto">
              <p className="text-lg text-blue-800 font-medium">
                <strong>The advantage of Option 1</strong> is that it will land into more intentional cache creation and giving user the choice if they want to configure additional settings along with one click setup
              </p>
            </div>

            {/* Decision Made Banner */}
            <div className="bg-green-100 border-2 border-green-500 rounded-lg p-4 max-w-2xl mx-auto mt-4">
              <div className="flex items-center justify-center">
                <div className="bg-green-500 rounded-full p-1 mr-3">
                  <Check className="h-5 w-5 text-white" />
                </div>
                <p className="text-lg text-green-800 font-bold">
                  ✅ DECISION MADE: Moving forward with Option 1
                </p>
              </div>
            </div>
          </div>

          {/* Two Email Options Side by Side */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

            {/* Option 1: Landing Page + One-Click Creation (Left Side) */}
            <div className="relative">
              {/* Selected Badge */}
              <div className="absolute -top-3 -right-3 z-30 bg-green-500 text-white rounded-full p-2 shadow-lg border-4 border-white">
                <Check className="h-6 w-6" />
              </div>
              <div className="bg-blue-50 border-4 border-blue-500 rounded-xl p-6 shadow-xl relative">
                <div className="text-center mb-4">
                  <div className="flex items-center justify-center mb-2">
                    <h4 className="text-xl font-bold text-blue-700">Option 1: Landing Page + One-Click Creation</h4>
                    <div className="bg-green-500 text-white px-3 py-1 rounded-full text-sm font-bold ml-3">
                      SELECTED ✓
                    </div>
                  </div>
                  <p className="text-blue-600 font-medium">User chooses to create</p>
                </div>

                <Link href="/dashboard">
                  <div className="relative cursor-pointer hover:scale-105 transition-all duration-300">
                    <img
                      src="/images/Activiation Email.png"
                      alt="Redis Activation Email - Option 1"
                      className="w-full h-auto rounded-lg shadow-lg border border-blue-200"
                    />

                    {/* Activate Button Overlay */}
                    <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 z-20">
                      <Button
                        size="lg"
                        className="bg-blue-600 text-white border-4 border-white hover:bg-blue-700 hover:scale-105 shadow-2xl font-bold px-8 py-4 text-lg rounded-xl transition-all duration-300"
                      >
                        🚀 Activate Account (Option 1)
                        <ArrowRight className="ml-2 h-6 w-6" />
                      </Button>
                    </div>
                  </div>
                </Link>

                <div className="mt-4 bg-blue-100 rounded-lg p-3">
                  <p className="text-sm text-blue-800 text-center">
                    Go to dashboard with Quick Create and Customize Create options
                  </p>
                </div>
              </div>
            </div>

            {/* Option 2: Auto-Create LangCache (Right Side) */}
            <div className="relative">
              <div className="bg-green-50 border-4 border-green-500 rounded-xl p-6 shadow-xl">
                <div className="text-center mb-4">
                  <h4 className="text-xl font-bold text-green-700 mb-2">Option 2: Auto-Create LangCache</h4>
                  <p className="text-green-600 font-medium">Auto-provisioned</p>
                </div>

                <Link href="/dashboard?flow=quick-create">
                  <div className="relative cursor-pointer hover:scale-105 transition-all duration-300">
                    <img
                      src="/images/Activiation Email.png"
                      alt="Redis Activation Email - Option 2"
                      className="w-full h-auto rounded-lg shadow-lg border border-green-200"
                    />

                    {/* Activate Button Overlay */}
                    <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 z-20">
                      <Button
                        size="lg"
                        className="bg-green-600 text-white border-4 border-white hover:bg-green-700 hover:scale-105 shadow-2xl font-bold px-8 py-4 text-lg rounded-xl transition-all duration-300"
                      >
                        🚀 Activate Account (Option 2)
                        <ArrowRight className="ml-2 h-6 w-6" />
                      </Button>
                    </div>
                  </div>
                </Link>

                <div className="mt-4 bg-green-100 rounded-lg p-3">
                  <p className="text-sm text-green-800 text-center">
                    Directly start the service creation process (current activate flow)
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Back to Email Button */}
          <div className="text-center mt-8">
            <Button
              variant="outline"
              size="lg"
              className="bg-white border-gray-300 text-gray-600 hover:bg-gray-50 px-8 py-3"
              onClick={() => window.location.reload()}
            >
              ↻ Back to Email (Try Both Flows)
            </Button>
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
