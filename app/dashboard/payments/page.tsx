"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Plus, Search } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { CalendarIcon } from "lucide-react"
import { Calendar } from "@/components/ui/calendar"

interface Payment {
  id: string
  paymentId: string
  name: string
  createdDate: string
  approvedDate: string | null
  status: string
  amount: number
  modeOfPayment: string
}

const mockPayments: Payment[] = [
  {
    id: "1",
    paymentId: "PAY-2024-001",
    name: "Monthly Payment",
    createdDate: "2024-01-15",
    approvedDate: "2024-01-16",
    status: "Approved",
    amount: 30000,
    modeOfPayment: "NEFT",
  },
  {
    id: "2",
    paymentId: "PAY-2024-002",
    name: "Advance Payment",
    createdDate: "2024-01-20",
    approvedDate: null,
    status: "Pending",
    amount: 15000,
    modeOfPayment: "UPI",
  },
]

export default function PaymentsPage() {
  const { toast } = useToast()
  const [dateRange, setDateRange] = useState<{ from?: Date; to?: Date }>({})
  const [payments, setPayments] = useState<Payment[]>(mockPayments)
  const [createDialogOpen, setCreateDialogOpen] = useState(false)

  // Create payment form state
  const [paymentForm, setPaymentForm] = useState({
    paymentType: "",
    paymentName: "",
    customerId: "CUST001",
    customerName: "John Doe",
    totalAmount: "",
    remarks: "",
    paymentMode: "",
  })

  const handleSearch = () => {
    if (!dateRange.from || !dateRange.to) {
      toast({ title: "Date range required", description: "Please pick a date range", variant: "destructive" })
      return
    }
    toast({ title: "Search completed", description: `Found ${payments.length} payments` })
  }

  const handleCreatePayment = () => {
    if (!paymentForm.paymentType || !paymentForm.paymentName || !paymentForm.totalAmount || !paymentForm.paymentMode) {
      toast({
        title: "Missing fields",
        description: "Please fill in all required fields",
        variant: "destructive",
      })
      return
    }

    toast({
      title: "Payment submitted",
      description: "Your payment has been submitted for approval",
    })

    setCreateDialogOpen(false)
    setPaymentForm({
      paymentType: "",
      paymentName: "",
      customerId: "CUST001",
      customerName: "John Doe",
      totalAmount: "",
      remarks: "",
      paymentMode: "",
    })
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
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-cyan-900">Payments</h1>
          <p className="text-gray-600 mt-2">View payment history and submit new payments</p>
        </div>
        <Button onClick={() => setCreateDialogOpen(true)} className="bg-cyan-800 hover:bg-cyan-900">
          <Plus className="h-4 w-4 mr-2" />
          Create Payment
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-cyan-900">Search Payments</CardTitle>
          <CardDescription>Filter payments by date range</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 space-y-2">
              <label className="text-sm font-medium text-gray-700">Date Range</label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="w-full sm:w-[280px] justify-start bg-transparent">
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {dateRange.from
                      ? dateRange.to
                        ? `${dateRange.from.toLocaleDateString()} - ${dateRange.to.toLocaleDateString()}`
                        : dateRange.from.toLocaleDateString()
                      : "Pick a date range"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="range"
                    selected={{ from: dateRange.from, to: dateRange.to }}
                    onSelect={(r: any) => setDateRange(r)}
                    numberOfMonths={2}
                  />
                </PopoverContent>
              </Popover>
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
          <CardTitle className="text-cyan-900">Payment History</CardTitle>
          <CardDescription>Last 30 days of payments</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Payment ID</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Created Date</TableHead>
                  <TableHead>Approved Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Mode of Payment</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {payments.map((payment) => (
                  <TableRow key={payment.id}>
                    <TableCell className="font-medium">{payment.paymentId}</TableCell>
                    <TableCell>{payment.name}</TableCell>
                    <TableCell>{new Date(payment.createdDate).toLocaleDateString()}</TableCell>
                    <TableCell>
                      {payment.approvedDate ? new Date(payment.approvedDate).toLocaleDateString() : "-"}
                    </TableCell>
                    <TableCell>
                      <Badge className={getStatusColor(payment.status)} variant="secondary">
                        {payment.status}
                      </Badge>
                    </TableCell>
                    <TableCell>₹{payment.amount.toLocaleString()}</TableCell>
                    <TableCell>{payment.modeOfPayment}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Create Payment Dialog */}
      <Dialog open={createDialogOpen} onOpenChange={setCreateDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Create Payment</DialogTitle>
            <DialogDescription>Submit a new payment entry</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="paymentType">Payment Type *</Label>
              <Select
                value={paymentForm.paymentType}
                onValueChange={(value) => setPaymentForm({ ...paymentForm, paymentType: value })}
              >
                <SelectTrigger id="paymentType">
                  <SelectValue placeholder="Select payment type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="advance">Advance Payment</SelectItem>
                  <SelectItem value="monthly">Monthly Payment</SelectItem>
                  <SelectItem value="outstanding">Outstanding Payment</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="paymentName">Payment Name *</Label>
              <Input
                id="paymentName"
                value={paymentForm.paymentName}
                onChange={(e) => setPaymentForm({ ...paymentForm, paymentName: e.target.value })}
                placeholder="Enter payment name"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="customerId">Customer ID</Label>
                <Input id="customerId" value={paymentForm.customerId} disabled className="bg-gray-50" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="customerName">Customer Name</Label>
                <Input id="customerName" value={paymentForm.customerName} disabled className="bg-gray-50" />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="totalAmount">Total Amount *</Label>
              <Input
                id="totalAmount"
                type="number"
                value={paymentForm.totalAmount}
                onChange={(e) => setPaymentForm({ ...paymentForm, totalAmount: e.target.value })}
                placeholder="Enter amount"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="paymentMode">Payment Mode *</Label>
              <Select
                value={paymentForm.paymentMode}
                onValueChange={(value) => setPaymentForm({ ...paymentForm, paymentMode: value })}
              >
                <SelectTrigger id="paymentMode">
                  <SelectValue placeholder="Select payment mode" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="cash">Cash</SelectItem>
                  <SelectItem value="neft">NEFT</SelectItem>
                  <SelectItem value="rtgs">RTGS</SelectItem>
                  <SelectItem value="upi">UPI</SelectItem>
                  <SelectItem value="cheque">Cheque</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="remarks">Remarks</Label>
              <Textarea
                id="remarks"
                value={paymentForm.remarks}
                onChange={(e) => setPaymentForm({ ...paymentForm, remarks: e.target.value })}
                placeholder="Enter any additional remarks"
                rows={3}
              />
            </div>

            <div className="flex gap-2 pt-4">
              <Button onClick={handleCreatePayment} className="flex-1 bg-cyan-800 hover:bg-cyan-900">
                Submit Payment
              </Button>
              <Button onClick={() => setCreateDialogOpen(false)} variant="outline" className="flex-1">
                Cancel
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
