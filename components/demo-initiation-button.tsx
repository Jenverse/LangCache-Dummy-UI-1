"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Home } from "lucide-react"

export default function DemoInitiationButton() {
  return (
    <div className="fixed top-4 left-4 z-[9999]">
      <Link href="/">
        <Button
          className="bg-purple-600 hover:bg-purple-700 text-white shadow-lg hover:shadow-xl transition-all duration-200 flex items-center gap-2 px-4 py-2 text-sm font-medium"
        >
          <Home className="w-4 h-4" />
          Demo Initiation Page
        </Button>
      </Link>
    </div>
  )
}
