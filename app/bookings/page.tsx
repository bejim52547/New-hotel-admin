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
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Plus, Search, Edit, CalendarIcon, Phone, Mail } from "lucide-react"
import { format } from "date-fns"

// Mock booking data
const initialBookings = [
  {
    id: "BK001",
    guestName: "John Smith",
    guestEmail: "john.smith@email.com",
    guestPhone: "+1-555-0123",
    roomNumber: "101",
    roomType: "Standard",
    checkIn: new Date("2024-01-15"),
    checkOut: new Date("2024-01-18"),
    guests: 2,
    totalAmount: 450,
    paidAmount: 450,
    status: "confirmed",
    paymentStatus: "paid",
    bookingDate: new Date("2024-01-10"),
    specialRequests: "Late check-in requested",
  },
  {
    id: "BK002",
    guestName: "Sarah Johnson",
    guestEmail: "sarah.j@email.com",
    guestPhone: "+1-555-0124",
    roomNumber: "205",
    roomType: "Deluxe",
    checkIn: new Date("2024-01-16"),
    checkOut: new Date("2024-01-20"),
    guests: 3,
    totalAmount: 680,
    paidAmount: 200,
    status: "pending",
    paymentStatus: "partial",
    bookingDate: new Date("2024-01-12"),
    specialRequests: "Extra bed required",
  },
  {
    id: "BK003",
    guestName: "Mike Davis",
    guestEmail: "mike.davis@email.com",
    guestPhone: "+1-555-0125",
    roomNumber: "301",
    roomType: "Suite",
    checkIn: new Date("2024-01-17"),
    checkOut: new Date("2024-01-19"),
    guests: 2,
    totalAmount: 890,
    paidAmount: 0,
    status: "cancelled",
    paymentStatus: "refunded",
    bookingDate: new Date("2024-01-08"),
    specialRequests: "",
  },
]

