"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Pencil, Save, X } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export default function AccountProfilePage() {
  const { toast } = useToast()
  const [editingProfile, setEditingProfile] = useState(false)
  const [editingLicense, setEditingLicense] = useState(false)
  const [editingBank, setEditingBank] = useState(false)

  // My Profile state
  const [profile, setProfile] = useState({
    name: "John Doe",
    primaryMobile: "+91 9876543210",
    secondaryMobile: "+91 9876543211",
    address: "123 Main Street, Mumbai, Maharashtra 400001",
    aadharNo: "1234 5678 9012",
    panNo: "ABCDE1234F",
    email: "john.doe@example.com",
    customerId: "CUST001",
  })

  // License Details state
  const [selectedStore, setSelectedStore] = useState("store1")
  const [license, setLicense] = useState({
    storeId: "store1",
    gstNo: "27AABCU9603R1ZM",
    dlNo: "DL-MH-2024-001234",
    fssaiNo: "12345678901234",
    labourLicenseNo: "LAB-MH-2024-001",
    tradeLicenseNo: "TRD-MH-2024-001",
  })

  // Bank Account state
  const [bank, setBank] = useState({
    accountType: "Savings",
    accountNo: "1234567890",
    bankName: "State Bank of India",
    ifscCode: "SBIN0001234",
    branchName: "Mumbai Main Branch",
  })

  const handleSaveProfile = () => {
    setEditingProfile(false)
    toast({
      title: "Profile updated",
      description: "Your profile information has been saved successfully.",
    })
  }

  const handleSaveLicense = () => {
    setEditingLicense(false)
    toast({
      title: "License details updated",
      description: "Your license information has been saved successfully.",
    })
  }

  const handleSaveBank = () => {
    setEditingBank(false)
    toast({
      title: "Bank details updated",
      description: "Your bank account information has been saved successfully.",
    })
  }

  const handleStoreChange = (value: string) => {
    setSelectedStore(value)
    // In a real app, fetch license details for the selected store
    toast({
      title: "Store changed",
      description: `Loaded license details for ${value}`,
    })
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-cyan-900">Account Profile</h1>
        <p className="text-gray-600 mt-2">Manage your personal, license, and bank account details</p>
      </div>

      {/* My Profile Section */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-cyan-900">My Profile</CardTitle>
              <CardDescription>Your personal information</CardDescription>
            </div>
            {!editingProfile ? (
              <Button onClick={() => setEditingProfile(true)} variant="outline" size="sm">
                <Pencil className="h-4 w-4 mr-2" />
                Edit
              </Button>
            ) : (
              <div className="flex gap-2">
                <Button onClick={handleSaveProfile} size="sm" className="bg-cyan-800 hover:bg-cyan-900">
                  <Save className="h-4 w-4 mr-2" />
                  Save
                </Button>
                <Button onClick={() => setEditingProfile(false)} variant="outline" size="sm">
                  <X className="h-4 w-4 mr-2" />
                  Cancel
                </Button>
              </div>
            )}
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                value={profile.name}
                onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                disabled={!editingProfile}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email ID</Label>
              <Input
                id="email"
                type="email"
                value={profile.email}
                onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                disabled={!editingProfile}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="primaryMobile">Primary Mobile</Label>
              <Input
                id="primaryMobile"
                value={profile.primaryMobile}
                onChange={(e) => setProfile({ ...profile, primaryMobile: e.target.value })}
                disabled={!editingProfile}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="secondaryMobile">Secondary Mobile</Label>
              <Input
                id="secondaryMobile"
                value={profile.secondaryMobile}
                onChange={(e) => setProfile({ ...profile, secondaryMobile: e.target.value })}
                disabled={!editingProfile}
              />
            </div>
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="address">Address</Label>
              <Input
                id="address"
                value={profile.address}
                onChange={(e) => setProfile({ ...profile, address: e.target.value })}
                disabled={!editingProfile}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="aadharNo">Aadhar No</Label>
              <Input
                id="aadharNo"
                value={profile.aadharNo}
                onChange={(e) => setProfile({ ...profile, aadharNo: e.target.value })}
                disabled={!editingProfile}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="panNo">PAN No</Label>
              <Input
                id="panNo"
                value={profile.panNo}
                onChange={(e) => setProfile({ ...profile, panNo: e.target.value })}
                disabled={!editingProfile}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="customerId">Customer ID</Label>
              <Input id="customerId" value={profile.customerId} disabled className="bg-gray-50" />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* License Details Section */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-cyan-900">License Details</CardTitle>
              <CardDescription>Store-specific license information</CardDescription>
            </div>
            {!editingLicense ? (
              <Button onClick={() => setEditingLicense(true)} variant="outline" size="sm">
                <Pencil className="h-4 w-4 mr-2" />
                Edit
              </Button>
            ) : (
              <div className="flex gap-2">
                <Button onClick={handleSaveLicense} size="sm" className="bg-cyan-800 hover:bg-cyan-900">
                  <Save className="h-4 w-4 mr-2" />
                  Save
                </Button>
                <Button onClick={() => setEditingLicense(false)} variant="outline" size="sm">
                  <X className="h-4 w-4 mr-2" />
                  Cancel
                </Button>
              </div>
            )}
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="storeId">Store ID</Label>
              <Select value={selectedStore} onValueChange={handleStoreChange} disabled={editingLicense}>
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
              <Label htmlFor="gstNo">GST No</Label>
              <Input
                id="gstNo"
                value={license.gstNo}
                onChange={(e) => setLicense({ ...license, gstNo: e.target.value })}
                disabled={!editingLicense}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="dlNo">DL No</Label>
              <Input
                id="dlNo"
                value={license.dlNo}
                onChange={(e) => setLicense({ ...license, dlNo: e.target.value })}
                disabled={!editingLicense}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="fssaiNo">FSSAI No</Label>
              <Input
                id="fssaiNo"
                value={license.fssaiNo}
                onChange={(e) => setLicense({ ...license, fssaiNo: e.target.value })}
                disabled={!editingLicense}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="labourLicenseNo">Labour License No</Label>
              <Input
                id="labourLicenseNo"
                value={license.labourLicenseNo}
                onChange={(e) => setLicense({ ...license, labourLicenseNo: e.target.value })}
                disabled={!editingLicense}
              />
            </div>
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="tradeLicenseNo">Trade License No</Label>
              <Input
                id="tradeLicenseNo"
                value={license.tradeLicenseNo}
                onChange={(e) => setLicense({ ...license, tradeLicenseNo: e.target.value })}
                disabled={!editingLicense}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Bank Account Details Section */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-cyan-900">Bank Account Details</CardTitle>
              <CardDescription>Your banking information</CardDescription>
            </div>
            {!editingBank ? (
              <Button onClick={() => setEditingBank(true)} variant="outline" size="sm">
                <Pencil className="h-4 w-4 mr-2" />
                Edit
              </Button>
            ) : (
              <div className="flex gap-2">
                <Button onClick={handleSaveBank} size="sm" className="bg-cyan-800 hover:bg-cyan-900">
                  <Save className="h-4 w-4 mr-2" />
                  Save
                </Button>
                <Button onClick={() => setEditingBank(false)} variant="outline" size="sm">
                  <X className="h-4 w-4 mr-2" />
                  Cancel
                </Button>
              </div>
            )}
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="accountType">Account Type</Label>
              <Select
                value={bank.accountType}
                onValueChange={(value) => setBank({ ...bank, accountType: value })}
                disabled={!editingBank}
              >
                <SelectTrigger id="accountType">
                  <SelectValue placeholder="Select account type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Savings">Savings</SelectItem>
                  <SelectItem value="Current">Current</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="accountNo">Account No</Label>
              <Input
                id="accountNo"
                value={bank.accountNo}
                onChange={(e) => setBank({ ...bank, accountNo: e.target.value })}
                disabled={!editingBank}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="bankName">Bank Name</Label>
              <Input
                id="bankName"
                value={bank.bankName}
                onChange={(e) => setBank({ ...bank, bankName: e.target.value })}
                disabled={!editingBank}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="ifscCode">IFSC Code</Label>
              <Input
                id="ifscCode"
                value={bank.ifscCode}
                onChange={(e) => setBank({ ...bank, ifscCode: e.target.value })}
                disabled={!editingBank}
              />
            </div>
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="branchName">Branch Name</Label>
              <Input
                id="branchName"
                value={bank.branchName}
                onChange={(e) => setBank({ ...bank, branchName: e.target.value })}
                disabled={!editingBank}
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
