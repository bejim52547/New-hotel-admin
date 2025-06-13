"use client"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, Clock, AlertCircle, XCircle, ArrowRight } from "lucide-react"

interface StatusWorkflowProps {
  currentStatus: string
  onStatusChange: (newStatus: string) => void
  type: "inquiry" | "invoice"
}

const inquiryStatuses = [
  { value: "pending", label: "Pending Review", icon: Clock, color: "bg-yellow-100 text-yellow-800" },
  { value: "quoted", label: "Quote Sent", icon: ArrowRight, color: "bg-blue-100 text-blue-800" },
  { value: "confirmed", label: "Confirmed", icon: CheckCircle, color: "bg-green-100 text-green-800" },
  { value: "rejected", label: "Rejected", icon: XCircle, color: "bg-red-100 text-red-800" },
  { value: "cancelled", label: "Cancelled", icon: XCircle, color: "bg-gray-100 text-gray-800" },
]

const invoiceStatuses = [
  { value: "pending", label: "Pending Payment", icon: Clock, color: "bg-blue-100 text-blue-800" },
  { value: "partial", label: "Partially Paid", icon: AlertCircle, color: "bg-yellow-100 text-yellow-800" },
  { value: "paid", label: "Paid", icon: CheckCircle, color: "bg-green-100 text-green-800" },
  { value: "overdue", label: "Overdue", icon: AlertCircle, color: "bg-red-100 text-red-800" },
  { value: "cancelled", label: "Cancelled", icon: XCircle, color: "bg-gray-100 text-gray-800" },
]

export function StatusWorkflow({ currentStatus, onStatusChange, type }: StatusWorkflowProps) {
  const statuses = type === "inquiry" ? inquiryStatuses : invoiceStatuses
  const currentStatusInfo = statuses.find((s) => s.value === currentStatus)
  const CurrentIcon = currentStatusInfo?.icon || Clock

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <CurrentIcon className="w-5 h-5" />
          <span>Status Management</span>
        </CardTitle>
        <CardDescription>Update the {type} status to track progress through the workflow</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <span className="text-sm font-medium">Current Status:</span>
            <Badge className={currentStatusInfo?.color}>{currentStatusInfo?.label}</Badge>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Update Status:</label>
            <Select value={currentStatus} onValueChange={onStatusChange}>
              <SelectTrigger>
                <SelectValue placeholder="Select new status" />
              </SelectTrigger>
              <SelectContent>
                {statuses.map((status) => {
                  const Icon = status.icon
                  return (
                    <SelectItem key={status.value} value={status.value}>
                      <div className="flex items-center space-x-2">
                        <Icon className="w-4 h-4" />
                        <span>{status.label}</span>
                      </div>
                    </SelectItem>
                  )
                })}
              </SelectContent>
            </Select>
          </div>

          {type === "inquiry" && (
            <div className="mt-4 p-3 bg-blue-50 rounded-lg">
              <h4 className="text-sm font-medium text-blue-900 mb-2">Workflow Steps:</h4>
              <ol className="text-xs text-blue-800 space-y-1">
                <li>1. Review inquiry details</li>
                <li>2. Generate preliminary letter</li>
                <li>3. Send quote to client</li>
                <li>4. Await client confirmation</li>
                <li>5. Create booking and invoice</li>
              </ol>
            </div>
          )}

          {type === "invoice" && (
            <div className="mt-4 p-3 bg-green-50 rounded-lg">
              <h4 className="text-sm font-medium text-green-900 mb-2">Payment Process:</h4>
              <ol className="text-xs text-green-800 space-y-1">
                <li>1. Invoice generated and sent</li>
                <li>2. Client receives payment request</li>
                <li>3. Payment processing</li>
                <li>4. Payment confirmation</li>
                <li>5. Invoice marked as paid</li>
              </ol>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
