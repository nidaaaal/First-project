import { motion } from "framer-motion";

export default function PageWrapper({ children }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }} 
      exit={{ opacity: 1, y: 0 }} 
      transition={{ duration: 1, ease:"backInOut" }}
    >
      {children}
    </motion.div>
  );
}
