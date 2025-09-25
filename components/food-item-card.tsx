"use client"

import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Calendar, MapPin, Trash2, AlertTriangle, CheckCircle, Clock, Package, IndianRupee } from "lucide-react"
import { type FoodItem, calculateDaysUntilExpiry, formatCurrency } from "@/lib/database"

interface FoodItemCardProps {
  item: FoodItem
  onRemove: (id: number) => void
}

export function FoodItemCard({ item, onRemove }: FoodItemCardProps) {
  const daysUntilExpiry = calculateDaysUntilExpiry(item.expiry_date)
  const isExpired = daysUntilExpiry < 0
  const isExpiringSoon = daysUntilExpiry <= 3 && daysUntilExpiry >= 0

  const getStatusIcon = () => {
    if (isExpired) return <AlertTriangle className="h-4 w-4 text-red-600" />
    if (isExpiringSoon) return <Clock className="h-4 w-4 text-yellow-600" />
    return <CheckCircle className="h-4 w-4 text-green-600" />
  }

  const getStatusText = () => {
    if (isExpired) return `Expired ${Math.abs(daysUntilExpiry)} days ago`
    if (daysUntilExpiry === 0) return "Expires today"
    if (daysUntilExpiry === 1) return "Expires tomorrow"
    return `Expires in ${daysUntilExpiry} days`
  }

  const getStatusColor = () => {
    if (isExpired) return "border-red-200 bg-red-50 dark:border-red-800 dark:bg-red-950"
    if (isExpiringSoon) return "border-yellow-200 bg-yellow-50 dark:border-yellow-800 dark:bg-yellow-950"
    return "border-green-200 bg-green-50 dark:border-green-800 dark:bg-green-950"
  }

  const getProgressValue = () => {
    // Assume 7 days is the typical shelf life for progress calculation
    const totalDays = 7
    const remainingDays = Math.max(0, daysUntilExpiry)
    return (remainingDays / totalDays) * 100
  }

  const getProgressColor = () => {
    if (isExpired) return "bg-red-600"
    if (isExpiringSoon) return "bg-yellow-600"
    return "bg-green-600"
  }

  return (
    <Card className={`transition-all hover:shadow-md ${getStatusColor()}`}>
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <h3 className="font-semibold text-lg text-balance">{item.name}</h3>
            <div className="flex items-center gap-2 mt-1">
              <Badge variant="outline" className="text-xs">
                {item.category}
              </Badge>
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <MapPin className="h-3 w-3" />
                {item.location}
              </div>
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onRemove(item.id)}
            className="text-muted-foreground hover:text-destructive"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>

      <CardContent className="pt-0 space-y-3">
        {/* Quantity, Unit and Price */}
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center gap-2 text-muted-foreground">
            <Package className="h-4 w-4" />
            <span>
              {item.quantity} {item.unit}
            </span>
          </div>
          {item.price && (
            <div className="flex items-center gap-1 text-sm font-medium text-green-600">
              <IndianRupee className="h-3 w-3" />
              <span>{formatCurrency(item.price)}</span>
            </div>
          )}
        </div>

        {/* Expiry Status */}
        <div className="flex items-center gap-2">
          {getStatusIcon()}
          <span
            className={`text-sm font-medium ${
              isExpired ? "text-red-600" : isExpiringSoon ? "text-yellow-600" : "text-green-600"
            }`}
          >
            {getStatusText()}
          </span>
        </div>

        {/* Progress Bar */}
        <div className="space-y-1">
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>Freshness</span>
            <span>{Math.max(0, daysUntilExpiry)} days left</span>
          </div>
          <div className="w-full bg-muted rounded-full h-2">
            <div
              className={`h-2 rounded-full transition-all ${getProgressColor()}`}
              style={{ width: `${Math.min(100, Math.max(0, getProgressValue()))}%` }}
            />
          </div>
        </div>

        {/* Dates */}
        <div className="flex justify-between text-xs text-muted-foreground pt-2 border-t">
          <div className="flex items-center gap-1">
            <Calendar className="h-3 w-3" />
            <span>Bought: {new Date(item.purchase_date).toLocaleDateString()}</span>
          </div>
          <div className="flex items-center gap-1">
            <Calendar className="h-3 w-3" />
            <span>Expires: {new Date(item.expiry_date).toLocaleDateString()}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
