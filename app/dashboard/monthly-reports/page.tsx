"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { Download, FileText, FileSpreadsheet, CheckCircle } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface MonthlyReport {
  id: string
  reportName: string
  monthYear: string
  fileType: "Excel" | "PDF"
  requiresAction: boolean
  status?: string
  fileUrl: string
}

const mockReports: MonthlyReport[] = [
  {
    id: "1",
    reportName: "Net Sale vs. Margin",
    monthYear: "Jan 2024",
    fileType: "Excel",
    requiresAction: false,
    fileUrl: "#",
  },
  {
    id: "2",
    reportName: "Rental Invoices",
    monthYear: "Jan 2024",
    fileType: "PDF",
    requiresAction: false,
    fileUrl: "#",
  },
  {
    id: "3",
    reportName: "Expiry Products List",
    monthYear: "Jan 2024",
    fileType: "Excel",
    requiresAction: true,
    status: "Awaiting Confirmation",
    fileUrl: "#",
  },
  {
    id: "4",
    reportName: "Slow-Moving Products",
    monthYear: "Jan 2024",
    fileType: "Excel",
    requiresAction: true,
    status: "Awaiting Confirmation",
    fileUrl: "#",
  },
  {
    id: "5",
    reportName: "Credit Note",
    monthYear: "Jan 2024",
    fileType: "Excel",
    requiresAction: false,
    fileUrl: "#",
  },
  {
    id: "6",
    reportName: "Royalty Fee Invoice",
    monthYear: "Jan 2024",
    fileType: "PDF",
    requiresAction: false,
    fileUrl: "#",
  },
  {
    id: "7",
    reportName: "GST Reports",
    monthYear: "Jan 2024",
    fileType: "Excel",
    requiresAction: false,
    fileUrl: "#",
  },
]

export default function MonthlyReportsPage() {
  const { toast } = useToast()
  const [selectedYear, setSelectedYear] = useState("2024")
  const [selectedMonth, setSelectedMonth] = useState("01")
  const [reports, setReports] = useState<MonthlyReport[]>(mockReports)
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false)
  const [selectedReport, setSelectedReport] = useState<MonthlyReport | null>(null)
  const [dispatchDate, setDispatchDate] = useState("")
  const [confirmed, setConfirmed] = useState(false)

  const handleDownload = (report: MonthlyReport) => {
    toast({
      title: "Downloading report",
      description: `${report.reportName} is being downloaded`,
    })
  }

  const handleConfirmReturn = (report: MonthlyReport) => {
    setSelectedReport(report)
    setConfirmDialogOpen(true)
    setDispatchDate("")
    setConfirmed(false)
  }

  const handleSubmitConfirmation = () => {
    if (!confirmed || !dispatchDate) {
      toast({
        title: "Missing information",
        description: "Please confirm and enter dispatch date",
        variant: "destructive",
      })
      return
    }

    toast({
      title: "Return confirmed",
      description: `${selectedReport?.reportName} return has been confirmed`,
    })

    setReports(
      reports.map((r) =>
        r.id === selectedReport?.id
          ? {
              ...r,
              status: "Confirmed",
            }
          : r,
      ),
    )

    setConfirmDialogOpen(false)
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-cyan-900">Monthly Reports</h1>
        <p className="text-gray-600 mt-2">Access official monthly reports and take required actions</p>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="text-cyan-900">Select Period</CardTitle>
          <CardDescription>Filter reports by year and month</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4">
            <div className="flex-1 space-y-2">
              <Label htmlFor="year">Year</Label>
              <Input
                id="year"
                type="number"
                value={selectedYear}
                onChange={(e) => setSelectedYear(e.target.value)}
                min="2020"
                max="2030"
              />
            </div>
            <div className="flex-1 space-y-2">
              <Label htmlFor="month">Month</Label>
              <Input
                id="month"
                type="number"
                value={selectedMonth}
                onChange={(e) => setSelectedMonth(e.target.value)}
                min="1"
                max="12"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Reports Table */}
      <Card>
        <CardHeader>
          <CardTitle className="text-cyan-900">Available Reports</CardTitle>
          <CardDescription>Download reports and complete required actions</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Report Name</TableHead>
                  <TableHead>Month/Year</TableHead>
                  <TableHead>File Type</TableHead>
                  <TableHead>Status / Action</TableHead>
                  <TableHead className="text-right">Download</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {reports.map((report) => (
                  <TableRow key={report.id}>
                    <TableCell className="font-medium">{report.reportName}</TableCell>
                    <TableCell>{report.monthYear}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        {report.fileType === "Excel" ? (
                          <FileSpreadsheet className="h-4 w-4 text-green-600" />
                        ) : (
                          <FileText className="h-4 w-4 text-red-600" />
                        )}
                        <span>{report.fileType}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      {report.requiresAction ? (
                        <div className="flex items-center gap-2">
                          <Badge
                            className={
                              report.status === "Confirmed"
                                ? "bg-green-100 text-green-800"
                                : "bg-yellow-100 text-yellow-800"
                            }
                            variant="secondary"
                          >
                            {report.status}
                          </Badge>
                          {report.status !== "Confirmed" && (
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleConfirmReturn(report)}
                              className="text-cyan-800"
                            >
                              <CheckCircle className="h-4 w-4 mr-1" />
                              Confirm Return
                            </Button>
                          )}
                        </div>
                      ) : (
                        <span className="text-gray-500">-</span>
                      )}
                    </TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="sm" onClick={() => handleDownload(report)}>
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

      {/* Notification Banner */}
      <Card className="border-cyan-200 bg-cyan-50">
        <CardContent className="pt-6">
          <div className="flex items-start gap-3">
            <div className="h-5 w-5 rounded-full bg-cyan-800 flex items-center justify-center shrink-0 mt-0.5">
              <span className="text-xs text-white font-bold">!</span>
            </div>
            <div>
              <h3 className="font-semibold text-cyan-900">Monthly Action Required</h3>
              <p className="text-sm text-cyan-800 mt-1">
                Please review and take action on the "Expiry Products List" and "Slow-Moving Products List" before the
                15th of each month.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Confirm Return Dialog */}
      <Dialog open={confirmDialogOpen} onOpenChange={setConfirmDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Confirm Return</DialogTitle>
            <DialogDescription>{selectedReport?.reportName}</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="confirm"
                checked={confirmed}
                onCheckedChange={(checked) => setConfirmed(checked === true)}
              />
              <label
                htmlFor="confirm"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                I confirm that I will return the products listed in this report
              </label>
            </div>

            <div className="space-y-2">
              <Label htmlFor="dispatchDate">Dispatch Date *</Label>
              <Input
                id="dispatchDate"
                type="date"
                value={dispatchDate}
                onChange={(e) => setDispatchDate(e.target.value)}
              />
            </div>

            <div className="flex gap-2 pt-4">
              <Button onClick={handleSubmitConfirmation} className="flex-1 bg-cyan-800 hover:bg-cyan-900">
                Submit Confirmation
              </Button>
              <Button onClick={() => setConfirmDialogOpen(false)} variant="outline" className="flex-1">
                Cancel
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
