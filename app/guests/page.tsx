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
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Plus, Search, Edit, User, Mail, Phone, Calendar, Star } from "lucide-react"
import { format } from "date-fns"

// Mock guest data
const initialGuests = [
  {
    id: 1,
    firstName: "John",
    lastName: "Smith",
    email: "john.smith@email.com",
    phone: "+1-555-0123",
    address: "123 Main St, New York, NY 10001",
    dateOfBirth: new Date("1985-06-15"),
    nationality: "American",
    idType: "Passport",
    idNumber: "A12345678",
    vipStatus: "Gold",
    totalBookings: 8,
    totalSpent: 3200,
    lastVisit: new Date("2024-01-15"),
    preferences: "Non-smoking room, High floor",
    notes: "Frequent business traveler, prefers early check-in",
  },
  {
    id: 2,
    firstName: "Sarah",
    lastName: "Johnson",
    email: "sarah.j@email.com",
    phone: "+1-555-0124",
    address: "456 Oak Ave, Los Angeles, CA 90210",
    dateOfBirth: new Date("1990-03-22"),
    nationality: "American",
    idType: "Driver's License",
    idNumber: "DL987654321",
    vipStatus: "Silver",
    totalBookings: 4,
    totalSpent: 1800,
    lastVisit: new Date("2024-01-10"),
    preferences: "Ocean view, Late checkout",
    notes: "Celebrates anniversary in March",
  },
  {
    id: 3,
    firstName: "Mike",
    lastName: "Davis",
    email: "mike.davis@email.com",
    phone: "+1-555-0125",
    address: "789 Pine St, Chicago, IL 60601",
    dateOfBirth: new Date("1978-11-08"),
    nationality: "American",
    idType: "Passport",
    idNumber: "B98765432",
    vipStatus: "Platinum",
    totalBookings: 15,
    totalSpent: 8500,
    lastVisit: new Date("2023-12-20"),
    preferences: "Suite, Gym access, Business center",
    notes: "Corporate account, requires receipts",
  },
]

