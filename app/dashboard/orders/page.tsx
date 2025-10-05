"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Eye, RotateCcw, MapPin, Search } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface Order {
  id: string
  orderId: string
  webOrderId: string
  date: string
  total: number
  status: string
  type: "Auto" | "Manual"
}

const mockOrders: Order[] = [
  {
    id: "1",
    orderId: "ORD-2024-001",
    webOrderId: "WEB-001",
    date: "2024-01-15",
    total: 45000,
    status: "Delivered",
    type: "Auto",
  },
  {
    id: "2",
    orderId: "ORD-2024-002",
    webOrderId: "WEB-002",
    date: "2024-01-18",
    total: 32000,
    status: "In Transit",
    type: "Manual",
  },
  {
    id: "3",
    orderId: "ORD-2024-003",
    webOrderId: "WEB-003",
    date: "2024-01-20",
    total: 58000,
    status: "Processing",
    type: "Auto",
  },
]

export default function OrderHistoryPage() {
  const { toast } = useToast()
  const [startDate, setStartDate] = useState("")
  const [endDate, setEndDate] = useState("")
  const [orders, setOrders] = useState<Order[]>(mockOrders)
  const [trackingDialogOpen, setTrackingDialogOpen] = useState(false)
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null)

  const handleSearch = () => {
    if (!startDate || !endDate) {
      toast({
        title: "Date range required",
        description: "Please select both start and end dates",
        variant: "destructive",
      })
      return
    }

    const start = new Date(startDate)
    const end = new Date(endDate)
    const diffDays = Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24))

    if (diffDays > 15) {
      toast({
        title: "Invalid date range",
        description: "Date range cannot exceed 15 days",
        variant: "destructive",
      })
      return
    }

    toast({
      title: "Search completed",
      description: `Found ${orders.length} orders`,
    })
  }

  const handleReorder = (order: Order) => {
    toast({
      title: "Items added to cart",
      description: `All items from ${order.orderId} have been added to your cart`,
    })
  }

  const handleTrackOrder = (order: Order) => {
    setSelectedOrder(order)
    setTrackingDialogOpen(true)
  }

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "delivered":
        return "bg-green-100 text-green-800"
      case "in transit":
        return "bg-blue-100 text-blue-800"
      case "processing":
        return "bg-yellow-100 text-yellow-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-cyan-900">Order History</h1>
        <p className="text-gray-600 mt-2">View and track all your orders</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-cyan-900">Search Orders</CardTitle>
          <CardDescription>Filter orders by date range (maximum 15 days)</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 space-y-2">
              <Label htmlFor="startDate">Start Date</Label>
              <Input id="startDate" type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
            </div>
            <div className="flex-1 space-y-2">
              <Label htmlFor="endDate">End Date</Label>
              <Input id="endDate" type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
            </div>
            <div className="flex items-end">
              <Button onClick={handleSearch} className="bg-cyan-800 hover:bg-cyan-900 w-full sm:w-auto">
                <Search className="h-4 w-4 mr-2" />
                Search
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-cyan-900">Orders</CardTitle>
          <CardDescription>Your order history and details</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Order ID</TableHead>
                  <TableHead>Web Order ID</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Total</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {orders.map((order) => (
                  <TableRow key={order.id}>
                    <TableCell className="font-medium">{order.orderId}</TableCell>
                    <TableCell>{order.webOrderId}</TableCell>
                    <TableCell>{new Date(order.date).toLocaleDateString()}</TableCell>
                    <TableCell>₹{order.total.toLocaleString()}</TableCell>
                    <TableCell>
                      <Badge className={getStatusColor(order.status)} variant="secondary">
                        {order.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">{order.type}</Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button variant="ghost" size="sm" title="View Order">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm" onClick={() => handleReorder(order)} title="Re-order">
                          <RotateCcw className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm" onClick={() => handleTrackOrder(order)} title="Track Order">
                          <MapPin className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Tracking Dialog */}
      <Dialog open={trackingDialogOpen} onOpenChange={setTrackingDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Track Order</DialogTitle>
            <DialogDescription>Order ID: {selectedOrder?.orderId}</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="flex items-start gap-4">
              <div className="flex flex-col items-center">
                <div className="h-8 w-8 rounded-full bg-green-600 flex items-center justify-center">
                  <svg className="h-4 w-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <div className="w-0.5 h-12 bg-green-600"></div>
              </div>
              <div className="flex-1 pt-1">
                <p className="font-medium text-gray-900">Order Placed</p>
                <p className="text-sm text-gray-500">Jan 15, 2024 10:30 AM</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="flex flex-col items-center">
                <div className="h-8 w-8 rounded-full bg-green-600 flex items-center justify-center">
                  <svg className="h-4 w-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <div className="w-0.5 h-12 bg-green-600"></div>
              </div>
              <div className="flex-1 pt-1">
                <p className="font-medium text-gray-900">Order Received</p>
                <p className="text-sm text-gray-500">Jan 15, 2024 11:00 AM</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="flex flex-col items-center">
                <div className="h-8 w-8 rounded-full bg-green-600 flex items-center justify-center">
                  <svg className="h-4 w-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <div className="w-0.5 h-12 bg-green-600"></div>
              </div>
              <div className="flex-1 pt-1">
                <p className="font-medium text-gray-900">Dispatched</p>
                <p className="text-sm text-gray-500">Jan 16, 2024 09:00 AM</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="flex flex-col items-center">
                <div className="h-8 w-8 rounded-full bg-green-600 flex items-center justify-center">
                  <svg className="h-4 w-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
              </div>
              <div className="flex-1 pt-1">
                <p className="font-medium text-gray-900">Replenishment Complete</p>
                <p className="text-sm text-gray-500">Jan 17, 2024 02:30 PM</p>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
