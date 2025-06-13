"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Plus,
  Search,
  FileText,
  Download,
  CalendarIcon,
  Mail,
  Phone,
  Building,
  Users,
  DollarSign,
  Clock,
} from "lucide-react"
import { format } from "date-fns"

// Mock inquiry data
const initialInquiries = [
  {
    id: "INQ001",
    clientName: "ABC Corporation",
    contactPerson: "John Smith",
    email: "john.smith@abccorp.com",
    phone: "+1-555-0123",
    company: "ABC Corporation",
    eventType: "Corporate Conference",
    expectedGuests: 150,
    checkInDate: new Date("2024-02-15"),
    checkOutDate: new Date("2024-02-18"),
    roomsRequired: 75,
    budgetRange: "$50,000 - $75,000",
    specialRequirements: "Conference room for 200 people, AV equipment, catering services",
    status: "pending",
    priority: "high",
    createdAt: new Date("2024-01-10"),
    lastUpdated: new Date("2024-01-10"),
    assignedTo: "Sarah Manager",
    estimatedRevenue: 62500,
    notes: "Large corporate event, potential for repeat business",
  },
  {
    id: "INQ002",
    clientName: "Wedding Planners Inc",
    contactPerson: "Emily Johnson",
    email: "emily@weddingplanners.com",
    phone: "+1-555-0124",
    company: "Wedding Planners Inc",
    eventType: "Wedding Reception",
    expectedGuests: 80,
    checkInDate: new Date("2024-03-22"),
    checkOutDate: new Date("2024-03-24"),
    roomsRequired: 40,
    budgetRange: "$25,000 - $35,000",
    specialRequirements: "Bridal suite, wedding cake storage, floral arrangements",
    status: "confirmed",
    priority: "medium",
    createdAt: new Date("2024-01-08"),
    lastUpdated: new Date("2024-01-12"),
    assignedTo: "Mike Staff",
    estimatedRevenue: 30000,
    notes: "Spring wedding, requires special decorations",
  },
  {
    id: "INQ003",
    clientName: "Tech Innovators Ltd",
    contactPerson: "David Wilson",
    email: "david@techinnovators.com",
    phone: "+1-555-0125",
    company: "Tech Innovators Ltd",
    eventType: "Product Launch",
    expectedGuests: 200,
    checkInDate: new Date("2024-04-10"),
    checkOutDate: new Date("2024-04-12"),
    roomsRequired: 100,
    budgetRange: "$75,000 - $100,000",
    specialRequirements: "High-speed internet, presentation equipment, networking space",
    status: "quoted",
    priority: "high",
    createdAt: new Date("2024-01-05"),
    lastUpdated: new Date("2024-01-14"),
    assignedTo: "Sarah Manager",
    estimatedRevenue: 87500,
    notes: "Tech company product launch, requires modern facilities",
  },
]

