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
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Plus, Search, FileText, Download, Send, DollarSign, CheckCircle, Clock, AlertCircle } from "lucide-react"
import { format } from "date-fns"

// Mock invoice data
const initialInvoices = [
  {
    id: "INV001",
    invoiceNumber: "2024-001",
    clientName: "ABC Corporation",
    clientEmail: "john.smith@abccorp.com",
    inquiryId: "INQ001",
    bookingId: "BK001",
    issueDate: new Date("2024-01-15"),
    dueDate: new Date("2024-02-14"),
    amount: 62500,
    paidAmount: 62500,
    status: "paid",
    paymentMethod: "Bank Transfer",
    items: [
      { description: "Conference Room Rental (3 days)", quantity: 3, rate: 2500, amount: 7500 },
      { description: "Standard Rooms (75 rooms x 3 nights)", quantity: 225, rate: 180, amount: 40500 },
      { description: "Catering Services", quantity: 1, rate: 8000, amount: 8000 },
      { description: "AV Equipment Package", quantity: 1, rate: 3500, amount: 3500 },
      { description: "Service Charge (5%)", quantity: 1, rate: 3000, amount: 3000 },
    ],
    notes: "Payment due within 30 days. Late payment charges may apply.",
    createdAt: new Date("2024-01-15"),
    paidAt: new Date("2024-01-20"),
  },
  {
    id: "INV002",
    invoiceNumber: "2024-002",
    clientName: "Wedding Planners Inc",
    clientEmail: "emily@weddingplanners.com",
    inquiryId: "INQ002",
    bookingId: "BK002",
    issueDate: new Date("2024-01-18"),
    dueDate: new Date("2024-02-17"),
    amount: 30000,
    paidAmount: 15000,
    status: "partial",
    paymentMethod: "Credit Card",
    items: [
      { description: "Bridal Suite (2 nights)", quantity: 2, rate: 500, amount: 1000 },
      { description: "Standard Rooms (40 rooms x 2 nights)", quantity: 80, rate: 150, amount: 12000 },
      { description: "Wedding Reception Hall", quantity: 1, rate: 5000, amount: 5000 },
      { description: "Catering Package", quantity: 80, rate: 125, amount: 10000 },
      { description: "Floral Arrangements", quantity: 1, rate: 2000, amount: 2000 },
    ],
    notes: "50% deposit received. Balance due before event date.",
    createdAt: new Date("2024-01-18"),
    paidAt: null,
  },
  {
    id: "INV003",
    invoiceNumber: "2024-003",
    clientName: "Tech Innovators Ltd",
    clientEmail: "david@techinnovators.com",
    inquiryId: "INQ003",
    bookingId: null,
    issueDate: new Date("2024-01-20"),
    dueDate: new Date("2024-02-19"),
    amount: 87500,
    paidAmount: 0,
    status: "pending",
    paymentMethod: null,
    items: [
      { description: "Executive Conference Center (2 days)", quantity: 2, rate: 5000, amount: 10000 },
      { description: "Deluxe Rooms (100 rooms x 2 nights)", quantity: 200, rate: 220, amount: 44000 },
      { description: "Premium Catering Package", quantity: 200, rate: 85, amount: 17000 },
      { description: "High-Speed Internet & AV Setup", quantity: 1, rate: 8000, amount: 8000 },
      { description: "Networking Space Rental", quantity: 2, rate: 2500, amount: 5000 },
      { description: "Service Charge (4%)", quantity: 1, rate: 3500, amount: 3500 },
    ],
    notes: "Quote valid for 30 days. Payment terms: Net 30.",
    createdAt: new Date("2024-01-20"),
    paidAt: null,
  },
]

