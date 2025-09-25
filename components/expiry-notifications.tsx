"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Bell, AlertTriangle, Clock, X, CheckCircle } from "lucide-react"
import { type FoodItem, calculateDaysUntilExpiry } from "@/lib/database"

interface ExpiryNotificationsProps {
  items: FoodItem[]
}

interface Notification {
  id: string
  type: "expiring" | "expired"
  item: FoodItem
  daysUntilExpiry: number
  message: string
}

export function ExpiryNotifications({ items }: ExpiryNotificationsProps) {
  const [notifications, setNotifications] = useState<Notification[]>([])
  const [dismissed, setDismissed] = useState<Set<string>>(new Set())

  useEffect(() => {
    const newNotifications: Notification[] = []

    items.forEach((item) => {
      const daysUntilExpiry = calculateDaysUntilExpiry(item.expiry_date)
      const notificationId = `${item.id}-${item.expiry_date}`

      if (dismissed.has(notificationId)) return

      if (daysUntilExpiry < 0) {
        newNotifications.push({
          id: notificationId,
          type: "expired",
          item,
          daysUntilExpiry,
          message: `${item.name} expired ${Math.abs(daysUntilExpiry)} days ago`,
        })
      } else if (daysUntilExpiry <= 3) {
        const message =
          daysUntilExpiry === 0
            ? `${item.name} expires today!`
            : daysUntilExpiry === 1
              ? `${item.name} expires tomorrow`
              : `${item.name} expires in ${daysUntilExpiry} days`

        newNotifications.push({
          id: notificationId,
          type: "expiring",
          item,
          daysUntilExpiry,
          message,
        })
      }
    })

    setNotifications(newNotifications)
  }, [items, dismissed])

  const dismissNotification = (id: string) => {
    setDismissed((prev) => new Set([...prev, id]))
  }

  const activeNotifications = notifications.filter((n) => !dismissed.has(n.id))
  const hasNotifications = activeNotifications.length > 0

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" size="sm" className="relative bg-transparent">
          <Bell className="h-4 w-4" />
          {hasNotifications && (
            <Badge
              variant="destructive"
              className="absolute -top-2 -right-2 h-5 w-5 p-0 flex items-center justify-center text-xs"
            >
              {activeNotifications.length}
            </Badge>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80" align="end">
        <Card className="border-0 shadow-none">
          <CardHeader className="pb-3">
            <CardTitle className="text-base flex items-center gap-2">
              <Bell className="h-4 w-4" />
              Expiry Notifications
            </CardTitle>
            <CardDescription>
              {hasNotifications
                ? `${activeNotifications.length} item${activeNotifications.length === 1 ? "" : "s"} need attention`
                : "All items are fresh!"}
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-0">
            {hasNotifications ? (
              <div className="space-y-3 max-h-64 overflow-y-auto">
                {activeNotifications.map((notification) => (
                  <div
                    key={notification.id}
                    className={`p-3 rounded-lg border ${
                      notification.type === "expired"
                        ? "border-red-200 bg-red-50 dark:border-red-800 dark:bg-red-950"
                        : "border-yellow-200 bg-yellow-50 dark:border-yellow-800 dark:bg-yellow-950"
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex items-start gap-2 flex-1">
                        {notification.type === "expired" ? (
                          <AlertTriangle className="h-4 w-4 text-red-600 mt-0.5 flex-shrink-0" />
                        ) : (
                          <Clock className="h-4 w-4 text-yellow-600 mt-0.5 flex-shrink-0" />
                        )}
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-balance">{notification.message}</p>
                          <div className="flex items-center gap-2 mt-1">
                            <Badge variant="outline" className="text-xs">
                              {notification.item.category}
                            </Badge>
                            <span className="text-xs text-muted-foreground">{notification.item.location}</span>
                          </div>
                        </div>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => dismissNotification(notification.id)}
                        className="h-6 w-6 p-0 text-muted-foreground hover:text-foreground"
                      >
                        <X className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-4">
                <CheckCircle className="h-8 w-8 text-green-600 mx-auto mb-2" />
                <p className="text-sm text-muted-foreground">No urgent notifications</p>
              </div>
            )}
          </CardContent>
        </Card>
      </PopoverContent>
    </Popover>
  )
}
