"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Eye, Search } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface Return {
  id: string
  returnId: string
  taxInvoice: string
  createdBy: string
  total: number
  receivedDate: string
  returnNoteId: string
  status: string
}

interface ReturnItem {
  productName: string
  productId: string
  batchId: string
  packSize: string
  expDate: string
  invId: string
  ordId: string
  price: number
  returnedQuantity: number
  total: number
}

const mockReturns: Return[] = [
  {
    id: "1",
    returnId: "RET-2024-001",
    taxInvoice: "INV-2024-001",
    createdBy: "John Doe",
    total: 5000,
    receivedDate: "2024-01-10",
    returnNoteId: "RN-001",
    status: "Approved",
  },
  {
    id: "2",
    returnId: "RET-2024-002",
    taxInvoice: "INV-2024-002",
    createdBy: "John Doe",
    total: 3500,
    receivedDate: "2024-01-15",
    returnNoteId: "RN-002",
    status: "Pending",
  },
]

const mockReturnItems: ReturnItem[] = [
  {
    productName: "Paracetamol 500mg",
    productId: "PROD-001",
    batchId: "BATCH-001",
    packSize: "10 tablets",
    expDate: "2025-12-31",
    invId: "INV-2024-001",
    ordId: "ORD-2024-001",
    price: 50,
    returnedQuantity: 20,
    total: 1000,
  },
  {
    productName: "Amoxicillin 250mg",
    productId: "PROD-002",
    batchId: "BATCH-002",
    packSize: "15 capsules",
    expDate: "2025-10-31",
    invId: "INV-2024-001",
    ordId: "ORD-2024-001",
    price: 100,
    returnedQuantity: 40,
    total: 4000,
  },
]

export default function ReturnDetailsPage() {
  const { toast } = useToast()
  const [startDate, setStartDate] = useState("")
  const [endDate, setEndDate] = useState("")
  const [returns, setReturns] = useState<Return[]>(mockReturns)
  const [detailsDialogOpen, setDetailsDialogOpen] = useState(false)
  const [selectedReturn, setSelectedReturn] = useState<Return | null>(null)

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

    if (diffDays > 90) {
      toast({
        title: "Invalid date range",
        description: "Date range cannot exceed 90 days",
        variant: "destructive",
      })
      return
    }

    toast({
      title: "Search completed",
      description: `Found ${returns.length} returns`,
    })
  }

  const handleViewDetails = (returnItem: Return) => {
    setSelectedReturn(returnItem)
    setDetailsDialogOpen(true)
  }

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "approved":
        return "bg-green-100 text-green-800"
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      case "rejected":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-cyan-900">Return Details</h1>
        <p className="text-gray-600 mt-2">View and track your product returns</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-cyan-900">Search Returns</CardTitle>
          <CardDescription>Filter returns by date range (maximum 90 days)</CardDescription>
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
          <CardTitle className="text-cyan-900">Return History</CardTitle>
          <CardDescription>Last 30 days of returns</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Return ID</TableHead>
                  <TableHead>Tax Invoice</TableHead>
                  <TableHead>Created By</TableHead>
                  <TableHead>Total</TableHead>
                  <TableHead>Received Date</TableHead>
                  <TableHead>Return Note ID</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {returns.map((returnItem) => (
                  <TableRow key={returnItem.id}>
                    <TableCell className="font-medium">{returnItem.returnId}</TableCell>
                    <TableCell>{returnItem.taxInvoice}</TableCell>
                    <TableCell>{returnItem.createdBy}</TableCell>
                    <TableCell>₹{returnItem.total.toLocaleString()}</TableCell>
                    <TableCell>{new Date(returnItem.receivedDate).toLocaleDateString()}</TableCell>
                    <TableCell>{returnItem.returnNoteId}</TableCell>
                    <TableCell>
                      <Badge className={getStatusColor(returnItem.status)} variant="secondary">
                        {returnItem.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleViewDetails(returnItem)}
                        title="View Details"
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Return Details Dialog */}
      <Dialog open={detailsDialogOpen} onOpenChange={setDetailsDialogOpen}>
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Return Details</DialogTitle>
            <DialogDescription>
              Return ID: {selectedReturn?.returnId} | Tax Invoice: {selectedReturn?.taxInvoice}
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Product Name</TableHead>
                  <TableHead>Product ID</TableHead>
                  <TableHead>Batch ID</TableHead>
                  <TableHead>Pack Size</TableHead>
                  <TableHead>Exp. Date</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>Qty</TableHead>
                  <TableHead>Total</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockReturnItems.map((item, index) => (
                  <TableRow key={index}>
                    <TableCell className="font-medium">{item.productName}</TableCell>
                    <TableCell>{item.productId}</TableCell>
                    <TableCell>{item.batchId}</TableCell>
                    <TableCell>{item.packSize}</TableCell>
                    <TableCell>{new Date(item.expDate).toLocaleDateString()}</TableCell>
                    <TableCell>₹{item.price}</TableCell>
                    <TableCell>{item.returnedQuantity}</TableCell>
                    <TableCell>₹{item.total.toLocaleString()}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
