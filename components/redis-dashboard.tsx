"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
  ChevronLeft,
  Database,
  FileText,
  Shield,
  Users,
  ScrollText,
  Settings,
  BarChart3,
  CreditCard,
  Download,
  HelpCircle,
  BookOpen,
  Plus,
  Info,
  Grid3X3,
  MapPin,
  Check,
  Eye,
  Zap,
  Target,
  TrendingUp,
  Search,
} from "lucide-react"
import { SearchableSelect } from "@/components/ui/searchable-select"

export default function RedisDashboard() {
  const [selectedDatabase, setSelectedDatabase] = useState("")
  const [showNewDatabaseFields, setShowNewDatabaseFields] = useState(false)
  const [selectedPlan, setSelectedPlan] = useState("free")
  const [subscriptionType, setSubscriptionType] = useState("new")
  const [isCreatingDatabase, setIsCreatingDatabase] = useState(false)
  const [selectedDatabaseSize, setSelectedDatabaseSize] = useState("")
  const [createdDatabase, setCreatedDatabase] = useState<{
    name: string
    id: string
    subscriptionId: string
    link: string
  } | null>(null)

  // New state for creation flow
  const [creationFlow, setCreationFlow] = useState<'selection' | 'quick' | 'custom'>('selection')
  const [quickCreateStep, setQuickCreateStep] = useState<'idle' | 'creating-db' | 'db-created' | 'creating-service' | 'service-created' | 'completed' | 'showing-keys' | 'service-details' | 'mode-selection' | 'shadow-setup' | 'live-setup' | 'report-ready'>('idle')

  // New state for Shadow Mode vs Live choice
  const [serviceMode, setServiceMode] = useState<'shadow' | 'live' | null>(null)
  const [showReport, setShowReport] = useState(false)

  const databaseOptions = [
    {
      value: "create-new",
      label: "Create new database",
      icon: <Plus className="w-4 h-4 text-blue-600" />,
    },
    ...(createdDatabase
      ? [
          {
            value: createdDatabase.id,
            label: createdDatabase.name,
            icon: <Database className="w-4 h-4 text-green-600" />,
          },
        ]
      : []),
    {
      value: "db1",
      label: "my-production-db",
      icon: <Database className="w-4 h-4 text-gray-500" />,
    },
    {
      value: "db2",
      label: "my-staging-db",
      icon: <Database className="w-4 h-4 text-gray-500" />,
    },
    {
      value: "db3",
      label: "my-development-db",
      icon: <Database className="w-4 h-4 text-gray-500" />,
    },
    {
      value: "db4",
      label: "analytics-cache-db",
      icon: <Database className="w-4 h-4 text-gray-500" />,
    },
    {
      value: "db5",
      label: "user-session-db",
      icon: <Database className="w-4 h-4 text-gray-500" />,
    },
  ]

  const calculatePricing = (size: string) => {
    const pricing: { [key: string]: { hourly: number; monthly: number } } = {
      "250mb": { hourly: 0.007, monthly: 5 },
      "1gb": { hourly: 0.028, monthly: 20 },
      "2.5gb": { hourly: 0.07, monthly: 50 },
      "5gb": { hourly: 0.14, monthly: 100 },
      "12gb": { hourly: 0.336, monthly: 240 },
    }
    return pricing[size] || { hourly: 0, monthly: 0 }
  }

  const handleCreateDatabase = () => {
    setIsCreatingDatabase(true)

    setTimeout(() => {
      setIsCreatingDatabase(false)
    }, 2000)
  }

  // Quick create process
  const handleQuickCreate = () => {
    setQuickCreateStep('creating-db')

    // Step 1: Create database (5 seconds)
    setTimeout(() => {
      setQuickCreateStep('db-created')

      // Step 2: Create service (3 seconds)
      setTimeout(() => {
        setQuickCreateStep('creating-service')

        setTimeout(() => {
          setQuickCreateStep('service-created')

          // Complete the process and show keys
          setTimeout(() => {
            setQuickCreateStep('showing-keys')
            // Auto-create a database entry
            setCreatedDatabase({
              name: "quick-langcache-db",
              id: "quick-db-" + Date.now(),
              subscriptionId: "free-sub-001",
              link: "https://console.redis.com/quick-db"
            })
          }, 1000)
        }, 3000)
      }, 1000)
    }, 5000)
  }

  const handleSaveConfiguration = () => {
    setIsCreatingDatabase(true)

    setTimeout(() => {
      const newDatabase = {
        name: `langcache-db-${Date.now()}`,
        id: `db-${Date.now()}`,
        subscriptionId: "2920098",
        link: `https://cloud.redis.io/#/databases/${Date.now()}/subscription/2920098/view-bdb/configuration`,
      }

      setCreatedDatabase(newDatabase)
      setSelectedDatabase(newDatabase.id)
      setShowNewDatabaseFields(false)
      setIsCreatingDatabase(false)
    }, 1500)
  }

  // Check for URL parameter to auto-start quick create
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const urlParams = new URLSearchParams(window.location.search)
      if (urlParams.get('flow') === 'quick-create') {
        setCreationFlow('quick')
        handleQuickCreate()
      }
    }
  }, [])

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="w-64 bg-white border-r border-gray-200 flex flex-col">
        {/* Logo */}
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center gap-2">
            <div className="text-red-600 font-bold text-xl">Redis</div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-1">
          <div className="flex items-center gap-3 px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-md">
            <Database className="w-4 h-4" />
            <span className="text-sm">Databases</span>
            <Plus className="w-4 h-4 ml-auto bg-green-600 rounded-full p-0.5 text-white" />
          </div>

          <div className="flex items-center gap-3 px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-md">
            <FileText className="w-4 h-4" />
            <span className="text-sm">Subscriptions</span>
          </div>

          <div
            className="flex items-center gap-3 px-3 py-2 bg-gray-900 text-white rounded-md cursor-pointer hover:bg-gray-800 transition-colors"
            onClick={() => {
              setCreationFlow('selection')
              setQuickCreateStep('idle')
            }}
          >
            <div className="w-4 h-4 bg-purple-600 rounded text-white text-xs flex items-center justify-center font-bold">
              L
            </div>
            <span className="text-sm font-medium">LangCache</span>
          </div>

          <div className="flex items-center gap-3 px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-md">
            <Shield className="w-4 h-4" />
            <span className="text-sm">Data Access Control</span>
          </div>

          <div className="flex items-center gap-3 px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-md">
            <Users className="w-4 h-4" />
            <span className="text-sm">Access Management</span>
          </div>

          <div className="flex items-center gap-3 px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-md">
            <ScrollText className="w-4 h-4" />
            <span className="text-sm">Logs</span>
          </div>
        </nav>

        <Separator />

        {/* Bottom Navigation */}
        <nav className="p-4 space-y-1">
          <div className="flex items-center gap-3 px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-md">
            <Settings className="w-4 h-4" />
            <span className="text-sm">Account Settings</span>
          </div>

          <div className="flex items-center gap-3 px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-md">
            <BarChart3 className="w-4 h-4" />
            <span className="text-sm">Usage Report</span>
          </div>

          <div className="flex items-center gap-3 px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-md">
            <CreditCard className="w-4 h-4" />
            <span className="text-sm">Billing & Payments</span>
          </div>

          <Separator className="my-2" />

          <div className="flex items-center gap-3 px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-md">
            <div className="w-4 h-4 bg-blue-600 rounded text-white text-xs flex items-center justify-center font-bold">
              R
            </div>
            <span className="text-sm">Redis Copilot</span>
            <Badge variant="secondary" className="ml-auto text-xs">
              New
            </Badge>
          </div>

          <div className="flex items-center gap-3 px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-md">
            <Download className="w-4 h-4" />
            <span className="text-sm">Download Center</span>
          </div>

          <div className="flex items-center gap-3 px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-md">
            <HelpCircle className="w-4 h-4" />
            <span className="text-sm">Support</span>
          </div>

          <div className="flex items-center gap-3 px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-md">
            <BookOpen className="w-4 h-4" />
            <span className="text-sm">Documentation</span>
          </div>
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-gray-200 text-xs text-gray-500">
          <div className="flex gap-2 mb-1">
            <span>Terms</span>
            <span>|</span>
            <span>Privacy</span>
          </div>
          <div>© 2024 Redis</div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="bg-white border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="sm">
                <ChevronLeft className="w-4 h-4" />
              </Button>
              <h1 className="text-xl font-semibold">Create LangCache service</h1>
            </div>

            <div className="flex items-center gap-4">
              <div className="text-right">
                <div className="text-sm font-medium">Price $x/mo</div>
              </div>
              <Grid3X3 className="w-5 h-5 text-gray-400" />
              <MapPin className="w-5 h-5 text-gray-400" />
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-600">Daniel Brown</span>
                <span className="text-sm text-gray-400">Barker.com</span>
                <Avatar className="w-8 h-8">
                  <AvatarFallback className="bg-blue-600 text-white text-sm">DB</AvatarFallback>
                </Avatar>
              </div>
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 p-2 overflow-auto">
          <div className="w-full space-y-2">

            {/* Selection Screen with Dashboard Background */}
            {creationFlow === 'selection' && (
              <div className="relative w-full">
                {/* Dashboard Background Image */}
                <div className="relative w-screen -mx-16">
                  <img
                    src="/images/Dashboard.png"
                    alt="LangCache Dashboard"
                    className="w-full h-auto min-h-[80vh] object-cover"
                  />

                  {/* Overlay Tiles positioned over the "Let's create a service" button */}
                  <div className="absolute inset-0 flex items-start justify-center pt-42">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl">
                      {/* Quick Create Button */}
                      <Button
                        className="h-auto p-4 w-full min-w-[200px] bg-green-500 hover:bg-green-600 text-white shadow-md hover:shadow-lg transition-all duration-200 flex flex-col items-center text-center"
                        onClick={() => {
                          setCreationFlow('quick')
                          handleQuickCreate()
                        }}
                      >
                        <div className="font-semibold text-sm">Quick Create</div>
                        <div className="text-xs opacity-90 mt-1 px-2">Pre-configured with our recommended settings</div>
                      </Button>

                      {/* Custom Create Button */}
                      <Button
                        className="h-auto p-4 w-full min-w-[200px] bg-blue-500 hover:bg-blue-600 text-white shadow-md hover:shadow-lg transition-all duration-200 flex flex-col items-center text-center"
                        onClick={() => setCreationFlow('custom')}
                      >
                        <div className="font-semibold text-sm">Customize Create</div>
                        <div className="text-xs opacity-90 mt-1 px-2">Configure your own settings</div>
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Quick Create Progress Screen */}
            {creationFlow === 'quick' && quickCreateStep !== 'showing-keys' && (
              <div className="max-w-2xl mx-auto">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-center">Setting Up Your LangCache Service</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-8">
                    {/* Step 1: Database Creation */}
                    <div className="flex items-center space-x-4">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                        quickCreateStep === 'creating-db' ? 'bg-blue-100' :
                        ['db-created', 'creating-service', 'service-created', 'completed'].includes(quickCreateStep) ? 'bg-green-100' : 'bg-gray-100'
                      }`}>
                        {quickCreateStep === 'creating-db' ? (
                          <div className="w-4 h-4 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
                        ) : ['db-created', 'creating-service', 'service-created', 'completed'].includes(quickCreateStep) ? (
                          <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        ) : (
                          <span className="text-gray-400">1</span>
                        )}
                      </div>
                      <div className="flex-1">
                        <h3 className="font-medium">Creating a free database for you</h3>
                        <p className="text-sm text-gray-600">
                          {quickCreateStep === 'creating-db' ? 'Setting up your Redis database...' :
                           ['db-created', 'creating-service', 'service-created', 'completed'].includes(quickCreateStep) ? 'Database created successfully!' :
                           'Waiting to start...'}
                        </p>
                      </div>
                    </div>

                    {/* Step 2: Service Creation */}
                    <div className="flex items-center space-x-4">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                        quickCreateStep === 'creating-service' ? 'bg-blue-100' :
                        ['service-created', 'completed'].includes(quickCreateStep) ? 'bg-green-100' : 'bg-gray-100'
                      }`}>
                        {quickCreateStep === 'creating-service' ? (
                          <div className="w-4 h-4 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
                        ) : ['service-created', 'completed'].includes(quickCreateStep) ? (
                          <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        ) : (
                          <span className="text-gray-400">2</span>
                        )}
                      </div>
                      <div className="flex-1">
                        <h3 className="font-medium">Service is getting created</h3>
                        <p className="text-sm text-gray-600">
                          {quickCreateStep === 'creating-service' ? 'Configuring your LangCache service...' :
                           ['service-created', 'completed'].includes(quickCreateStep) ? 'Service created successfully!' :
                           'Waiting for database creation...'}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {/* Service Key Modal - Simple Key Display */}
            {creationFlow === 'quick' && quickCreateStep === 'showing-keys' && (
              <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
                <div className="bg-white rounded-xl shadow-2xl max-w-lg w-full">
                  {/* Modal Header */}
                  <div className="bg-red-600 text-white px-6 py-4 rounded-t-xl">
                    <h2 className="text-xl font-bold">🔑 Your Service Key</h2>
                  </div>

                  {/* Modal Content */}
                  <div className="p-6">
                    <div className="bg-gray-50 rounded-lg p-4">
                      <div className="flex items-center space-x-2">
                        <code className="flex-1 bg-white border rounded px-3 py-2 text-sm font-mono">
                          redis_key_abc123XYZ789demo456def
                        </code>
                        <Button size="sm" variant="outline">Copy</Button>
                      </div>
                    </div>
                  </div>

                  {/* Modal Footer */}
                  <div className="bg-gray-50 px-6 py-4 rounded-b-xl flex justify-end">
                    <Button
                      onClick={() => setQuickCreateStep('service-details')}
                      className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2"
                    >
                      Close
                    </Button>
                  </div>
                </div>
              </div>
            )}

            {/* Service Details Screen - Enhanced with Mode Selection */}
            {creationFlow === 'quick' && quickCreateStep === 'service-details' && (
              <div className="fixed inset-0 bg-white z-50 flex flex-col">
                {/* Header */}
                <div className="bg-white border-b border-gray-200 px-6 py-4">
                  <div className="flex items-center">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setCreationFlow('selection')}
                      className="mr-4"
                    >
                      <ChevronLeft className="w-4 h-4 mr-1" />
                      Back to Dashboard
                    </Button>
                    <h1 className="text-xl font-semibold">🎉 Service Details - Congratulations!</h1>
                  </div>
                </div>

                {/* Service Details Content */}
                <div className="flex-1 overflow-auto">
                  {/* Congratulations & Mode Selection Section */}
                  <div className="bg-gradient-to-r from-green-50 to-blue-50 p-6 border-b">
                    <div className="max-w-6xl mx-auto">
                      {/* Success Message */}
                      <div className="text-center mb-6">
                        <div className="bg-green-500 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-3">
                          <Check className="h-8 w-8 text-white" />
                        </div>
                        <h2 className="text-2xl font-bold text-gray-800 mb-2">Service Created Successfully!</h2>
                        <p className="text-gray-600">Choose how you want to run your LangCache service:</p>
                      </div>

                      {/* Mode Selection - Compact */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
                        {/* Shadow Mode */}
                        <div className="bg-white rounded-lg shadow border-2 border-gray-200 hover:border-blue-500 transition-all duration-300 p-5">
                          <div className="flex items-start mb-4">
                            <div className="bg-blue-100 rounded-full w-12 h-12 flex items-center justify-center mr-3 flex-shrink-0">
                              <Eye className="h-6 w-6 text-blue-600" />
                            </div>
                            <div className="flex-1">
                              <h3 className="text-lg font-bold text-gray-800 mb-1">Shadow Mode</h3>
                              <p className="text-sm text-blue-700 font-medium mb-2">🛡️ Zero Impact on User Experience</p>
                            </div>
                          </div>

                          <div className="space-y-3 mb-4">
                            <div className="bg-blue-50 rounded-lg p-3">
                              <h4 className="font-semibold text-blue-800 text-sm mb-2">Safe Way to Understand LangCache Potential:</h4>
                              <ul className="text-xs text-blue-700 space-y-1">
                                <li>• <strong>No performance impact</strong> - Your app runs exactly as today</li>
                                <li>• <strong>Backend analysis only</strong> - We store query patterns securely</li>
                                <li>• <strong>What % of queries</strong> could have been served by LangCache</li>
                                <li>• <strong>Potential cost savings</strong> and performance improvements</li>
                              </ul>
                            </div>

                            <div className="bg-gradient-to-r from-blue-100 to-indigo-100 rounded-lg p-3">
                              <h4 className="font-semibold text-blue-800 text-sm mb-2">Weekly Analysis Report Includes:</h4>
                              <div className="grid grid-cols-2 gap-2 text-xs text-blue-700">
                                <div>
                                  <div className="font-medium">📊 Cache Hit Rate</div>
                                  <div>% of queries cacheable</div>
                                </div>
                                <div>
                                  <div className="font-medium">💰 Cost Savings</div>
                                  <div>Database load reduction</div>
                                </div>
                                <div>
                                  <div className="font-medium">🔍 Top Queries</div>
                                  <div>Most repeated patterns</div>
                                </div>
                                <div>
                                  <div className="font-medium">⚡ Performance</div>
                                  <div>Response time improvements</div>
                                </div>
                              </div>
                            </div>

                            <div className="text-center bg-green-50 rounded-lg p-2">
                              <p className="text-xs text-green-700 font-medium">
                                💡 Make data-driven decisions before going live
                              </p>
                            </div>
                          </div>

                          <Button
                            onClick={() => {setServiceMode('shadow'); setShowReport(false)}}
                            className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                            size="sm"
                          >
                            {serviceMode === 'shadow' ? '✓ Selected - Shadow Mode Active' : 'Choose Shadow Mode'}
                          </Button>
                        </div>

                        {/* Live Mode */}
                        <div className="bg-white rounded-lg shadow border-2 border-gray-200 hover:border-green-500 transition-all duration-300 p-5">
                          <div className="flex items-start mb-4">
                            <div className="bg-green-100 rounded-full w-12 h-12 flex items-center justify-center mr-3 flex-shrink-0">
                              <Zap className="h-6 w-6 text-green-600" />
                            </div>
                            <div className="flex-1">
                              <h3 className="text-lg font-bold text-gray-800 mb-1">Live Mode</h3>
                              <p className="text-sm text-green-700 font-medium mb-2">⚡ Immediate Performance Benefits</p>
                            </div>
                          </div>

                          <div className="space-y-3 mb-4">
                            <div className="bg-green-50 rounded-lg p-3">
                              <h4 className="font-semibold text-green-800 text-sm mb-2">Start Caching Immediately:</h4>
                              <ul className="text-xs text-green-700 space-y-1">
                                <li>• <strong>Instant performance boost</strong> - Faster response times</li>
                                <li>• <strong>Reduced database load</strong> - Lower infrastructure costs</li>
                                <li>• <strong>Real-time caching</strong> - Queries cached as they happen</li>
                                <li>• <strong>Production benefits</strong> - Full LangCache capabilities</li>
                              </ul>
                            </div>

                            <div className="bg-gradient-to-r from-green-100 to-emerald-100 rounded-lg p-3">
                              <h4 className="font-semibold text-green-800 text-sm mb-2">Immediate Benefits:</h4>
                              <div className="grid grid-cols-2 gap-2 text-xs text-green-700">
                                <div>
                                  <div className="font-medium">🚀 Speed</div>
                                  <div>Faster query responses</div>
                                </div>
                                <div>
                                  <div className="font-medium">💰 Savings</div>
                                  <div>Reduced DB costs</div>
                                </div>
                                <div>
                                  <div className="font-medium">📈 Scale</div>
                                  <div>Handle more traffic</div>
                                </div>
                                <div>
                                  <div className="font-medium">🎯 Reliability</div>
                                  <div>Improved uptime</div>
                                </div>
                              </div>
                            </div>

                            <div className="text-center bg-orange-50 rounded-lg p-2">
                              <p className="text-xs text-orange-700 font-medium">
                                ⚠️ Best if you're confident about your caching strategy
                              </p>
                            </div>
                          </div>

                          <Button
                            onClick={() => {setServiceMode('live'); setShowReport(false)}}
                            className="w-full bg-green-600 hover:bg-green-700 text-white"
                            size="sm"
                          >
                            {serviceMode === 'live' ? '✓ Selected - Live Mode Active' : 'Choose Live Mode'}
                          </Button>
                        </div>
                      </div>

                      {/* Weekly Report Button */}
                      {serviceMode === 'shadow' && (
                        <div className="text-center">
                          <Button
                            onClick={() => setShowReport(!showReport)}
                            variant="outline"
                            className="bg-white border-blue-300 text-blue-700 hover:bg-blue-50"
                          >
                            <BarChart3 className="h-4 w-4 mr-2" />
                            {showReport ? 'Hide Weekly Report' : 'View Weekly Report'}
                          </Button>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Shadow Mode Setup Section */}
                  {serviceMode === 'shadow' && !showReport && (
                    <div className="p-6 bg-blue-50 border-b">
                      <div className="max-w-6xl mx-auto">
                        <h3 className="text-xl font-bold text-gray-800 mb-4">🔍 Shadow Mode Setup</h3>

                        {/* Explanation Section */}
                        <div className="bg-white rounded-lg p-6 mb-4 border-l-4 border-blue-500">
                          <h4 className="font-bold text-gray-800 mb-3 flex items-center">
                            <Shield className="h-5 w-5 text-blue-600 mr-2" />
                            How Shadow Mode Works - Zero Impact on Your Users
                          </h4>
                          <div className="text-gray-700 space-y-3">
                            <p>
                              <strong>This implementation will not impact your users.</strong> Shadow Mode runs completely behind the scenes without affecting your application's performance or user experience.
                            </p>
                            <p>
                              Here's what happens: We simply store your user queries in our secure database and analyze the patterns. Your application continues to work exactly as it does today - no caching, no changes to response times, no risk.
                            </p>
                            <p>
                              After a week of monitoring, we send you a comprehensive analysis showing:
                            </p>
                            <ul className="list-disc list-inside ml-4 space-y-1 text-gray-600">
                              <li><strong>What would have been your cache hit ratio</strong> if LangCache was live</li>
                              <li><strong>A sneak peek at your top queries</strong> and their repetition patterns</li>
                              <li><strong>Query similarity analysis</strong> to identify optimization opportunities</li>
                              <li><strong>Performance projections</strong> based on your actual usage patterns</li>
                            </ul>
                            <p className="text-blue-700 font-medium">
                              💡 This helps in decision making if LangCache is ready to be in Live mode for your specific use case, with real data from your actual application.
                            </p>
                          </div>
                        </div>

                        {/* Code Implementation */}
                        <div className="bg-white rounded-lg p-4 mb-4">
                          <h4 className="font-semibold text-gray-800 mb-3">Add this code to your application:</h4>
                          <div className="bg-gray-900 rounded p-3 mb-3">
                            <pre className="text-green-400 text-xs overflow-x-auto">
{`// Add this to your application - Zero impact on performance
import { LangCacheShadow } from '@redis/langcache-shadow';

const shadowCache = new LangCacheShadow({
  endpoint: 'redis_key_abc123XYZ789demo456def',
  mode: 'shadow',
  reportingEnabled: true
});

// Wrap your existing queries - they continue to work normally
const result = await shadowCache.monitor('your-query-key', async () => {
  // Your existing database query runs exactly as before
  return await db.query('SELECT * FROM users WHERE id = ?', [userId]);
});

// Result is returned immediately from your database
// We just log the query pattern for analysis`}
                            </pre>
                          </div>
                          <div className="flex justify-between items-center">
                            <p className="text-sm text-gray-600">
                              <strong>Zero performance impact:</strong> Your queries run normally while we collect analytics in the background.
                            </p>
                            <Button size="sm" variant="outline">Copy Code</Button>
                          </div>
                        </div>

                        {/* Benefits Summary */}
                        <div className="bg-gradient-to-r from-blue-100 to-indigo-100 rounded-lg p-4">
                          <h4 className="font-semibold text-blue-800 mb-2">Why Start with Shadow Mode?</h4>
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                            <div className="text-center">
                              <div className="bg-blue-500 rounded-full w-8 h-8 flex items-center justify-center mx-auto mb-2">
                                <Shield className="h-4 w-4 text-white" />
                              </div>
                              <p className="font-medium text-blue-800">Risk-Free</p>
                              <p className="text-blue-700">No impact on users or performance</p>
                            </div>
                            <div className="text-center">
                              <div className="bg-blue-500 rounded-full w-8 h-8 flex items-center justify-center mx-auto mb-2">
                                <BarChart3 className="h-4 w-4 text-white" />
                              </div>
                              <p className="font-medium text-blue-800">Data-Driven</p>
                              <p className="text-blue-700">Real insights from your actual queries</p>
                            </div>
                            <div className="text-center">
                              <div className="bg-blue-500 rounded-full w-8 h-8 flex items-center justify-center mx-auto mb-2">
                                <Target className="h-4 w-4 text-white" />
                              </div>
                              <p className="font-medium text-blue-800">Informed Decision</p>
                              <p className="text-blue-700">Know your ROI before going live</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Live Mode Setup Section */}
                  {serviceMode === 'live' && (
                    <div className="p-6 bg-green-50 border-b">
                      <div className="max-w-6xl mx-auto">
                        <h3 className="text-xl font-bold text-gray-800 mb-4">⚡ Live Mode Active</h3>
                        <div className="bg-white rounded-lg p-4">
                          <div className="flex items-center mb-3">
                            <div className="bg-green-500 rounded-full w-8 h-8 flex items-center justify-center mr-3">
                              <Check className="h-4 w-4 text-white" />
                            </div>
                            <div>
                              <h4 className="font-semibold text-gray-800">Your cache is now active!</h4>
                              <p className="text-sm text-gray-600">Start seeing performance improvements immediately.</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Weekly Report Section */}
                  {serviceMode === 'shadow' && showReport && (
                    <div className="p-6 bg-gradient-to-br from-purple-50 to-blue-50 border-b">
                      <div className="max-w-6xl mx-auto">
                        <h3 className="text-xl font-bold text-gray-800 mb-4">📊 Weekly Cache Analysis Report</h3>

                        {/* Report Cards */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                          {/* Cache Hit Rate */}
                          <div className="bg-white rounded-lg shadow p-4">
                            <div className="flex items-center mb-2">
                              <TrendingUp className="h-5 w-5 text-green-600 mr-2" />
                              <h4 className="font-bold text-gray-800">Cache Hit Rate</h4>
                            </div>
                            <div className="text-2xl font-bold text-green-600 mb-1">73%</div>
                            <p className="text-xs text-gray-600">of queries could be cached</p>
                          </div>

                          {/* Matched Queries */}
                          <div className="bg-white rounded-lg shadow p-4">
                            <div className="flex items-center mb-2">
                              <Search className="h-5 w-5 text-blue-600 mr-2" />
                              <h4 className="font-bold text-gray-800">Matched Queries</h4>
                            </div>
                            <div className="text-2xl font-bold text-blue-600 mb-1">1,247</div>
                            <p className="text-xs text-gray-600">similar query patterns</p>
                          </div>

                          {/* Similarity Score */}
                          <div className="bg-white rounded-lg shadow p-4">
                            <div className="flex items-center mb-2">
                              <Target className="h-5 w-5 text-purple-600 mr-2" />
                              <h4 className="font-bold text-gray-800">Similarity Score</h4>
                            </div>
                            <div className="text-2xl font-bold text-purple-600 mb-1">89%</div>
                            <p className="text-xs text-gray-600">average match accuracy</p>
                          </div>
                        </div>

                        {/* Insights */}
                        <div className="bg-white rounded-lg shadow p-4">
                          <h4 className="font-bold text-gray-800 mb-3">Key Insights & Recommendations</h4>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                            <div>
                              <h5 className="font-semibold text-gray-700 mb-2">Top Cacheable Queries:</h5>
                              <ul className="text-gray-600 space-y-1">
                                <li>• User profile lookups (89% hit rate)</li>
                                <li>• Product catalog searches (76% hit rate)</li>
                                <li>• Category listings (92% hit rate)</li>
                              </ul>
                            </div>
                            <div>
                              <h5 className="font-semibold text-gray-700 mb-2">Recommendations:</h5>
                              <ul className="text-gray-600 space-y-1">
                                <li>• Enable caching for user profiles</li>
                                <li>• Cache product data with 1-hour TTL</li>
                                <li>• Consider semantic caching for search</li>
                              </ul>
                            </div>
                          </div>
                          <div className="mt-4 text-center">
                            <Button
                              onClick={() => {setServiceMode('live'); setShowReport(false)}}
                              className="bg-green-600 hover:bg-green-700 text-white"
                            >
                              🚀 Switch to Live Mode
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Original Service Details Image */}
                  <div className="p-6 bg-gray-50">
                    <div className="max-w-6xl mx-auto">
                      <h3 className="text-xl font-bold text-gray-800 mb-4">Service Configuration Details</h3>
                      <div className="bg-white rounded-lg shadow">
                        <img
                          src="/images/ServiceDetail.png"
                          alt="Service Details"
                          className="w-full h-auto rounded-lg"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}



            {/* Custom Create Screen (Original Form) */}
            {creationFlow === 'custom' && (
              <>
                <div className="flex items-center mb-6">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setCreationFlow('selection')}
                    className="mr-4"
                  >
                    <ChevronLeft className="w-4 h-4 mr-1" />
                    Back to Selection
                  </Button>
                  <h2 className="text-xl font-semibold">Custom Configuration</h2>
                </div>

                <Card>
                  <CardHeader>
                    <CardTitle>General Settings</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div>
                      <p className="text-sm text-blue-600 mb-6">
                        You can apply LangCache to an existing database or create a new one
                      </p>

                      <div className="grid grid-cols-2 gap-6">
                        <div>
                          <Label htmlFor="service-name" className="text-sm font-medium text-red-600">
                            * Service Name
                          </Label>
                          <Input id="service-name" placeholder="my-llm-cache" className="mt-1" />
                        </div>

                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <Label className="text-sm font-medium text-red-600">* Select or Create Database</Label>
                            <Info className="w-4 h-4 text-gray-400" />
                          </div>
                          <div className="relative">
                            <SearchableSelect
                              value={selectedDatabase}
                              onValueChange={(value) => {
                                setSelectedDatabase(value)
                                setShowNewDatabaseFields(value === "create-new")
                              }}
                              placeholder="Search databases or create new..."
                              options={databaseOptions}
                              className="w-full"
                            />
                      </div>
                    </div>
                  </div>

                  {showNewDatabaseFields && (
                    <div className="mt-3 p-6 bg-blue-50 rounded-lg border border-blue-200 relative">
                      {/* Visual connector arrow pointing to dropdown */}
                      <div className="absolute -top-2 right-8 w-4 h-4 bg-blue-50 border-l border-t border-blue-200 transform rotate-45"></div>
                      <div className="flex items-center justify-between mb-6">
                        <h3 className="text-lg font-semibold">Configure your new database for LangCache</h3>
                      </div>

                      {/* New Subscription vs Existing Subscription Toggle */}
                      <div className="mb-6">
                        <div className="flex gap-2">
                          <Button
                            variant={subscriptionType === "new" ? "default" : "outline"}
                            size="sm"
                            onClick={() => setSubscriptionType("new")}
                            className={subscriptionType === "new" ? "bg-blue-600 text-white" : ""}
                          >
                            New Subscription
                          </Button>
                          <Button
                            variant={subscriptionType === "existing" ? "default" : "outline"}
                            size="sm"
                            onClick={() => setSubscriptionType("existing")}
                            className={subscriptionType === "existing" ? "bg-blue-600 text-white" : ""}
                          >
                            Existing Subscription
                          </Button>
                        </div>
                      </div>

                      <div className="space-y-3">
                        {subscriptionType === "new" && (
                          <div>
                            <div className="flex items-center gap-2 mb-1">
                              <Label className="text-sm font-medium text-red-600">* Subscription Plan</Label>
                              <a
                                href="https://redis.io/pricing/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-600 text-sm hover:underline flex items-center"
                              >
                                View pricing plans ↗
                              </a>
                            </div>
                            <Select value={selectedPlan} onValueChange={(value) => {
                              setSelectedPlan(value)
                              // Set default database sizes based on plan
                              if (value === "essentials") {
                                setSelectedDatabaseSize("250mb")
                              } else if (value === "pro") {
                                setSelectedDatabaseSize("5gb")
                              } else {
                                setSelectedDatabaseSize("")
                              }
                            }}>
                              <SelectTrigger className="mt-1">
                                <SelectValue placeholder="Select a plan" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="free">
                                  <div className="flex flex-col">
                                    <span className="font-medium">Free - $0/month</span>
                                    <span className="text-xs text-gray-500">Shared cloud deployment • Up to 30 MB</span>
                                  </div>
                                </SelectItem>
                                <SelectItem value="essentials">
                                  <div className="flex flex-col">
                                    <span className="font-medium">Essentials</span>
                                    <span className="text-xs text-gray-500">
                                      Shared cloud deployment • Up to 12 GB RAM
                                    </span>
                                  </div>
                                </SelectItem>
                                <SelectItem value="pro">
                                  <div className="flex flex-col">
                                    <span className="font-medium">Pro</span>
                                    <span className="text-xs text-gray-500">
                                      Dedicated cloud deployment • 6+ GB RAM, multi-region
                                    </span>
                                  </div>
                                </SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        )}

                        {subscriptionType === "existing" && (
                          <div>
                            <Label className="text-sm font-medium text-red-600">* Subscription</Label>
                            <Select>
                              <SelectTrigger className="mt-1">
                                <div className="flex items-center gap-2">
                                  <div className="w-4 h-4 bg-orange-500 rounded text-white text-xs flex items-center justify-center font-bold">
                                    G
                                  </div>
                                  <span>GCP-PERF-ENTERPRISE-DB-DONOTDELETE us-central1</span>
                                </div>
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="gcp-perf">
                                  <div className="flex items-center gap-2">
                                    <div className="w-4 h-4 bg-orange-500 rounded text-white text-xs flex items-center justify-center font-bold">
                                      G
                                    </div>
                                    <span>GCP-PERF-ENTERPRISE-DB-DONOTDELETE us-central1</span>
                                  </div>
                                </SelectItem>
                                <SelectItem value="aws-prod">
                                  <div className="flex items-center gap-2">
                                    <div className="w-4 h-4 bg-orange-500 rounded text-white text-xs flex items-center justify-center font-bold">
                                      A
                                    </div>
                                    <span>AWS-PROD-ENTERPRISE-DB us-east-1</span>
                                  </div>
                                </SelectItem>
                              </SelectContent>
                            </Select>
                            <div className="text-sm text-blue-600 mt-2">
                              New databases can be added to Pre subscriptions only.
                            </div>
                          </div>
                        )}

                        {subscriptionType === "new" && (
                          <>
                            <div className="grid grid-cols-2 gap-3">
                              <div>
                                <Label className="text-sm font-medium text-red-600">* Database Name</Label>
                                <Input placeholder="database-MPXVNTHO" className="mt-1" />
                              </div>
                              <div>
                                <Label className="text-sm font-medium text-red-600">* Cloud vendor</Label>
                                <Select>
                                  <SelectTrigger className="mt-1">
                                    <div className="flex items-center gap-2">
                                      <div className="w-4 h-4 bg-orange-500 rounded text-white text-xs flex items-center justify-center font-bold">
                                        aws
                                      </div>
                                      <span>Amazon Web Services</span>
                                    </div>
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="aws">Amazon Web Services</SelectItem>
                                    <SelectItem value="gcp">Google Cloud Platform</SelectItem>
                                    <SelectItem value="azure">Microsoft Azure</SelectItem>
                                  </SelectContent>
                                </Select>
                              </div>
                            </div>

                            <div className="grid grid-cols-2 gap-3">
                              <div>
                                <Label className="text-sm font-medium text-red-600">* Region</Label>
                                <Select>
                                  <SelectTrigger>
                                    <div className="flex items-center gap-2">
                                      <div className="w-4 h-4 bg-blue-600 rounded"></div>
                                      <span>US East (N. Virginia) us-east-1</span>
                                    </div>
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="us-east-1">US East (N. Virginia) us-east-1</SelectItem>
                                    <SelectItem value="us-west-2">US West (Oregon) us-west-2</SelectItem>
                                    <SelectItem value="eu-west-1">Europe (Ireland) eu-west-1</SelectItem>
                                  </SelectContent>
                                </Select>
                              </div>
                              {selectedPlan === "free" && (
                                <div>
                                  <Label className="text-sm font-medium text-red-600">* Database Size</Label>
                                  <Input value="30 MB" disabled className="mt-1 bg-gray-100" />
                                </div>
                              )}
                              {selectedPlan !== "free" && selectedPlan && (
                                <div>
                                  <Label className="text-sm font-medium text-red-600">* Database Size</Label>
                                  <Select value={selectedDatabaseSize} onValueChange={setSelectedDatabaseSize}>
                                    <SelectTrigger className="mt-1">
                                      {selectedDatabaseSize ? (
                                        <div className="flex items-center justify-between w-full min-w-0">
                                          <div className="flex items-center gap-2 flex-shrink-0">
                                            {selectedDatabaseSize === "250mb" && (
                                              <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
                                                <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                                                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                                </svg>
                                              </div>
                                            )}
                                            <span>
                                              {selectedDatabaseSize === "250mb" && "250 MB"}
                                              {selectedDatabaseSize === "1gb" && "1 GB"}
                                              {selectedDatabaseSize === "2.5gb" && "2.5 GB"}
                                              {selectedDatabaseSize === "5gb" && "5 GB"}
                                              {selectedDatabaseSize === "12gb" && "12 GB"}
                                            </span>
                                          </div>
                                          <span className="text-gray-600 ml-auto">
                                            {selectedDatabaseSize === "250mb" && "$0.007/hour"}
                                            {selectedDatabaseSize === "1gb" && "$0.025/hour"}
                                            {selectedDatabaseSize === "2.5gb" && "$0.049/hour"}
                                            {selectedDatabaseSize === "5gb" && "$0.096/hour"}
                                            {selectedDatabaseSize === "12gb" && "$0.24/hour"}
                                          </span>
                                        </div>
                                      ) : (
                                        <SelectValue placeholder="Select size" />
                                      )}
                                    </SelectTrigger>
                                    <SelectContent className="w-80">
                                      <SelectItem value="250mb" className="p-0 w-full">
                                        <div className="flex items-center justify-between w-full min-w-0 p-3 border-b border-gray-100">
                                          <div className="flex items-center gap-2 flex-shrink-0">
                                            <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
                                              <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                              </svg>
                                            </div>
                                            <span className="font-medium">250 MB</span>
                                          </div>
                                          <span className="text-gray-600 ml-auto">$0.007/hour</span>
                                        </div>
                                      </SelectItem>
                                      <SelectItem value="1gb" className="p-0 w-full">
                                        <div className="flex items-center justify-between w-full min-w-0 p-3 border-b border-gray-100">
                                          <span className="text-gray-400 flex-shrink-0">1 GB</span>
                                          <span className="text-gray-400 ml-auto">$0.025/hour</span>
                                        </div>
                                      </SelectItem>
                                      <SelectItem value="2.5gb" className="p-0 w-full">
                                        <div className="flex items-center justify-between w-full min-w-0 p-3 border-b border-gray-100">
                                          <span className="text-gray-400 flex-shrink-0">2.5 GB</span>
                                          <span className="text-gray-400 ml-auto">$0.049/hour</span>
                                        </div>
                                      </SelectItem>
                                      <SelectItem value="5gb" className="p-0 w-full">
                                        <div className="flex items-center justify-between w-full min-w-0 p-3 border-b border-gray-100">
                                          <span className="text-gray-400 flex-shrink-0">5 GB</span>
                                          <span className="text-gray-400 ml-auto">$0.096/hour</span>
                                        </div>
                                      </SelectItem>
                                      <SelectItem value="12gb" className="p-0 w-full">
                                        <div className="flex items-center justify-between w-full min-w-0 p-3">
                                          <span className="text-gray-400 flex-shrink-0">12 GB</span>
                                          <span className="text-gray-400 ml-auto">$0.24/hour</span>
                                        </div>
                                      </SelectItem>
                                    </SelectContent>
                                  </Select>
                                </div>
                              )}
                            </div>
                          </>
                        )}

                        {subscriptionType === "existing" && (
                          <div>
                            <Label className="text-sm font-medium text-red-600">* Database Name</Label>
                            <Input placeholder="database-MPXVNTHO" className="mt-1" />
                          </div>
                        )}

                        {subscriptionType === "existing" && (
                          <div className="mt-6">
                            <h4 className="text-sm font-medium mb-3">Database Pricing</h4>
                            <div className="bg-gray-50 p-3 rounded-md">
                              <div className="flex justify-between text-sm">
                                <span>Database (30 MB)</span>
                                <span className="text-green-600">$0.000/hr</span>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>

                      <div className="flex justify-end gap-3 pt-4 border-t border-blue-200 relative">
                        <Button
                          variant="outline"
                          onClick={() => setShowNewDatabaseFields(false)}
                          disabled={isCreatingDatabase}
                        >
                          Cancel
                        </Button>
                        <Button
                          className={
                            selectedPlan === "free"
                              ? "bg-green-600 hover:bg-green-700 text-white"
                              : "bg-blue-600 hover:bg-blue-700 text-white"
                          }
                          onClick={handleSaveConfiguration}
                          disabled={isCreatingDatabase}
                        >
                          {isCreatingDatabase ? (
                            <>
                              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                              Saving Configuration...
                            </>
                          ) : (
                            "Save Configuration"
                          )}
                        </Button>
                      </div>
                    </div>
                  )}

                  <div className="grid grid-cols-2 gap-6 mt-6">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <Label className="text-sm font-medium">TTL</Label>
                        <Info className="w-4 h-4 text-gray-400" />
                      </div>
                      <Input placeholder="No expiration" />
                    </div>

                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <Label className="text-sm font-medium text-red-600">* User for this service</Label>
                        <Info className="w-4 h-4 text-gray-400" />
                      </div>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="default" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="default">default</SelectItem>
                          <SelectItem value="admin">admin</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Embedding Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <Label className="text-sm font-medium text-red-600">* Embedding Provider</Label>
                    <Select>
                      <SelectTrigger className="mt-1">
                        <div className="flex items-center gap-2">
                          <div className="text-red-600 font-bold text-sm">Redis</div>
                        </div>
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="redis">Redis</SelectItem>
                        <SelectItem value="openai">OpenAI</SelectItem>
                        <SelectItem value="cohere">Cohere</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <Label className="text-sm font-medium text-red-600">* Model</Label>
                      <Info className="w-4 h-4 text-gray-400" />
                    </div>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="langcache-embedding-model-v1" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="langcache-embedding-model-v1">langcache-embedding-model-v1</SelectItem>
                        <SelectItem value="text-embedding-ada-002">text-embedding-ada-002</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <Label className="text-sm font-medium">Embedding Provider API Key</Label>
                    <div className="mt-1 text-sm text-blue-600">Not required</div>
                  </div>

                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <Label className="text-sm font-medium text-red-600">* Similarity Threshold</Label>
                      <Info className="w-4 h-4 text-gray-400" />
                    </div>
                    <Input placeholder="0.85" className="mt-1" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Attributes Settings</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 mb-4">
                  Attributes are optional tags that help you scope your cache for precise operations. For example,
                  tagging entries with a doc_id lets you later retrieve or remove them by that ID.{" "}
                  <a href="#" className="text-blue-600 hover:underline">
                    Learn more here ↗
                  </a>
                </p>
                <Button
                  variant="outline"
                  size="sm"
                  className="text-blue-600 border-blue-600 hover:bg-blue-50 bg-transparent"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add Attribute
                </Button>
              </CardContent>
            </Card>

            {/* Moved free database pricing to appear after Attributes card */}
            {selectedPlan === "free" && (
              <Card>
                <CardHeader>
                  <CardTitle>Pricing</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span>Database (30 MB)</span>
                      <span className="text-green-600">$0.000/hr</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>LangCache Service</span>
                      <span className="text-green-600">$0.00/Million Input Tokens (Public Preview)</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Combined Payment and Pricing Section */}
            {(selectedPlan === "essentials" || selectedPlan === "pro") && selectedDatabaseSize && (
              <Card>
                <CardHeader>
                  <CardTitle>Payment</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-6">
                    {/* Left side - Payment Method */}
                    <div className="space-y-4">
                      <div>
                        <Label className="text-sm font-medium">Payment method</Label>
                        <div className="flex items-center gap-2 mt-1">
                          <Select>
                            <SelectTrigger className="flex-1">
                              <div className="flex items-center gap-2">
                                <CreditCard className="w-4 h-4" />
                                <span>•••• •••• •••• 3825 2/28</span>
                              </div>
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="card-3825">•••• •••• •••• 3825 2/28</SelectItem>
                              <SelectItem value="add-new">Add new payment method</SelectItem>
                            </SelectContent>
                          </Select>
                          <Button size="sm" variant="outline" className="px-3 bg-transparent">
                            <Plus className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                      <div className="text-xs text-gray-500">
                        *Price excludes taxes and monthly network charges, which are billed separately.
                      </div>
                    </div>

                    {/* Right side - Plan and Pricing */}
                    <div className="space-y-4">
                      <div>
                        <div className="text-sm font-medium mb-2">Plan</div>
                        <div>
                          <div className="font-medium">{selectedPlan === "essentials" ? "Essentials" : "Pro"}</div>
                          <div className="text-sm text-gray-600">{selectedDatabaseSize?.toUpperCase()} Database</div>
                        </div>
                      </div>

                      <div className="space-y-3">
                        <div className="flex justify-between text-sm">
                          <span>Database ({selectedDatabaseSize?.toUpperCase()})</span>
                          <span>
                            ${selectedDatabaseSize ? calculatePricing(selectedDatabaseSize).hourly.toFixed(3) : "0.000"}
                            /hr
                          </span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span>LangCache Service</span>
                          <span className="text-green-600">$0.00/Million Input Tokens (Public Preview)</span>
                        </div>
                        <Separator />
                        <div className="text-center pt-2">
                          <a href="#" className="text-blue-600 text-xs hover:underline">
                            Have a coupon code? Click here
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            <div className="flex justify-between pt-4 relative">
              <Button variant="outline">Cancel</Button>
              <Button
                className="bg-gray-900 hover:bg-gray-800 text-white"
                onClick={handleCreateDatabase}
                disabled={isCreatingDatabase}
              >
                {isCreatingDatabase ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                    Creating Service...
                  </>
                ) : (
                  "Create"
                )}
              </Button>
            </div>
              </>
            )}

          </div>
        </main>
      </div>
    </div>
  )
}
