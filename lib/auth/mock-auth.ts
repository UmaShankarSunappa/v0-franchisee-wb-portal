"use client"

export interface User {
  id: string
  email: string
  name: string
  role: "franchisee" | "admin"
}

export function login(email: string, password: string): User | null {
  // Mock authentication - in production, this would validate against a real backend
  if (password.length >= 6) {
    const user: User = {
      id: "1",
      email,
      name: email.split("@")[0],
      role: "franchisee",
    }
    localStorage.setItem("medplus_user", JSON.stringify(user))
    return user
  }
  return null
}

export function signup(email: string, password: string, name: string): User | null {
  // Mock signup - in production, this would create a user in the backend
  if (password.length >= 6) {
    const user: User = {
      id: Date.now().toString(),
      email,
      name,
      role: "franchisee",
    }
    localStorage.setItem("medplus_user", JSON.stringify(user))
    return user
  }
  return null
}

export function logout(): void {
  localStorage.removeItem("medplus_user")
}

export function getCurrentUser(): User | null {
  if (typeof window === "undefined") return null
  const userStr = localStorage.getItem("medplus_user")
  if (!userStr) return null
  try {
    return JSON.parse(userStr)
  } catch {
    return null
  }
}
