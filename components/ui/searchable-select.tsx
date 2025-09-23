"use client"

import type React from "react"
import { useState, useRef, useEffect } from "react"
import { Check, ChevronDown, Search } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

interface SearchableSelectProps {
  value?: string
  onValueChange?: (value: string) => void
  placeholder?: string
  options: Array<{
    value: string
    label: string
    icon?: React.ReactNode
  }>
  className?: string
}

export function SearchableSelect({
  value,
  onValueChange,
  placeholder = "Select...",
  options,
  className,
}: SearchableSelectProps) {
  const [open, setOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const containerRef = useRef<HTMLDivElement>(null)

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setOpen(false)
        setSearchQuery("")
      }
    }

    if (open) {
      document.addEventListener('mousedown', handleClickOutside)
      return () => document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [open])

  const filteredOptions = options.filter((option) => 
    option.label.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const selectedOption = options.find((option) => option.value === value)

  // Debug logging
  console.log("SearchableSelect render:", { open, value, options: options.length })

  return (
    <div className="relative" ref={containerRef}>
      <Button
        variant="outline"
        role="combobox"
        aria-expanded={open}
        className={cn("w-full justify-between", className)}
        onClick={() => {
          console.log("SearchableSelect button clicked, current open state:", open)
          setOpen(!open)
        }}
      >
        {selectedOption ? (
          <div className="flex items-center gap-2">
            {selectedOption.icon}
            <span>{selectedOption.label}</span>
          </div>
        ) : (
          placeholder
        )}
        <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
      </Button>
      
      {open && (
        <div className="absolute top-full left-0 right-0 z-50 mt-1 bg-white border border-gray-200 rounded-md shadow-lg">
          <div className="flex items-center border-b px-3">
            <Search className="mr-2 h-4 w-4 shrink-0 opacity-50" />
            <Input
              placeholder="Search databases..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="border-0 focus-visible:ring-0 focus-visible:ring-offset-0"
            />
          </div>
          <div className="max-h-60 overflow-auto">
            {filteredOptions.length === 0 ? (
              <div className="py-6 text-center text-sm text-gray-500">No databases found.</div>
            ) : (
              filteredOptions.map((option) => (
                <div
                  key={option.value}
                  className={cn(
                    "flex items-center gap-2 px-3 py-2 text-sm cursor-pointer hover:bg-gray-100",
                    value === option.value && "bg-gray-100",
                  )}
                  onClick={() => {
                    console.log("Option clicked:", option.value)
                    onValueChange?.(option.value)
                    setOpen(false)
                    setSearchQuery("")
                  }}
                >
                  {option.icon}
                  <span>{option.label}</span>
                  {value === option.value && <Check className="ml-auto h-4 w-4" />}
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  )
}
