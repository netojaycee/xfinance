export interface Invoice {
    id: string;
    invoiceNumber: string;
    customerName: string;
    status: string;
    total: number;
    invoiceDate: string;
    dueDate: string;
}

export interface InvoiceStatsItem {
    count: number;
    total: number;
}

export interface InvoiceStats {
    pending: InvoiceStatsItem;
    sent: InvoiceStatsItem;
    paid: InvoiceStatsItem;
    draft: InvoiceStatsItem;
    overdue: InvoiceStatsItem;
}

export type InvoicesResponse = {
    invoices: Invoice[];
    stats: InvoiceStats;
    totalCount: number;
    totalPages: number;
    currentPage: number;
    limit: number;
};