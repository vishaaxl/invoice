import React from "react";

interface Props {
  setFormOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const Navigation: React.FC<Props> = ({ setFormOpen }) => {
  return (
    <div className="fixed h-16 w-full md:w-20 md:h-full p-2 bottom-0 md:left-0 z-[999]">
      <div
        className="h-full w-full bg-backgroundLight rounded-lg flex justify-center items-center "
        onClick={() => setFormOpen(true)}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-20 w-20 text-accent bg-backgroundLight rounded-full flex-shrink-0 -translate-y-[30%] md:translate-y-[0] md:translate-x-[20%] cursor-pointer"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z"
            clipRule="evenodd"
          />
        </svg>
      </div>
    </div>
  );
};
export default Navigation;
