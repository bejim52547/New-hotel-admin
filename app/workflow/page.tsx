"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { StatusWorkflow } from "@/components/status-workflow"
import { PDFGenerator } from "@/components/pdf-generator"
import { ArrowRight, CheckCircle, Clock, FileText, DollarSign, Send, AlertCircle } from "lucide-react"

// Mock workflow data
const workflowItems = [
  {
    id: "WF001",
    type: "inquiry",
    title: "ABC Corporation Event",
    client: "ABC Corporation",
    status: "pending",
    progress: 25,
    dueDate: new Date("2024-01-25"),
    assignedTo: "Sarah Manager",
    priority: "high",
    nextAction: "Generate preliminary letter",
    data: {
      id: "INQ001",
      clientName: "ABC Corporation",
      contactPerson: "John Smith",
      eventType: "Corporate Conference",
      expectedGuests: 150,
    },
  },
  {
    id: "WF002",
    type: "invoice",
    title: "Wedding Planners Inc Payment",
    client: "Wedding Planners Inc",
    status: "partial",
    progress: 75,
    dueDate: new Date("2024-02-17"),
    assignedTo: "Finance Team",
    priority: "medium",
    nextAction: "Follow up on remaining payment",
    data: {
      invoiceNumber: "2024-002",
      amount: 30000,
      paidAmount: 15000,
      clientName: "Wedding Planners Inc",
    },
  },
  {
    id: "WF003",
    type: "inquiry",
    title: "Tech Innovators Product Launch",
    client: "Tech Innovators Ltd",
    status: "quoted",
    progress: 50,
    dueDate: new Date("2024-01-30"),
    assignedTo: "Sales Team",
    priority: "high",
    nextAction: "Await client confirmation",
    data: {
      id: "INQ003",
      clientName: "Tech Innovators Ltd",
      contactPerson: "David Wilson",
      eventType: "Product Launch",
      expectedGuests: 200,
    },
  },
]

