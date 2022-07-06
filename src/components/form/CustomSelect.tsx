import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

interface SelectProps {
  name: string;
  placeholder: string;
  gap?: boolean;
  options: option[];
  setTerm: React.Dispatch<React.SetStateAction<number>>;
}

interface option {
  name: string;
  value: number;
}

const fadeIn = {
  hidden: {
    opacity: 0,
  },
  visible: { opacity: 1, transition: { duration: 0.3 } },
  exit: { opacity: 0 },
};

const CustomSelect: React.FC<SelectProps> = ({
  placeholder,
  name,
  gap,
  options,
  setTerm,
}) => {
  const [selected, setSelected] = useState({
    open: false,
    value: 0,
    name: "30 Days",
  });

  const setValue = (el: option) => {
    setSelected({ open: false, value: el.value, name: el.name });
    setTerm(() => el.value);
  };

  return (
    <div className={`pb-2 h-full relative ${gap && "last:ml-4"}`}>
      <label className="text-fontGamma mb-2 inline-block" htmlFor={name}>
        {placeholder}
      </label>

      <div
        className="bg-backgroundLight w-full rounded-lg p-4 flex items-center justify-between cusor-pointer"
        id="name"
        onClick={() =>
          setSelected((prev) => ({ ...prev, open: !selected.open }))
        }
      >
        {selected.name}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5 text-accent"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
            clipRule="evenodd"
          />
        </svg>
      </div>
      <AnimatePresence exitBeforeEnter>
        {selected.open && (
          <motion.div
            variants={fadeIn}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="w-full absolute bg-backgroundLight rounded-lg mt-2 shadow-lg"
          >
            <div className="flex flex-col px-4 py-2">
              {options.map((option) => (
                <div
                  className="item cursor-pointer text-fontGamma hover:text-font mb-2"
                  key={option.value}
                  onClick={() => setValue(option)}
                >
                  {option.name}
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CustomSelect;
