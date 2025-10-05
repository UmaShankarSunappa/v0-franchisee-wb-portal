"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts"

// Mock data for charts
const netSaleMarginData = [
  { month: "Jan", netSale: 450000, margin: 67500 },
  { month: "Feb", netSale: 520000, margin: 78000 },
  { month: "Mar", netSale: 480000, margin: 72000 },
  { month: "Apr", netSale: 550000, margin: 82500 },
  { month: "May", netSale: 600000, margin: 90000 },
  { month: "Jun", netSale: 580000, margin: 87000 },
]

const brandedVsPrivateData = [
  { month: "Jan", branded: 300000, privateLabel: 150000 },
  { month: "Feb", branded: 350000, privateLabel: 170000 },
  { month: "Mar", branded: 320000, privateLabel: 160000 },
  { month: "Apr", branded: 370000, privateLabel: 180000 },
  { month: "May", branded: 400000, privateLabel: 200000 },
  { month: "Jun", branded: 390000, privateLabel: 190000 },
]

const salesByCategoryData = [
  { category: "Medicines", sales: 250000, margin: 37500 },
  { category: "Supplements", sales: 150000, margin: 22500 },
  { category: "Personal Care", sales: 100000, margin: 15000 },
  { category: "Baby Care", sales: 80000, margin: 12000 },
]

const onlineOfflineData = [
  { name: "Offline Sale", value: 420000 },
  { name: "Online Sale", value: 180000 },
]

const orderCountData = [
  { month: "Jan", saleOrders: 450, webOrders: 120 },
  { month: "Feb", saleOrders: 520, webOrders: 145 },
  { month: "Mar", saleOrders: 480, webOrders: 135 },
  { month: "Apr", saleOrders: 550, webOrders: 160 },
  { month: "May", saleOrders: 600, webOrders: 180 },
  { month: "Jun", saleOrders: 580, webOrders: 170 },
]

const abvBillsData = [
  { month: "Jan", abv: 1200, bills: 375 },
  { month: "Feb", abv: 1250, bills: 416 },
  { month: "Mar", abv: 1180, bills: 407 },
  { month: "Apr", abv: 1300, bills: 423 },
  { month: "May", abv: 1350, bills: 444 },
  { month: "Jun", abv: 1320, bills: 439 },
]

const discountData = [
  { month: "Jan", discount: 5.2 },
  { month: "Feb", discount: 4.8 },
  { month: "Mar", discount: 5.5 },
  { month: "Apr", discount: 4.5 },
  { month: "May", discount: 4.2 },
  { month: "Jun", discount: 4.7 },
]

const bounceProductsData = [
  { month: "Jan", count: 45 },
  { month: "Feb", count: 38 },
  { month: "Mar", count: 52 },
  { month: "Apr", count: 35 },
  { month: "May", count: 30 },
  { month: "Jun", count: 42 },
]

const skuData = [
  { month: "Jan", ordered: 850, replenished: 820 },
  { month: "Feb", ordered: 920, replenished: 900 },
  { month: "Mar", ordered: 880, replenished: 860 },
  { month: "Apr", ordered: 950, replenished: 930 },
  { month: "May", ordered: 1000, replenished: 980 },
  { month: "Jun", ordered: 980, replenished: 960 },
]

const COLORS = ["#0e7490", "#7c3aed"]

