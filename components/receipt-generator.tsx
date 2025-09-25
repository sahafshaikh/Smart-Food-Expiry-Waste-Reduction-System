"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Receipt, Download, Printer } from "lucide-react"
import type { FoodItem } from "@/lib/database"

interface ReceiptGeneratorProps {
  items: FoodItem[]
}

export function ReceiptGenerator({ items }: ReceiptGeneratorProps) {
  const [isOpen, setIsOpen] = useState(false)

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      minimumFractionDigits: 2,
    }).format(amount)
  }

  const calculateTotalValue = () => {
    return items.reduce((total, item) => total + (item.price || 0), 0)
  }

  const generateReceiptContent = () => {
    const currentDate = new Date().toLocaleDateString("en-IN", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })

    return `
SMART FOOD TRACKER
Food Inventory Receipt
Generated on: ${currentDate}

${"=".repeat(50)}

FOOD ITEMS SUMMARY:
${"-".repeat(50)}

${items
  .map(
    (item, index) => `
${index + 1}. ${item.name}
   Category: ${item.category}
   Quantity: ${item.quantity} ${item.unit}
   Price: ${formatCurrency(item.price || 0)}
   Expiry: ${new Date(item.expiry_date).toLocaleDateString("en-IN")}
   Status: ${item.status.toUpperCase()}
   Location: ${item.location || "Not specified"}
`,
  )
  .join("\n")}

${"-".repeat(50)}

SUMMARY:
Total Items: ${items.length}
Safe Items: ${items.filter((item) => item.status === "safe").length}
Warning Items: ${items.filter((item) => item.status === "warning").length}
Expired Items: ${items.filter((item) => item.status === "expired").length}

Total Inventory Value: ${formatCurrency(calculateTotalValue())}

${"-".repeat(50)}

STATUS LEGEND:
🟢 SAFE - Good to consume
🟡 WARNING - Expiring soon
🔴 EXPIRED - Past expiry date

${"-".repeat(50)}

Thank you for using Smart Food Tracker!
Reduce waste, save money, eat better.

${"=".repeat(50)}
    `.trim()
  }

  const downloadReceipt = () => {
    const content = generateReceiptContent()
    const blob = new Blob([content], { type: "text/plain" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `food-inventory-receipt-${new Date().toISOString().split("T")[0]}.txt`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  const printReceipt = () => {
    const content = generateReceiptContent()
    const printWindow = window.open("", "_blank")
    if (printWindow) {
      printWindow.document.write(`
        <html>
          <head>
            <title>Food Inventory Receipt</title>
            <style>
              body { 
                font-family: 'Courier New', monospace; 
                white-space: pre-wrap; 
                margin: 20px;
                font-size: 12px;
                line-height: 1.4;
              }
              @media print {
                body { margin: 0; }
              }
            </style>
          </head>
          <body>${content}</body>
        </html>
      `)
      printWindow.document.close()
      printWindow.print()
    }
  }

  if (items.length === 0) {
    return null
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          <Receipt className="h-4 w-4 mr-2" />
          Generate Receipt
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Food Inventory Receipt</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-center text-lg">SMART FOOD TRACKER</CardTitle>
              <p className="text-center text-sm text-muted-foreground">Food Inventory Receipt</p>
              <p className="text-center text-xs text-muted-foreground">
                Generated on:{" "}
                {new Date().toLocaleDateString("en-IN", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </p>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="border-t border-b py-4">
                <h3 className="font-semibold mb-3">FOOD ITEMS SUMMARY:</h3>
                <div className="space-y-3 max-h-60 overflow-y-auto">
                  {items.map((item, index) => (
                    <div key={item.id} className="flex justify-between items-start text-sm border-b pb-2">
                      <div className="flex-1">
                        <div className="font-medium">
                          {index + 1}. {item.name}
                        </div>
                        <div className="text-muted-foreground text-xs">
                          Category: {item.category} | Qty: {item.quantity} {item.unit}
                        </div>
                        <div className="text-muted-foreground text-xs">
                          Expiry: {new Date(item.expiry_date).toLocaleDateString("en-IN")}
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-medium">{formatCurrency(item.price || 0)}</div>
                        <div
                          className={`text-xs px-2 py-1 rounded ${
                            item.status === "safe"
                              ? "bg-green-100 text-green-800"
                              : item.status === "warning"
                                ? "bg-yellow-100 text-yellow-800"
                                : "bg-red-100 text-red-800"
                          }`}
                        >
                          {item.status.toUpperCase()}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="border-t pt-4">
                <h3 className="font-semibold mb-3">SUMMARY:</h3>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <div>
                      Total Items: <span className="font-medium">{items.length}</span>
                    </div>
                    <div className="text-green-600">
                      Safe Items:{" "}
                      <span className="font-medium">{items.filter((item) => item.status === "safe").length}</span>
                    </div>
                    <div className="text-yellow-600">
                      Warning Items:{" "}
                      <span className="font-medium">{items.filter((item) => item.status === "warning").length}</span>
                    </div>
                    <div className="text-red-600">
                      Expired Items:{" "}
                      <span className="font-medium">{items.filter((item) => item.status === "expired").length}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-bold">Total Value: {formatCurrency(calculateTotalValue())}</div>
                  </div>
                </div>
              </div>

              <div className="border-t pt-4 text-xs text-muted-foreground">
                <div className="mb-2">STATUS LEGEND:</div>
                <div>🟢 SAFE - Good to consume</div>
                <div>🟡 WARNING - Expiring soon</div>
                <div>🔴 EXPIRED - Past expiry date</div>
              </div>

              <div className="flex gap-2 pt-4">
                <Button onClick={downloadReceipt} className="flex-1">
                  <Download className="h-4 w-4 mr-2" />
                  Download Receipt
                </Button>
                <Button onClick={printReceipt} variant="outline" className="flex-1 bg-transparent">
                  <Printer className="h-4 w-4 mr-2" />
                  Print Receipt
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </DialogContent>
    </Dialog>
  )
}
