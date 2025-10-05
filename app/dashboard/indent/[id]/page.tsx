"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Trash2, CheckCircle } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { useRouter } from "next/navigation"

interface IndentItem {
  id: string
  productId: string
  productName: string
  packSize: string
  price: number
  quantity: number
  total: number
}

const mockIndentItems: IndentItem[] = [
  {
    id: "1",
    productId: "PROD-001",
    productName: "Paracetamol 500mg",
    packSize: "10 tablets",
    price: 50,
    quantity: 200,
    total: 10000,
  },
  {
    id: "2",
    productId: "PROD-002",
    productName: "Amoxicillin 250mg",
    packSize: "15 capsules",
    price: 100,
    quantity: 150,
    total: 15000,
  },
  {
    id: "3",
    productId: "PROD-003",
    productName: "Cetirizine 10mg",
    packSize: "10 tablets",
    price: 40,
    quantity: 500,
    total: 20000,
  },
]

export default function IndentDetailPage({ params }: { params: { id: string } }) {
  const { toast } = useToast()
  const router = useRouter()
  const [items, setItems] = useState<IndentItem[]>(mockIndentItems)

  const indentInfo = {
    indentId: "IND-2024-001",
    dateCreated: "2024-01-20",
    storeId: "Store 1 - Mumbai Main",
    status: "Pending",
  }

  const totalValue = items.reduce((sum, item) => sum + item.total, 0)

  const handleQuantityChange = (itemId: string, newQuantity: number) => {
    setItems(
      items.map((item) =>
        item.id === itemId
          ? {
              ...item,
              quantity: newQuantity,
              total: item.price * newQuantity,
            }
          : item,
      ),
    )
  }

  const handleRemoveItem = (itemId: string) => {
    setItems(items.filter((item) => item.id !== itemId))
    toast({
      title: "Item removed",
      description: "The item has been removed from the indent",
    })
  }

  const handleConfirmIndent = () => {
    toast({
      title: "Indent confirmed",
      description: "Your provisional indent has been converted to a final order",
    })
    router.push("/dashboard/indent")
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="sm" onClick={() => router.back()}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back
        </Button>
        <div>
          <h1 className="text-3xl font-bold text-cyan-900">Indent Details</h1>
          <p className="text-gray-600 mt-2">Review and modify your provisional indent</p>
        </div>
      </div>

      {/* Indent Info */}
      <Card>
        <CardHeader>
          <CardTitle className="text-cyan-900">Indent Information</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-4">
            <div className="space-y-1">
              <p className="text-sm text-gray-500">Indent ID</p>
              <p className="text-base font-semibold text-gray-900">{indentInfo.indentId}</p>
            </div>
            <div className="space-y-1">
              <p className="text-sm text-gray-500">Date Created</p>
              <p className="text-base font-semibold text-gray-900">
                {new Date(indentInfo.dateCreated).toLocaleDateString()}
              </p>
            </div>
            <div className="space-y-1">
              <p className="text-sm text-gray-500">Store ID</p>
              <p className="text-base font-semibold text-gray-900">{indentInfo.storeId}</p>
            </div>
            <div className="space-y-1">
              <p className="text-sm text-gray-500">Status</p>
              <Badge className="bg-yellow-100 text-yellow-800" variant="secondary">
                {indentInfo.status}
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Items Table */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-cyan-900">Indent Items</CardTitle>
              <CardDescription>Edit quantities or remove items as needed</CardDescription>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-500">Total Value</p>
              <p className="text-2xl font-bold text-cyan-800">₹{totalValue.toLocaleString()}</p>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Product ID</TableHead>
                  <TableHead>Product Name</TableHead>
                  <TableHead>Pack Size</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>Quantity</TableHead>
                  <TableHead>Total</TableHead>
                  <TableHead className="text-right">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {items.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell className="font-medium">{item.productId}</TableCell>
                    <TableCell>{item.productName}</TableCell>
                    <TableCell>{item.packSize}</TableCell>
                    <TableCell>₹{item.price}</TableCell>
                    <TableCell>
                      <Input
                        type="number"
                        value={item.quantity}
                        onChange={(e) => handleQuantityChange(item.id, Number.parseInt(e.target.value) || 0)}
                        className="w-24"
                        min="0"
                      />
                    </TableCell>
                    <TableCell>₹{item.total.toLocaleString()}</TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="sm" onClick={() => handleRemoveItem(item.id)} title="Remove Item">
                        <Trash2 className="h-4 w-4 text-red-600" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          <div className="flex justify-end gap-4 mt-6 pt-6 border-t">
            <Button variant="outline" onClick={() => router.back()}>
              Cancel
            </Button>
            <Button onClick={handleConfirmIndent} className="bg-cyan-800 hover:bg-cyan-900">
              <CheckCircle className="h-4 w-4 mr-2" />
              Confirm Indent
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
