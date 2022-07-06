import { useAppContext } from "@src/context";
import dayjs from "dayjs";
import { DocumentData } from "firebase/firestore";
import Link from "next/link";
import React from "react";

interface Props {
  data: DocumentData;
}

const ListItem: React.FC<Props> = ({ data }) => {
  const context = useAppContext();
  return (
    <>
      {(context?.filter == "all" || context?.filter == data.status) && (
        <Link href={`invoices/${data.id}`}>
          <div
            className={`flex flex-col p-4 ${
              data.status == "paid" ? "bg-greenLight" : "bg-[#2B2736]"
            } rounded-lg cursor-pointer my-4`}
          >
            {/* two column flex */}
            <div className="flex justify-between w-full">
              {/* two row flex box */}
              <span className="text-md sm:text-2xl font-bold uppercase">
                <span className="text-accent">#</span> {data.id.slice(0, 6)}
              </span>
              <span className="text-xl sm:text-2xl text-fontGamma">
                {data.clientName}
              </span>
            </div>
            <div className="flex justify-between items-center w-full">
              {/* two row flex */}
              <div className="flex flex-col sm:flex-row sm:items-center">
                <span className="text-fontGamma text-md sm:text-xl sm:mr-6">
                  Due {dayjs(data.paymentDue).format("DD MMM YYYY")}
                </span>
                <span className="text-xl sm:text-3xl font-bold">
                  &#x20b9; {data.total}
                </span>
              </div>
              <div
                className={`flex items-center justify-center text-2xl font-bold ${
                  data.status == "paid" ? "text-green" : "text-[#FF8F00]"
                }`}
              >
                <div
                  className={`h-2 w-2 rounded-full ${
                    data.status == "paid" ? "bg-green" : "bg-[#FF8F00]"
                  }  mr-2`}
                />
                {data.status}
              </div>
            </div>
          </div>
        </Link>
      )}
    </>
  );
};
export default ListItem;