export default function GuestsPage() {
  const [guests, setGuests] = useState(initialGuests)
  const [searchTerm, setSearchTerm] = useState("")
  const [filterVipStatus, setFilterVipStatus] = useState("all")
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [selectedGuest, setSelectedGuest] = useState(null)
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false)

  const [newGuest, setNewGuest] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    dateOfBirth: null,
    nationality: "",
    idType: "",
    idNumber: "",
    preferences: "",
    notes: "",
  })

  const filteredGuests = guests.filter((guest) => {
    const matchesSearch =
      guest.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      guest.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      guest.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      guest.phone.includes(searchTerm)
    const matchesVipStatus = filterVipStatus === "all" || guest.vipStatus.toLowerCase() === filterVipStatus
    return matchesSearch && matchesVipStatus
  })

  const getVipStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case "platinum":
        return "bg-purple-100 text-purple-800"
      case "gold":
        return "bg-yellow-100 text-yellow-800"
      case "silver":
        return "bg-gray-100 text-gray-800"
      case "bronze":
        return "bg-orange-100 text-orange-800"
      default:
        return "bg-blue-100 text-blue-800"
    }
  }

  const handleAddGuest = () => {
    const guest = {
      ...newGuest,
      id: Math.max(...guests.map((g) => g.id)) + 1,
      vipStatus: "Bronze",
      totalBookings: 0,
      totalSpent: 0,
      lastVisit: null,
    }
    setGuests([...guests, guest])
    setNewGuest({
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      address: "",
      dateOfBirth: null,
      nationality: "",
      idType: "",
      idNumber: "",
      preferences: "",
      notes: "",
    })
    setIsAddDialogOpen(false)
  }

  const handleViewGuest = (guest) => {
    setSelectedGuest(guest)
    setIsViewDialogOpen(true)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Guest Management</h1>
            <p className="text-gray-600">Manage guest profiles, preferences, and history</p>
          </div>
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                Add Guest
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Add New Guest</DialogTitle>
                <DialogDescription>Create a new guest profile</DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="first-name">First Name</Label>
                    <Input
                      id="first-name"
                      value={newGuest.firstName}
                      onChange={(e) => setNewGuest({ ...newGuest, firstName: e.target.value })}
                      placeholder="John"
                    />
                  </div>
                  <div>
                    <Label htmlFor="last-name">Last Name</Label>
                    <Input
                      id="last-name"
                      value={newGuest.lastName}
                      onChange={(e) => setNewGuest({ ...newGuest, lastName: e.target.value })}
                      placeholder="Smith"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={newGuest.email}
                      onChange={(e) => setNewGuest({ ...newGuest, email: e.target.value })}
                      placeholder="john@example.com"
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone">Phone</Label>
                    <Input
                      id="phone"
                      value={newGuest.phone}
                      onChange={(e) => setNewGuest({ ...newGuest, phone: e.target.value })}
                      placeholder="+1-555-0123"
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="address">Address</Label>
                  <Input
                    id="address"
                    value={newGuest.address}
                    onChange={(e) => setNewGuest({ ...newGuest, address: e.target.value })}
                    placeholder="123 Main St, City, State, ZIP"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="nationality">Nationality</Label>
                    <Input
                      id="nationality"
                      value={newGuest.nationality}
                      onChange={(e) => setNewGuest({ ...newGuest, nationality: e.target.value })}
                      placeholder="American"
                    />
                  </div>
                  <div>
                    <Label htmlFor="id-type">ID Type</Label>
                    <Select
                      value={newGuest.idType}
                      onValueChange={(value) => setNewGuest({ ...newGuest, idType: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select ID type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Passport">Passport</SelectItem>
                        <SelectItem value="Driver's License">Driver's License</SelectItem>
                        <SelectItem value="National ID">National ID</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div>
                  <Label htmlFor="id-number">ID Number</Label>
                  <Input
                    id="id-number"
                    value={newGuest.idNumber}
                    onChange={(e) => setNewGuest({ ...newGuest, idNumber: e.target.value })}
                    placeholder="A12345678"
                  />
                </div>
                <div>
                  <Label htmlFor="preferences">Preferences</Label>
                  <Textarea
                    id="preferences"
                    value={newGuest.preferences}
                    onChange={(e) => setNewGuest({ ...newGuest, preferences: e.target.value })}
                    placeholder="Room preferences, special requests..."
                  />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleAddGuest}>Add Guest</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </header>

      <div className="p-6">
        {/* Filters */}
        <div className="flex items-center space-x-4 mb-6">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="Search guests..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <Select value={filterVipStatus} onValueChange={setFilterVipStatus}>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Filter by VIP status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Guests</SelectItem>
              <SelectItem value="platinum">Platinum</SelectItem>
              <SelectItem value="gold">Gold</SelectItem>
              <SelectItem value="silver">Silver</SelectItem>
              <SelectItem value="bronze">Bronze</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Guest Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Guests</CardTitle>
              <User className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{guests.length}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">VIP Guests</CardTitle>
              <Star className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {guests.filter((g) => ["Platinum", "Gold"].includes(g.vipStatus)).length}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Repeat Guests</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{guests.filter((g) => g.totalBookings > 1).length}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
              <Star className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                ${guests.reduce((sum, g) => sum + g.totalSpent, 0).toLocaleString()}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Guests Table */}
        <Card>
          <CardHeader>
            <CardTitle>Guest Directory</CardTitle>
            <CardDescription>Complete list of all registered guests</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Guest</TableHead>
                  <TableHead>Contact</TableHead>
                  <TableHead>VIP Status</TableHead>
                  <TableHead>Bookings</TableHead>
                  <TableHead>Total Spent</TableHead>
                  <TableHead>Last Visit</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredGuests.map((guest) => (
                  <TableRow key={guest.id}>
                    <TableCell>
                      <div>
                        <div className="font-medium">
                          {guest.firstName} {guest.lastName}
                        </div>
                        <div className="text-sm text-gray-500">{guest.nationality}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div>
                        <div className="text-sm flex items-center">
                          <Mail className="w-3 h-3 mr-1" />
                          {guest.email}
                        </div>
                        <div className="text-sm flex items-center">
                          <Phone className="w-3 h-3 mr-1" />
                          {guest.phone}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge className={getVipStatusColor(guest.vipStatus)}>{guest.vipStatus}</Badge>
                    </TableCell>
                    <TableCell>
                      <div className="font-medium">{guest.totalBookings}</div>
                    </TableCell>
                    <TableCell>
                      <div className="font-medium">${guest.totalSpent.toLocaleString()}</div>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm">
                        {guest.lastVisit ? format(guest.lastVisit, "MMM dd, yyyy") : "Never"}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm" onClick={() => handleViewGuest(guest)}>
                          View
                        </Button>
                        <Button variant="outline" size="sm">
                          <Edit className="w-4 h-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Guest Details Dialog */}
        <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Guest Details</DialogTitle>
              <DialogDescription>Complete guest profile and history</DialogDescription>
            </DialogHeader>
            {selectedGuest && (
              <div className="grid gap-6 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-sm font-medium text-gray-500">Full Name</Label>
                    <p className="text-lg font-medium">
                      {selectedGuest.firstName} {selectedGuest.lastName}
                    </p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-gray-500">VIP Status</Label>
                    <Badge className={getVipStatusColor(selectedGuest.vipStatus)}>{selectedGuest.vipStatus}</Badge>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-sm font-medium text-gray-500">Email</Label>
                    <p>{selectedGuest.email}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-gray-500">Phone</Label>
                    <p>{selectedGuest.phone}</p>
                  </div>
                </div>
                <div>
                  <Label className="text-sm font-medium text-gray-500">Address</Label>
                  <p>{selectedGuest.address}</p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-sm font-medium text-gray-500">Nationality</Label>
                    <p>{selectedGuest.nationality}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-gray-500">ID Type</Label>
                    <p>
                      {selectedGuest.idType}: {selectedGuest.idNumber}
                    </p>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <Label className="text-sm font-medium text-gray-500">Total Bookings</Label>
                    <p className="text-lg font-medium">{selectedGuest.totalBookings}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-gray-500">Total Spent</Label>
                    <p className="text-lg font-medium">${selectedGuest.totalSpent.toLocaleString()}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-gray-500">Last Visit</Label>
                    <p className="text-lg font-medium">
                      {selectedGuest.lastVisit ? format(selectedGuest.lastVisit, "MMM dd, yyyy") : "Never"}
                    </p>
                  </div>
                </div>
                <div>
                  <Label className="text-sm font-medium text-gray-500">Preferences</Label>
                  <p>{selectedGuest.preferences || "No preferences recorded"}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium text-gray-500">Notes</Label>
                  <p>{selectedGuest.notes || "No notes available"}</p>
                </div>
              </div>
            )}
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsViewDialogOpen(false)}>
                Close
              </Button>
              <Button>Edit Guest</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )
}
