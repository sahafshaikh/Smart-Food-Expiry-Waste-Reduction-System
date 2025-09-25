export interface FoodItem {
  id: number
  name: string
  category: string
  barcode?: string
  purchase_date: string
  expiry_date: string
  quantity: number
  unit: string
  location: string
  status: "safe" | "warning" | "expired"
  price?: number
  image_url?: string
  created_at: string
  updated_at: string
}

export interface WasteLogEntry {
  id: number
  food_item_id: number
  action: "consumed" | "wasted" | "donated"
  quantity: number
  date: string
  reason?: string
  created_at: string
}

export interface Achievement {
  id: number
  achievement_type: string
  achievement_name: string
  earned_date: string
  streak_count: number
  created_at: string
}

export interface SustainabilityMetrics {
  id: number
  month: number
  year: number
  food_saved_kg: number
  co2_reduced_kg: number
  money_saved: number
  waste_prevented_items: number
  created_at: string
}

// Mock data functions (replace with actual database calls)
export async function getFoodItems(): Promise<FoodItem[]> {
  // This would connect to your actual database
  return [
    {
      id: 1,
      name: "Organic Milk",
      category: "Dairy",
      purchase_date: "2024-01-15",
      expiry_date: "2024-01-22",
      quantity: 1,
      unit: "liter",
      location: "refrigerator",
      status: "warning",
      price: 85,
      created_at: "2024-01-15T10:00:00Z",
      updated_at: "2024-01-15T10:00:00Z",
    },
    {
      id: 2,
      name: "Whole Wheat Bread",
      category: "Bakery",
      purchase_date: "2024-01-14",
      expiry_date: "2024-01-18",
      quantity: 1,
      unit: "loaf",
      location: "pantry",
      status: "expired",
      price: 45,
      created_at: "2024-01-14T09:00:00Z",
      updated_at: "2024-01-14T09:00:00Z",
    },
    {
      id: 3,
      name: "Fresh Spinach",
      category: "Vegetables",
      purchase_date: "2024-01-16",
      expiry_date: "2024-01-25",
      quantity: 200,
      unit: "grams",
      location: "refrigerator",
      status: "safe",
      price: 25,
      created_at: "2024-01-16T08:00:00Z",
      updated_at: "2024-01-16T08:00:00Z",
    },
    {
      id: 4,
      name: "Greek Yogurt",
      category: "Dairy",
      purchase_date: "2024-01-13",
      expiry_date: "2024-01-20",
      quantity: 4,
      unit: "cups",
      location: "refrigerator",
      status: "warning",
      price: 120,
      created_at: "2024-01-13T11:00:00Z",
      updated_at: "2024-01-13T11:00:00Z",
    },
    {
      id: 5,
      name: "Bananas",
      category: "Fruits",
      purchase_date: "2024-01-15",
      expiry_date: "2024-01-23",
      quantity: 6,
      unit: "pieces",
      location: "counter",
      status: "safe",
      price: 60,
      created_at: "2024-01-15T12:00:00Z",
      updated_at: "2024-01-15T12:00:00Z",
    },
  ]
}

export async function getWasteLog(): Promise<WasteLogEntry[]> {
  return [
    {
      id: 1,
      food_item_id: 1,
      action: "consumed",
      quantity: 1,
      date: "2024-01-16",
      reason: "Used in smoothie",
      created_at: "2024-01-16T10:00:00Z",
    },
    {
      id: 2,
      food_item_id: 3,
      action: "consumed",
      quantity: 100,
      date: "2024-01-17",
      reason: "Made salad",
      created_at: "2024-01-17T12:00:00Z",
    },
  ]
}

export async function getSustainabilityMetrics(): Promise<SustainabilityMetrics> {
  return {
    id: 1,
    month: 1,
    year: 2024,
    food_saved_kg: 2.5,
    co2_reduced_kg: 1.2,
    money_saved: 1250,
    waste_prevented_items: 8,
    created_at: "2024-01-31T23:59:59Z",
  }
}

export function calculateDaysUntilExpiry(expiryDate: string): number {
  const today = new Date()
  const expiry = new Date(expiryDate)
  const diffTime = expiry.getTime() - today.getTime()
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24))
}

export function getExpiryStatus(expiryDate: string): "safe" | "warning" | "expired" {
  const daysUntilExpiry = calculateDaysUntilExpiry(expiryDate)

  if (daysUntilExpiry < 0) return "expired"
  if (daysUntilExpiry <= 3) return "warning"
  return "safe"
}

// Utility function to format currency in INR
export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    minimumFractionDigits: 2,
  }).format(amount)
}
