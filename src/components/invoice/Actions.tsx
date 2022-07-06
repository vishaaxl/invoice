import React, { useEffect, useState } from "react";
import { updateDoc, doc } from "firebase/firestore";
import { database } from "firebaseConfig";

interface Props {
  status: string;
  id: string;
}

const InvoiceActions: React.FC<Props> = ({ status, id }) => {
  const [paid, setPaid] = useState(status);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setPaid(status);
  }, [status]);

  const toggleStatus = async (id: string) => {
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
    }, 2000);

    const docRef = doc(database, "invoices", id);
    if (paid == "paid") {
      await updateDoc(docRef, {
        status: "pending",
      }).then(() => setPaid("pending"));
    } else {
      await updateDoc(docRef, {
        status: "paid",
      }).then(() => setPaid("paid"));
    }
  };

  return (
    <div
      className={`bg-backgroundLight p-6 rounded-lg cursor-pointer ${
        loading && "opacity-20"
      }`}
      onClick={() => !loading && toggleStatus(id)}
    >
      <div className="flex items-center justify-between text-xl">
        <div className="">status:</div>
        <div
          className={`flex items-center justify-center font-bold ${
            paid == "paid" ? "text-green" : "text-[#FF8F00]"
          }`}
        >
          <div
            className={`h-2 w-2 rounded-full ${
              paid == "paid" ? "bg-green" : "bg-[#FF8F00]"
            }  mr-2`}
          />
          {paid}
        </div>
      </div>
    </div>
  );
};
export default InvoiceActions;
