import { DocumentData } from "firebase/firestore";

export interface FormValueInterface {
  sendersAddress: {
    streetAddress: string;
    city: string;
    postCode: string;
    country: string;
  };
  clientName: string;
  clientEmail: string;
  clientAddress: {
    streetAddress: string;
    city: string;
    postCode: string;
  };
  invoiceDate: string;
  paymentTerm: string;
  description: string;
  items: NewItem[];
}

export interface Invoice extends FormValueInterface {
  timestamp: Date;
  id: string;
  paymentDue: string;
  total: number;
}

export interface InvoiceContext {
  invoices: DocumentData[];
  filter: string;
  saveInvoices: (data: DocumentData[]) => void;
  toggleFilter: (data: string) => void;
}

export interface NewItem {
  name: string;
  quantity: number;
  price: number;
  total: number;
}
