import React from "react";
import { motion } from "framer-motion";

const animation = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.3 },
  },
};

interface Props {
  setFormOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const Backdrop: React.FC<Props> = ({ setFormOpen }) => {
  return (
    <motion.div
      variants={animation}
      initial="hidden"
      animate="visible"
      exit="hidden"
      onClick={() => setFormOpen(false)}
      className="backdrop"
    />
  );
};
export default Backdrop;
