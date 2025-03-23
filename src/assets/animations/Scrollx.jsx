import { motion } from "framer-motion";

export default function Scrollx({ children }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -50 }} 
      whileInView={{ opacity: 1, x: 0 }} 
      viewport={{ once: false, amount: 0.2 }} 
      transition={{ duration: 1, ease: "easeInOut" }}
    >
      {children}
    </motion.div>
  );
}
