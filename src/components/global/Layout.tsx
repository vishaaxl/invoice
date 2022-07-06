import React, { useState } from "react";
import { AnimatePresence } from "framer-motion";

import InvoiceForm from "../form";
import Backdrop from "../form/Backdrop";
import Navigation from "../home/Navigation";
import { useSession } from "next-auth/react";

interface Props {
  children: React.ReactNode;
}

const Layout: React.FC<Props> = ({ children }) => {
  const { data: session } = useSession();
  const [formOpen, setFormOpen] = useState(false);

  return (
    <div className="relative max-w-[1580px] mx-auto">
      {session && <Navigation setFormOpen={setFormOpen} />}

      <AnimatePresence>
        {formOpen && (
          <>
            <Backdrop key="backdrop" setFormOpen={setFormOpen} />
            <InvoiceForm setFormOpen={setFormOpen} key="invoice-form" />
          </>
        )}
      </AnimatePresence>

      <main className="wrapper min-h-[100vh]">
        <div className="sm:ml-12 lg:ml-0">
          <AnimatePresence exitBeforeEnter>{children}</AnimatePresence>
        </div>
      </main>
    </div>
  );
};

export default Layout;
