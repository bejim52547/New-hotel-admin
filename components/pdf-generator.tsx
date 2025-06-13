"use client"

import { Button } from "@/components/ui/button"
import { FileText } from "lucide-react"

interface PDFGeneratorProps {
  type: "inquiry" | "invoice"
  data: any
  onGenerate?: () => void
}

export function PDFGenerator({ type, data, onGenerate }: PDFGeneratorProps) {
  const handleGeneratePDF = async () => {
    try {
      // This would integrate with a PDF generation service like jsPDF, Puppeteer, or a server-side service
      const pdfContent = generatePDFContent(type, data)

      // For demo purposes, we'll create a simple text file
      const blob = new Blob([pdfContent], { type: "text/plain" })
      const url = URL.createObjectURL(blob)

      const link = document.createElement("a")
      link.href = url
      link.download = `${type}-${data.id || data.invoiceNumber}.txt`
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      URL.revokeObjectURL(url)

      onGenerate?.()
    } catch (error) {
      console.error("Error generating PDF:", error)
      alert("Error generating PDF. Please try again.")
    }
  }

  return (
    <Button variant="outline" onClick={handleGeneratePDF}>
      <FileText className="w-4 h-4 mr-2" />
      Generate {type === "inquiry" ? "Inquiry Letter" : "Invoice"} PDF
    </Button>
  )
}

function generatePDFContent(type: "inquiry" | "invoice", data: any): string {
  if (type === "inquiry") {
    return generateInquiryLetter(data)
  } else {
    return generateInvoiceDocument(data)
  }
}

function generateInquiryLetter(inquiry: any): string {
  const today = new Date().toLocaleDateString()

  return `
PRELIMINARY INQUIRY LETTER
${inquiry.id}

Date: ${today}

Dear ${inquiry.contactPerson},

Thank you for your interest in our hotel services. We have received your inquiry for the following event:

CLIENT INFORMATION:
- Company: ${inquiry.clientName}
- Contact Person: ${inquiry.contactPerson}
- Email: ${inquiry.email}
- Phone: ${inquiry.phone}

EVENT DETAILS:
- Event Type: ${inquiry.eventType}
- Expected Guests: ${inquiry.expectedGuests}
- Check-in Date: ${inquiry.checkInDate?.toLocaleDateString()}
- Check-out Date: ${inquiry.checkOutDate?.toLocaleDateString()}
- Rooms Required: ${inquiry.roomsRequired}
- Budget Range: ${inquiry.budgetRange}

SPECIAL REQUIREMENTS:
${inquiry.specialRequirements}

We are pleased to confirm that we can accommodate your event requirements. Our team will prepare a detailed proposal including:

1. Room allocation and pricing
2. Event space availability
3. Catering options
4. Additional services and amenities
5. Terms and conditions

NEXT STEPS:
1. Please review this preliminary inquiry letter
2. Confirm your requirements and any changes
3. We will prepare a detailed quote within 2-3 business days
4. Upon your approval, we will proceed with the booking confirmation

We look forward to hosting your event and providing exceptional service. Please don't hesitate to contact us if you have any questions or require additional information.

Best regards,

Hotel Management Team
Grand Plaza Hotel
Phone: +1-555-0100
Email: info@grandplaza.com

---
This is a preliminary inquiry letter. Final terms and conditions will be provided in the formal quote.
Generated on: ${today}
  `
}

function generateInvoiceDocument(invoice: any): string {
  const today = new Date().toLocaleDateString()

  let itemsText = ""
  invoice.items?.forEach((item: any, index: number) => {
    itemsText += `${index + 1}. ${item.description}
   Quantity: ${item.quantity} | Rate: $${item.rate.toLocaleString()} | Amount: $${item.amount.toLocaleString()}

`
  })

  return `
INVOICE
${invoice.invoiceNumber}

Date: ${today}

BILL TO:
${invoice.clientName}
${invoice.clientEmail}

INVOICE DETAILS:
- Invoice Number: ${invoice.invoiceNumber}
- Issue Date: ${invoice.issueDate?.toLocaleDateString()}
- Due Date: ${invoice.dueDate?.toLocaleDateString()}
- Related Inquiry: ${invoice.inquiryId}

LINE ITEMS:
${itemsText}

TOTAL AMOUNT: $${invoice.amount?.toLocaleString()}
AMOUNT PAID: $${invoice.paidAmount?.toLocaleString()}
OUTSTANDING: $${((invoice.amount || 0) - (invoice.paidAmount || 0)).toLocaleString()}

PAYMENT STATUS: ${invoice.status?.toUpperCase()}
${invoice.paymentMethod ? `PAYMENT METHOD: ${invoice.paymentMethod}` : ""}
${invoice.paidAt ? `PAID ON: ${invoice.paidAt.toLocaleDateString()}` : ""}

NOTES:
${invoice.notes}

PAYMENT INSTRUCTIONS:
Please remit payment within the specified due date. Late payments may incur additional charges.

For questions regarding this invoice, please contact:
Grand Plaza Hotel
Phone: +1-555-0100
Email: billing@grandplaza.com

Thank you for your business!

---
Generated on: ${today}
  `
}
