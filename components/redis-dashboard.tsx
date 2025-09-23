"use client"

import { useState } from "react"
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
} from "lucide-react"

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

  const handleCreateDatabase = async () => {
    setIsCreatingDatabase(true)

    setTimeout(() => {
      setIsCreatingDatabase(false)
    }, 2000)
  }

  const handleSaveConfiguration = async () => {
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

          <div className="flex items-center gap-3 px-3 py-2 bg-gray-900 text-white rounded-md">
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
        <main className="flex-1 p-6 overflow-auto">
          <div className="max-w-4xl space-y-6">
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
                        <Select
                          value={selectedDatabase}
                          onValueChange={(value) => {
                            setSelectedDatabase(value)
                            setShowNewDatabaseFields(value === "create-new")
                          }}
                        >
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Search databases or create new..." />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="create-new">
                              <div className="flex items-center gap-2">
                                <Plus className="w-4 h-4 text-blue-600" />
                                <span>Create new database</span>
                              </div>
                            </SelectItem>
                            {createdDatabase && (
                              <SelectItem value={createdDatabase.id}>
                                <div className="flex items-center gap-2">
                                  <Database className="w-4 h-4 text-green-600" />
                                  <span>{createdDatabase.name}</span>
                                </div>
                              </SelectItem>
                            )}
                            <SelectItem value="db1">
                              <div className="flex items-center gap-2">
                                <Database className="w-4 h-4 text-gray-500" />
                                <span>my-production-db</span>
                              </div>
                            </SelectItem>
                            <SelectItem value="db2">
                              <div className="flex items-center gap-2">
                                <Database className="w-4 h-4 text-gray-500" />
                                <span>my-staging-db</span>
                              </div>
                            </SelectItem>
                            <SelectItem value="db3">
                              <div className="flex items-center gap-2">
                                <Database className="w-4 h-4 text-gray-500" />
                                <span>my-development-db</span>
                              </div>
                            </SelectItem>
                            <SelectItem value="db4">
                              <div className="flex items-center gap-2">
                                <Database className="w-4 h-4 text-gray-500" />
                                <span>analytics-cache-db</span>
                              </div>
                            </SelectItem>
                            <SelectItem value="db5">
                              <div className="flex items-center gap-2">
                                <Database className="w-4 h-4 text-gray-500" />
                                <span>user-session-db</span>
                              </div>
                            </SelectItem>
                          </SelectContent>
                        </Select>
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
          </div>
        </main>
      </div>
    </div>
  )
}
