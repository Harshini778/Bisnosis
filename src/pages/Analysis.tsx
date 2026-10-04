import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const STAGES = [
  { key: "analyzingLocation", delay: 0 },
  { key: "reviewingMarket", delay: 600 },
  { key: "estimatingFinancial", delay: 1200 },
  { key: "checkingFunding", delay: 1800 },
  { key: "preparingRecs", delay: 2400 },
];

export default function Analysis() {
  const { t } = useLanguage();
  const [completed, setCompleted] = useState<number[]>([]);

  useEffect(() => {
    const timers = STAGES.map((stage, i) =>
      setTimeout(() => setCompleted((prev) => [...prev, i]), stage.delay)
    );
    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <div className="min-h-screen bg-[#FFF9F0] flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-md w-full text-center"
      >
        {/* Spinner */}
        <div className="mb-8">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#A98ACB] to-[#6B5688] flex items-center justify-center mx-auto animate-pulse">
            <span className="text-white font-bold text-xl">B</span>
          </div>
        </div>

        <h2 className="text-xl font-bold text-[#302A35] mb-8">
          {t("understandingBusiness")}
        </h2>

        {/* Stages */}
        <div className="space-y-3 text-left">
          {STAGES.map((stage, i) => (
            <motion.div
              key={stage.key}
              initial={{ opacity: 0, x: -10 }}
              animate={{
                opacity: completed.includes(i) ? 1 : 0.4,
                x: 0,
              }}
              transition={{ duration: 0.3 }}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 ${
                completed.includes(i)
                  ? "bg-[#EDE4F7]"
                  : "bg-white/50"
              }`}
            >
              <div
                className={`w-6 h-6 rounded-full flex items-center justify-center transition-all duration-300 ${
                  completed.includes(i)
                    ? "bg-[#A98ACB]"
                    : "bg-[#E9DFD2]"
                }`}
              >
                {completed.includes(i) ? (
                  <Check className="size-3.5 text-white" />
                ) : (
                  <div className="w-2 h-2 rounded-full bg-[#C8B6E2] animate-pulse" />
                )}
              </div>
              <span
                className={`text-sm font-medium ${
                  completed.includes(i) ? "text-[#302A35]" : "text-[#6B5688]"
                }`}
              >
                {t(stage.key)}
              </span>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
