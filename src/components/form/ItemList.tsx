import React, { useEffect } from "react";
import {
  Field,
  FieldArray,
  FieldArrayRenderProps,
  useFormikContext,
} from "formik";
import InputField from "./InputField";

import { FormValueInterface } from "@src/interfaces";

interface Props {
  name: string;
}

interface ValuesProps {
  values: FormValueInterface;
}

const ItemList: React.FC<Props> = ({ name }) => {
  const { values }: ValuesProps = useFormikContext();
  return (
    <div className="">
      <span className="text-3xl font-semibold text-fontBeta block py-4">
        Item List
      </span>
      <FieldArray
        name={name}
        render={(helpers) => (
          <div>
            {values.items.map((item, index) => (
              <Item
                key={index}
                index={index}
                helpers={helpers}
                values={values}
              />
            ))}
            <AddNewItemButton helpers={helpers} />
          </div>
        )}
      />
    </div>
  );
};

//add new item button
interface ButtonProps {
  helpers: FieldArrayRenderProps;
}

const AddNewItemButton: React.FC<ButtonProps> = ({ helpers }) => {
  return (
    <div
      className="w-full rounded-full p-4 bg-backgroundLight flex justify-center items-center text-xl cursor-pointer"
      onClick={() =>
        helpers.push({ name: "", quantity: "", price: "", total: "" })
      }
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-4 w-4 text-inherit mr-1 -translate-y-[2px]"
        viewBox="0 0 20 20"
        fill="currentColor"
      >
        <path
          fillRule="evenodd"
          d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
          clipRule="evenodd"
        />
      </svg>
      Add New Item
    </div>
  );
};

//new item add form
interface ItemProps {
  index: number;
  helpers: FieldArrayRenderProps;
  values: FormValueInterface;
}

const Item: React.FC<ItemProps> = ({ index, helpers, values }) => {
  const { setFieldValue } = useFormikContext();

  useEffect(() => {
    console.log("run");
    const total = values.items[index].quantity * values.items[index].price;
    const rounded = Math.round((total + Number.EPSILON) * 100) / 100;
    setFieldValue(`items[${index}].total`, rounded || "0");
  }, [values.items, index, setFieldValue]);

  return (
    <div className="mb-6">
      <InputField name={`items[${index}].name`} placeholder="Item Name" />
      <div className="flex child:flex-1 gap-3 items-center">
        <InputField
          type="number"
          name={`items[${index}].quantity`}
          placeholder="Quantity"
        />
        <InputField
          type="number"
          name={`items[${index}].price`}
          placeholder="Price"
        />
        <InputField
          name={`items[${index}].total`}
          disabled
          placeholder="Total"
        />
        <svg
          onClick={() => helpers.remove(index)}
          xmlns="http://www.w3.org/2000/svg"
          className="h-8 w-8 translate-y-2 text-red-400 cursor-pointer"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
            clipRule="evenodd"
          />
        </svg>
      </div>
    </div>
  );
};

export default ItemList;
