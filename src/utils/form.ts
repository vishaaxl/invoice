import { FormValueInterface, NewItem } from "@src/interfaces";
import dayjs from "dayjs";

export function calcTotal(items: NewItem[]) {
  let total = 0;
  for (const item of items) {
    total += item.total;
  }
  return total;
}

export function createInvoice(status: string, values: FormValueInterface) {
  return {
    ...values,
    createdAt: dayjs(values.invoiceDate).format("YYYY-MM-DD"),
    paymentDue: dayjs(values.invoiceDate)
      .add(Number(values.paymentTerm), "day")
      .format("YYYY-MM-DD"),
    status,
    total: calcTotal(values.items),
  };
}
