"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { getCurrentUser, logout, type User } from "@/lib/auth/mock-auth"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { UserIcon, LogOut, Store, Menu } from "lucide-react"

interface DashboardHeaderProps {
  setMobileMenuOpen: (open: boolean) => void
}

export function DashboardHeader({ setMobileMenuOpen }: DashboardHeaderProps) {
  const [selectedStore, setSelectedStore] = useState("all")
  const [user, setUser] = useState<User | null>(null)
  const router = useRouter()

  const stores = [
    { id: "all", label: "All Stores" },
    { id: "store1", label: "Store 1 - Mumbai" },
    { id: "store2", label: "Store 2 - Delhi" },
    { id: "store3", label: "Store 3 - Bangalore" },
  ]

  useEffect(() => {
    setUser(getCurrentUser())
    const saved = typeof window !== "undefined" ? localStorage.getItem("medplus_selected_store") : null
    if (saved) setSelectedStore(saved)
  }, [])

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("medplus_selected_store", selectedStore)
      window.dispatchEvent(new CustomEvent("medplus:store-changed", { detail: { storeId: selectedStore } }))
    }
  }, [selectedStore])

  const handleLogout = () => {
    logout()
    router.push("/login")
  }

  return (
    <header className="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-x-4 border-b border-gray-200 bg-white px-4 shadow-sm sm:gap-x-6 sm:px-6 lg:px-8">
      <button type="button" className="lg:hidden -m-2.5 p-2.5 text-gray-700" onClick={() => setMobileMenuOpen(true)}>
        <span className="sr-only">Open sidebar</span>
        <Menu className="h-6 w-6" aria-hidden="true" />
      </button>

      <div className="flex flex-1 gap-x-4 self-stretch lg:gap-x-6">
        <div className="flex items-center gap-x-4 lg:gap-x-6 flex-1">
          <div className="flex items-center gap-2">
            <Store className="h-5 w-5 text-gray-400 hidden sm:block" />
            <Select value={selectedStore} onValueChange={setSelectedStore}>
              <SelectTrigger className="w-[160px] sm:w-[220px]" aria-label="Select store">
                <SelectValue placeholder="Select store" />
              </SelectTrigger>
              <SelectContent>
                {stores.map((s) => (
                  <SelectItem key={s.id} value={s.id}>
                    {s.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="flex items-center gap-x-4 lg:gap-x-6">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                <div className="h-10 w-10 rounded-full bg-cyan-100 flex items-center justify-center">
                  <UserIcon className="h-5 w-5 text-cyan-800" />
                </div>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none">{user?.name || "User"}</p>
                  <p className="text-xs leading-none text-gray-500">{user?.email}</p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleLogout} className="text-red-600 cursor-pointer">
                <LogOut className="mr-2 h-4 w-4" />
                <span>Log out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  )
}