export default function WorkflowPage() {
  const [workflows, setWorkflows] = useState(workflowItems)
  const [selectedWorkflow, setSelectedWorkflow] = useState(null)

  const handleStatusChange = (workflowId, newStatus) => {
    setWorkflows(
      workflows.map((wf) =>
        wf.id === workflowId
          ? {
              ...wf,
              status: newStatus,
              progress: getProgressByStatus(newStatus, wf.type),
            }
          : wf,
      ),
    )
  }

  const getProgressByStatus = (status, type) => {
    if (type === "inquiry") {
      switch (status) {
        case "pending":
          return 25
        case "quoted":
          return 50
        case "confirmed":
          return 100
        case "rejected":
          return 0
        case "cancelled":
          return 0
        default:
          return 25
      }
    } else {
      switch (status) {
        case "pending":
          return 25
        case "partial":
          return 50
        case "paid":
          return 100
        case "overdue":
          return 25
        case "cancelled":
          return 0
        default:
          return 25
      }
    }
  }

  const getStatusColor = (status) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      case "quoted":
        return "bg-blue-100 text-blue-800"
      case "confirmed":
      case "paid":
        return "bg-green-100 text-green-800"
      case "partial":
        return "bg-orange-100 text-orange-800"
      case "rejected":
      case "cancelled":
      case "overdue":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-800"
      case "medium":
        return "bg-yellow-100 text-yellow-800"
      case "low":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const pendingItems = workflows.filter((wf) => wf.status === "pending").length
  const inProgressItems = workflows.filter((wf) => ["quoted", "partial"].includes(wf.status)).length
  const completedItems = workflows.filter((wf) => ["confirmed", "paid"].includes(wf.status)).length
  const highPriorityItems = workflows.filter((wf) => wf.priority === "high").length

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Workflow Management</h1>
            <p className="text-gray-600">Track and manage client interaction workflows</p>
          </div>
        </div>
      </header>

      <div className="p-6">
        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pending</CardTitle>
              <Clock className="h-4 w-4 text-yellow-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-yellow-600">{pendingItems}</div>
              <p className="text-xs text-muted-foreground">Awaiting action</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">In Progress</CardTitle>
              <ArrowRight className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">{inProgressItems}</div>
              <p className="text-xs text-muted-foreground">Active workflows</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Completed</CardTitle>
              <CheckCircle className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">{completedItems}</div>
              <p className="text-xs text-muted-foreground">Finished items</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">High Priority</CardTitle>
              <AlertCircle className="h-4 w-4 text-red-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-600">{highPriorityItems}</div>
              <p className="text-xs text-muted-foreground">Urgent items</p>
            </CardContent>
          </Card>
        </div>

        {/* Workflow Tabs */}
        <Tabs defaultValue="active" className="space-y-6">
          <TabsList>
            <TabsTrigger value="active">Active Workflows</TabsTrigger>
            <TabsTrigger value="completed">Completed</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          <TabsContent value="active">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {workflows
                .filter((wf) => !["confirmed", "paid", "rejected", "cancelled"].includes(wf.status))
                .map((workflow) => (
                  <Card key={workflow.id} className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-lg">{workflow.title}</CardTitle>
                        <div className="flex items-center space-x-2">
                          <Badge className={getPriorityColor(workflow.priority)}>{workflow.priority}</Badge>
                          <Badge className={getStatusColor(workflow.status)}>{workflow.status}</Badge>
                        </div>
                      </div>
                      <CardDescription>
                        {workflow.client} • Due: {workflow.dueDate.toLocaleDateString()}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div>
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-sm font-medium">Progress</span>
                            <span className="text-sm text-gray-500">{workflow.progress}%</span>
                          </div>
                          <Progress value={workflow.progress} className="h-2" />
                        </div>

                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div>
                            <p className="font-medium text-gray-500">Assigned To</p>
                            <p>{workflow.assignedTo}</p>
                          </div>
                          <div>
                            <p className="font-medium text-gray-500">Type</p>
                            <div className="flex items-center space-x-1">
                              {workflow.type === "inquiry" ? (
                                <FileText className="w-4 h-4" />
                              ) : (
                                <DollarSign className="w-4 h-4" />
                              )}
                              <span className="capitalize">{workflow.type}</span>
                            </div>
                          </div>
                        </div>

                        <div>
                          <p className="font-medium text-gray-500 text-sm">Next Action</p>
                          <p className="text-sm">{workflow.nextAction}</p>
                        </div>

                        <div className="flex space-x-2 pt-2">
                          <Button variant="outline" size="sm" onClick={() => setSelectedWorkflow(workflow)}>
                            Manage
                          </Button>
                          <PDFGenerator
                            type={workflow.type}
                            data={workflow.data}
                            onGenerate={() => console.log(`PDF generated for ${workflow.id}`)}
                          />
                          {workflow.type === "invoice" && (
                            <Button variant="outline" size="sm">
                              <Send className="w-4 h-4 mr-1" />
                              Send
                            </Button>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
            </div>
          </TabsContent>

          <TabsContent value="completed">
            <Card>
              <CardHeader>
                <CardTitle>Completed Workflows</CardTitle>
                <CardDescription>Successfully completed inquiries and invoices</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {workflows
                    .filter((wf) => ["confirmed", "paid"].includes(wf.status))
                    .map((workflow) => (
                      <div
                        key={workflow.id}
                        className="flex items-center justify-between p-4 border rounded-lg bg-green-50"
                      >
                        <div className="flex items-center space-x-4">
                          <CheckCircle className="w-5 h-5 text-green-600" />
                          <div>
                            <p className="font-medium">{workflow.title}</p>
                            <p className="text-sm text-gray-600">{workflow.client}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <Badge className={getStatusColor(workflow.status)}>{workflow.status}</Badge>
                          <p className="text-sm text-gray-500 mt-1">Completed</p>
                        </div>
                      </div>
                    ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Workflow Performance</CardTitle>
                  <CardDescription>Average completion times and success rates</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span>Average Inquiry Processing Time</span>
                      <span className="font-medium">3.2 days</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Invoice Payment Rate</span>
                      <span className="font-medium">87%</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Client Conversion Rate</span>
                      <span className="font-medium">65%</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Average Deal Size</span>
                      <span className="font-medium">$45,000</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Team Performance</CardTitle>
                  <CardDescription>Individual team member workflow statistics</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Sarah Manager</p>
                        <p className="text-sm text-gray-500">Sales Manager</p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">8 active</p>
                        <p className="text-sm text-gray-500">workflows</p>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Finance Team</p>
                        <p className="text-sm text-gray-500">Billing Department</p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">5 active</p>
                        <p className="text-sm text-gray-500">workflows</p>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Sales Team</p>
                        <p className="text-sm text-gray-500">Business Development</p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">12 active</p>
                        <p className="text-sm text-gray-500">workflows</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>

        {/* Status Management Modal */}
        {selectedWorkflow && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
              <h3 className="text-lg font-medium mb-4">Manage Workflow: {selectedWorkflow.title}</h3>
              <StatusWorkflow
                currentStatus={selectedWorkflow.status}
                onStatusChange={(newStatus) => handleStatusChange(selectedWorkflow.id, newStatus)}
                type={selectedWorkflow.type}
              />
              <div className="flex justify-end space-x-2 mt-6">
                <Button variant="outline" onClick={() => setSelectedWorkflow(null)}>
                  Close
                </Button>
                <Button onClick={() => setSelectedWorkflow(null)}>Save Changes</Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