export default function PerformanceReportsPage() {
  const [selectedStore, setSelectedStore] = useState("all")
  const [startDate, setStartDate] = useState("")
  const [endDate, setEndDate] = useState("")
  const [viewMode, setViewMode] = useState<"day" | "month">("month")

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-cyan-900">Performance Reports</h1>
        <p className="text-gray-600 mt-2">Visual dashboard of key performance indicators</p>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="text-cyan-900">Filters</CardTitle>
          <CardDescription>Customize your report view</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-4">
            <div className="space-y-2">
              <Label htmlFor="store">Store</Label>
              <Select value={selectedStore} onValueChange={setSelectedStore}>
                <SelectTrigger id="store">
                  <SelectValue placeholder="Select store" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Stores</SelectItem>
                  <SelectItem value="store1">Store 1 - Mumbai Main</SelectItem>
                  <SelectItem value="store2">Store 2 - Mumbai East</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="startDate">Start Date</Label>
              <Input id="startDate" type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="endDate">End Date</Label>
              <Input id="endDate" type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="viewMode">View Mode</Label>
              <Select value={viewMode} onValueChange={(value: "day" | "month") => setViewMode(value)}>
                <SelectTrigger id="viewMode">
                  <SelectValue placeholder="Select view" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="day">Day wise</SelectItem>
                  <SelectItem value="month">Month over Month</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Charts Grid */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* Net Sale vs Margin */}
        <Card>
          <CardHeader>
            <CardTitle className="text-cyan-900">Net Sale vs. Margin Amount</CardTitle>
            <CardDescription>Monthly comparison of sales and margins</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={netSaleMarginData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="netSale" fill="#0e7490" name="Net Sale" />
                <Bar dataKey="margin" fill="#7c3aed" name="Margin" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Branded vs Private Label */}
        <Card>
          <CardHeader>
            <CardTitle className="text-cyan-900">Branded vs. Private Label Sale</CardTitle>
            <CardDescription>Product type sales comparison</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={brandedVsPrivateData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="branded" fill="#0e7490" name="Branded" />
                <Bar dataKey="privateLabel" fill="#7c3aed" name="Private Label" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Sales by Category */}
        <Card>
          <CardHeader>
            <CardTitle className="text-cyan-900">Sales & Margin by Category</CardTitle>
            <CardDescription>Category-wise breakdown</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={salesByCategoryData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="category" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="sales" fill="#0e7490" name="Sales" />
                <Bar dataKey="margin" fill="#7c3aed" name="Margin" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Online vs Offline */}
        <Card>
          <CardHeader>
            <CardTitle className="text-cyan-900">Offline vs. Online Sale</CardTitle>
            <CardDescription>Sales channel distribution</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={onlineOfflineData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {onlineOfflineData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Order Counts */}
        <Card>
          <CardHeader>
            <CardTitle className="text-cyan-900">Sale Orders vs. Web Orders Count</CardTitle>
            <CardDescription>Order volume trends</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={orderCountData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="saleOrders" stroke="#0e7490" name="Sale Orders" strokeWidth={2} />
                <Line type="monotone" dataKey="webOrders" stroke="#7c3aed" name="Web Orders" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* ABV vs Bills */}
        <Card>
          <CardHeader>
            <CardTitle className="text-cyan-900">Average Bill Value vs. No. of Bills</CardTitle>
            <CardDescription>Transaction metrics</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={abvBillsData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="abv" fill="#0e7490" name="Avg Bill Value" />
                <Bar dataKey="bills" fill="#7c3aed" name="No. of Bills" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Discount Percentage */}
        <Card>
          <CardHeader>
            <CardTitle className="text-cyan-900">Total Discount Percentage</CardTitle>
            <CardDescription>Discount trends over time</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={discountData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="discount" stroke="#0e7490" name="Discount %" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Bounce Products */}
        <Card>
          <CardHeader>
            <CardTitle className="text-cyan-900">Bounce (Returned) Products Count</CardTitle>
            <CardDescription>Product return trends</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={bounceProductsData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="count" stroke="#0e7490" name="Bounce Count" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* SKU Ordered vs Replenished */}
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle className="text-cyan-900">SKU Ordered vs. SKU Replenished</CardTitle>
            <CardDescription>Inventory fulfillment tracking</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={skuData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="ordered" stroke="#0e7490" name="SKU Ordered" strokeWidth={2} />
                <Line type="monotone" dataKey="replenished" stroke="#7c3aed" name="SKU Replenished" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
