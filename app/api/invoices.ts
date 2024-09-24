interface InvoiceBase {
  id: string;
  dueDate: string;
  recipient: string;
  amount: number;
  invoiceNumber: string;
  addedOn: string;
  description: string;
  attachment: string;
}

interface InboxInvoice extends InvoiceBase {
  status: "inbox";
  sentBy?: string;
  uploadedBy?: string;
  email?: {
    title: string;
    content: string;
  };
}

interface NeedingApprovalInvoice extends InvoiceBase {
  status: "needing_approval";
  uploadedBy: string;
}

interface ScheduledInvoice extends InvoiceBase {
  status: "scheduled";
  sentBy?: string;
  uploadedBy?: string;
  email?: {
    title: string;
    content: string;
  };
  scheduledDate: string;
}

interface PaidInvoice extends InvoiceBase {
  status: "paid";
  sentBy?: string;
  uploadedBy?: string;
  email?: {
    title: string;
    content: string;
  };
  paidDate: string;
}

type Invoice =
  | InboxInvoice
  | NeedingApprovalInvoice
  | ScheduledInvoice
  | PaidInvoice;

const mockInvoices: Invoice[] = [
  {
    id: "1",
    status: "inbox",
    dueDate: "Apr 2025",
    recipient: "Debug LLC",
    amount: 220.0,
    invoiceNumber: "INV-902",
    addedOn: "Sep 14",
    sentBy: "demo@mercury.com",
    description: "Sales Invoice",
    email: {
      title: "Sales Invoice",
      content: "Please pay the following invoice by the due date.",
    },
    attachment: "demo_invoice-after-ocr-2.pdf",
  },
  {
    id: "2",
    status: "inbox",
    dueDate: "Dec 2025",
    recipient: "Nano Tech LLC",
    amount: 1290.0,
    invoiceNumber: "INV-001",
    addedOn: "Sep 18",
    uploadedBy: "Jane",
    description: "demo_invoice-after-ocr-3.pdf",
    attachment: "demo_invoice-after-ocr-3.pdf",
  },
  {
    id: "3",
    status: "inbox",
    dueDate: "Jan 2026",
    recipient: "Tax Bureau Inc",
    amount: 11600.0,
    invoiceNumber: "INV-883346",
    addedOn: "Aug 25",
    sentBy: "demo@mercury.com",
    description: "Electricity Invoice",
    email: {
      title: "Electricity Invoice",
      content: "Please pay the following invoice by the due date.",
    },
    attachment: "demo_invoice-after-ocr-1.pdf",
  },
  // Bills Needing Approval (1 invoice)
  {
    id: "4",
    status: "needing_approval",
    dueDate: "May 2025",
    recipient: "Alpha Corp",
    amount: 5000.0,
    invoiceNumber: "INV-500",
    addedOn: "Sep 20",
    uploadedBy: "John",
    description: "Consulting Services",
    attachment: "invoice_alpha_corp.pdf",
  },
  // Scheduled Bills (2 invoices)
  {
    id: "5",
    status: "scheduled",
    dueDate: "Nov 2025",
    recipient: "Beta LLC",
    amount: 750.0,
    invoiceNumber: "INV-750",
    addedOn: "Sep 22",
    sentBy: "finance@beta.com",
    description: "Monthly Subscription",
    email: {
      title: "Subscription Invoice",
      content: "Your monthly subscription invoice is attached.",
    },
    attachment: "beta_subscription.pdf",
    scheduledDate: "Oct 15, 2025",
  },
  {
    id: "6",
    status: "scheduled",
    dueDate: "Dec 2025",
    recipient: "Gamma Industries",
    amount: 1200.0,
    invoiceNumber: "INV-1200",
    addedOn: "Sep 25",
    uploadedBy: "Alice",
    description: "Equipment Purchase",
    attachment: "gamma_equipment.pdf",
    scheduledDate: "Nov 20, 2025",
  },
  // Paid Bills (2 invoices)
  {
    id: "7",
    status: "paid",
    dueDate: "Aug 2025",
    recipient: "Delta Services",
    amount: 300.0,
    invoiceNumber: "INV-300",
    addedOn: "Sep 10",
    sentBy: "billing@delta.com",
    description: "Service Charge",
    email: {
      title: "Service Invoice",
      content: "Thank you for using our services.",
    },
    attachment: "delta_service.pdf",
    paidDate: "Sep 15, 2025",
  },
  {
    id: "8",
    status: "paid",
    dueDate: "Sep 2025",
    recipient: "Epsilon Co",
    amount: 950.0,
    invoiceNumber: "INV-950",
    addedOn: "Sep 12",
    uploadedBy: "Bob",
    description: "Office Supplies",
    attachment: "epsilon_supplies.pdf",
    paidDate: "Sep 20, 2025",
  },
];

export { mockInvoices };
