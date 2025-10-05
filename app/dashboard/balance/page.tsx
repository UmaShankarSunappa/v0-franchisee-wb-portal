"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Search, Printer, Info } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface Statement {
  id: string
  date: string
  billId: string
  billType: "Purchase" | "Payment"
  amount: number
  billingPlace: string
  transactionType: "Dr" | "Cr"
}

const mockStatements: Statement[] = [
  {
    id: "1",
    date: "2024-01-15",
    billId: "BILL-001",
    billType: "Purchase",
    amount: 45000,
    billingPlace: "Mumbai Warehouse",
    transactionType: "Dr",
  },
  {
    id: "2",
    date: "2024-01-18",
    billId: "PAY-001",
    billType: "Payment",
    amount: 30000,
    billingPlace: "Online Payment",
    transactionType: "Cr",
  },
  {
    id: "3",
    date: "2024-01-20",
    billId: "BILL-002",
    billType: "Purchase",
    amount: 32000,
    billingPlace: "Mumbai Warehouse",
    transactionType: "Dr",
  },
]

export default function AccountBalancePage() {
  const { toast } = useToast()
  const [startDate, setStartDate] = useState("")
  const [endDate, setEndDate] = useState("")
  const [statements, setStatements] = useState<Statement[]>(mockStatements)

  const accountSummary = {
    accountName: "Medplus Store - Mumbai Main",
    creditLimit: 500000,
    availableCreditLimit: 245000,
    currentOutstanding: 255000,
    creditPeriod: 30,
  }

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
      title: "Statement generated",
      description: `Found ${statements.length} transactions`,
    })
  }

  const handlePrint = () => {
    toast({
      title: "Printing statement",
      description: "Your statement is being prepared for printing",
    })
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-cyan-900">Account Balance</h1>
        <p className="text-gray-600 mt-2">View your financial status and transaction history</p>
      </div>

      {/* Account Summary */}
      <Card>
        <CardHeader>
          <CardTitle className="text-cyan-900">Account Summary</CardTitle>
          <CardDescription>Your current financial overview</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-5">
            <div className="space-y-1">
              <p className="text-sm text-gray-500">Account Name</p>
              <p className="text-lg font-semibold text-gray-900">{accountSummary.accountName}</p>
            </div>
            <div className="space-y-1">
              <p className="text-sm text-gray-500">Credit Limit</p>
              <p className="text-lg font-semibold text-gray-900">₹{accountSummary.creditLimit.toLocaleString()}</p>
            </div>
            <div className="space-y-1">
              <p className="text-sm text-gray-500">Available Credit</p>
              <p className="text-lg font-semibold text-green-600">
                ₹{accountSummary.availableCreditLimit.toLocaleString()}
              </p>
            </div>
            <div className="space-y-1">
              <p className="text-sm text-gray-500">Current Outstanding</p>
              <p className="text-lg font-semibold text-red-600">
                ₹{accountSummary.currentOutstanding.toLocaleString()}
              </p>
            </div>
            <div className="space-y-1">
              <p className="text-sm text-gray-500">Credit Period</p>
              <p className="text-lg font-semibold text-gray-900">{accountSummary.creditPeriod} days</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Statement Generation */}
      <Card>
        <CardHeader>
          <CardTitle className="text-cyan-900">Generate Statement</CardTitle>
          <CardDescription>Filter transactions by date range (maximum 90 days)</CardDescription>
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
            <div className="flex items-end gap-2">
              <Button onClick={handleSearch} className="bg-cyan-800 hover:bg-cyan-900">
                <Search className="h-4 w-4 mr-2" />
                Search
              </Button>
              <Button onClick={handlePrint} variant="outline">
                <Printer className="h-4 w-4 mr-2" />
                Print
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Statement Display */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-cyan-900">Transaction Statement</CardTitle>
              <CardDescription>Your transaction history</CardDescription>
            </div>
            <Button variant="ghost" size="sm">
              <Info className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>Bill ID</TableHead>
                  <TableHead>Bill Type</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Billing Place</TableHead>
                  <TableHead>Dr/Cr</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {statements.map((statement) => (
                  <TableRow key={statement.id}>
                    <TableCell>{new Date(statement.date).toLocaleDateString()}</TableCell>
                    <TableCell className="font-medium">{statement.billId}</TableCell>
                    <TableCell>
                      <Badge variant="outline">{statement.billType}</Badge>
                    </TableCell>
                    <TableCell>₹{statement.amount.toLocaleString()}</TableCell>
                    <TableCell>{statement.billingPlace}</TableCell>
                    <TableCell>
                      <Badge
                        className={
                          statement.transactionType === "Dr" ? "bg-red-100 text-red-800" : "bg-green-100 text-green-800"
                        }
                        variant="secondary"
                      >
                        {statement.transactionType}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
