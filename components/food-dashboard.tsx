"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AlertTriangle, CheckCircle, Clock, Plus, Search, ShoppingCart, ChefHat, BarChart3, Trophy } from "lucide-react"
import { type FoodItem, getFoodItems, getExpiryStatus } from "@/lib/database"
import { ProductScanner } from "./product-scanner"
import { FoodItemCard } from "./food-item-card"
import { ExpiryNotifications } from "./expiry-notifications"
import { RecipeSuggestions } from "./recipe-suggestions"
import { AnalyticsDashboard } from "./analytics-dashboard"
import { GamificationSystem } from "./gamification-system"
import { ReceiptGenerator } from "./receipt-generator"
import { ThemeToggle } from "./theme-toggle"

export function FoodDashboard() {
  const [foodItems, setFoodItems] = useState<FoodItem[]>([])
  const [loading, setLoading] = useState(true)
  const [showScanner, setShowScanner] = useState(false)
  const [filter, setFilter] = useState<"all" | "safe" | "warning" | "expired">("all")
  const [searchTerm, setSearchTerm] = useState("")
  const [activeTab, setActiveTab] = useState("dashboard")

  useEffect(() => {
    loadFoodItems()
  }, [])

  const loadFoodItems = async () => {
    try {
      const items = await getFoodItems()
      // Update status based on current date
      const updatedItems = items.map((item) => ({
        ...item,
        status: getExpiryStatus(item.expiry_date),
      }))
      setFoodItems(updatedItems)
    } catch (error) {
      console.error("Failed to load food items:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleAddItem = (newItem: Omit<FoodItem, "id" | "created_at" | "updated_at" | "status">) => {
    const item: FoodItem = {
      ...newItem,
      id: Date.now(), // Mock ID
      status: getExpiryStatus(newItem.expiry_date),
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    }
    setFoodItems((prev) => [item, ...prev])
    setShowScanner(false)
  }

  const handleRemoveItem = (id: number) => {
    setFoodItems((prev) => prev.filter((item) => item.id !== id))
  }

  const filteredItems = foodItems.filter((item) => {
    const matchesFilter = filter === "all" || item.status === filter
    const matchesSearch =
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.category.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesFilter && matchesSearch
  })

  const expiringItems = foodItems.filter((item) => item.status === "warning" || item.status === "expired")

  const statusCounts = {
    safe: foodItems.filter((item) => item.status === "safe").length,
    warning: foodItems.filter((item) => item.status === "warning").length,
    expired: foodItems.filter((item) => item.status === "expired").length,
    total: foodItems.length,
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "safe":
        return "text-green-600 dark:text-green-400"
      case "warning":
        return "text-yellow-600 dark:text-yellow-400"
      case "expired":
        return "text-red-600 dark:text-red-400"
      default:
        return "text-muted-foreground"
    }
  }

  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case "safe":
        return "default"
      case "warning":
        return "secondary"
      case "expired":
        return "destructive"
      default:
        return "outline"
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    )
  }

  return (
    <div className="container mx-auto p-4 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-balance">Smart Food Tracker</h1>
          <p className="text-muted-foreground">Reduce waste, save money, and eat better</p>
        </div>
        <div className="flex gap-2">
          <ThemeToggle />
          <ExpiryNotifications items={foodItems} />
          <ReceiptGenerator items={foodItems} />
          <Button onClick={() => setShowScanner(true)}>
            <Plus className="h-4 w-4 mr-2" />
            Add Item
          </Button>
        </div>
      </div>

      {/* Tabs for dashboard, recipes, analytics, and achievements */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="dashboard" className="flex items-center gap-2">
            <ShoppingCart className="h-4 w-4" />
            Dashboard
          </TabsTrigger>
          <TabsTrigger value="recipes" className="flex items-center gap-2">
            <ChefHat className="h-4 w-4" />
            Recipes
          </TabsTrigger>
          <TabsTrigger value="analytics" className="flex items-center gap-2">
            <BarChart3 className="h-4 w-4" />
            Analytics
          </TabsTrigger>
          <TabsTrigger value="achievements" className="flex items-center gap-2">
            <Trophy className="h-4 w-4" />
            Achievements
          </TabsTrigger>
        </TabsList>

        <TabsContent value="dashboard" className="space-y-6">
          {/* Overview Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Total Items</p>
                    <p className="text-2xl font-bold">{statusCounts.total}</p>
                  </div>
                  <ShoppingCart className="h-8 w-8 text-muted-foreground" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Safe</p>
                    <p className="text-2xl font-bold text-green-600">{statusCounts.safe}</p>
                  </div>
                  <CheckCircle className="h-8 w-8 text-green-600" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Expiring Soon</p>
                    <p className="text-2xl font-bold text-yellow-600">{statusCounts.warning}</p>
                  </div>
                  <Clock className="h-8 w-8 text-yellow-600" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Expired</p>
                    <p className="text-2xl font-bold text-red-600">{statusCounts.expired}</p>
                  </div>
                  <AlertTriangle className="h-8 w-8 text-red-600" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Filters and Search */}
          <Card>
            <CardContent className="p-4">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <input
                      type="text"
                      placeholder="Search food items..."
                      className="w-full pl-10 pr-4 py-2 border border-input rounded-md bg-background"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button variant={filter === "all" ? "default" : "outline"} size="sm" onClick={() => setFilter("all")}>
                    All ({statusCounts.total})
                  </Button>
                  <Button
                    variant={filter === "safe" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setFilter("safe")}
                    className={filter === "safe" ? "" : "text-green-600 border-green-600 hover:bg-green-50"}
                  >
                    Safe ({statusCounts.safe})
                  </Button>
                  <Button
                    variant={filter === "warning" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setFilter("warning")}
                    className={filter === "warning" ? "" : "text-yellow-600 border-yellow-600 hover:bg-yellow-50"}
                  >
                    Warning ({statusCounts.warning})
                  </Button>
                  <Button
                    variant={filter === "expired" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setFilter("expired")}
                    className={filter === "expired" ? "" : "text-red-600 border-red-600 hover:bg-red-50"}
                  >
                    Expired ({statusCounts.expired})
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Food Items Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredItems.map((item) => (
              <FoodItemCard key={item.id} item={item} onRemove={handleRemoveItem} />
            ))}
          </div>

          {filteredItems.length === 0 && (
            <Card>
              <CardContent className="p-8 text-center">
                <ShoppingCart className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium mb-2">No items found</h3>
                <p className="text-muted-foreground mb-4">
                  {searchTerm || filter !== "all"
                    ? "Try adjusting your search or filters"
                    : "Start by adding your first food item"}
                </p>
                {!searchTerm && filter === "all" && (
                  <Button onClick={() => setShowScanner(true)}>
                    <Plus className="h-4 w-4 mr-2" />
                    Add Your First Item
                  </Button>
                )}
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="recipes">
          <RecipeSuggestions expiringItems={expiringItems} />
        </TabsContent>

        <TabsContent value="analytics">
          <AnalyticsDashboard />
        </TabsContent>

        {/* Achievements Tab Content */}
        <TabsContent value="achievements">
          <GamificationSystem />
        </TabsContent>
      </Tabs>

      {/* Scanner Modal */}
      {showScanner && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-background rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-4">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">Add New Food Item</h2>
                <Button variant="ghost" size="sm" onClick={() => setShowScanner(false)}>
                  ×
                </Button>
              </div>
              <ProductScanner onAddItem={handleAddItem} />
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
