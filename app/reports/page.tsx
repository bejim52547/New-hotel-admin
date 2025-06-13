"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  BarChart,
  Bar,
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
  AreaChart,
  Area,
} from "recharts"
import { Download, TrendingUp, TrendingDown, DollarSign, Bed, CalendarDays } from "lucide-react"
import { format, subMonths } from "date-fns"

// Mock data for reports
const revenueData = [
  { month: "Jan", revenue: 95000, bookings: 180, occupancy: 78 },
  { month: "Feb", revenue: 105000, bookings: 195, occupancy: 82 },
  { month: "Mar", revenue: 115000, bookings: 210, occupancy: 85 },
  { month: "Apr", revenue: 125000, bookings: 225, occupancy: 88 },
  { month: "May", revenue: 135000, bookings: 240, occupancy: 91 },
  { month: "Jun", revenue: 145000, bookings: 255, occupancy: 94 },
]

const dailyOccupancyData = [
  { date: "2024-01-01", occupancy: 85, adr: 180 },
  { date: "2024-01-02", occupancy: 88, adr: 185 },
  { date: "2024-01-03", occupancy: 92, adr: 190 },
  { date: "2024-01-04", occupancy: 89, adr: 175 },
  { date: "2024-01-05", occupancy: 95, adr: 200 },
  { date: "2024-01-06", occupancy: 97, adr: 210 },
  { date: "2024-01-07", occupancy: 93, adr: 195 },
]

const roomTypeData = [
  { name: "Standard", bookings: 120, revenue: 18000, color: "#8884d8" },
  { name: "Deluxe", bookings: 80, revenue: 24000, color: "#82ca9d" },
  { name: "Suite", bookings: 40, revenue: 28000, color: "#ffc658" },
  { name: "Presidential", bookings: 15, revenue: 15000, color: "#ff7300" },
]

const guestSegmentData = [
  { segment: "Business", percentage: 45, color: "#8884d8" },
  { segment: "Leisure", percentage: 35, color: "#82ca9d" },
  { segment: "Group", percentage: 15, color: "#ffc658" },
  { segment: "Other", percentage: 5, color: "#ff7300" },
]

const topPerformingRooms = [
  { room: "301", type: "Suite", bookings: 28, revenue: 9800, occupancy: 93 },
  { room: "205", type: "Deluxe", bookings: 26, revenue: 7800, occupancy: 87 },
  { room: "150", type: "Presidential", bookings: 15, revenue: 15000, occupancy: 100 },
  { room: "101", type: "Standard", bookings: 25, revenue: 3000, occupancy: 83 },
  { room: "302", type: "Suite", bookings: 24, revenue: 8400, occupancy: 80 },
]

