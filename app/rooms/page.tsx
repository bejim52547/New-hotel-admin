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
import { Plus, Search, Edit, Trash2, Bed, Users, Wifi, Car, Coffee, Tv } from "lucide-react"

// Mock room data
const initialRooms = [
  {
    id: 1,
    number: "101",
    type: "Standard",
    capacity: 2,
    price: 120,
    status: "available",
    amenities: ["wifi", "tv", "coffee"],
    description: "Comfortable standard room with city view",
    size: 25,
    bedType: "Queen",
  },
  {
    id: 2,
    number: "102",
    type: "Standard",
    capacity: 2,
    price: 120,
    status: "occupied",
    amenities: ["wifi", "tv", "coffee"],
    description: "Comfortable standard room with city view",
    size: 25,
    bedType: "Queen",
  },
  {
    id: 3,
    number: "201",
    type: "Deluxe",
    capacity: 3,
    price: 180,
    status: "available",
    amenities: ["wifi", "tv", "coffee", "parking"],
    description: "Spacious deluxe room with premium amenities",
    size: 35,
    bedType: "King",
  },
  {
    id: 4,
    number: "301",
    type: "Suite",
    capacity: 4,
    price: 350,
    status: "maintenance",
    amenities: ["wifi", "tv", "coffee", "parking"],
    description: "Luxury suite with separate living area",
    size: 60,
    bedType: "King + Sofa",
  },
]

const amenityIcons = {
  wifi: Wifi,
  tv: Tv,
  coffee: Coffee,
  parking: Car,
}

export default function RoomsPage() {
  const [rooms, setRooms] = useState(initialRooms)
  const [searchTerm, setSearchTerm] = useState("")
  const [filterStatus, setFilterStatus] = useState("all")
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [editingRoom, setEditingRoom] = useState(null)

  const [newRoom, setNewRoom] = useState({
    number: "",
    type: "",
    capacity: 1,
    price: 0,
    status: "available",
    amenities: [],
    description: "",
    size: 0,
    bedType: "",
  })

  const filteredRooms = rooms.filter((room) => {
    const matchesSearch =
      room.number.toLowerCase().includes(searchTerm.toLowerCase()) ||
      room.type.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = filterStatus === "all" || room.status === filterStatus
    return matchesSearch && matchesStatus
  })

  const handleAddRoom = () => {
    const room = {
      ...newRoom,
      id: Math.max(...rooms.map((r) => r.id)) + 1,
    }
    setRooms([...rooms, room])
    setNewRoom({
      number: "",
      type: "",
      capacity: 1,
      price: 0,
      status: "available",
      amenities: [],
      description: "",
      size: 0,
      bedType: "",
    })
    setIsAddDialogOpen(false)
  }

  const handleDeleteRoom = (id) => {
    setRooms(rooms.filter((room) => room.id !== id))
  }

  const getStatusColor = (status) => {
    switch (status) {
      case "available":
        return "bg-green-100 text-green-800"
      case "occupied":
        return "bg-red-100 text-red-800"
      case "maintenance":
        return "bg-yellow-100 text-yellow-800"
      case "cleaning":
        return "bg-blue-100 text-blue-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Room Management</h1>
            <p className="text-gray-600">Manage your hotel rooms, pricing, and availability</p>
          </div>
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                Add Room
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle>Add New Room</DialogTitle>
                <DialogDescription>Create a new room listing for your hotel</DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="room-number">Room Number</Label>
                    <Input
                      id="room-number"
                      value={newRoom.number}
                      onChange={(e) => setNewRoom({ ...newRoom, number: e.target.value })}
                      placeholder="101"
                    />
                  </div>
                  <div>
                    <Label htmlFor="room-type">Room Type</Label>
                    <Select value={newRoom.type} onValueChange={(value) => setNewRoom({ ...newRoom, type: value })}>
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
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="capacity">Capacity</Label>
                    <Input
                      id="capacity"
                      type="number"
                      value={newRoom.capacity}
                      onChange={(e) => setNewRoom({ ...newRoom, capacity: Number.parseInt(e.target.value) })}
                      min="1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="price">Price per Night</Label>
                    <Input
                      id="price"
                      type="number"
                      value={newRoom.price}
                      onChange={(e) => setNewRoom({ ...newRoom, price: Number.parseInt(e.target.value) })}
                      min="0"
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={newRoom.description}
                    onChange={(e) => setNewRoom({ ...newRoom, description: e.target.value })}
                    placeholder="Room description..."
                  />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleAddRoom}>Add Room</Button>
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
              placeholder="Search rooms..."
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
              <SelectItem value="all">All Rooms</SelectItem>
              <SelectItem value="available">Available</SelectItem>
              <SelectItem value="occupied">Occupied</SelectItem>
              <SelectItem value="maintenance">Maintenance</SelectItem>
              <SelectItem value="cleaning">Cleaning</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Room Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredRooms.map((room) => (
            <Card key={room.id} className="hover:shadow-lg transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">Room {room.number}</CardTitle>
                  <Badge className={getStatusColor(room.status)}>{room.status}</Badge>
                </div>
                <CardDescription>
                  {room.type} • {room.size}m²
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Users className="w-4 h-4 text-gray-500" />
                      <span className="text-sm">{room.capacity} guests</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Bed className="w-4 h-4 text-gray-500" />
                      <span className="text-sm">{room.bedType}</span>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    {room.amenities.map((amenity) => {
                      const Icon = amenityIcons[amenity]
                      return Icon ? <Icon key={amenity} className="w-4 h-4 text-gray-500" /> : null
                    })}
                  </div>

                  <p className="text-sm text-gray-600 line-clamp-2">{room.description}</p>

                  <div className="flex items-center justify-between pt-2">
                    <span className="text-2xl font-bold text-green-600">${room.price}</span>
                    <span className="text-sm text-gray-500">per night</span>
                  </div>

                  <div className="flex space-x-2 pt-2">
                    <Button variant="outline" size="sm" className="flex-1">
                      <Edit className="w-4 h-4 mr-1" />
                      Edit
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDeleteRoom(room.id)}
                      className="text-red-600 hover:text-red-700"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredRooms.length === 0 && (
          <div className="text-center py-12">
            <Bed className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No rooms found</h3>
            <p className="text-gray-600">Try adjusting your search or filter criteria</p>
          </div>
        )}
      </div>
    </div>
  )
}