export default function InquiriesPage() {
  const [inquiries, setInquiries] = useState(initialInquiries)
  const [searchTerm, setSearchTerm] = useState("")
  const [filterStatus, setFilterStatus] = useState("all")
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [selectedInquiry, setSelectedInquiry] = useState(null)
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false)
  const [checkInDate, setCheckInDate] = useState(null)
  const [checkOutDate, setCheckOutDate] = useState(null)

  const [newInquiry, setNewInquiry] = useState({
    clientName: "",
    contactPerson: "",
    email: "",
    phone: "",
    company: "",
    eventType: "",
    expectedGuests: 0,
    roomsRequired: 0,
    budgetRange: "",
    specialRequirements: "",
    priority: "medium",
  })

  const filteredInquiries = inquiries.filter((inquiry) => {
    const matchesSearch =
      inquiry.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      inquiry.contactPerson.toLowerCase().includes(searchTerm.toLowerCase()) ||
      inquiry.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      inquiry.eventType.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = filterStatus === "all" || inquiry.status === filterStatus
    return matchesSearch && matchesStatus
  })

  const getStatusColor = (status) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      case "quoted":
        return "bg-blue-100 text-blue-800"
      case "confirmed":
        return "bg-green-100 text-green-800"
      case "rejected":
        return "bg-red-100 text-red-800"
      case "cancelled":
        return "bg-gray-100 text-gray-800"
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

  const handleAddInquiry = () => {
    if (!checkInDate || !checkOutDate) return

    const inquiry = {
      ...newInquiry,
      id: `INQ${String(Math.max(...inquiries.map((i) => Number.parseInt(i.id.slice(3)))) + 1).padStart(3, "0")}`,
      checkInDate,
      checkOutDate,
      status: "pending",
      createdAt: new Date(),
      lastUpdated: new Date(),
      assignedTo: "Current User",
      estimatedRevenue: 0,
      notes: "",
    }
    setInquiries([...inquiries, inquiry])
    setNewInquiry({
      clientName: "",
      contactPerson: "",
      email: "",
      phone: "",
      company: "",
      eventType: "",
      expectedGuests: 0,
      roomsRequired: 0,
      budgetRange: "",
      specialRequirements: "",
      priority: "medium",
    })
    setCheckInDate(null)
    setCheckOutDate(null)
    setIsAddDialogOpen(false)
  }

  const handleStatusChange = (inquiryId, newStatus) => {
    setInquiries(
      inquiries.map((inquiry) =>
        inquiry.id === inquiryId ? { ...inquiry, status: newStatus, lastUpdated: new Date() } : inquiry,
      ),
    )
  }

  const handleGeneratePDF = (inquiry) => {
    // This would integrate with a PDF generation service
    console.log("Generating PDF for inquiry:", inquiry.id)
    alert(`Generating inquiry letter PDF for ${inquiry.clientName}`)
  }

  const handleViewInquiry = (inquiry) => {
    setSelectedInquiry(inquiry)
    setIsViewDialogOpen(true)
  }

  const totalInquiries = inquiries.length
  const pendingInquiries = inquiries.filter((i) => i.status === "pending").length
  const confirmedInquiries = inquiries.filter((i) => i.status === "confirmed").length
  const totalEstimatedRevenue = inquiries.reduce((sum, i) => sum + i.estimatedRevenue, 0)

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Client Inquiries</h1>
            <p className="text-gray-600">Manage client inquiries and generate preliminary letters</p>
          </div>
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                New Inquiry
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Create New Inquiry</DialogTitle>
                <DialogDescription>Add a new client inquiry to the system</DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4 max-h-96 overflow-y-auto">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="client-name">Client Name</Label>
                    <Input
                      id="client-name"
                      value={newInquiry.clientName}
                      onChange={(e) => setNewInquiry({ ...newInquiry, clientName: e.target.value })}
                      placeholder="ABC Corporation"
                    />
                  </div>
                  <div>
                    <Label htmlFor="contact-person">Contact Person</Label>
                    <Input
                      id="contact-person"
                      value={newInquiry.contactPerson}
                      onChange={(e) => setNewInquiry({ ...newInquiry, contactPerson: e.target.value })}
                      placeholder="John Smith"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={newInquiry.email}
                      onChange={(e) => setNewInquiry({ ...newInquiry, email: e.target.value })}
                      placeholder="john@company.com"
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone">Phone</Label>
                    <Input
                      id="phone"
                      value={newInquiry.phone}
                      onChange={(e) => setNewInquiry({ ...newInquiry, phone: e.target.value })}
                      placeholder="+1-555-0123"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="company">Company</Label>
                    <Input
                      id="company"
                      value={newInquiry.company}
                      onChange={(e) => setNewInquiry({ ...newInquiry, company: e.target.value })}
                      placeholder="Company Name"
                    />
                  </div>
                  <div>
                    <Label htmlFor="event-type">Event Type</Label>
                    <Select
                      value={newInquiry.eventType}
                      onValueChange={(value) => setNewInquiry({ ...newInquiry, eventType: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select event type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Corporate Conference">Corporate Conference</SelectItem>
                        <SelectItem value="Wedding Reception">Wedding Reception</SelectItem>
                        <SelectItem value="Product Launch">Product Launch</SelectItem>
                        <SelectItem value="Training Seminar">Training Seminar</SelectItem>
                        <SelectItem value="Social Event">Social Event</SelectItem>
                        <SelectItem value="Other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Check-in Date</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button variant="outline" className="w-full justify-start text-left font-normal">
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {checkInDate ? format(checkInDate, "PPP") : "Select date"}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar mode="single" selected={checkInDate} onSelect={setCheckInDate} initialFocus />
                      </PopoverContent>
                    </Popover>
                  </div>
                  <div>
                    <Label>Check-out Date</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button variant="outline" className="w-full justify-start text-left font-normal">
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {checkOutDate ? format(checkOutDate, "PPP") : "Select date"}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar mode="single" selected={checkOutDate} onSelect={setCheckOutDate} initialFocus />
                      </PopoverContent>
                    </Popover>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="expected-guests">Expected Guests</Label>
                    <Input
                      id="expected-guests"
                      type="number"
                      value={newInquiry.expectedGuests}
                      onChange={(e) =>
                        setNewInquiry({ ...newInquiry, expectedGuests: Number.parseInt(e.target.value) })
                      }
                      min="1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="rooms-required">Rooms Required</Label>
                    <Input
                      id="rooms-required"
                      type="number"
                      value={newInquiry.roomsRequired}
                      onChange={(e) => setNewInquiry({ ...newInquiry, roomsRequired: Number.parseInt(e.target.value) })}
                      min="1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="priority">Priority</Label>
                    <Select
                      value={newInquiry.priority}
                      onValueChange={(value) => setNewInquiry({ ...newInquiry, priority: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select priority" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="high">High</SelectItem>
                        <SelectItem value="medium">Medium</SelectItem>
                        <SelectItem value="low">Low</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div>
                  <Label htmlFor="budget-range">Budget Range</Label>
                  <Input
                    id="budget-range"
                    value={newInquiry.budgetRange}
                    onChange={(e) => setNewInquiry({ ...newInquiry, budgetRange: e.target.value })}
                    placeholder="$10,000 - $15,000"
                  />
                </div>
                <div>
                  <Label htmlFor="special-requirements">Special Requirements</Label>
                  <Textarea
                    id="special-requirements"
                    value={newInquiry.specialRequirements}
                    onChange={(e) => setNewInquiry({ ...newInquiry, specialRequirements: e.target.value })}
                    placeholder="Conference room, AV equipment, catering..."
                  />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleAddInquiry}>Create Inquiry</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </header>

      <div className="p-6">
        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Inquiries</CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalInquiries}</div>
              <p className="text-xs text-muted-foreground">Active inquiries</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pending Review</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{pendingInquiries}</div>
              <p className="text-xs text-muted-foreground">Awaiting response</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Confirmed</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{confirmedInquiries}</div>
              <p className="text-xs text-muted-foreground">Ready for booking</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Est. Revenue</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${totalEstimatedRevenue.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">Potential revenue</p>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <div className="flex items-center space-x-4 mb-6">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="Search inquiries..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <Select value={filterStatus} onValueChange={setFilterStatus}>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Inquiries</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="quoted">Quoted</SelectItem>
              <SelectItem value="confirmed">Confirmed</SelectItem>
              <SelectItem value="rejected">Rejected</SelectItem>
              <SelectItem value="cancelled">Cancelled</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Inquiries Table */}
        <Card>
          <CardHeader>
            <CardTitle>Client Inquiries</CardTitle>
            <CardDescription>Manage and track all client inquiries and requests</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Inquiry ID</TableHead>
                  <TableHead>Client Details</TableHead>
                  <TableHead>Event Info</TableHead>
                  <TableHead>Dates</TableHead>
                  <TableHead>Requirements</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Priority</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredInquiries.map((inquiry) => (
                  <TableRow key={inquiry.id}>
                    <TableCell className="font-medium">{inquiry.id}</TableCell>
                    <TableCell>
                      <div>
                        <div className="font-medium">{inquiry.clientName}</div>
                        <div className="text-sm text-gray-500">{inquiry.contactPerson}</div>
                        <div className="text-sm text-gray-500 flex items-center">
                          <Mail className="w-3 h-3 mr-1" />
                          {inquiry.email}
                        </div>
                        <div className="text-sm text-gray-500 flex items-center">
                          <Phone className="w-3 h-3 mr-1" />
                          {inquiry.phone}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div>
                        <div className="font-medium">{inquiry.eventType}</div>
                        <div className="text-sm text-gray-500 flex items-center">
                          <Users className="w-3 h-3 mr-1" />
                          {inquiry.expectedGuests} guests
                        </div>
                        <div className="text-sm text-gray-500 flex items-center">
                          <Building className="w-3 h-3 mr-1" />
                          {inquiry.roomsRequired} rooms
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div>
                        <div className="text-sm">Check-in: {format(inquiry.checkInDate, "MMM dd, yyyy")}</div>
                        <div className="text-sm">Check-out: {format(inquiry.checkOutDate, "MMM dd, yyyy")}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div>
                        <div className="font-medium">{inquiry.budgetRange}</div>
                        <div className="text-sm text-gray-500 truncate max-w-32">{inquiry.specialRequirements}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge className={getStatusColor(inquiry.status)}>{inquiry.status}</Badge>
                    </TableCell>
                    <TableCell>
                      <Badge className={getPriorityColor(inquiry.priority)}>{inquiry.priority}</Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm" onClick={() => handleViewInquiry(inquiry)}>
                          View
                        </Button>
                        <Button variant="outline" size="sm" onClick={() => handleGeneratePDF(inquiry)}>
                          <FileText className="w-4 h-4" />
                        </Button>
                        <Select value={inquiry.status} onValueChange={(value) => handleStatusChange(inquiry.id, value)}>
                          <SelectTrigger className="w-24">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="pending">Pending</SelectItem>
                            <SelectItem value="quoted">Quoted</SelectItem>
                            <SelectItem value="confirmed">Confirmed</SelectItem>
                            <SelectItem value="rejected">Rejected</SelectItem>
                            <SelectItem value="cancelled">Cancelled</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Inquiry Details Dialog */}
        <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
          <DialogContent className="max-w-3xl">
            <DialogHeader>
              <DialogTitle>Inquiry Details - {selectedInquiry?.id}</DialogTitle>
              <DialogDescription>Complete inquiry information and requirements</DialogDescription>
            </DialogHeader>
            {selectedInquiry && (
              <div className="grid gap-6 py-4">
                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <Label className="text-sm font-medium text-gray-500">Client Information</Label>
                      <div className="mt-2 space-y-2">
                        <p className="font-medium">{selectedInquiry.clientName}</p>
                        <p className="text-sm text-gray-600">{selectedInquiry.company}</p>
                        <p className="text-sm text-gray-600">Contact: {selectedInquiry.contactPerson}</p>
                        <p className="text-sm text-gray-600">{selectedInquiry.email}</p>
                        <p className="text-sm text-gray-600">{selectedInquiry.phone}</p>
                      </div>
                    </div>
                    <div>
                      <Label className="text-sm font-medium text-gray-500">Event Details</Label>
                      <div className="mt-2 space-y-2">
                        <p className="font-medium">{selectedInquiry.eventType}</p>
                        <p className="text-sm text-gray-600">Expected Guests: {selectedInquiry.expectedGuests}</p>
                        <p className="text-sm text-gray-600">Rooms Required: {selectedInquiry.roomsRequired}</p>
                        <p className="text-sm text-gray-600">Budget: {selectedInquiry.budgetRange}</p>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <Label className="text-sm font-medium text-gray-500">Dates</Label>
                      <div className="mt-2 space-y-2">
                        <p className="text-sm">
                          Check-in: {format(selectedInquiry.checkInDate, "EEEE, MMMM dd, yyyy")}
                        </p>
                        <p className="text-sm">
                          Check-out: {format(selectedInquiry.checkOutDate, "EEEE, MMMM dd, yyyy")}
                        </p>
                        <p className="text-sm text-gray-600">
                          Duration:{" "}
                          {Math.ceil(
                            (selectedInquiry.checkOutDate - selectedInquiry.checkInDate) / (1000 * 60 * 60 * 24),
                          )}{" "}
                          nights
                        </p>
                      </div>
                    </div>
                    <div>
                      <Label className="text-sm font-medium text-gray-500">Status & Priority</Label>
                      <div className="mt-2 space-y-2">
                        <div className="flex items-center space-x-2">
                          <Badge className={getStatusColor(selectedInquiry.status)}>{selectedInquiry.status}</Badge>
                          <Badge className={getPriorityColor(selectedInquiry.priority)}>
                            {selectedInquiry.priority}
                          </Badge>
                        </div>
                        <p className="text-sm text-gray-600">Assigned to: {selectedInquiry.assignedTo}</p>
                        <p className="text-sm text-gray-600">
                          Created: {format(selectedInquiry.createdAt, "MMM dd, yyyy")}
                        </p>
                        <p className="text-sm text-gray-600">
                          Last Updated: {format(selectedInquiry.lastUpdated, "MMM dd, yyyy")}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div>
                  <Label className="text-sm font-medium text-gray-500">Special Requirements</Label>
                  <p className="mt-2 text-sm">{selectedInquiry.specialRequirements}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium text-gray-500">Notes</Label>
                  <p className="mt-2 text-sm">{selectedInquiry.notes}</p>
                </div>
                <div className="flex items-center justify-between pt-4 border-t">
                  <div>
                    <Label className="text-sm font-medium text-gray-500">Estimated Revenue</Label>
                    <p className="text-lg font-bold text-green-600">
                      ${selectedInquiry.estimatedRevenue.toLocaleString()}
                    </p>
                  </div>
                  <div className="flex space-x-2">
                    <Button variant="outline" onClick={() => handleGeneratePDF(selectedInquiry)}>
                      <Download className="w-4 h-4 mr-2" />
                      Generate PDF
                    </Button>
                    <Button>Create Quote</Button>
                  </div>
                </div>
              </div>
            )}
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsViewDialogOpen(false)}>
                Close
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )
}
