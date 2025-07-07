"use client"

import { ArrowLeft, Edit, Flag, Trash2, Mail, Phone, Globe, MapPin, Building, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import type { Employee } from "@/types/employee"

interface EmployeeDetailProps {
  employee: Employee | null
  isOpen: boolean
  onClose: () => void
  onAction: (action: string, employee: Employee) => void
}

export function EmployeeDetail({ employee, isOpen, onClose, onAction }: EmployeeDetailProps) {
  if (!employee) return null

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" onClick={onClose}>
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <DialogTitle>Employee Details</DialogTitle>
          </div>
        </DialogHeader>

        <div className="space-y-6">
          {/* Header */}
          <div className="flex items-start gap-4">
            <Avatar className="h-16 w-16">
              <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${employee.username}`} />
              <AvatarFallback className="text-lg">
                {employee.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <h2 className="text-2xl font-bold">{employee.name}</h2>
              <p className="text-lg text-muted-foreground">{employee.position}</p>
              <p className="text-sm text-muted-foreground">{employee.department}</p>
              <Badge className="mt-2" variant={employee.status === "Active" ? "default" : "secondary"}>
                {employee.status}
              </Badge>
            </div>
            <div className="text-right">
              <p className="text-2xl font-bold">{employee.salary}</p>
              <p className="text-sm text-muted-foreground">Annual Salary</p>
            </div>
          </div>

          {/* Contact Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5" />
                Contact Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center gap-3">
                <Mail className="h-4 w-4 text-muted-foreground" />
                <span>{employee.email}</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="h-4 w-4 text-muted-foreground" />
                <span>{employee.phone}</span>
              </div>
              <div className="flex items-center gap-3">
                <Globe className="h-4 w-4 text-muted-foreground" />
                <span>{employee.website}</span>
              </div>
            </CardContent>
          </Card>

          {/* Address */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="h-5 w-5" />
                Address
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p>
                {employee.address.suite} {employee.address.street}
              </p>
              <p>
                {employee.address.city}, {employee.address.zipcode}
              </p>
            </CardContent>
          </Card>

          {/* Company Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Building className="h-5 w-5" />
                Company Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <div>
                <p className="font-medium">{employee.company.name}</p>
                <p className="text-sm text-muted-foreground">{employee.company.catchPhrase}</p>
                <p className="text-xs text-muted-foreground">{employee.company.bs}</p>
              </div>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="flex gap-2 pt-4">
            <Button onClick={() => onAction("edit", employee)}>
              <Edit className="h-4 w-4 mr-2" />
              Edit Employee
            </Button>
            <Button variant="outline" onClick={() => onAction("flag", employee)}>
              <Flag className="h-4 w-4 mr-2" />
              Flag
            </Button>
            <Button variant="destructive" onClick={() => onAction("delete", employee)}>
              <Trash2 className="h-4 w-4 mr-2" />
              Delete
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