export default function ReportsPage() {
  const [selectedPeriod, setSelectedPeriod] = useState("month")
  const [dateRange, setDateRange] = useState({
    from: subMonths(new Date(), 1),
    to: new Date(),
  })

  const totalRevenue = revenueData.reduce((sum, item) => sum + item.revenue, 0)
  const totalBookings = revenueData.reduce((sum, item) => sum + item.bookings, 0)
  const avgOccupancy = revenueData.reduce((sum, item) => sum + item.occupancy, 0) / revenueData.length
  const avgADR = totalRevenue / totalBookings

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Reports & Analytics</h1>
            <p className="text-gray-600">Comprehensive insights into your hotel performance</p>
          </div>
          <div className="flex items-center space-x-4">
            <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Select period" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="week">This Week</SelectItem>
                <SelectItem value="month">This Month</SelectItem>
                <SelectItem value="quarter">This Quarter</SelectItem>
                <SelectItem value="year">This Year</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline">
              <Download className="w-4 h-4 mr-2" />
              Export Report
            </Button>
          </div>
        </div>
      </header>

      <div className="p-6">
        {/* Key Performance Indicators */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${totalRevenue.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">
                <TrendingUp className="inline w-3 h-3 mr-1" />
                +12.5% from last period
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Bookings</CardTitle>
              <CalendarDays className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalBookings}</div>
              <p className="text-xs text-muted-foreground">
                <TrendingUp className="inline w-3 h-3 mr-1" />
                +8.2% from last period
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Avg Occupancy</CardTitle>
              <Bed className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{avgOccupancy.toFixed(1)}%</div>
              <p className="text-xs text-muted-foreground">
                <TrendingUp className="inline w-3 h-3 mr-1" />
                +3.1% from last period
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Avg Daily Rate</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${avgADR.toFixed(0)}</div>
              <p className="text-xs text-muted-foreground">
                <TrendingDown className="inline w-3 h-3 mr-1" />
                -2.1% from last period
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Report Tabs */}
        <Tabs defaultValue="revenue" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="revenue">Revenue</TabsTrigger>
            <TabsTrigger value="occupancy">Occupancy</TabsTrigger>
            <TabsTrigger value="rooms">Room Performance</TabsTrigger>
            <TabsTrigger value="guests">Guest Analytics</TabsTrigger>
            <TabsTrigger value="forecast">Forecast</TabsTrigger>
          </TabsList>

          <TabsContent value="revenue" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Revenue Trend</CardTitle>
                  <CardDescription>Monthly revenue performance</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <AreaChart data={revenueData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip formatter={(value) => [`$${value.toLocaleString()}`, "Revenue"]} />
                      <Area type="monotone" dataKey="revenue" stroke="#8884d8" fill="#8884d8" fillOpacity={0.3} />
                    </AreaChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Revenue by Room Type</CardTitle>
                  <CardDescription>Revenue distribution across room categories</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={roomTypeData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, value }) => `${name}: $${value.toLocaleString()}`}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="revenue"
                      >
                        {roomTypeData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(value) => `$${value.toLocaleString()}`} />
                    </PieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Top Performing Rooms</CardTitle>
                <CardDescription>Rooms generating the highest revenue</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {topPerformingRooms.map((room, index) => (
                    <div key={room.room} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center space-x-4">
                        <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                          <span className="text-sm font-medium text-blue-600">#{index + 1}</span>
                        </div>
                        <div>
                          <p className="font-medium">Room {room.room}</p>
                          <p className="text-sm text-gray-600">{room.type}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">${room.revenue.toLocaleString()}</p>
                        <p className="text-sm text-gray-600">
                          {room.bookings} bookings • {room.occupancy}% occupancy
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="occupancy" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Daily Occupancy Rate</CardTitle>
                  <CardDescription>Occupancy trends over the past week</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={dailyOccupancyData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="date" tickFormatter={(value) => format(new Date(value), "MMM dd")} />
                      <YAxis />
                      <Tooltip labelFormatter={(value) => format(new Date(value), "MMM dd, yyyy")} />
                      <Line type="monotone" dataKey="occupancy" stroke="#8884d8" strokeWidth={2} />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Average Daily Rate</CardTitle>
                  <CardDescription>ADR trends over the past week</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={dailyOccupancyData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="date" tickFormatter={(value) => format(new Date(value), "MMM dd")} />
                      <YAxis />
                      <Tooltip labelFormatter={(value) => format(new Date(value), "MMM dd, yyyy")} />
                      <Line type="monotone" dataKey="adr" stroke="#82ca9d" strokeWidth={2} />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="rooms" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Room Type Performance</CardTitle>
                <CardDescription>Bookings and revenue by room category</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={400}>
                  <BarChart data={roomTypeData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis yAxisId="left" />
                    <YAxis yAxisId="right" orientation="right" />
                    <Tooltip />
                    <Bar yAxisId="left" dataKey="bookings" fill="#8884d8" name="Bookings" />
                    <Bar yAxisId="right" dataKey="revenue" fill="#82ca9d" name="Revenue ($)" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="guests" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Guest Segments</CardTitle>
                  <CardDescription>Distribution of guest types</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={guestSegmentData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, percentage }) => `${name} ${percentage}%`}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="percentage"
                      >
                        {guestSegmentData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Guest Satisfaction</CardTitle>
                  <CardDescription>Average ratings and feedback</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span>Overall Rating</span>
                      <div className="flex items-center space-x-2">
                        <span className="text-2xl font-bold">4.6</span>
                        <span className="text-gray-500">/5.0</span>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Service</span>
                        <span className="text-sm font-medium">4.8</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Cleanliness</span>
                        <span className="text-sm font-medium">4.7</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Location</span>
                        <span className="text-sm font-medium">4.5</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Value</span>
                        <span className="text-sm font-medium">4.3</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="forecast" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Revenue Forecast</CardTitle>
                <CardDescription>Projected revenue for the next 6 months</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <TrendingUp className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Forecast Coming Soon</h3>
                  <p className="text-gray-600">Advanced forecasting features will be available in the next update</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
