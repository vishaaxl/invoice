import React from "react";
import { Form, Formik } from "formik";
import { motion } from "framer-motion";
import { collection, addDoc } from "firebase/firestore";

import { InvoiceSchema, formInitialValues } from "@src/data/form";
import ItemList from "./ItemList";
import InputField from "./InputField";

//databased
import { database } from "firebaseConfig";
import { createInvoice } from "@src/utils/form";
import { useSession } from "next-auth/react";
const dbInstance = collection(database, "invoices");

//options for custom term sekect component
const selectOptions = [
  { name: "1 day", value: 1 },
  { name: "7 days", value: 7 },
  { name: "14 days", value: 14 },
  { name: "30 days", value: 30 },
];

interface Props {
  setFormOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

//form animation
const fadeIn = {
  hidden: {
    opacity: 0,
  },
  visible: { opacity: 1, transition: { duration: 0.3 } },
  exit: { opacity: 0 },
};

const InvoiceForm: React.FC<Props> = ({ setFormOpen }) => {
  const { data: session } = useSession();
  console.log(session);
  return (
    <motion.div
      key="invoice-form"
      variants={fadeIn}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="fixed w-full sm:w-[80%] lg:w-[50%] h-[100vh] bg-background z-[1000] p-4 sm:rounded-r-[1.5rem]"
    >
      <div className="sm:wrapper h-full overflow-y-scroll no-scrollbar">
        <div className="text-4xl font-bold border-b border-accent py-6 mb-4">
          Create Invoice
        </div>
        <Formik
          enableReinitialize
          initialValues={{
            ...formInitialValues,
            username: session?.user?.email,
          }}
          validationSchema={InvoiceSchema}
          onSubmit={(values, { setSubmitting, resetForm }) => {
            setTimeout(() => {
              setSubmitting(false);
            }, 400);
            const invoice = {
              ...createInvoice("pending", values),
              timestamp: new Date(),
            };
            try {
              addDoc(dbInstance, invoice)
                .then(() => {
                  resetForm();
                  setFormOpen(false);
                })
                .catch((err) => {
                  console.log(err);
                });
            } catch (error) {
              alert("something went wrong. Please try again later");
              console.log(error);
            }
          }}
        >
          {({ isSubmitting, resetForm, errors }) => (
            <Form className="text-lg">
              {/* From bill*/}
              <div className="text-accent mb-4">Bill From : </div>
              <InputField
                name="sendersAddress.streetAddress"
                placeholder="Street Address"
              />

              <div className="flex child:flex-1">
                <InputField name="sendersAddress.city" placeholder="City" />
                <InputField
                  name="sendersAddress.postCode"
                  placeholder="Post Code"
                  gap
                />
              </div>
              <InputField name="sendersAddress.country" placeholder="Country" />

              {/* From bill */}
              <div className="text-accent my-4">Bill To : </div>
              <InputField name="clientName" placeholder="Client Name" />
              <InputField
                name="clientEmail"
                placeholder="Client's Email (e.g. examle@mail.com)"
              />
              <InputField
                name="clientAddress.streetAddress"
                placeholder="StreetAddress"
              />
              <div className="flex child:flex-1 mb-8">
                <InputField name="clientAddress.city" placeholder="City" />
                <InputField
                  name="clientAddress.postCode"
                  placeholder="Post Code"
                  gap
                />
              </div>

              {/* invoice details */}
              <div className="flex child:flex-1">
                <InputField
                  name="invoiceDate"
                  placeholder="Invoice Date"
                  type="date"
                />
                <InputField
                  name="paymentTerm"
                  placeholder="Payment Terms"
                  type="number"
                  gap
                />
              </div>
              <InputField
                name="description"
                placeholder="Description (e.g. Graphic Design Service)"
              />
              <ItemList name="items" />

              <div className="botton-container flex child:flex-1 py-10">
                <div
                  className="primary-button bg-pink-500 mr-4 text-center"
                  onClick={() => {
                    resetForm();
                    setFormOpen(false);
                  }}
                >
                  Discard
                </div>

                <button
                  className="primary-button bg-accent"
                  type="submit"
                  disabled={isSubmitting}
                >
                  Submit
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </motion.div>
  );
};

export default InvoiceForm;
