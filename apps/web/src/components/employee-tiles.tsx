"use client"

import { MoreVertical, Mail, Building, MapPin, Edit, Flag, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import type { Employee } from "@/types/employee"

interface EmployeeTilesProps {
  employees: Employee[]
  onEmployeeClick: (employee: Employee) => void
  onAction: (action: string, employee: Employee) => void
}

export function EmployeeTiles({ employees, onEmployeeClick, onAction }: EmployeeTilesProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {employees.map((employee) => (
        <Card
          key={employee.id}
          className="cursor-pointer hover:shadow-lg transition-shadow duration-200"
          onClick={() => onEmployeeClick(employee)}
        >
          <CardHeader className="pb-3">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <Avatar>
                  <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${employee.username}`} />
                  <AvatarFallback>
                    {employee.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <CardTitle className="text-lg">{employee.name}</CardTitle>
                  <p className="text-sm text-muted-foreground">{employee.position}</p>
                </div>
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem
                    onClick={(e) => {
                      e.stopPropagation()
                      onAction("edit", employee)
                    }}
                  >
                    <Edit className="h-4 w-4 mr-2" />
                    Edit
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={(e) => {
                      e.stopPropagation()
                      onAction("flag", employee)
                    }}
                  >
                    <Flag className="h-4 w-4 mr-2" />
                    Flag
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    className="text-red-600"
                    onClick={(e) => {
                      e.stopPropagation()
                      onAction("delete", employee)
                    }}
                  >
                    <Trash2 className="h-4 w-4 mr-2" />
                    Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm">
                <Mail className="h-4 w-4 text-muted-foreground" />
                <span className="truncate">{employee.email}</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Building className="h-4 w-4 text-muted-foreground" />
                <span>{employee.department}</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <MapPin className="h-4 w-4 text-muted-foreground" />
                <span>{employee.address.city}</span>
              </div>
              <div className="flex items-center justify-between pt-2">
                <Badge variant={employee.status === "Active" ? "default" : "secondary"}>{employee.status}</Badge>
                <span className="text-sm font-medium">{employee.salary}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
