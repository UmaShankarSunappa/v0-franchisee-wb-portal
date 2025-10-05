"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Eye } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { useRouter } from "next/navigation"

interface Indent {
  id: string
  indentId: string
  dateCreated: string
  storeId: string
  totalValue: number
  status: string
}

const mockIndents: Indent[] = [
  {
    id: "1",
    indentId: "IND-2024-001",
    dateCreated: "2024-01-20",
    storeId: "Store 1 - Mumbai Main",
    totalValue: 45000,
    status: "Pending",
  },
  {
    id: "2",
    indentId: "IND-2024-002",
    dateCreated: "2024-01-21",
    storeId: "Store 1 - Mumbai Main",
    totalValue: 32000,
    status: "Pending",
  },
]

export default function ProvisionalIndentPage() {
  const { toast } = useToast()
  const router = useRouter()
  const [indents, setIndents] = useState<Indent[]>(mockIndents)

  const creditInfo = {
    availableCredit: 245000,
    totalIndentValue: 77000,
  }

  const handleViewIndent = (indentId: string) => {
    router.push(`/dashboard/indent/${indentId}`)
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-cyan-900">Provisional Indent</h1>
        <p className="text-gray-600 mt-2">Review and confirm automated draft orders based on your sales</p>
      </div>

      {/* Credit Summary */}
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="text-cyan-900">Available Credit Limit</CardTitle>
            <CardDescription>Your current available credit</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-green-600">₹{creditInfo.availableCredit.toLocaleString()}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-cyan-900">Total Provisional Indent Value</CardTitle>
            <CardDescription>Combined value of all pending indents</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-cyan-800">₹{creditInfo.totalIndentValue.toLocaleString()}</p>
          </CardContent>
        </Card>
      </div>

      {/* Indents List */}
      <Card>
        <CardHeader>
          <CardTitle className="text-cyan-900">Pending Indents</CardTitle>
          <CardDescription>Review and confirm your provisional indents</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Indent ID</TableHead>
                  <TableHead>Date Created</TableHead>
                  <TableHead>Store ID</TableHead>
                  <TableHead>Total Value</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {indents.map((indent) => (
                  <TableRow key={indent.id}>
                    <TableCell className="font-medium">{indent.indentId}</TableCell>
                    <TableCell>{new Date(indent.dateCreated).toLocaleDateString()}</TableCell>
                    <TableCell>{indent.storeId}</TableCell>
                    <TableCell>₹{indent.totalValue.toLocaleString()}</TableCell>
                    <TableCell>
                      <Badge className="bg-yellow-100 text-yellow-800" variant="secondary">
                        {indent.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="sm" onClick={() => handleViewIndent(indent.id)} title="View & Edit">
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
    </div>
  )
}
