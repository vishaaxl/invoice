import React, { createContext, ReactNode, useContext, useState } from "react";

import { InvoiceContext, Invoice } from "@src/interfaces";
import { DocumentData } from "firebase/firestore";

const AppContext = createContext<InvoiceContext | null>(null);

interface Props {
  children: ReactNode;
}

export const AppContextWrapper: React.FC<Props> = ({ children }) => {
  const [invoices, setInvoices] = useState<DocumentData[]>([]);
  const [filter, setFilter] = useState<string>("all");

  const saveInvoices = (data: DocumentData[]) => {
    setInvoices(data);
  };

  const toggleFilter = (data: string) => {
    setFilter(data);
  };

  return (
    <AppContext.Provider
      value={{ invoices, saveInvoices, filter, toggleFilter }}
    >
      {children}
    </AppContext.Provider>
  );
};

export function useAppContext() {
  return useContext(AppContext);
}
