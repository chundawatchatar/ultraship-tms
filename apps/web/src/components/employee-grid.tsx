"use client"

import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import type { Employee } from "@/types/employee"

interface EmployeeGridProps {
  employees: Employee[]
  onEmployeeClick: (employee: Employee) => void
}

export function EmployeeGrid({ employees, onEmployeeClick }: EmployeeGridProps) {
  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Phone</TableHead>
            <TableHead>Department</TableHead>
            <TableHead>Position</TableHead>
            <TableHead>Company</TableHead>
            <TableHead>City</TableHead>
            <TableHead>Website</TableHead>
            <TableHead>Salary</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {employees.map((employee) => (
            <TableRow
              key={employee.id}
              className="cursor-pointer hover:bg-muted/50"
              onClick={() => onEmployeeClick(employee)}
            >
              <TableCell className="font-medium">{employee.name}</TableCell>
              <TableCell>{employee.email}</TableCell>
              <TableCell>{employee.phone}</TableCell>
              <TableCell>{employee.department}</TableCell>
              <TableCell>{employee.position}</TableCell>
              <TableCell>{employee.company.name}</TableCell>
              <TableCell>{employee.address.city}</TableCell>
              <TableCell>{employee.website}</TableCell>
              <TableCell>{employee.salary}</TableCell>
              <TableCell>
                <Badge variant={employee.status === "Active" ? "default" : "secondary"}>{employee.status}</Badge>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
