"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { SearchableSelect } from "@/components/ui/searchable-select"
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
    }, 2000)
  }

  const handleSaveConfiguration = async () => {
    setIsCreatingDatabase(true)

    setTimeout(() => {
      // For now, just reset the loading state
      // In real implementation, this would save the configuration
      setIsCreatingDatabase(false)
      alert("Configuration saved! You can now proceed with payment and database creation.")
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
            {createdDatabase && (
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <div className="flex items-center gap-2 text-green-800">
                  <Database className="w-5 h-5" />
                  <span className="font-medium">Database created successfully!</span>
                </div>
                <p className="text-green-700 text-sm mt-1">
                  Your database "{createdDatabase.name}" is now ready to use.{" "}
                  <a
                    href={createdDatabase.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline hover:no-underline"
                  >
                    View database →
                  </a>
                </p>
              </div>
            )}

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

                  {showNewDatabaseFields && (
                    <div className="mt-6 p-6 bg-blue-50 rounded-lg border border-blue-200">
                      <div className="flex items-center justify-between mb-6">
                        <h3 className="text-lg font-semibold">Configure your new database for LangCache</h3>
                      </div>

                      <div className="mb-6">
                        <div className="flex gap-2 mb-6">
                          <Button
                            size="sm"
                            className={
                              subscriptionType === "new" ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-700"
                            }
                            onClick={() => setSubscriptionType("new")}
                          >
                            New subscription
                          </Button>
                          <Button
                            size="sm"
                            className={
                              subscriptionType === "existing" ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-700"
                            }
                            onClick={() => setSubscriptionType("existing")}
                          >
                            Existing Subscription
                          </Button>
                        </div>

                        {subscriptionType === "new" ? (
                          <div className="space-y-3">
                            <div>
                              <div className="flex items-center justify-between">
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
                              <Select value={selectedPlan} onValueChange={setSelectedPlan}>
                                <SelectTrigger className="mt-1">
                                  <SelectValue placeholder="Select a plan" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="free">
                                    <div className="flex flex-col">
                                      <span className="font-medium">Free - $0/month</span>
                                      <span className="text-xs text-gray-500">
                                        Shared cloud deployment • Up to 30 MB
                                      </span>
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
                                  <SelectTrigger className="mt-1">
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
                                      <SelectValue placeholder="Select size" />
                                    </SelectTrigger>
                                    <SelectContent>
                                      <SelectItem value="250mb">250 MB</SelectItem>
                                      <SelectItem value="1gb">1 GB</SelectItem>
                                      <SelectItem value="2.5gb">2.5 GB</SelectItem>
                                      <SelectItem value="5gb">5 GB</SelectItem>
                                      <SelectItem value="12gb">12 GB</SelectItem>
                                    </SelectContent>
                                  </Select>
                                </div>
                              )}
                            </div>
                          </div>
                        ) : (
                          <div className="space-y-4">
                            <div>
                              <Label className="text-sm font-medium">* Subscription</Label>
                              <Select>
                                <SelectTrigger>
                                  <div className="flex items-center gap-2">
                                    <div className="w-4 h-4 bg-orange-500 rounded text-white text-xs flex items-center justify-center font-bold">
                                      G
                                    </div>
                                    <span>GCP-PERF-ENTERPRISE-DB-DONOTDELETE us-central1</span>
                                  </div>
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="gcp-enterprise">
                                    GCP-PERF-ENTERPRISE-DB-DONOTDELETE us-central1
                                  </SelectItem>
                                  <SelectItem value="aws-prod">AWS-PROD-SUBSCRIPTION us-east-1</SelectItem>
                                  <SelectItem value="azure-dev">AZURE-DEV-SUBSCRIPTION eu-west-1</SelectItem>
                                </SelectContent>
                              </Select>
                              <p className="text-xs text-blue-600 mt-1">
                                New database can be added to Pro subscriptions only.
                              </p>
                            </div>

                            <div>
                              <Label className="text-sm font-medium">* Database Name</Label>
                              <Input placeholder="database-MPXVNTHO" className="mt-1" />
                            </div>
                          </div>
                        )}
                      </div>

                      {(selectedPlan === "free" || (selectedPlan !== "free" && selectedDatabaseSize)) && (
                        <div className="bg-white border border-gray-200 rounded-lg p-4 space-y-3 mb-6">
                          <h4 className="text-sm font-medium text-gray-900">Pricing Breakdown</h4>
                          <div className="space-y-2 text-sm">
                            <div className="flex justify-between">
                              <span>
                                Database (
                                {selectedPlan === "free" ? "30 MB" : selectedDatabaseSize?.toUpperCase() || ""})
                              </span>
                              <span className={selectedPlan === "free" ? "text-green-600" : ""}>
                                $
                                {selectedPlan === "free"
                                  ? "0.000"
                                  : selectedDatabaseSize
                                    ? calculatePricing(selectedDatabaseSize).hourly.toFixed(3)
                                    : "0.000"}
                                /hr
                              </span>
                            </div>
                            <div className="flex justify-between">
                              <span>LangCache Service</span>
                              <span className="text-green-600">$0.000/hr (Public Preview)</span>
                            </div>
                            <Separator />
                            <div className="flex justify-between font-medium">
                              <span>Total Price</span>
                              <div className="text-right">
                                <div className={selectedPlan === "free" ? "text-green-600" : ""}>
                                  $
                                  {selectedPlan === "free"
                                    ? "0.000"
                                    : selectedDatabaseSize
                                      ? calculatePricing(selectedDatabaseSize).hourly.toFixed(3)
                                      : "0.000"}
                                  /hr
                                </div>
                                <div className="text-xs text-gray-500">
                                  ($
                                  {selectedPlan === "free"
                                    ? "0"
                                    : selectedDatabaseSize
                                      ? calculatePricing(selectedDatabaseSize).monthly
                                      : "0"}
                                  /mo)
                                </div>
                              </div>
                            </div>
                            {selectedPlan !== "free" && (
                              <>
                                <Separator />
                                <div className="space-y-2">
                                  <div className="text-xs text-gray-500">
                                    *Price excludes taxes and monthly network charges, which are billed separately.
                                  </div>
                                  <div className="text-center">
                                    <a href="#" className="text-blue-600 text-xs hover:underline">
                                      Have a coupon code? Click here
                                    </a>
                                  </div>
                                </div>
                              </>
                            )}
                          </div>
                        </div>
                      )}

                      <div className="flex justify-end gap-3 pt-4 border-t border-blue-200">
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
                          ) : selectedPlan === "free" ? (
                            "Create Free Database"
                          ) : (
                            "Continue to Payment"
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

            {/* Pricing Section */}
            <div className="bg-gray-50 rounded-lg p-3 space-y-2 mt-4">
              <div className="flex justify-between text-sm">
                <span>Database ({selectedPlan === "free" ? "30 MB" : selectedDatabaseSize?.toUpperCase() || ""})</span>
                <span className={selectedPlan === "free" ? "text-green-600" : ""}>
                  $
                  {selectedPlan === "free"
                    ? "0.000"
                    : selectedDatabaseSize
                      ? calculatePricing(selectedDatabaseSize).hourly.toFixed(3)
                      : "0.000"}
                  /hr
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span>LangCache Service</span>
                <span className="text-green-600">$0.000/hr (Public Preview)</span>
              </div>
              <Separator />
              <div className="flex justify-between text-sm font-medium">
                <span>Total Price</span>
                <span className={selectedPlan === "free" ? "text-green-600" : ""}>
                  $
                  {selectedPlan === "free"
                    ? "0.000"
                    : selectedDatabaseSize
                      ? calculatePricing(selectedDatabaseSize).hourly.toFixed(3)
                      : "0.000"}
                  /hr
                </span>
              </div>
              <div className="text-right text-xs text-gray-500">
                ($
                {selectedPlan === "free"
                  ? "0"
                  : selectedDatabaseSize
                    ? calculatePricing(selectedDatabaseSize).monthly
                    : "0"}
                /mo)
              </div>
              {selectedPlan === "free" && (
                <div className="text-center">
                  <span className="text-xs text-gray-500">No payment required</span>
                </div>
              )}
              {selectedPlan !== "free" && (
                <div className="text-center">
                  <a href="#" className="text-blue-600 text-xs hover:underline">
                    Have a coupon code? Click here
                  </a>
                </div>
              )}
            </div>

            <div className="flex justify-between pt-4">
              <Button variant="outline">Cancel</Button>
              <Button className="bg-gray-900 hover:bg-gray-800 text-white">Create</Button>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
