import * as Yup from "yup";

export const formInitialValues = {
  sendersAddress: {
    streetAddress: "",
    city: "",
    postCode: "",
    country: "",
  },
  clientName: "",
  clientEmail: "",
  clientAddress: {
    streetAddress: "",
    city: "",
    postCode: "",
  },
  invoiceDate: "",
  paymentTerm: "",
  description: "",
  items: [],
};

export const InvoiceSchema = Yup.object().shape({
  sendersAddress: Yup.object().shape({
    streetAddress: Yup.string()
      .min(2, "Too Short!")
      .max(50, "Too Long!")
      .required("Required"),
    city: Yup.string()
      .min(2, "Too Short!")
      .max(50, "Too Long!")
      .required("Required"),
    postCode: Yup.string()
      .required("Required")
      .matches(/^[0-9]+$/, "Must be only digits")
      .min(6, "Must be exactly 6 digits")
      .max(6, "Must be exactly 6 digits"),
    country: Yup.string()
      .min(2, "Too Short!")
      .max(50, "Too Long!")
      .required("Required"),
  }),
  clientName: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  clientEmail: Yup.string().email("Invalid email").required("Required"),
  clientAddress: Yup.object().shape({
    streetAddress: Yup.string()
      .min(2, "Too Short!")
      .max(50, "Too Long!")
      .required("Required"),
    city: Yup.string()
      .min(2, "Too Short!")
      .max(50, "Too Long!")
      .required("Required"),
    postCode: Yup.string()
      .required("Required")
      .matches(/^[0-9]+$/, "Must be only digits")
      .min(6, "Must be exactly 6 digits")
      .max(6, "Must be exactly 6 digits"),
  }),
  invoiceDate: Yup.date().required("Required"),
  paymentTerm: Yup.number()
    .typeError("you must specify a number")
    .min(0, "Min value 0."),
  description: Yup.string().min(2, "Too Short!").required("Required"),
  items: Yup.array()
    .of(
      Yup.object().shape({
        name: Yup.string().required("Required"),
        quantity: Yup.number()
          .typeError("- Invalid input.")
          .required("Required"),
        price: Yup.number().typeError("- Invalid input.").required("Required"),
        total: Yup.number(),
      })
    )
    .min(1, "- An item must be added."),
});
