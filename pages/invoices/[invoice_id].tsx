import { useEffect, useState } from "react";
import { GetServerSideProps } from "next";

import { useAppContext } from "@src/context";
import { DocumentData } from "firebase/firestore";
import InvoiceIndex from "@src/components/invoice";
import { getSession } from "next-auth/react";
import Head from "next/head";

interface Props {
  id: string;
}

const InvoiceId: React.FC<Props> = ({ id }) => {
  const context = useAppContext();

  const [invoice, setInvoice] = useState<DocumentData>();

  useEffect(() => {
    const currentInvoice = context?.invoices.find((data) => id == data.id);
    setInvoice(currentInvoice);
  }, [id, context?.invoices]);

  return (
    <>
      <Head>
        <title>Invoices | Details</title>
        <meta name="description" content="Invoice Details" />
        <link
          rel="icon"
          href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>🗿</text></svg>"
        />
      </Head>
      <InvoiceIndex data={invoice} />
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { params } = context;
  const { invoice_id } = params as { invoice_id: string };
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: "/auth",
        permanent: false,
      },
    };
  }

  return { props: { id: invoice_id, session } };
};

export default InvoiceId;