export default function InvoicesPage() {
  const [invoices, setInvoices] = useState(initialInvoices)
  const [searchTerm, setSearchTerm] = useState("")
  const [filterStatus, setFilterStatus] = useState("all")
  const [selectedInvoice, setSelectedInvoice] = useState(null)
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false)
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)

  const filteredInvoices = invoices.filter((invoice) => {
    const matchesSearch =
      invoice.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      invoice.invoiceNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      invoice.id.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = filterStatus === "all" || invoice.status === filterStatus
    return matchesSearch && matchesStatus
  })

  const getStatusColor = (status) => {
    switch (status) {
      case "paid":
        return "bg-green-100 text-green-800"
      case "partial":
        return "bg-yellow-100 text-yellow-800"
      case "pending":
        return "bg-blue-100 text-blue-800"
      case "overdue":
        return "bg-red-100 text-red-800"
      case "cancelled":
        return "bg-gray-100 text-gray-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusIcon = (status) => {
    switch (status) {
      case "paid":
        return <CheckCircle className="w-4 h-4" />
      case "partial":
        return <Clock className="w-4 h-4" />
      case "pending":
        return <Clock className="w-4 h-4" />
      case "overdue":
        return <AlertCircle className="w-4 h-4" />
      default:
        return <Clock className="w-4 h-4" />
    }
  }

  const handleViewInvoice = (invoice) => {
    setSelectedInvoice(invoice)
    setIsViewDialogOpen(true)
  }

  const handleGenerateInvoicePDF = (invoice) => {
    console.log("Generating invoice PDF for:", invoice.invoiceNumber)
    alert(`Generating invoice PDF for ${invoice.invoiceNumber}`)
  }

  const handleSendInvoice = (invoice) => {
    console.log("Sending invoice:", invoice.invoiceNumber)
    alert(`Sending invoice ${invoice.invoiceNumber} to ${invoice.clientEmail}`)
  }

  const handleMarkAsPaid = (invoiceId) => {
    setInvoices(
      invoices.map((invoice) =>
        invoice.id === invoiceId
          ? { ...invoice, status: "paid", paidAmount: invoice.amount, paidAt: new Date() }
          : invoice,
      ),
    )
  }

  const totalInvoices = invoices.length
  const paidInvoices = invoices.filter((i) => i.status === "paid").length
  const pendingInvoices = invoices.filter((i) => i.status === "pending").length
  const totalRevenue = invoices.reduce((sum, i) => sum + i.paidAmount, 0)
  const outstandingAmount = invoices.reduce((sum, i) => sum + (i.amount - i.paidAmount), 0)

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Invoice Management</h1>
            <p className="text-gray-600">Generate, track, and manage client invoices</p>
          </div>
          <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                Create Invoice
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle>Create New Invoice</DialogTitle>
                <DialogDescription>Generate an invoice from a confirmed inquiry</DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div>
                  <Label htmlFor="inquiry-select">Select Inquiry</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Choose confirmed inquiry" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="INQ004">INQ004 - XYZ Company Event</SelectItem>
                      <SelectItem value="INQ005">INQ005 - Annual Conference</SelectItem>
                      <SelectItem value="INQ006">INQ006 - Product Launch</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="due-date">Due Date</Label>
                  <Input type="date" id="due-date" />
                </div>
                <div>
                  <Label htmlFor="payment-terms">Payment Terms</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select payment terms" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="net15">Net 15 days</SelectItem>
                      <SelectItem value="net30">Net 30 days</SelectItem>
                      <SelectItem value="net45">Net 45 days</SelectItem>
                      <SelectItem value="due-on-receipt">Due on receipt</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={() => setIsCreateDialogOpen(false)}>Generate Invoice</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </header>

      <div className="p-6">
        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Invoices</CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalInvoices}</div>
              <p className="text-xs text-muted-foreground">All time</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Paid</CardTitle>
              <CheckCircle className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">{paidInvoices}</div>
              <p className="text-xs text-muted-foreground">Completed payments</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pending</CardTitle>
              <Clock className="h-4 w-4 text-yellow-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-yellow-600">{pendingInvoices}</div>
              <p className="text-xs text-muted-foreground">Awaiting payment</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">${totalRevenue.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">Received payments</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Outstanding</CardTitle>
              <AlertCircle className="h-4 w-4 text-red-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-600">${outstandingAmount.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">Pending payments</p>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <div className="flex items-center space-x-4 mb-6">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="Search invoices..."
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
              <SelectItem value="all">All Invoices</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="partial">Partially Paid</SelectItem>
              <SelectItem value="paid">Paid</SelectItem>
              <SelectItem value="overdue">Overdue</SelectItem>
              <SelectItem value="cancelled">Cancelled</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Invoices Table */}
        <Card>
          <CardHeader>
            <CardTitle>All Invoices</CardTitle>
            <CardDescription>Track and manage all generated invoices</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Invoice #</TableHead>
                  <TableHead>Client</TableHead>
                  <TableHead>Issue Date</TableHead>
                  <TableHead>Due Date</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Paid</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredInvoices.map((invoice) => (
                  <TableRow key={invoice.id}>
                    <TableCell className="font-medium">{invoice.invoiceNumber}</TableCell>
                    <TableCell>
                      <div>
                        <div className="font-medium">{invoice.clientName}</div>
                        <div className="text-sm text-gray-500">{invoice.clientEmail}</div>
                        <div className="text-sm text-gray-500">Inquiry: {invoice.inquiryId}</div>
                      </div>
                    </TableCell>
                    <TableCell>{format(invoice.issueDate, "MMM dd, yyyy")}</TableCell>
                    <TableCell>{format(invoice.dueDate, "MMM dd, yyyy")}</TableCell>
                    <TableCell>
                      <div className="font-medium">${invoice.amount.toLocaleString()}</div>
                    </TableCell>
                    <TableCell>
                      <div className="font-medium text-green-600">${invoice.paidAmount.toLocaleString()}</div>
                      {invoice.paidAmount < invoice.amount && (
                        <div className="text-sm text-red-600">
                          Outstanding: ${(invoice.amount - invoice.paidAmount).toLocaleString()}
                        </div>
                      )}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        {getStatusIcon(invoice.status)}
                        <Badge className={getStatusColor(invoice.status)}>{invoice.status}</Badge>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm" onClick={() => handleViewInvoice(invoice)}>
                          View
                        </Button>
                        <Button variant="outline" size="sm" onClick={() => handleGenerateInvoicePDF(invoice)}>
                          <Download className="w-4 h-4" />
                        </Button>
                        <Button variant="outline" size="sm" onClick={() => handleSendInvoice(invoice)}>
                          <Send className="w-4 h-4" />
                        </Button>
                        {invoice.status !== "paid" && (
                          <Button variant="outline" size="sm" onClick={() => handleMarkAsPaid(invoice.id)}>
                            Mark Paid
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

        {/* Invoice Details Dialog */}
        <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
          <DialogContent className="max-w-4xl">
            <DialogHeader>
              <DialogTitle>Invoice Details - {selectedInvoice?.invoiceNumber}</DialogTitle>
              <DialogDescription>Complete invoice information and line items</DialogDescription>
            </DialogHeader>
            {selectedInvoice && (
              <div className="grid gap-6 py-4">
                {/* Invoice Header */}
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <Label className="text-sm font-medium text-gray-500">Bill To</Label>
                    <div className="mt-2">
                      <p className="font-medium">{selectedInvoice.clientName}</p>
                      <p className="text-sm text-gray-600">{selectedInvoice.clientEmail}</p>
                    </div>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-gray-500">Invoice Information</Label>
                    <div className="mt-2 space-y-1">
                      <p className="text-sm">
                        Invoice #: <span className="font-medium">{selectedInvoice.invoiceNumber}</span>
                      </p>
                      <p className="text-sm">
                        Issue Date:{" "}
                        <span className="font-medium">{format(selectedInvoice.issueDate, "MMM dd, yyyy")}</span>
                      </p>
                      <p className="text-sm">
                        Due Date: <span className="font-medium">{format(selectedInvoice.dueDate, "MMM dd, yyyy")}</span>
                      </p>
                      <p className="text-sm">
                        Related Inquiry: <span className="font-medium">{selectedInvoice.inquiryId}</span>
                      </p>
                    </div>
                  </div>
                </div>

                {/* Line Items */}
                <div>
                  <Label className="text-sm font-medium text-gray-500">Line Items</Label>
                  <div className="mt-2 border rounded-lg overflow-hidden">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Description</TableHead>
                          <TableHead className="text-right">Qty</TableHead>
                          <TableHead className="text-right">Rate</TableHead>
                          <TableHead className="text-right">Amount</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {selectedInvoice.items.map((item, index) => (
                          <TableRow key={index}>
                            <TableCell>{item.description}</TableCell>
                            <TableCell className="text-right">{item.quantity}</TableCell>
                            <TableCell className="text-right">${item.rate.toLocaleString()}</TableCell>
                            <TableCell className="text-right font-medium">${item.amount.toLocaleString()}</TableCell>
                          </TableRow>
                        ))}
                        <TableRow className="border-t-2">
                          <TableCell colSpan={3} className="text-right font-medium">
                            Total Amount:
                          </TableCell>
                          <TableCell className="text-right font-bold text-lg">
                            ${selectedInvoice.amount.toLocaleString()}
                          </TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </div>
                </div>

                {/* Payment Information */}
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <Label className="text-sm font-medium text-gray-500">Payment Status</Label>
                    <div className="mt-2 space-y-2">
                      <div className="flex items-center space-x-2">
                        {getStatusIcon(selectedInvoice.status)}
                        <Badge className={getStatusColor(selectedInvoice.status)}>{selectedInvoice.status}</Badge>
                      </div>
                      <p className="text-sm">
                        Amount Paid:{" "}
                        <span className="font-medium text-green-600">
                          ${selectedInvoice.paidAmount.toLocaleString()}
                        </span>
                      </p>
                      {selectedInvoice.paidAmount < selectedInvoice.amount && (
                        <p className="text-sm">
                          Outstanding:{" "}
                          <span className="font-medium text-red-600">
                            ${(selectedInvoice.amount - selectedInvoice.paidAmount).toLocaleString()}
                          </span>
                        </p>
                      )}
                      {selectedInvoice.paymentMethod && (
                        <p className="text-sm">
                          Payment Method: <span className="font-medium">{selectedInvoice.paymentMethod}</span>
                        </p>
                      )}
                      {selectedInvoice.paidAt && (
                        <p className="text-sm">
                          Paid On: <span className="font-medium">{format(selectedInvoice.paidAt, "MMM dd, yyyy")}</span>
                        </p>
                      )}
                    </div>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-gray-500">Notes</Label>
                    <p className="mt-2 text-sm">{selectedInvoice.notes}</p>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex justify-between pt-4 border-t">
                  <div className="flex space-x-2">
                    <Button variant="outline" onClick={() => handleGenerateInvoicePDF(selectedInvoice)}>
                      <Download className="w-4 h-4 mr-2" />
                      Download PDF
                    </Button>
                    <Button variant="outline" onClick={() => handleSendInvoice(selectedInvoice)}>
                      <Send className="w-4 h-4 mr-2" />
                      Send Invoice
                    </Button>
                  </div>
                  {selectedInvoice.status !== "paid" && (
                    <Button onClick={() => handleMarkAsPaid(selectedInvoice.id)}>Mark as Paid</Button>
                  )}
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
