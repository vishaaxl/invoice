import dayjs from "dayjs";
import { DocumentData } from "firebase/firestore";
import Link from "next/link";
import React, { useState } from "react";
import { doc, deleteDoc } from "firebase/firestore";

import InvoiceActions from "./Actions";
import { NewItem } from "@src/interfaces";
import { database } from "firebaseConfig";
import { useRouter } from "next/router";

interface Props {
  data: DocumentData | undefined;
}

const InvoiceIndex: React.FC<Props> = ({ data }) => {
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();

  const deleteInvoice = async (id: string) => {
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
    }, 2000);

    await deleteDoc(doc(database, "invoices", id)).then(() => router.push("/"));
  };

  return (
    <main className="pb-[10rem]">
      <header className="h-20 flex justify-between items-center py-16 md:py-[6rem]">
        <Link href="/">
          <div className="flex text-xl items-center hover:scale-105 cursor-pointer">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8 text-accent -translate-y-[1px]"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                clipRule="evenodd"
              />
            </svg>
            Go back
          </div>
        </Link>
      </header>
      <InvoiceActions status={data?.status} id={data?.id} />

      {data && (
        // senders address
        <div className="flex flex-col bg-backgroundLight rounded-lg my-4 p-6">
          <div className="section-1 child:block">
            <span className="uppercase">
              <span className="text-accent">#</span>
              {data.id.slice(0, 6)}
            </span>
            <span className="text-fontGamma text-xl">
              {data.description} and graphic design
            </span>
          </div>
          <div className="section-1 child:block mt-2 text-fontSecondary text-lg leading-[1]">
            <span>{data.sendersAddress.streetAddress}</span>
            <span>{data.sendersAddress.country}</span>
            <span>{data.sendersAddress.city}</span>
            <span className="text-fontGamma">
              {data.sendersAddress.postCode}
            </span>
          </div>

          <div className="flex flex-col-reverse sm:flex-row child:flex-1 my-4 gap-2">
            {/* invoice details */}
            <div className="">
              <div className="section-1 mt-2 text-fontSecondary text-lg leading-[1]">
                <div className="mb-2 sm:mb-4 child:block ">
                  <span className="">Invoice Date :</span>
                  <span className="text-font text-xl sm:text-2xl font-semibold">
                    {dayjs(data.createdAt).format("DD MMM YYYY")}
                  </span>
                </div>
                <div className="mb-2 sm:mb-4 child:block ">
                  <span className="">Payment Due :</span>
                  <span className="text-font text-xl sm:text-2xl font-semibold">
                    {dayjs(data.paymentDue).format("DD MMM YYYY")}
                  </span>
                </div>
                <div className="mb-2 sm:mb-4 child:block ">
                  <span className="">Sent to :</span>
                  <span className="text-font text-xl sm:text-2xl font-semibold">
                    {data.clientEmail}
                  </span>
                </div>
              </div>
            </div>

            {/* bill to details */}
            <div className="">
              <div className="section-1 child:block mt-2 text-fontSecondary text-lg sm:text-xl leading-tight">
                <span className="mb-2 text-accent">Bill to: </span>
                <span className="text-font text-xl font-semibold">
                  {data.clientName}
                </span>
                <span>{data.clientAddress.streetAddress}</span>
                <span>{data.clientAddress.postCode}</span>
                <span>{data.clientAddress.city}</span>
              </div>
            </div>
          </div>

          {/* amount due */}
          <div
            className="bg-background
          rounded-lg text-xl text-fontBeta"
          >
            {data.items.map((item: NewItem, index: string) => (
              <div
                key={index}
                className="flex items-center justify-between p-4 child:flex-1"
              >
                <span className="capitalize">{item.name}</span>
                <span className="hidden sm:block">Qty: {item.quantity}</span>
                <span className="text-fontGamma font-semibold text-right">
                  &#x20b9; {item.total}
                </span>
              </div>
            ))}
            <div className="bg-black rounded-b-lg">
              <div className="flex items-center justify-between p-4">
                <span className="capitalize text-2xl text-accent">Total</span>
                <span className="text-fontGamma font-semibold">
                  &#x20b9; {data.total}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
      <div
        className={`bg-red-500 primary-button mt-4 ${loading && "opacity-60"}`}
        onClick={() => deleteInvoice(data?.id)}
      >
        Delete Invoice{" "}
      </div>
    </main>
  );
};
export default InvoiceIndex;