export default function BookingsPage() {
  const [bookings, setBookings] = useState(initialBookings)
  const [searchTerm, setSearchTerm] = useState("")
  const [filterStatus, setFilterStatus] = useState("all")
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [selectedBooking, setSelectedBooking] = useState(null)
  const [checkInDate, setCheckInDate] = useState(null)
  const [checkOutDate, setCheckOutDate] = useState(null)

  const [newBooking, setNewBooking] = useState({
    guestName: "",
    guestEmail: "",
    guestPhone: "",
    roomNumber: "",
    roomType: "",
    guests: 1,
    totalAmount: 0,
    specialRequests: "",
  })

  const filteredBookings = bookings.filter((booking) => {
    const matchesSearch =
      booking.guestName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.roomNumber.includes(searchTerm)
    const matchesStatus = filterStatus === "all" || booking.status === filterStatus
    return matchesSearch && matchesStatus
  })

  const getStatusColor = (status) => {
    switch (status) {
      case "confirmed":
        return "bg-green-100 text-green-800"
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      case "cancelled":
        return "bg-red-100 text-red-800"
      case "checked-in":
        return "bg-blue-100 text-blue-800"
      case "checked-out":
        return "bg-gray-100 text-gray-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getPaymentStatusColor = (status) => {
    switch (status) {
      case "paid":
        return "bg-green-100 text-green-800"
      case "partial":
        return "bg-yellow-100 text-yellow-800"
      case "pending":
        return "bg-red-100 text-red-800"
      case "refunded":
        return "bg-gray-100 text-gray-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const handleAddBooking = () => {
    if (!checkInDate || !checkOutDate) return

    const booking = {
      ...newBooking,
      id: `BK${String(Math.max(...bookings.map((b) => Number.parseInt(b.id.slice(2)))) + 1).padStart(3, "0")}`,
      checkIn: checkInDate,
      checkOut: checkOutDate,
      status: "pending",
      paymentStatus: "pending",
      paidAmount: 0,
      bookingDate: new Date(),
    }
    setBookings([...bookings, booking])
    setNewBooking({
      guestName: "",
      guestEmail: "",
      guestPhone: "",
      roomNumber: "",
      roomType: "",
      guests: 1,
      totalAmount: 0,
      specialRequests: "",
    })
    setCheckInDate(null)
    setCheckOutDate(null)
    setIsAddDialogOpen(false)
  }

  const handleStatusChange = (bookingId, newStatus) => {
    setBookings(bookings.map((booking) => (booking.id === bookingId ? { ...booking, status: newStatus } : booking)))
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Booking Management</h1>
            <p className="text-gray-600">Manage reservations, check-ins, and guest information</p>
          </div>
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                New Booking
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Create New Booking</DialogTitle>
                <DialogDescription>Add a new reservation to the system</DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="guest-name">Guest Name</Label>
                    <Input
                      id="guest-name"
                      value={newBooking.guestName}
                      onChange={(e) => setNewBooking({ ...newBooking, guestName: e.target.value })}
                      placeholder="John Smith"
                    />
                  </div>
                  <div>
                    <Label htmlFor="guest-email">Email</Label>
                    <Input
                      id="guest-email"
                      type="email"
                      value={newBooking.guestEmail}
                      onChange={(e) => setNewBooking({ ...newBooking, guestEmail: e.target.value })}
                      placeholder="john@example.com"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="guest-phone">Phone</Label>
                    <Input
                      id="guest-phone"
                      value={newBooking.guestPhone}
                      onChange={(e) => setNewBooking({ ...newBooking, guestPhone: e.target.value })}
                      placeholder="+1-555-0123"
                    />
                  </div>
                  <div>
                    <Label htmlFor="guests">Number of Guests</Label>
                    <Input
                      id="guests"
                      type="number"
                      value={newBooking.guests}
                      onChange={(e) => setNewBooking({ ...newBooking, guests: Number.parseInt(e.target.value) })}
                      min="1"
                    />
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
                    <Label htmlFor="room-number">Room Number</Label>
                    <Input
                      id="room-number"
                      value={newBooking.roomNumber}
                      onChange={(e) => setNewBooking({ ...newBooking, roomNumber: e.target.value })}
                      placeholder="101"
                    />
                  </div>
                  <div>
                    <Label htmlFor="room-type">Room Type</Label>
                    <Select
                      value={newBooking.roomType}
                      onValueChange={(value) => setNewBooking({ ...newBooking, roomType: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Standard">Standard</SelectItem>
                        <SelectItem value="Deluxe">Deluxe</SelectItem>
                        <SelectItem value="Suite">Suite</SelectItem>
                        <SelectItem value="Presidential">Presidential</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="total-amount">Total Amount</Label>
                    <Input
                      id="total-amount"
                      type="number"
                      value={newBooking.totalAmount}
                      onChange={(e) => setNewBooking({ ...newBooking, totalAmount: Number.parseInt(e.target.value) })}
                      min="0"
                    />
                  </div>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleAddBooking}>Create Booking</Button>
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
              placeholder="Search bookings..."
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
              <SelectItem value="all">All Bookings</SelectItem>
              <SelectItem value="confirmed">Confirmed</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="cancelled">Cancelled</SelectItem>
              <SelectItem value="checked-in">Checked In</SelectItem>
              <SelectItem value="checked-out">Checked Out</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Bookings Table */}
        <Card>
          <CardHeader>
            <CardTitle>All Bookings</CardTitle>
            <CardDescription>Manage and track all hotel reservations</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Booking ID</TableHead>
                  <TableHead>Guest</TableHead>
                  <TableHead>Room</TableHead>
                  <TableHead>Dates</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Payment</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredBookings.map((booking) => (
                  <TableRow key={booking.id}>
                    <TableCell className="font-medium">{booking.id}</TableCell>
                    <TableCell>
                      <div>
                        <div className="font-medium">{booking.guestName}</div>
                        <div className="text-sm text-gray-500 flex items-center">
                          <Mail className="w-3 h-3 mr-1" />
                          {booking.guestEmail}
                        </div>
                        <div className="text-sm text-gray-500 flex items-center">
                          <Phone className="w-3 h-3 mr-1" />
                          {booking.guestPhone}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div>
                        <div className="font-medium">Room {booking.roomNumber}</div>
                        <div className="text-sm text-gray-500">{booking.roomType}</div>
                        <div className="text-sm text-gray-500">{booking.guests} guests</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div>
                        <div className="text-sm">Check-in: {format(booking.checkIn, "MMM dd, yyyy")}</div>
                        <div className="text-sm">Check-out: {format(booking.checkOut, "MMM dd, yyyy")}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div>
                        <div className="font-medium">${booking.totalAmount}</div>
                        <div className="text-sm text-gray-500">Paid: ${booking.paidAmount}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge className={getStatusColor(booking.status)}>{booking.status}</Badge>
                    </TableCell>
                    <TableCell>
                      <Badge className={getPaymentStatusColor(booking.paymentStatus)}>{booking.paymentStatus}</Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm">
                          <Edit className="w-4 h-4" />
                        </Button>
                        {booking.status === "confirmed" && (
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleStatusChange(booking.id, "checked-in")}
                          >
                            Check In
                          </Button>
                        )}
                        {booking.status === "checked-in" && (
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleStatusChange(booking.id, "checked-out")}
                          >
                            Check Out
                          </Button>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
