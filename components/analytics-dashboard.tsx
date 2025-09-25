"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts"
import {
  TrendingUp,
  TrendingDown,
  Leaf,
  IndianRupee,
  Calendar,
  Download,
  Share,
  BarChart3,
  LineChartIcon,
  Recycle,
} from "lucide-react"
import { formatCurrency } from "@/lib/database"

interface WasteAnalytics {
  totalItems: number
  itemsConsumed: number
  itemsWasted: number
  itemsDonated: number
  wastePercentage: number
  co2Saved: number
  moneySaved: number
  foodSavedKg: number
}

interface MonthlyData {
  month: string
  consumed: number
  wasted: number
  donated: number
  saved: number
}

interface CategoryData {
  category: string
  wasted: number
  consumed: number
  total: number
  wasteRate: number
}

export function AnalyticsDashboard() {
  const [analytics, setAnalytics] = useState<WasteAnalytics | null>(null)
  const [monthlyData, setMonthlyData] = useState<MonthlyData[]>([])
  const [categoryData, setCategoryData] = useState<CategoryData[]>([])
  const [loading, setLoading] = useState(true)
  const [timeRange, setTimeRange] = useState("6months")
  const [chartType, setChartType] = useState<"bar" | "line" | "pie">("bar")

  useEffect(() => {
    loadAnalytics()
  }, [timeRange])

  const loadAnalytics = async () => {
    setLoading(true)

    try {
      // Mock analytics data - replace with actual API calls
      const mockAnalytics: WasteAnalytics = {
        totalItems: 45,
        itemsConsumed: 32,
        itemsWasted: 8,
        itemsDonated: 5,
        wastePercentage: 17.8,
        co2Saved: 12.5,
        moneySaved: 6850,
        foodSavedKg: 3.2,
      }

      const mockMonthlyData: MonthlyData[] = [
        { month: "Jul", consumed: 28, wasted: 5, donated: 2, saved: 2400 },
        { month: "Aug", consumed: 35, wasted: 8, donated: 3, saved: 3050 },
        { month: "Sep", consumed: 42, wasted: 6, donated: 4, saved: 3680 },
        { month: "Oct", consumed: 38, wasted: 7, donated: 5, saved: 3450 },
        { month: "Nov", consumed: 45, wasted: 4, donated: 6, saved: 4080 },
        { month: "Dec", consumed: 32, wasted: 8, donated: 5, saved: 2970 },
      ]

      const mockCategoryData: CategoryData[] = [
        { category: "Dairy", wasted: 3, consumed: 12, total: 15, wasteRate: 20 },
        { category: "Vegetables", wasted: 2, consumed: 18, total: 20, wasteRate: 10 },
        { category: "Fruits", wasted: 4, consumed: 14, total: 18, wasteRate: 22.2 },
        { category: "Meat", wasted: 1, consumed: 8, total: 9, wasteRate: 11.1 },
        { category: "Bakery", wasted: 2, consumed: 6, total: 8, wasteRate: 25 },
      ]

      setAnalytics(mockAnalytics)
      setMonthlyData(mockMonthlyData)
      setCategoryData(mockCategoryData)
    } catch (error) {
      console.error("Failed to load analytics:", error)
    } finally {
      setLoading(false)
    }
  }

  const generateReport = () => {
    // Mock report generation
    console.log("Generating sustainability report...")
  }

  const shareReport = () => {
    // Mock sharing functionality
    console.log("Sharing report...")
  }

  if (loading) {
    return (
      <div className="space-y-6">
        {[1, 2, 3].map((i) => (
          <Card key={i} className="animate-pulse">
            <CardContent className="p-6">
              <div className="h-4 bg-muted rounded w-1/4 mb-4"></div>
              <div className="h-32 bg-muted rounded"></div>
            </CardContent>
          </Card>
        ))}
      </div>
    )
  }

  if (!analytics) return null

  const pieChartData = [
    { name: "Consumed", value: analytics.itemsConsumed, color: "#22c55e" },
    { name: "Wasted", value: analytics.itemsWasted, color: "#ef4444" },
    { name: "Donated", value: analytics.itemsDonated, color: "#3b82f6" },
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <BarChart3 className="h-6 w-6" />
            Waste Analytics
          </h2>
          <p className="text-muted-foreground">Track your sustainability impact and food waste patterns</p>
        </div>
        <div className="flex gap-2">
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1month">1 Month</SelectItem>
              <SelectItem value="3months">3 Months</SelectItem>
              <SelectItem value="6months">6 Months</SelectItem>
              <SelectItem value="1year">1 Year</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" onClick={generateReport}>
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
          <Button variant="outline" onClick={shareReport}>
            <Share className="h-4 w-4 mr-2" />
            Share
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Waste Rate</p>
                <p className="text-2xl font-bold text-red-600">{analytics.wastePercentage}%</p>
                <div className="flex items-center gap-1 mt-1">
                  <TrendingDown className="h-3 w-3 text-green-600" />
                  <span className="text-xs text-green-600">-2.3% from last month</span>
                </div>
              </div>
              <Recycle className="h-8 w-8 text-red-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">CO₂ Saved</p>
                <p className="text-2xl font-bold text-green-600">{analytics.co2Saved} kg</p>
                <div className="flex items-center gap-1 mt-1">
                  <TrendingUp className="h-3 w-3 text-green-600" />
                  <span className="text-xs text-green-600">+1.2kg this month</span>
                </div>
              </div>
              <Leaf className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Money Saved</p>
                <p className="text-2xl font-bold text-blue-600">{formatCurrency(analytics.moneySaved)}</p>
                <div className="flex items-center gap-1 mt-1">
                  <TrendingUp className="h-3 w-3 text-green-600" />
                  <span className="text-xs text-green-600">+{formatCurrency(985)} this month</span>
                </div>
              </div>
              <IndianRupee className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Food Saved</p>
                <p className="text-2xl font-bold text-purple-600">{analytics.foodSavedKg} kg</p>
                <div className="flex items-center gap-1 mt-1">
                  <TrendingUp className="h-3 w-3 text-green-600" />
                  <span className="text-xs text-green-600">+0.8kg this month</span>
                </div>
              </div>
              <Calendar className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Monthly Trends */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Monthly Trends</CardTitle>
                <CardDescription>Food consumption and waste patterns over time</CardDescription>
              </div>
              <div className="flex gap-1">
                <Button
                  variant={chartType === "bar" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setChartType("bar")}
                >
                  <BarChart3 className="h-4 w-4" />
                </Button>
                <Button
                  variant={chartType === "line" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setChartType("line")}
                >
                  <LineChartIcon className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                {chartType === "bar" ? (
                  <BarChart data={monthlyData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="consumed" fill="#22c55e" name="Consumed" />
                    <Bar dataKey="wasted" fill="#ef4444" name="Wasted" />
                    <Bar dataKey="donated" fill="#3b82f6" name="Donated" />
                  </BarChart>
                ) : (
                  <LineChart data={monthlyData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="consumed" stroke="#22c55e" name="Consumed" strokeWidth={2} />
                    <Line type="monotone" dataKey="wasted" stroke="#ef4444" name="Wasted" strokeWidth={2} />
                    <Line type="monotone" dataKey="donated" stroke="#3b82f6" name="Donated" strokeWidth={2} />
                  </LineChart>
                )}
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Food Distribution */}
        <Card>
          <CardHeader>
            <CardTitle>Food Distribution</CardTitle>
            <CardDescription>How your food items are being used</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieChartData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {pieChartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="flex justify-center gap-4 mt-4">
              {pieChartData.map((item) => (
                <div key={item.name} className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                  <span className="text-sm">
                    {item.name}: {item.value}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Category Analysis */}
      <Card>
        <CardHeader>
          <CardTitle>Category Analysis</CardTitle>
          <CardDescription>Waste patterns by food category</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {categoryData.map((category) => (
              <div key={category.category} className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="font-medium">{category.category}</span>
                    <Badge
                      variant={
                        category.wasteRate > 20 ? "destructive" : category.wasteRate > 15 ? "secondary" : "default"
                      }
                    >
                      {category.wasteRate.toFixed(1)}% waste
                    </Badge>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {category.consumed} consumed, {category.wasted} wasted
                  </div>
                </div>
                <div className="flex gap-1 h-2 rounded-full overflow-hidden bg-muted">
                  <div className="bg-green-500" style={{ width: `${(category.consumed / category.total) * 100}%` }} />
                  <div className="bg-red-500" style={{ width: `${(category.wasted / category.total) * 100}%` }} />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Sustainability Impact */}
      <Card>
        <CardHeader>
          <CardTitle>Environmental Impact</CardTitle>
          <CardDescription>Your contribution to sustainability</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center space-y-2">
              <div className="text-3xl font-bold text-green-600">{analytics.co2Saved} kg</div>
              <p className="text-sm text-muted-foreground">CO₂ emissions prevented</p>
              <p className="text-xs text-muted-foreground">
                Equivalent to driving {(analytics.co2Saved * 2.3).toFixed(1)} km less
              </p>
            </div>
            <div className="text-center space-y-2">
              <div className="text-3xl font-bold text-blue-600">{analytics.foodSavedKg} kg</div>
              <p className="text-sm text-muted-foreground">Food waste prevented</p>
              <p className="text-xs text-muted-foreground">
                Enough to feed {Math.floor(analytics.foodSavedKg / 0.4)} meals
              </p>
            </div>
            <div className="text-center space-y-2">
              <div className="text-3xl font-bold text-purple-600">{formatCurrency(analytics.moneySaved)}</div>
              <p className="text-sm text-muted-foreground">Money saved</p>
              <p className="text-xs text-muted-foreground">
                Average {formatCurrency(analytics.moneySaved / 6)} per month
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
