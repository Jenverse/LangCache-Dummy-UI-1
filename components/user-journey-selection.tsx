"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Users, UserCheck, ArrowRight, Globe, Cloud } from "lucide-react"
import Link from "next/link"

export default function UserJourneySelection() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="max-w-6xl w-full">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Redis LangCache Demo
          </h1>
          <p className="text-xl text-gray-600 mb-2">
            Choose your user journey to experience the LangCache flow
          </p>
          <p className="text-lg text-gray-500">
            Select which type of user experience you'd like to simulate
          </p>
        </div>

        {/* Two Tiles */}
        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          
          {/* Tile 1: Brand New User */}
          <Card className="hover:shadow-xl transition-shadow duration-300 border-2 hover:border-blue-500">
            <CardContent className="p-6 text-center h-full flex flex-col">
              <div className="flex-grow">
                <h2 className="text-xl font-bold text-gray-900 mb-4">
                  LangCache Service Creation Flow for BRAND New User from Marketing Page
                </h2>

                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 mb-4">
                  <p className="text-yellow-800 font-medium text-sm">
                    📝 These users are coming from marketing page and do not have a Redis Account
                  </p>
                </div>

                {/* Marketing Page Image Preview */}
                <div className="bg-white rounded-lg border-2 border-gray-200 p-2 mb-4">
                  <img
                    src="/images/RedisLangcachepage.png"
                    alt="Redis LangCache Marketing Page Preview"
                    className="w-full h-32 object-cover object-top rounded"
                  />

                </div>
              </div>
              
              <Link href="/marketing-page" className="w-full">
                <Button 
                  size="lg" 
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 text-lg font-semibold"
                >
                  Start Brand New User Journey
                  <ArrowRight className="ml-2 h-6 w-6" />
                </Button>
              </Link>
            </CardContent>
          </Card>

          {/* Tile 2: Existing Redis User */}
          <Card className="hover:shadow-xl transition-shadow duration-300 border-2 hover:border-green-500">
            <CardContent className="p-6 text-center h-full flex flex-col">
              <div className="flex-grow">
                <h2 className="text-xl font-bold text-gray-900 mb-4">
                  Existing Redis User, coming to LangCache Page from Redis Cloud
                </h2>

                <div className="bg-green-50 border border-green-200 rounded-lg p-3 mb-4">
                  <p className="text-green-800 font-medium text-sm">
                    ✅ These users already have Redis Cloud accounts but are new to LangCache
                  </p>
                </div>

                {/* Redis Cloud Dashboard Preview */}
                <div className="bg-white rounded-lg border-2 border-gray-200 p-2 mb-4">
                  <img
                    src="/images/RedisCloud.png"
                    alt="Redis Cloud Dashboard Preview"
                    className="w-full h-32 object-cover object-top rounded"
                  />

                </div>
              </div>
              
              <Link href="/dashboard" className="w-full">
                <Button 
                  size="lg" 
                  className="w-full bg-green-600 hover:bg-green-700 text-white py-4 text-lg font-semibold"
                >
                  Start Existing User Journey
                  <ArrowRight className="ml-2 h-6 w-6" />
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>

        {/* Footer Note */}
        <div className="text-center mt-12">
          <div className="bg-white rounded-lg shadow-md p-6 max-w-2xl mx-auto">
            <h3 className="font-bold text-gray-800 mb-2">Demo Information</h3>
            <p className="text-gray-600 text-sm">
              This demo simulates two different user journeys for Redis LangCache. 
              Choose the path that matches the user experience you want to explore.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
