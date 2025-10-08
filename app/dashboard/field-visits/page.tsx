"use client"

import { useMemo, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Download, Filter } from "lucide-react"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { CalendarIcon } from "lucide-react"
import { Calendar } from "@/components/ui/calendar"

type Rating = { value: number; remarks?: string }
type VisitReport = {
  id: string
  datetime: string // ISO
  employeeId: string
  employeeName: string
  storeId: string
  storeName: string
  localHeadName: string
  storeEnvironment: Rating
  staffGrooming: Rating
  staffQuality: Rating
  staffPresent: number
  pvtLabelPharma: Rating
  pvtLabelNonPharma: Rating
  tosReplenishment: "Completed" | "Pending"
  outstandingPayments: "Yes" | "No"
  sopDeviations?: string
  otherObservations?: string
}

const allowedStoreIds = ["S-1001"]

const MOCK_REPORTS: VisitReport[] = [
  {
    id: "vr-1001",
    datetime: "2025-10-05T10:30:00Z",
    employeeId: "EMP-021",
    employeeName: "Anita Rao",
    storeId: "S-1001",
    storeName: "Medplus Koramangala",
    localHeadName: "R. Sharma",
    storeEnvironment: { value: 2, remarks: "Dust near billing counter" },
    staffGrooming: { value: 4 },
    staffQuality: { value: 3 },
    staffPresent: 6,
    pvtLabelPharma: { value: 2, remarks: "No shelf talkers" },
    pvtLabelNonPharma: { value: 3 },
    tosReplenishment: "Pending",
    outstandingPayments: "No",
    sopDeviations: "Expired promo standee on floor",
    otherObservations: "High evening footfall",
  },
  {
    id: "vr-1002",
    datetime: "2025-10-06T14:10:00Z",
    employeeId: "EMP-033",
    employeeName: "Vikram Kulkarni",
    storeId: "S-1001",
    storeName: "Medplus Koramangala",
    localHeadName: "R. Sharma",
    storeEnvironment: { value: 5 },
    staffGrooming: { value: 5 },
    staffQuality: { value: 4 },
    staffPresent: 5,
    pvtLabelPharma: { value: 4 },
    pvtLabelNonPharma: { value: 4 },
    tosReplenishment: "Completed",
    outstandingPayments: "No",
    sopDeviations: "",
    otherObservations: "All displays updated",
  },
]

function formatDate(dt: string) {
  const d = new Date(dt)
  return d.toLocaleString()
}
function hasNonCompliance(r: VisitReport) {
  return (
    r.storeEnvironment.value <= 2 ||
    r.staffGrooming.value <= 2 ||
    r.staffQuality.value <= 2 ||
    r.pvtLabelPharma.value <= 2 ||
    r.pvtLabelNonPharma.value <= 2
  )
}
function exportCSV(rows: VisitReport[]) {
  const headers = [
    "Date & Time",
    "Employee Name",
    "Employee ID",
    "Store ID",
    "Store Name",
    "Local Head",
    "Store Env",
    "Store Env Remarks",
    "Staff Grooming",
    "Grooming Remarks",
    "Staff Quality",
    "Quality Remarks",
    "Staff Present",
    "Pvt Label Pharma",
    "Pharma Remarks",
    "Pvt Label Non-Pharma",
    "Non-Pharma Remarks",
    "TO Replenishment",
    "Outstanding Payments",
    "SOP Deviations",
    "Other Observations",
  ]
  const lines = rows.map((r) => [
    formatDate(r.datetime),
    r.employeeName,
    r.employeeId,
    r.storeId,
    r.storeName,
    r.localHeadName,
    r.storeEnvironment.value,
    r.storeEnvironment.remarks || "",
    r.staffGrooming.value,
    r.staffGrooming.remarks || "",
    r.staffQuality.value,
    r.staffQuality.remarks || "",
    r.staffPresent,
    r.pvtLabelPharma.value,
    r.pvtLabelPharma.remarks || "",
    r.pvtLabelNonPharma.value,
    r.pvtLabelNonPharma.remarks || "",
    r.tosReplenishment,
    r.outstandingPayments,
    r.sopDeviations || "",
    r.otherObservations || "",
  ])
  const csv = [
    headers.join(","),
    ...lines.map((l) => l.map((val) => `"${String(val).replace(/"/g, '""')}"`).join(",")),
  ].join("\n")
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" })
  const url = URL.createObjectURL(blob)
  const a = document.createElement("a")
  a.href = url
  a.download = "field-visit-reports.csv"
  a.click()
  URL.revokeObjectURL(url)
}

