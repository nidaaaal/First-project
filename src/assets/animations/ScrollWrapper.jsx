import { motion } from "framer-motion";

export default function ScrollWrapper({ children }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }} 
      whileInView={{ opacity: 1, y: 0 }} 
      viewport={{ once: false, amount: 0.2 }} 
      transition={{ duration: 0.4, ease: "easeIn" }}
    >
      {children}
    </motion.div>
  );
}
