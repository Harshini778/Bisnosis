import { motion } from "framer-motion";
import { useNavigate } from "react-router";

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen flex flex-col items-center justify-center bg-[#FFF9F0] px-4"
    >
      <div className="text-center">
        <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#A98ACB] to-[#6B5688] flex items-center justify-center mx-auto mb-6">
          <span className="text-white font-bold text-xl">B</span>
        </div>
        <h1 className="text-5xl font-bold text-[#302A35] mb-2">404</h1>
        <p className="text-lg text-[#6B5688] mb-6">Page not found</p>
        <button
          onClick={() => navigate("/")}
          className="px-6 py-2.5 bg-[#A98ACB] text-white rounded-xl font-medium hover:bg-[#8B6FB0] transition-colors"
        >
          Go Home
        </button>
      </div>
    </motion.div>
  );
}