export default function FieldVisitReportsPage() {
  const [dateRange, setDateRange] = useState<{ from?: Date; to?: Date }>({})
  const [storeId, setStoreId] = useState<string>("all")
  const [employee, setEmployee] = useState<string>("all")
  const [expandedId, setExpandedId] = useState<string | null>(null)

  const scoped = useMemo(() => MOCK_REPORTS.filter((r) => allowedStoreIds.includes(r.storeId)), [])

  const filtered = useMemo(() => {
    return scoped.filter((r) => {
      const d = new Date(r.datetime).getTime()
      const okFrom = dateRange.from ? d >= dateRange.from.getTime() : true
      const okTo = dateRange.to ? d <= dateRange.to.getTime() + 86_400_000 - 1 : true
      const okStore = storeId === "all" ? true : r.storeId === storeId
      const okEmp = employee === "all" ? true : r.employeeName === employee
      return okFrom && okTo && okStore && okEmp
    })
  }, [scoped, dateRange, storeId, employee])

  const stores = Array.from(new Set(scoped.map((r) => `${r.storeId}|${r.storeName}`)))
  const employees = Array.from(new Set(scoped.map((r) => r.employeeName)))

  return (
    <main className="p-4 md:p-6">
      <Card>
        <CardHeader className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <CardTitle className="text-cyan-900">Field Visit Reports</CardTitle>
          <div className="flex flex-wrap items-end gap-2">
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4 text-cyan-800" />
              <span className="text-sm text-gray-600">Filters</span>
            </div>
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className="w-[260px] justify-start bg-transparent">
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
            <Select value={storeId} onValueChange={setStoreId}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Store" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Stores</SelectItem>
                {stores.map((s) => {
                  const [id, name] = s.split("|")
                  return (
                    <SelectItem key={id} value={id}>
                      {id} — {name}
                    </SelectItem>
                  )
                })}
              </SelectContent>
            </Select>
            <Select value={employee} onValueChange={setEmployee}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Employee" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Employees</SelectItem>
                {employees.map((n) => (
                  <SelectItem key={n} value={n}>
                    {n}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button variant="outline" onClick={() => exportCSV(filtered)}>
              <Download className="h-4 w-4 mr-2" /> Export CSV
            </Button>
            <Button onClick={() => window.print()} className="bg-cyan-800 hover:bg-cyan-700">
              Export PDF
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead>
                <tr className="text-left text-gray-600">
                  <th className="p-2">Date & Time</th>
                  <th className="p-2">Employee</th>
                  <th className="p-2">Store</th>
                  <th className="p-2">Ratings</th>
                  <th className="p-2">Comments</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((r) => {
                  const nonCompliance = hasNonCompliance(r)
                  const expanded = expandedId === r.id
                  return (
                    <>
                      <tr
                        key={r.id}
                        className={`${nonCompliance ? "bg-red-50" : ""} border-b hover:bg-gray-50 cursor-pointer`}
                        onClick={() => setExpandedId(expanded ? null : r.id)}
                        aria-expanded={expanded}
                      >
                        <td className="p-2 align-top">{formatDate(r.datetime)}</td>
                        <td className="p-2 align-top">
                          <div className="font-medium">{r.employeeName}</div>
                          <div className="text-xs text-gray-500">{r.employeeId}</div>
                        </td>
                        <td className="p-2 align-top">
                          <div className="font-medium">{r.storeName}</div>
                          <div className="text-xs text-gray-500">{r.storeId}</div>
                        </td>
                        <td className="p-2 align-top">
                          <div className="flex flex-col gap-1">
                            <span
                              className={`inline-flex w-fit rounded px-2 py-0.5 text-xs ${r.storeEnvironment.value <= 2 ? "bg-red-100 text-red-700" : "bg-green-100 text-green-700"}`}
                            >
                              Store Env: {r.storeEnvironment.value}
                            </span>
                            <span
                              className={`inline-flex w-fit rounded px-2 py-0.5 text-xs ${r.staffGrooming.value <= 2 ? "bg-red-100 text-red-700" : "bg-green-100 text-green-700"}`}
                            >
                              Grooming: {r.staffGrooming.value}
                            </span>
                            <span
                              className={`inline-flex w-fit rounded px-2 py-0.5 text-xs ${r.staffQuality.value <= 2 ? "bg-red-100 text-red-700" : "bg-green-100 text-green-700"}`}
                            >
                              Quality: {r.staffQuality.value}
                            </span>
                          </div>
                        </td>
                        <td className="p-2 align-top">
                          {r.sopDeviations || r.otherObservations ? (
                            <div className="line-clamp-2 text-gray-700">{r.sopDeviations || r.otherObservations}</div>
                          ) : (
                            <span className="text-gray-400">—</span>
                          )}
                        </td>
                      </tr>
                      {expanded && (
                        <tr>
                          <td colSpan={5} className="p-3 bg-gray-50">
                            <div className="grid md:grid-cols-3 gap-3 text-sm">
                              <div>
                                <div className="font-semibold text-gray-800 mb-1">Details</div>
                                <div>Local Head: {r.localHeadName}</div>
                                <div>Staff Present: {r.staffPresent}</div>
                                <div>TO Replenishment: {r.tosReplenishment}</div>
                                <div>Outstanding Payments: {r.outstandingPayments}</div>
                              </div>
                              <div>
                                <div className="font-semibold text-gray-800 mb-1">Ratings & Remarks</div>
                                <div>
                                  Store Env: {r.storeEnvironment.value}{" "}
                                  {r.storeEnvironment.remarks ? `— ${r.storeEnvironment.remarks}` : ""}
                                </div>
                                <div>
                                  Grooming: {r.staffGrooming.value}{" "}
                                  {r.staffGrooming.remarks ? `— ${r.staffGrooming.remarks}` : ""}
                                </div>
                                <div>
                                  Quality: {r.staffQuality.value}{" "}
                                  {r.staffQuality.remarks ? `— ${r.staffQuality.remarks}` : ""}
                                </div>
                                <div>
                                  Pvt Label Pharma: {r.pvtLabelPharma.value}{" "}
                                  {r.pvtLabelPharma.remarks ? `— ${r.pvtLabelPharma.remarks}` : ""}
                                </div>
                                <div>
                                  Pvt Label Non-Pharma: {r.pvtLabelNonPharma.value}{" "}
                                  {r.pvtLabelNonPharma.remarks ? `— ${r.pvtLabelNonPharma.remarks}` : ""}
                                </div>
                              </div>
                              <div>
                                <div className="font-semibold text-gray-800 mb-1">Comments</div>
                                <div>SOP Deviations: {r.sopDeviations || "—"}</div>
                                <div>Other Observations: {r.otherObservations || "—"}</div>
                              </div>
                            </div>
                          </td>
                        </tr>
                      )}
                    </>
                  )
                })}
                {filtered.length === 0 && (
                  <tr>
                    <td colSpan={5} className="p-6 text-center text-gray-500">
                      No reports found for selected filters.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </main>
  )
}
