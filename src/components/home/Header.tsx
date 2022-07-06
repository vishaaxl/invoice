import { useAppContext } from "@src/context";
import { signOut, useSession } from "next-auth/react";
import React, { useState } from "react";

import { motion, AnimatePresence } from "framer-motion";

const options = ["all", "paid", "pending"];

const fadeIn = {
  hidden: {
    opacity: 0,
  },
  visible: { opacity: 1, transition: { duration: 0.3 } },
  exit: { opacity: 0 },
};

const Header: React.FC = () => {
  const context = useAppContext();
  const { data: session } = useSession();

  const [filterOpen, setFilterOpen] = useState(false);

  const filterBy = (el: string) => {
    setFilterOpen(false);
    context?.toggleFilter(el);
  };

  return (
    <header className="h-20 flex justify-between items-center py-16 md:py-[6rem] mb-8">
      <div className="">
        <h1 className="text-5xl font-bold">Invoices</h1>
        <div
          className="text-lg sm:text-xl text-fontGamma cursor-pointer"
          onClick={() => signOut()}
        >
          {session?.user?.email}
        </div>
      </div>
      <div className="relative">
        <div
          className="text-xl flex items-center hover:text-accent cursor-pointer"
          onClick={() => setFilterOpen(true)}
        >
          <span className="mr-2 font-semibold transition-all">
            Filter <span className="hidden md:inline-block">by status</span>
          </span>
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
          {filterOpen && (
            <motion.div
              variants={fadeIn}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="absolute bg-backgroundLight rounded-lg shadow-lg mt-2 right-[2px]"
            >
              <div className="flex flex-col px-6 sm:px-8 py-2">
                {options.map((option) => (
                  <div
                    className="item cursor-pointer text-fontGamma hover:text-font mb-2 text-xl flex items-center"
                    key={option}
                    onClick={() => {
                      filterBy(option);
                    }}
                  >
                    <div
                      className={`h-2 w-2 rounded-full ${
                        option == "paid"
                          ? "bg-green"
                          : option == "pending"
                          ? "bg-[#FF8F00]"
                          : "bg-white"
                      }  mr-2 inline-block`}
                    />
                    {option}
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
};
export default Header;
