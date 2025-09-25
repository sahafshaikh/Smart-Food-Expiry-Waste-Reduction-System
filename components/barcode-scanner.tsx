"use client"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Camera, X, CheckCircle } from "lucide-react"

interface BarcodeScannerProps {
  onScanResult: (barcode: string, productInfo?: any) => void
  onClose: () => void
}

export function BarcodeScanner({ onScanResult, onClose }: BarcodeScannerProps) {
  const [isScanning, setIsScanning] = useState(false)
  const [scannedCode, setScannedCode] = useState<string | null>(null)
  const [productInfo, setProductInfo] = useState<any>(null)
  const videoRef = useRef<HTMLVideoElement>(null)

  // Mock barcode scanning functionality
  const startScanning = async () => {
    setIsScanning(true)

    // Simulate camera access and scanning
    setTimeout(() => {
      const mockBarcode = "1234567890123"
      const mockProductInfo = {
        name: "Organic Whole Milk",
        category: "Dairy",
        brand: "Fresh Farm",
        typical_expiry_days: 7,
      }

      setScannedCode(mockBarcode)
      setProductInfo(mockProductInfo)
      setIsScanning(false)
    }, 3000)
  }

  const handleConfirm = () => {
    if (scannedCode) {
      onScanResult(scannedCode, productInfo)
    }
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <div>
          <CardTitle className="text-lg">Barcode Scanner</CardTitle>
          <CardDescription>Position barcode within the frame</CardDescription>
        </div>
        <Button variant="ghost" size="sm" onClick={onClose}>
          <X className="h-4 w-4" />
        </Button>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Camera View */}
        <div className="relative aspect-video bg-muted rounded-lg overflow-hidden">
          {isScanning ? (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center space-y-2">
                <div className="animate-pulse">
                  <div className="w-48 h-2 bg-primary rounded-full mx-auto mb-4">
                    <div className="h-full bg-primary-foreground rounded-full animate-pulse"></div>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground">Scanning...</p>
              </div>
            </div>
          ) : scannedCode ? (
            <div className="absolute inset-0 flex items-center justify-center bg-green-50 dark:bg-green-950">
              <div className="text-center space-y-2">
                <CheckCircle className="h-12 w-12 text-green-600 mx-auto" />
                <p className="text-sm font-medium">Barcode Detected!</p>
                <Badge variant="secondary">{scannedCode}</Badge>
              </div>
            </div>
          ) : (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center space-y-2">
                <Camera className="h-12 w-12 text-muted-foreground mx-auto" />
                <p className="text-sm text-muted-foreground">Camera preview</p>
              </div>
            </div>
          )}

          {/* Scanning Frame */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-48 h-24 border-2 border-primary rounded-lg border-dashed opacity-50"></div>
          </div>
        </div>

        {/* Product Information */}
        {productInfo && (
          <div className="space-y-2 p-3 bg-muted rounded-lg">
            <h4 className="font-medium">{productInfo.name}</h4>
            <div className="flex gap-2">
              <Badge variant="outline">{productInfo.category}</Badge>
              <Badge variant="outline">{productInfo.brand}</Badge>
            </div>
            <p className="text-xs text-muted-foreground">Typical shelf life: {productInfo.typical_expiry_days} days</p>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex gap-2">
          {!isScanning && !scannedCode && (
            <Button onClick={startScanning} className="flex-1">
              <Camera className="h-4 w-4 mr-2" />
              Start Scanning
            </Button>
          )}

          {scannedCode && (
            <>
              <Button onClick={handleConfirm} className="flex-1">
                <CheckCircle className="h-4 w-4 mr-2" />
                Use This Product
              </Button>
              <Button
                variant="outline"
                onClick={() => {
                  setScannedCode(null)
                  setProductInfo(null)
                }}
              >
                Scan Again
              </Button>
            </>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
