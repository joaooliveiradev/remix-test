interface InvoiceBase {
  id: string;
  dueDate: string;
  recipient: string;
  amount: number;
  invoiceNumber: string;
  addedOn?: string;
  description: string;
  attachment?: string;
}

export interface InboxInvoice extends InvoiceBase {
  status: "inbox";
  sentBy?: string;
  uploadedBy?: string;
  email?: {
    title: string;
    content: string;
  };
}

export interface NeedingApprovalInvoice extends InvoiceBase {
  status: "needing_approval";
  uploadedBy: string;
  approvals: string;
  bank: {
    name: string;
    accountNo: string;
    routingNo: string;
  };
  account: {
    name: string;
    checking: string;
  };
  initiatedOn: string;
  memo: string;
}

export interface ScheduledInvoice extends InvoiceBase {
  status: "scheduled";
  sentBy?: string;
  uploadedBy?: string;
  nextPayment: string;
  email?: {
    title: string;
    content: string;
  };
  createdBy: string;
  paymentMethod: string;
  paymentProgress: string;
  paymentRule: string;
  GLCode: string[];
  account: {
    name: string;
    checking?: string;
  };
  recipientMemo: string;
}

export interface PaidInvoice extends InvoiceBase {
  status: "paid";
  sentBy?: string;
  uploadedBy?: string;
  email?: {
    title: string;
    content: string;
  };
  paidDate: string;
  paymentMethod: string;
  account: string;
  paymentTime: string;
  bankDescription: string;
  showTrackingHistory?: boolean;
  mercuryReceipt?: string;
  GLCode?: string;
  requestedBy?: string;
  approvedBy?: string[];
  reroutedOn?: string;
  IMAD?: string;
}

export type Invoice =
  | InboxInvoice
  | NeedingApprovalInvoice
  | ScheduledInvoice
  | PaidInvoice;

