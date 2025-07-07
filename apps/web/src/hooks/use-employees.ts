"use client"

import { useState, useEffect } from "react"
import type { Employee } from "@/types/employee"

export function useEmployees() {
  const [employees, setEmployees] = useState<Employee[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchEmployees()
  }, [])

  const fetchEmployees = async () => {
    try {
      setLoading(true)
      const response = await fetch("https://jsonplaceholder.typicode.com/users")

      if (!response.ok) {
        throw new Error("Failed to fetch employees")
      }

      const users = await response.json()

      // Enhance the data with additional employee fields
      const enhancedEmployees = users.map((user: any, index: number) => ({
        ...user,
        department: ["Engineering", "Marketing", "Sales", "HR", "Finance", "Operations", "Design", "Legal"][index % 8],
        position: [
          "Senior Developer",
          "Marketing Manager",
          "Sales Rep",
          "HR Specialist",
          "Financial Analyst",
          "Operations Manager",
          "UI/UX Designer",
          "Legal Counsel",
        ][index % 8],
        salary: ["$85,000", "$75,000", "$65,000", "$70,000", "$80,000", "$90,000", "$72,000", "$95,000"][index % 8],
        status: ["Active", "Active", "On Leave", "Active", "Active", "Remote", "Active", "Part-time"][index % 8],
      }))

      // Duplicate data to have more items for pagination demo
      const duplicatedEmployees = []
      for (let i = 0; i < 5; i++) {
        duplicatedEmployees.push(
          ...enhancedEmployees.map((emp) => ({
            ...emp,
            id: emp.id + i * 100,
            name: `${emp.name} ${i > 0 ? `(${i + 1})` : ""}`.trim(),
          })),
        )
      }

      setEmployees(duplicatedEmployees)
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred")
    } finally {
      setLoading(false)
    }
  }

  const handleAction = (action: string, employee: Employee) => {
    console.log(`${action} action for employee:`, employee.name)
    // Implement actual actions here
    switch (action) {
      case "edit":
        // Handle edit
        break
      case "flag":
        // Handle flag
        break
      case "delete":
        // Handle delete - you might want to update the employees state
        break
    }
  }

  return {
    employees,
    loading,
    error,
    handleAction,
    refetch: fetchEmployees,
  }
}
