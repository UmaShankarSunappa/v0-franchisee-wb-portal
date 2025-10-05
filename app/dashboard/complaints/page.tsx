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
import { Plus, Eye, Filter } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { useRouter } from "next/navigation"

interface Complaint {
  id: string
  ticketId: string
  department: string
  subject: string
  dateRaised: string
  status: string
}

const mockComplaints: Complaint[] = [
  {
    id: "1",
    ticketId: "TKT-2024-001",
    department: "Warehouse",
    subject: "Delayed delivery of order ORD-2024-001",
    dateRaised: "2024-01-15",
    status: "In Progress",
  },
  {
    id: "2",
    ticketId: "TKT-2024-002",
    department: "Accounts",
    subject: "Payment not reflected in account",
    dateRaised: "2024-01-18",
    status: "Awaiting Your Response",
  },
  {
    id: "3",
    ticketId: "TKT-2024-003",
    department: "EDP",
    subject: "POS system login issue",
    dateRaised: "2024-01-10",
    status: "Closed",
  },
]

export default function ComplaintsPage() {
  const { toast } = useToast()
  const router = useRouter()
  const [complaints, setComplaints] = useState<Complaint[]>(mockComplaints)
  const [createDialogOpen, setCreateDialogOpen] = useState(false)
  const [filterDepartment, setFilterDepartment] = useState("all")
  const [filterStatus, setFilterStatus] = useState("all")

  const [complaintForm, setComplaintForm] = useState({
    storeId: "",
    department: "",
    subject: "",
    description: "",
  })

  const handleCreateComplaint = () => {
    if (!complaintForm.storeId || !complaintForm.department || !complaintForm.subject || !complaintForm.description) {
      toast({
        title: "Missing fields",
        description: "Please fill in all required fields",
        variant: "destructive",
      })
      return
    }

    toast({
      title: "Complaint submitted",
      description: "Your complaint has been submitted successfully",
    })

    setCreateDialogOpen(false)
    setComplaintForm({
      storeId: "",
      department: "",
      subject: "",
      description: "",
    })
  }

  const handleViewComplaint = (ticketId: string) => {
    router.push(`/dashboard/complaints/${ticketId}`)
  }

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "open":
        return "bg-blue-100 text-blue-800"
      case "in progress":
        return "bg-yellow-100 text-yellow-800"
      case "awaiting your response":
        return "bg-orange-100 text-orange-800"
      case "closed":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-cyan-900">Complaints</h1>
          <p className="text-gray-600 mt-2">Track and manage your support tickets</p>
        </div>
        <Button onClick={() => setCreateDialogOpen(true)} className="bg-cyan-800 hover:bg-cyan-900">
          <Plus className="h-4 w-4 mr-2" />
          Raise a New Complaint
        </Button>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="text-cyan-900">
            <Filter className="h-5 w-5 inline mr-2" />
            Filters
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="filterDepartment">Department</Label>
              <Select value={filterDepartment} onValueChange={setFilterDepartment}>
                <SelectTrigger id="filterDepartment">
                  <SelectValue placeholder="All departments" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Departments</SelectItem>
                  <SelectItem value="operations">Operations</SelectItem>
                  <SelectItem value="warehouse">Warehouse</SelectItem>
                  <SelectItem value="infra">Infra</SelectItem>
                  <SelectItem value="edp">EDP</SelectItem>
                  <SelectItem value="accounts">Accounts</SelectItem>
                  <SelectItem value="pos">POS</SelectItem>
                  <SelectItem value="supply-chain">Supply Chain</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="filterStatus">Status</Label>
              <Select value={filterStatus} onValueChange={setFilterStatus}>
                <SelectTrigger id="filterStatus">
                  <SelectValue placeholder="All statuses" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="open">Open</SelectItem>
                  <SelectItem value="in-progress">In Progress</SelectItem>
                  <SelectItem value="awaiting">Awaiting Your Response</SelectItem>
                  <SelectItem value="closed">Closed</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Complaints Table */}
      <Card>
        <CardHeader>
          <CardTitle className="text-cyan-900">Your Complaints</CardTitle>
          <CardDescription>All submitted tickets and their current status</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Ticket ID</TableHead>
                  <TableHead>Department</TableHead>
                  <TableHead>Subject</TableHead>
                  <TableHead>Date Raised</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {complaints.map((complaint) => (
                  <TableRow key={complaint.id}>
                    <TableCell className="font-medium">{complaint.ticketId}</TableCell>
                    <TableCell>{complaint.department}</TableCell>
                    <TableCell>{complaint.subject}</TableCell>
                    <TableCell>{new Date(complaint.dateRaised).toLocaleDateString()}</TableCell>
                    <TableCell>
                      <Badge className={getStatusColor(complaint.status)} variant="secondary">
                        {complaint.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="sm" onClick={() => handleViewComplaint(complaint.id)}>
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

      {/* Create Complaint Dialog */}
      <Dialog open={createDialogOpen} onOpenChange={setCreateDialogOpen}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>Raise a New Complaint</DialogTitle>
            <DialogDescription>Submit a support ticket to the relevant department</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="storeId">Store ID *</Label>
              <Select
                value={complaintForm.storeId}
                onValueChange={(value) => setComplaintForm({ ...complaintForm, storeId: value })}
              >
                <SelectTrigger id="storeId">
                  <SelectValue placeholder="Select store" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="store1">Store 1 - Mumbai Main</SelectItem>
                  <SelectItem value="store2">Store 2 - Mumbai East</SelectItem>
                  <SelectItem value="store3">Store 3 - Pune</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="department">Department *</Label>
              <Select
                value={complaintForm.department}
                onValueChange={(value) => setComplaintForm({ ...complaintForm, department: value })}
              >
                <SelectTrigger id="department">
                  <SelectValue placeholder="Select department" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="operations">Operations</SelectItem>
                  <SelectItem value="warehouse">Warehouse</SelectItem>
                  <SelectItem value="infra">Infra</SelectItem>
                  <SelectItem value="edp">EDP (IT/Technical)</SelectItem>
                  <SelectItem value="accounts">Accounts</SelectItem>
                  <SelectItem value="pos">POS (Point of Sale)</SelectItem>
                  <SelectItem value="supply-chain">Supply Chain</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="subject">Subject *</Label>
              <Input
                id="subject"
                placeholder="Brief title of your complaint"
                value={complaintForm.subject}
                onChange={(e) => setComplaintForm({ ...complaintForm, subject: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description *</Label>
              <Textarea
                id="description"
                placeholder="Detailed explanation of the issue"
                rows={5}
                value={complaintForm.description}
                onChange={(e) => setComplaintForm({ ...complaintForm, description: e.target.value })}
              />
            </div>

            <div className="flex gap-2 pt-4">
              <Button onClick={handleCreateComplaint} className="flex-1 bg-cyan-800 hover:bg-cyan-900">
                Submit Complaint
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
