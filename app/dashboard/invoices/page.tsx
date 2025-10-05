"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { Download, FileText, Search } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface OrderInvoice {
  id: string
  invoiceId: string
  orderId: string
  dateTime: string
  totalAmount: number
  storeName?: string
}

interface MembershipInvoice {
  id: string
  month: string
  year: string
  totalCommission: number
  status: string
}

const mockOrderInvoices: OrderInvoice[] = [
  {
    id: "1",
    invoiceId: "INV-2024-001",
    orderId: "ORD-2024-001",
    dateTime: "2024-01-15 10:30:00",
    totalAmount: 45000,
  },
  {
    id: "2",
    invoiceId: "INV-2024-002",
    orderId: "ORD-2024-002",
    dateTime: "2024-01-18 14:20:00",
    totalAmount: 32000,
  },
]

const mockMembershipInvoices: MembershipInvoice[] = [
  {
    id: "1",
    month: "December",
    year: "2023",
    totalCommission: 15000,
    status: "Paid",
  },
  {
    id: "2",
    month: "January",
    year: "2024",
    totalCommission: 18000,
    status: "Pending",
  },
]

export default function InvoicesPage() {
  const { toast } = useToast()
  const [searchInvoiceId, setSearchInvoiceId] = useState("")
  const [searchOrderId, setSearchOrderId] = useState("")
  const [searchDate, setSearchDate] = useState("")
  const [orderInvoices, setOrderInvoices] = useState<OrderInvoice[]>(mockOrderInvoices)
  const [membershipInvoices, setMembershipInvoices] = useState<MembershipInvoice[]>(mockMembershipInvoices)
  const [generateDialogOpen, setGenerateDialogOpen] = useState(false)
  const [selectedMonth, setSelectedMonth] = useState("")
  const [selectedYear, setSelectedYear] = useState("")
  const [confirmed, setConfirmed] = useState(false)

  const handleDownloadInvoice = (invoiceId: string) => {
    toast({
      title: "Downloading invoice",
      description: `Invoice ${invoiceId} is being downloaded`,
    })
  }

  const handleGenerateInvoice = () => {
    if (!selectedMonth || !selectedYear || !confirmed) {
      toast({
        title: "Missing information",
        description: "Please select month, year and confirm the data",
        variant: "destructive",
      })
      return
    }

    toast({
      title: "Invoice generated",
      description: "Your membership fee invoice has been generated and submitted",
    })

    setGenerateDialogOpen(false)
    setSelectedMonth("")
    setSelectedYear("")
    setConfirmed(false)
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-cyan-900">Invoices</h1>
        <p className="text-gray-600 mt-2">Manage order invoices and membership fee invoices</p>
      </div>

      <Tabs defaultValue="order" className="space-y-6">
        <TabsList>
          <TabsTrigger value="order">Order Invoices</TabsTrigger>
          <TabsTrigger value="membership">Membership Fee Invoices</TabsTrigger>
        </TabsList>

        {/* Order Invoices Tab */}
        <TabsContent value="order" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-cyan-900">Search Invoices</CardTitle>
              <CardDescription>Filter by invoice ID, order ID, or date</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-4">
                <div className="space-y-2">
                  <Label htmlFor="invoiceId">Invoice ID</Label>
                  <Input
                    id="invoiceId"
                    placeholder="INV-2024-001"
                    value={searchInvoiceId}
                    onChange={(e) => setSearchInvoiceId(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="orderId">Order ID</Label>
                  <Input
                    id="orderId"
                    placeholder="ORD-2024-001"
                    value={searchOrderId}
                    onChange={(e) => setSearchOrderId(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="date">Date</Label>
                  <Input id="date" type="date" value={searchDate} onChange={(e) => setSearchDate(e.target.value)} />
                </div>
                <div className="flex items-end">
                  <Button className="bg-cyan-800 hover:bg-cyan-900 w-full">
                    <Search className="h-4 w-4 mr-2" />
                    Search
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-cyan-900">Order Invoices</CardTitle>
              <CardDescription>Invoices received from warehouse</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Invoice ID</TableHead>
                      <TableHead>Order ID</TableHead>
                      <TableHead>Date & Time</TableHead>
                      <TableHead>Total Amount</TableHead>
                      <TableHead className="text-right">Action</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {orderInvoices.map((invoice) => (
                      <TableRow key={invoice.id}>
                        <TableCell className="font-medium">{invoice.invoiceId}</TableCell>
                        <TableCell>{invoice.orderId}</TableCell>
                        <TableCell>{new Date(invoice.dateTime).toLocaleString()}</TableCell>
                        <TableCell>₹{invoice.totalAmount.toLocaleString()}</TableCell>
                        <TableCell className="text-right">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleDownloadInvoice(invoice.invoiceId)}
                            title="Download"
                          >
                            <Download className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Membership Fee Invoices Tab */}
        <TabsContent value="membership" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-cyan-900">Membership Agent Fee Invoices</CardTitle>
                  <CardDescription>Generate and submit monthly commission invoices</CardDescription>
                </div>
                <Button onClick={() => setGenerateDialogOpen(true)} className="bg-cyan-800 hover:bg-cyan-900">
                  <FileText className="h-4 w-4 mr-2" />
                  Generate Invoice
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Month</TableHead>
                      <TableHead>Year</TableHead>
                      <TableHead>Total Commission</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Action</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {membershipInvoices.map((invoice) => (
                      <TableRow key={invoice.id}>
                        <TableCell className="font-medium">{invoice.month}</TableCell>
                        <TableCell>{invoice.year}</TableCell>
                        <TableCell>₹{invoice.totalCommission.toLocaleString()}</TableCell>
                        <TableCell>
                          <Badge
                            className={
                              invoice.status === "Paid"
                                ? "bg-green-100 text-green-800"
                                : "bg-yellow-100 text-yellow-800"
                            }
                            variant="secondary"
                          >
                            {invoice.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <Button variant="ghost" size="sm" onClick={() => handleDownloadInvoice(invoice.id)}>
                            <Download className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Generate Invoice Dialog */}
      <Dialog open={generateDialogOpen} onOpenChange={setGenerateDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Generate Membership Fee Invoice</DialogTitle>
            <DialogDescription>Select the month and confirm membership sales data</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="month">Month *</Label>
                <Input
                  id="month"
                  type="number"
                  placeholder="1-12"
                  min="1"
                  max="12"
                  value={selectedMonth}
                  onChange={(e) => setSelectedMonth(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="year">Year *</Label>
                <Input
                  id="year"
                  type="number"
                  placeholder="2024"
                  value={selectedYear}
                  onChange={(e) => setSelectedYear(e.target.value)}
                />
              </div>
            </div>

            <Card className="bg-gray-50">
              <CardContent className="pt-6">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Total Memberships Sold:</span>
                    <span className="font-semibold">45</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Commission per Membership:</span>
                    <span className="font-semibold">₹400</span>
                  </div>
                  <div className="flex justify-between text-base pt-2 border-t">
                    <span className="font-semibold text-gray-900">Total Commission:</span>
                    <span className="font-bold text-cyan-800">₹18,000</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="confirmData"
                checked={confirmed}
                onCheckedChange={(checked) => setConfirmed(checked === true)}
              />
              <label
                htmlFor="confirmData"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                I confirm that the membership sales data is accurate
              </label>
            </div>

            <div className="flex gap-2 pt-4">
              <Button onClick={handleGenerateInvoice} className="flex-1 bg-cyan-800 hover:bg-cyan-900">
                Generate & Submit
              </Button>
              <Button onClick={() => setGenerateDialogOpen(false)} variant="outline" className="flex-1">
                Cancel
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
