"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { CalendarDays, Users, DollarSign, Bed, TrendingUp, TrendingDown, Calendar, Clock } from "lucide-react"
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
} from "recharts"

// Mock data
const dashboardStats = {
  totalRooms: 150,
  occupiedRooms: 127,
  totalGuests: 245,
  monthlyRevenue: 125000,
  occupancyRate: 84.7,
  avgDailyRate: 185,
  pendingBookings: 23,
  checkInsToday: 18,
}

const revenueData = [
  { month: "Jan", revenue: 95000, bookings: 180 },
  { month: "Feb", revenue: 105000, bookings: 195 },
  { month: "Mar", revenue: 115000, bookings: 210 },
  { month: "Apr", revenue: 125000, bookings: 225 },
  { month: "May", revenue: 135000, bookings: 240 },
  { month: "Jun", revenue: 145000, bookings: 255 },
]

const occupancyData = [
  { name: "Standard", value: 45, color: "#8884d8" },
  { name: "Deluxe", value: 30, color: "#82ca9d" },
  { name: "Suite", value: 15, color: "#ffc658" },
  { name: "Presidential", value: 10, color: "#ff7300" },
]

const recentBookings = [
  {
    id: "BK001",
    guest: "John Smith",
    room: "101",
    checkIn: "2024-01-15",
    checkOut: "2024-01-18",
    status: "confirmed",
    amount: 450,
  },
  {
    id: "BK002",
    guest: "Sarah Johnson",
    room: "205",
    checkIn: "2024-01-16",
    checkOut: "2024-01-20",
    status: "pending",
    amount: 680,
  },
  {
    id: "BK003",
    guest: "Mike Davis",
    room: "301",
    checkIn: "2024-01-17",
    checkOut: "2024-01-19",
    status: "confirmed",
    amount: 320,
  },
  {
    id: "BK004",
    guest: "Emily Brown",
    room: "150",
    checkIn: "2024-01-18",
    checkOut: "2024-01-22",
    status: "confirmed",
    amount: 890,
  },
]

export default function Dashboard() {
  const [selectedPeriod, setSelectedPeriod] = useState("month")

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Hotel Management Dashboard</h1>
            <p className="text-gray-600">Welcome back! Here's what's happening at your property today.</p>
          </div>
          <div className="flex items-center space-x-4">
            <Button variant="outline">
              <Calendar className="w-4 h-4 mr-2" />
              Today: Jan 15, 2024
            </Button>
            <Button>
              <Clock className="w-4 h-4 mr-2" />
              Quick Check-in
            </Button>
          </div>
        </div>
      </header>

      <div className="p-6">
        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${dashboardStats.monthlyRevenue.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">
                <TrendingUp className="inline w-3 h-3 mr-1" />
                +12.5% from last month
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Occupancy Rate</CardTitle>
              <Bed className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{dashboardStats.occupancyRate}%</div>
              <p className="text-xs text-muted-foreground">
                {dashboardStats.occupiedRooms}/{dashboardStats.totalRooms} rooms occupied
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Guests</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{dashboardStats.totalGuests}</div>
              <p className="text-xs text-muted-foreground">
                <TrendingUp className="inline w-3 h-3 mr-1" />
                +8.2% from last month
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Avg Daily Rate</CardTitle>
              <CalendarDays className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${dashboardStats.avgDailyRate}</div>
              <p className="text-xs text-muted-foreground">
                <TrendingDown className="inline w-3 h-3 mr-1" />
                -2.1% from last month
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Charts and Analytics */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <Card>
            <CardHeader>
              <CardTitle>Revenue Trend</CardTitle>
              <CardDescription>Monthly revenue and booking trends</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={revenueData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="revenue" stroke="#8884d8" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Room Type Distribution</CardTitle>
              <CardDescription>Current occupancy by room type</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={occupancyData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {occupancyData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Recent Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Recent Bookings</CardTitle>
              <CardDescription>Latest reservation activity</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentBookings.map((booking) => (
                  <div key={booking.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center space-x-4">
                      <div>
                        <p className="font-medium">{booking.guest}</p>
                        <p className="text-sm text-gray-600">
                          Room {booking.room} • {booking.id}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">${booking.amount}</p>
                      <div className="flex items-center space-x-2">
                        <Badge variant={booking.status === "confirmed" ? "default" : "secondary"}>
                          {booking.status}
                        </Badge>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Today's Tasks</CardTitle>
              <CardDescription>Important activities for today</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                  <div>
                    <p className="font-medium">Check-ins: {dashboardStats.checkInsToday}</p>
                    <p className="text-sm text-gray-600">Guests arriving today</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                  <div>
                    <p className="font-medium">Pending: {dashboardStats.pendingBookings}</p>
                    <p className="text-sm text-gray-600">Bookings awaiting confirmation</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <div>
                    <p className="font-medium">Maintenance: 3</p>
                    <p className="text-sm text-gray-600">Rooms under maintenance</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <div>
                    <p className="font-medium">Housekeeping: 12</p>
                    <p className="text-sm text-gray-600">Rooms being cleaned</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
