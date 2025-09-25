"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Camera, Scan, Mic, Plus, MapPin, IndianRupee } from "lucide-react"
import type { FoodItem } from "@/lib/database"

interface ProductScannerProps {
  onAddItem: (item: Omit<FoodItem, "id" | "created_at" | "updated_at" | "status">) => void
}

export function ProductScanner({ onAddItem }: ProductScannerProps) {
  const [scanMode, setScanMode] = useState<"barcode" | "manual" | "voice">("barcode")
  const [isScanning, setIsScanning] = useState(false)
  const [isListening, setIsListening] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    barcode: "",
    purchase_date: new Date().toISOString().split("T")[0],
    expiry_date: "",
    quantity: 1,
    unit: "piece",
    location: "pantry",
    price: 0,
  })

  const categories = [
    "Dairy",
    "Meat",
    "Vegetables",
    "Fruits",
    "Bakery",
    "Pantry",
    "Frozen",
    "Beverages",
    "Snacks",
    "Other",
  ]

  const units = ["piece", "kg", "grams", "liter", "ml", "cup", "can", "bottle", "pack", "box"]

  const locations = ["pantry", "refrigerator", "freezer", "counter", "cabinet"]

  const handleBarcodeScanning = async () => {
    setIsScanning(true)
    // Simulate barcode scanning
    setTimeout(() => {
      // Mock barcode scan result
      const mockProduct = {
        name: "Organic Whole Milk",
        category: "Dairy",
        barcode: "1234567890123",
        price: 85,
      }
      setFormData((prev) => ({ ...prev, ...mockProduct }))
      setIsScanning(false)
    }, 2000)
  }

  const handleVoiceInput = async () => {
    setIsListening(true)
    // Simulate voice recognition
    setTimeout(() => {
      const mockVoiceInput = "Add two bananas expiring on January 25th"
      // Parse voice input (simplified)
      setFormData((prev) => ({
        ...prev,
        name: "Bananas",
        category: "Fruits",
        quantity: 2,
        expiry_date: "2024-01-25",
        price: 60,
      }))
      setIsListening(false)
    }, 3000)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (formData.name && formData.expiry_date) {
      onAddItem(formData)
      // Reset form
      setFormData({
        name: "",
        category: "",
        barcode: "",
        purchase_date: new Date().toISOString().split("T")[0],
        expiry_date: "",
        quantity: 1,
        unit: "piece",
        location: "pantry",
        price: 0,
      })
    }
  }

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Plus className="h-5 w-5" />
          Add Food Item
        </CardTitle>
        <CardDescription>Scan barcodes, use voice input, or manually add items to track expiry dates</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Scanning Mode Selection */}
        <div className="flex gap-2">
          <Button
            variant={scanMode === "barcode" ? "default" : "outline"}
            size="sm"
            onClick={() => setScanMode("barcode")}
            className="flex items-center gap-2"
          >
            <Scan className="h-4 w-4" />
            Barcode
          </Button>
          <Button
            variant={scanMode === "voice" ? "default" : "outline"}
            size="sm"
            onClick={() => setScanMode("voice")}
            className="flex items-center gap-2"
          >
            <Mic className="h-4 w-4" />
            Voice
          </Button>
          <Button
            variant={scanMode === "manual" ? "default" : "outline"}
            size="sm"
            onClick={() => setScanMode("manual")}
            className="flex items-center gap-2"
          >
            <Camera className="h-4 w-4" />
            Manual
          </Button>
        </div>

        <Separator />

        {/* Barcode Scanning */}
        {scanMode === "barcode" && (
          <div className="space-y-4">
            <div className="text-center p-8 border-2 border-dashed border-muted-foreground/25 rounded-lg">
              {isScanning ? (
                <div className="space-y-2">
                  <div className="animate-pulse">
                    <Scan className="h-12 w-12 mx-auto text-primary" />
                  </div>
                  <p className="text-sm text-muted-foreground">Scanning barcode...</p>
                </div>
              ) : (
                <div className="space-y-2">
                  <Scan className="h-12 w-12 mx-auto text-muted-foreground" />
                  <p className="text-sm text-muted-foreground">Position barcode in camera view</p>
                  <Button onClick={handleBarcodeScanning} size="sm">
                    Start Scanning
                  </Button>
                </div>
              )}
            </div>
            {formData.barcode && (
              <Badge variant="secondary" className="w-fit">
                Barcode: {formData.barcode}
              </Badge>
            )}
          </div>
        )}

        {/* Voice Input */}
        {scanMode === "voice" && (
          <div className="space-y-4">
            <div className="text-center p-8 border-2 border-dashed border-muted-foreground/25 rounded-lg">
              {isListening ? (
                <div className="space-y-2">
                  <div className="animate-pulse">
                    <Mic className="h-12 w-12 mx-auto text-primary" />
                  </div>
                  <p className="text-sm text-muted-foreground">Listening...</p>
                  <p className="text-xs text-muted-foreground">
                    Say something like "Add 2 bananas expiring January 25th"
                  </p>
                </div>
              ) : (
                <div className="space-y-2">
                  <Mic className="h-12 w-12 mx-auto text-muted-foreground" />
                  <p className="text-sm text-muted-foreground">Tap to speak your food item</p>
                  <Button onClick={handleVoiceInput} size="sm">
                    Start Listening
                  </Button>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Manual Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Product Name *</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
                placeholder="e.g., Organic Milk"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <Select
                value={formData.category}
                onValueChange={(value) => setFormData((prev) => ({ ...prev, category: value }))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="purchase_date">Purchase Date</Label>
              <Input
                id="purchase_date"
                type="date"
                value={formData.purchase_date}
                onChange={(e) => setFormData((prev) => ({ ...prev, purchase_date: e.target.value }))}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="expiry_date">Expiry Date *</Label>
              <Input
                id="expiry_date"
                type="date"
                value={formData.expiry_date}
                onChange={(e) => setFormData((prev) => ({ ...prev, expiry_date: e.target.value }))}
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="price">Price (INR)</Label>
            <div className="relative">
              <IndianRupee className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                id="price"
                type="number"
                min="0"
                step="0.01"
                value={formData.price}
                onChange={(e) => setFormData((prev) => ({ ...prev, price: Number.parseFloat(e.target.value) || 0 }))}
                placeholder="0.00"
                className="pl-10"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="quantity">Quantity</Label>
              <Input
                id="quantity"
                type="number"
                min="1"
                value={formData.quantity}
                onChange={(e) => setFormData((prev) => ({ ...prev, quantity: Number.parseInt(e.target.value) || 1 }))}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="unit">Unit</Label>
              <Select
                value={formData.unit}
                onValueChange={(value) => setFormData((prev) => ({ ...prev, unit: value }))}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {units.map((unit) => (
                    <SelectItem key={unit} value={unit}>
                      {unit}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="location">Location</Label>
              <Select
                value={formData.location}
                onValueChange={(value) => setFormData((prev) => ({ ...prev, location: value }))}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {locations.map((location) => (
                    <SelectItem key={location} value={location}>
                      <div className="flex items-center gap-2">
                        <MapPin className="h-3 w-3" />
                        {location}
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <Button type="submit" className="w-full" disabled={!formData.name || !formData.expiry_date}>
            <Plus className="h-4 w-4 mr-2" />
            Add Food Item
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
