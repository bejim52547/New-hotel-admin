"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Search, Building, Mail, Phone, DollarSign, FileText, Users } from "lucide-react"
import { format } from "date-fns"

// Mock client data
const initialClients = [
  {
    id: "CL001",
    name: "ABC Corporation",
    contactPerson: "John Smith",
    email: "john.smith@abccorp.com",
    phone: "+1-555-0123",
    company: "ABC Corporation",
    industry: "Technology",
    status: "active",
    totalInquiries: 3,
    totalRevenue: 125000,
    lastContact: new Date("2024-01-15"),
    inquiries: ["INQ001", "INQ004", "INQ007"],
    invoices: ["INV001", "INV004"],
    notes: "Large corporate client, frequent events",
  },
  {
    id: "CL002",
    name: "Wedding Planners Inc",
    contactPerson: "Emily Johnson",
    email: "emily@weddingplanners.com",
    phone: "+1-555-0124",
    company: "Wedding Planners Inc",
    industry: "Event Planning",
    status: "active",
    totalInquiries: 2,
    totalRevenue: 45000,
    lastContact: new Date("2024-01-12"),
    inquiries: ["INQ002", "INQ005"],
    invoices: ["INV002"],
    notes: "Wedding and social event specialist",
  },
  {
    id: "CL003",
    name: "Tech Innovators Ltd",
    contactPerson: "David Wilson",
    email: "david@techinnovators.com",
    phone: "+1-555-0125",
    company: "Tech Innovators Ltd",
    industry: "Technology",
    status: "prospect",
    totalInquiries: 1,
    totalRevenue: 0,
    lastContact: new Date("2024-01-20"),
    inquiries: ["INQ003"],
    invoices: ["INV003"],
    notes: "New client, product launch event",
  },
]

export default function ClientsPage() {
  const [clients, setClients] = useState(initialClients)
  const [searchTerm, setSearchTerm] = useState("")
  const [filterStatus, setFilterStatus] = useState("all")

  const filteredClients = clients.filter((client) => {
    const matchesSearch =
      client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.contactPerson.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.company.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = filterStatus === "all" || client.status === filterStatus
    return matchesSearch && matchesStatus
  })

  const getStatusColor = (status) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800"
      case "prospect":
        return "bg-blue-100 text-blue-800"
      case "inactive":
        return "bg-gray-100 text-gray-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const totalClients = clients.length
  const activeClients = clients.filter((c) => c.status === "active").length
  const prospectClients = clients.filter((c) => c.status === "prospect").length
  const totalClientRevenue = clients.reduce((sum, c) => sum + c.totalRevenue, 0)

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Client Management</h1>
            <p className="text-gray-600">Track client relationships and interaction history</p>
          </div>
        </div>
      </header>

      <div className="p-6">
        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Clients</CardTitle>
              <Building className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalClients}</div>
              <p className="text-xs text-muted-foreground">All clients</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Clients</CardTitle>
              <Users className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">{activeClients}</div>
              <p className="text-xs text-muted-foreground">Engaged clients</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Prospects</CardTitle>
              <Users className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">{prospectClients}</div>
              <p className="text-xs text-muted-foreground">Potential clients</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${totalClientRevenue.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">From all clients</p>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <div className="flex items-center space-x-4 mb-6">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="Search clients..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {/* Client Management Tabs */}
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList>
            <TabsTrigger value="overview">Client Overview</TabsTrigger>
            <TabsTrigger value="interactions">Interaction History</TabsTrigger>
            <TabsTrigger value="financial">Financial Summary</TabsTrigger>
          </TabsList>

          <TabsContent value="overview">
            <Card>
              <CardHeader>
                <CardTitle>Client Directory</CardTitle>
                <CardDescription>Complete list of all clients and their status</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Client</TableHead>
                      <TableHead>Contact Info</TableHead>
                      <TableHead>Industry</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Inquiries</TableHead>
                      <TableHead>Revenue</TableHead>
                      <TableHead>Last Contact</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredClients.map((client) => (
                      <TableRow key={client.id}>
                        <TableCell>
                          <div>
                            <div className="font-medium">{client.name}</div>
                            <div className="text-sm text-gray-500">{client.company}</div>
                            <div className="text-sm text-gray-500">{client.contactPerson}</div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div>
                            <div className="text-sm flex items-center">
                              <Mail className="w-3 h-3 mr-1" />
                              {client.email}
                            </div>
                            <div className="text-sm flex items-center">
                              <Phone className="w-3 h-3 mr-1" />
                              {client.phone}
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>{client.industry}</TableCell>
                        <TableCell>
                          <Badge className={getStatusColor(client.status)}>{client.status}</Badge>
                        </TableCell>
                        <TableCell>
                          <div className="font-medium">{client.totalInquiries}</div>
                          <div className="text-sm text-gray-500">inquiries</div>
                        </TableCell>
                        <TableCell>
                          <div className="font-medium">${client.totalRevenue.toLocaleString()}</div>
                        </TableCell>
                        <TableCell>
                          <div className="text-sm">{format(client.lastContact, "MMM dd, yyyy")}</div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="interactions">
            <Card>
              <CardHeader>
                <CardTitle>Client Interaction Timeline</CardTitle>
                <CardDescription>Track all client communications and touchpoints</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {filteredClients.map((client) => (
                    <div key={client.id} className="border rounded-lg p-4">
                      <div className="flex items-center justify-between mb-3">
                        <h3 className="font-medium">{client.name}</h3>
                        <Badge className={getStatusColor(client.status)}>{client.status}</Badge>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                        <div>
                          <p className="font-medium text-gray-500">Inquiries</p>
                          <div className="space-y-1">
                            {client.inquiries.map((inquiryId) => (
                              <div key={inquiryId} className="flex items-center space-x-2">
                                <FileText className="w-3 h-3" />
                                <span>{inquiryId}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                        <div>
                          <p className="font-medium text-gray-500">Invoices</p>
                          <div className="space-y-1">
                            {client.invoices.map((invoiceId) => (
                              <div key={invoiceId} className="flex items-center space-x-2">
                                <DollarSign className="w-3 h-3" />
                                <span>{invoiceId}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                        <div>
                          <p className="font-medium text-gray-500">Notes</p>
                          <p className="text-gray-600">{client.notes}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="financial">
            <Card>
              <CardHeader>
                <CardTitle>Financial Summary</CardTitle>
                <CardDescription>Revenue and payment history by client</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {filteredClients.map((client) => (
                    <div key={client.id} className="border rounded-lg p-4">
                      <div className="flex items-center justify-between mb-3">
                        <h3 className="font-medium">{client.name}</h3>
                        <div className="text-right">
                          <p className="text-lg font-bold text-green-600">${client.totalRevenue.toLocaleString()}</p>
                          <p className="text-sm text-gray-500">Total Revenue</p>
                        </div>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                        <div>
                          <p className="font-medium text-gray-500">Total Inquiries</p>
                          <p className="text-lg font-medium">{client.totalInquiries}</p>
                        </div>
                        <div>
                          <p className="font-medium text-gray-500">Active Invoices</p>
                          <p className="text-lg font-medium">{client.invoices.length}</p>
                        </div>
                        <div>
                          <p className="font-medium text-gray-500">Avg. Deal Size</p>
                          <p className="text-lg font-medium">
                            $
                            {client.totalInquiries > 0
                              ? Math.round(client.totalRevenue / client.totalInquiries).toLocaleString()
                              : 0}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