const mockInvoices: Invoice[] = [
  {
    id: "1",
    status: "inbox",
    dueDate: "Apr 2015",
    recipient: "Debug LLC",
    amount: 220.0,
    invoiceNumber: "INV-902",
    addedOn: "Sep 15",
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
    dueDate: "Dec, 2026",
    recipient: "Nano Tech LLC",
    amount: 1290.0,
    invoiceNumber: "INV-001",
    addedOn: "Sep 19",
    uploadedBy: "Jane",
    description: "demo_invoice-after-ocr-3.pdf",
    attachment: "demo_invoice-after-ocr-3.pdf",
  },
  {
    id: "3",
    status: "inbox",
    dueDate: "Jan, 2026",
    recipient: "Tax Bureau Inc",
    amount: 11600.0,
    invoiceNumber: "INV-883346",
    addedOn: "Aug 26",
    sentBy: "demo@mercury.com",
    description: "Electricity Invoice",
    email: {
      title: "Electricity Invoice",
      content: "Please pay the following invoice by the due date.",
    },
    attachment: "demo_invoice-after-ocr-1.pdf",
  },
  {
    id: "4",
    status: "needing_approval",
    dueDate: "Oct 24, 2024",
    recipient: "Jason Green",
    amount: 5000.0,
    invoiceNumber: "123456789",
    addedOn: "Sep 24",
    approvals: "0 of 2",
    uploadedBy: "Aluna T.",
    description: "Monthly rent",
    bank: {
      name: "HSBC",
      accountNo: "99990101",
      routingNo: "123456789",
    },
    account: {
      name: "Ops / Payroll",
      checking: "••1038",
    },
    initiatedOn: "September 25, 2024",
    memo: "Memo for the recipient: Monthly rent",
    attachment: "a6760938-0bd...059037379.pdf",
  },
  {
    id: "5",
    status: "scheduled",
    dueDate: "Nov 25",
    recipient: "Domestic Ads",
    amount: 37.19,
    invoiceNumber: "INV-005",
    nextPayment: "Oct 25",
    createdBy: "Jane B.",
    description: "Recurring payment",
    paymentMethod: "ACH",
    paymentProgress: "One time",
    paymentRule: "Pay once on Oct 25, 2024",
    account: {
      name: "Ops / Payroll",
    },
    GLCode: [
      "120 - Accounts Receivable",
      "230 - Eletric Bills",
      "318 - Unbilled Receivables",
      "400 - Inventory",
      "440 - Raw Materials",
      "503 - Debt Service Prep",
      "620 - Entertainment",
      "664 - Utilities",
    ],
    recipientMemo: "recurring payment memo here",
  },
  {
    id: "6",
    status: "scheduled",
    dueDate: "Nov 24",
    recipient: "Domestic Ads",
    amount: 1.99,
    invoiceNumber: "INV-006",
    nextPayment: "Oct 24",
    createdBy: "Jane B.",
    description: "One-time payment",
    paymentMethod: "Check",
    paymentProgress: "One time",
    paymentRule: "Pay once on Oct 25, 2024",
    account: {
      name: "AP",
    },
    GLCode: [
      "120 - Accounts Receivable",
      "230 - Eletric Bills",
      "318 - Unbilled Receivables",
      "400 - Inventory",
      "440 - Raw Materials",
      "503 - Debt Service Prep",
      "620 - Entertainment",
      "664 - Utilities",
    ],
    recipientMemo: "recurring payment memo here",
  },
  {
    id: "7",
    status: "paid",
    description: "Service Charge",
    paidDate: "Sep 25, 2025",
    dueDate: "Sep 24, 2025",
    recipient: "Lighthouse Properties #3431",
    amount: 5250.0,
    invoiceNumber: "INV-007",
    addedOn: "Sep 25",
    sentBy: "Aluna T.",
    paymentMethod: "Mercury ACH Payment",
    account: "AP",
    paymentTime: "Sep 25 at 7:52AM",
    bankDescription: "LIGHTHOUSE_9WJFOIRGJWLKT REF#37663",
    attachment: "jason-purple-mock-bill.pdf",
    mercuryReceipt: "Mercury receipt",
    GLCode: "GL Code",
  },
  {
    id: "8",
    status: "paid",
    dueDate: "Sep 25, 2025",
    description: "Office Supplies",
    paidDate: "Sep 25, 2025",
    recipient: "Nutritionist",
    amount: 1041.8,
    invoiceNumber: "INV-008",
    addedOn: "Sep 25",
    sentBy: "Aluna T.",
    paymentMethod: "Intl. Wire",
    account: "AP",
    paymentTime: "Sep 25 at 7:51AM",
    bankDescription:
      "ALIYAHMCMA_EFXFCF234D3I3 REF#24650; Original name: Aliyah McMahon",
    attachment: "red-technologies-llc-mock-bill.pdf",
    mercuryReceipt: "Mercury receipt",
    GLCode: "GL Code",
  },
  {
    id: "9",
    status: "paid",
    dueDate: "Sep 23, 2025",
    recipient: "Deshaun Moore",
    amount: 2891.43,
    description: "Payroll Payment",
    paidDate: "Sep 23, 2025",
    invoiceNumber: "INV-009",
    addedOn: "Sep 23",
    requestedBy: "Aluna T.",
    approvedBy: ["Jane B.", "Landon S."],
    paymentMethod: "Domestic Wire",
    account: "Ops / Payroll",
    paymentTime: "Sep 23 at 8:22AM",
    bankDescription: "DESHAUNMOO_G64CYUGDSFLJU REF#98814",
    IMAD: "20210101aaaaaaaa000000",
    attachment: "indigo-technologies-llc-mock-bill.pdf",
    mercuryReceipt: "Mercury receipt",
    GLCode: "GL Code",
  },
  {
    id: "10",
    status: "paid",
    dueDate: "Sep 18, 2025",
    recipient: "Jerick Cheung",
    description: "Check Payment",
    paidDate: "Sep 24, 2025",
    amount: 706.7,
    invoiceNumber: "INV-010",
    addedOn: "Sep 18",
    sentBy: "Aluna T.",
    paymentMethod: "Check Payment",
    account: "AP",
    paymentTime: "Sep 18 at 8:22AM",
    showTrackingHistory: true,
    reroutedOn: "Sep 24 at 8:22AM",
    bankDescription: "JERICKCHEU_I3FLKJPOOVZQM REF#12418",
    attachment: "jason-yellow-mock-bill.pdf",
    mercuryReceipt: "Mercury receipt",
    GLCode: "GL Code",
  },
];

export { mockInvoices };
