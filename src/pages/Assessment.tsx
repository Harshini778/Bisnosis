import { useState, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router";
import {
  MapPin, ArrowLeft, ArrowRight, Check, Mic, Loader2,
} from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useAssessment } from "@/contexts/AssessmentContext";
import { BUSINESS_CATEGORIES, INVESTMENT_TIERS } from "@/data/businesses";
import { ListenButton } from "@/components/ListenButton";

function AnalyzingScreen({ t }: { t: (key: string) => string }) {
  const [completed, setCompleted] = useState<number[]>([]);

  useEffect(() => {
    const delays = [0, 600, 1200, 1800, 2400];
    const timers = delays.map((delay, i) =>
      setTimeout(() => setCompleted((prev) => [...prev, i]), delay)
    );
    return () => timers.forEach(clearTimeout);
  }, []);

  const stageKeys = ["analyzingLocation", "reviewingMarket", "estimatingFinancial", "checkingFunding", "preparingRecs"];

  return (
    <div className="max-w-md w-full text-center">
      <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#A98ACB] to-[#6B5688] flex items-center justify-center mx-auto mb-8 animate-pulse">
        <span className="text-white font-bold text-xl">B</span>
      </div>
      <h2 className="text-xl font-bold text-[#302A35] mb-8">{t("understandingBusiness")}</h2>
      <div className="space-y-3 text-left">
        {stageKeys.map((key, i) => (
          <div
            key={key}
            className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 ${completed.includes(i) ? "bg-[#EDE4F7]" : "bg-white/50"}`}
          >
            <div className={`w-6 h-6 rounded-full flex items-center justify-center transition-all duration-300 ${completed.includes(i) ? "bg-[#A98ACB]" : "bg-[#E9DFD2]"}`}>
              {completed.includes(i) ? (
                <Check className="size-3.5 text-white" />
              ) : (
                <Loader2 className="size-3.5 text-[#C8B6E2] animate-spin" />
              )}
            </div>
            <span className={`text-sm font-medium ${completed.includes(i) ? "text-[#302A35]" : "text-[#6B5688]"}`}>{t(key)}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

const slideVariant = {
  enter: (direction: number) => ({
    x: direction > 0 ? 300 : -300,
    opacity: 0,
  }),
  center: { x: 0, opacity: 1 },
  exit: (direction: number) => ({
    x: direction > 0 ? -300 : 300,
    opacity: 0,
  }),
};

function ProgressBar({ current, total }: { current: number; total: number }) {
  return (
    <div className="w-full max-w-md mx-auto mb-8">
      <div className="flex justify-between mb-2">
        <span className="text-sm font-medium text-[#6B5688]">
          {current} of {total}
        </span>
      </div>
      <div className="h-1.5 bg-[#EDE4F7] rounded-full overflow-hidden">
        <motion.div
          className="h-full bg-gradient-to-r from-[#A98ACB] to-[#C8B6E2] rounded-full"
          initial={{ width: 0 }}
          animate={{ width: `${(current / total) * 100}%` }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        />
      </div>
    </div>
  );
}

export default function Assessment() {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const { step, setStep, data, updateData, submit, result } = useAssessment();
  const [direction, setDirection] = useState(1);
  const [loanAmountInput, setLoanAmountInput] = useState("");

  const currentStep = typeof step === "number" ? step : 0;

  const goNext = useCallback(() => {
    setDirection(1);
    setStep((Math.min(currentStep + 1, 4)) as 0 | 1 | 2 | 3 | 4);
  }, [currentStep, setStep]);

  const goBack = useCallback(() => {
    setDirection(-1);
    setStep((Math.max(currentStep - 1, 0)) as 0 | 1 | 2 | 3 | 4);
  }, [currentStep, setStep]);

  const handleSubmit = () => {
    updateData({ loanAmount: data.loanRequired ? parseInt(loanAmountInput) || 0 : 0 });
    submit();
  };

  // Navigate to insights only once the analysis result actually exists,
  // then drop back to step 3 so returning to the assessment doesn't loop.
  useEffect(() => {
    if (step === "results" && result) {
      navigate("/insights");
      setStep(3);
    }
  }, [step, result, navigate, setStep]);

  const canProceed = () => {
    switch (step) {
      case 0: return data.location.trim().length > 0;
      case 1: return data.businessId.length > 0;
      case 2: return data.investmentId.length > 0;
      case 3: return true;
      default: return false;
    }
  };

  // Step header
  const stepTitles = [
    t("whereBusiness"),
    t("whatBusiness"),
    t("howMuchInvest"),
    t("needLoan"),
  ];

  const stepHints = [
    t("step1Hint"),
    t("step2Hint"),
    t("step3Hint"),
    t("step4Hint"),
  ];

  // Analyzing state - render Analysis component inline (also shown for the
  // brief moment while the result is being handed off to /insights)
  if (step === "analyzing" || step === "results") {
    return (
      <div className="min-h-screen bg-[#FFF9F0] flex items-center justify-center px-4">
        <AnalyzingScreen t={t} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FFF9F0] flex flex-col">
      {/* Header */}
      <div className="sticky top-0 z-40 bg-[#FFF9F0]/90 backdrop-blur-sm border-b border-[#E9DFD2]/60 px-4 py-3">
        <div className="max-w-lg mx-auto flex items-center gap-3">
          {currentStep > 0 && (
            <button onClick={goBack} className="p-2 rounded-lg hover:bg-[#EDE4F7] transition-colors">
              <ArrowLeft className="size-5 text-[#6B5688]" />
            </button>
          )}
          <div className="flex-1">
            <ProgressBar current={currentStep + 1} total={4} />
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 flex items-center justify-center px-4 py-8 pb-24">
        <div className="w-full max-w-lg">
          <AnimatePresence mode="wait" custom={direction}>
            {/* Step 0: Location */}
            {currentStep === 0 && (
              <motion.div
                key="step0"
                custom={direction}
                variants={slideVariant}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                <div className="text-center mb-8">
                  <div className="w-14 h-14 rounded-2xl bg-[#EDE4F7] flex items-center justify-center mx-auto mb-4">
                    <MapPin className="size-7 text-[#A98ACB]" />
                  </div>
                  <h2 className="text-2xl font-bold text-[#302A35] mb-2">{stepTitles[0]}</h2>
                  <p className="text-sm text-[#6B5688]">{stepHints[0]}</p>
                </div>

                <div className="space-y-3">
                  <input
                    type="text"
                    value={data.location}
                    onChange={(e) => updateData({ location: e.target.value })}
                    placeholder={t("locationPlaceholder")}
                    className="w-full px-5 py-3.5 rounded-xl border border-[#E9DFD2] bg-white text-[#302A35] placeholder-[#A98ACB]/50 focus:outline-none focus:border-[#A98ACB] focus:ring-2 focus:ring-[#A98ACB]/20 transition-all text-base"
                    autoFocus
                  />

                  <button
                    onClick={() => {
                      if ("geolocation" in navigator) {
                        navigator.geolocation.getCurrentPosition(
                          () => updateData({ location: "Auto-detected location" }),
                          () => updateData({ location: "India" })
                        );
                      }
                    }}
                    className="w-full flex items-center justify-center gap-2 px-5 py-3 rounded-xl border border-dashed border-[#C8B6E2] text-[#6B5688] hover:bg-[#EDE4F7] transition-colors text-sm font-medium"
                  >
                    <MapPin className="size-4" />
                    {t("useMyLocation")}
                  </button>
                </div>

                {/* Suggestions */}
                <div className="flex flex-wrap gap-2">
                  {["Hyderabad", "Warangal", "Vijayawada", "Mumbai", "Delhi"].map((city) => (
                    <button
                      key={city}
                      onClick={() => updateData({ location: city })}
                      className={`px-3 py-1.5 rounded-lg text-sm transition-all ${
                        data.location === city
                          ? "bg-[#A98ACB] text-white"
                          : "bg-[#EDE4F7] text-[#6B5688] hover:bg-[#C8B6E2]/50"
                      }`}
                    >
                      {city}
                    </button>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Step 1: Business */}
            {currentStep === 1 && (
              <motion.div
                key="step1"
                custom={direction}
                variants={slideVariant}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                <div className="text-center mb-8">
                  <h2 className="text-2xl font-bold text-[#302A35] mb-2">{stepTitles[1]}</h2>
                  <p className="text-sm text-[#6B5688]">{stepHints[1]}</p>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  {BUSINESS_CATEGORIES.map((biz) => (
                    <button
                      key={biz.id}
                      onClick={() => updateData({ businessId: biz.id })}
                      className={`flex flex-col items-center gap-2 p-4 rounded-xl border-2 transition-all duration-200 ${
                        data.businessId === biz.id
                          ? "border-[#A98ACB] bg-[#EDE4F7] shadow-sm"
                          : "border-[#E9DFD2] bg-white hover:border-[#C8B6E2] hover:bg-[#F7F0E5]"
                      }`}
                    >
                      <span className="text-2xl">{biz.icon}</span>
                      <span className={`text-sm font-medium ${
                        data.businessId === biz.id ? "text-[#A98ACB]" : "text-[#302A35]"
                      }`}>
                        {biz.name}
                      </span>
                      <span className="text-xs text-[#6B5688]">{biz.description}</span>
                      {data.businessId === biz.id && (
                        <div className="w-5 h-5 rounded-full bg-[#A98ACB] flex items-center justify-center">
                          <Check className="size-3 text-white" />
                        </div>
                      )}
                    </button>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Step 2: Investment */}
            {currentStep === 2 && (
              <motion.div
                key="step2"
                custom={direction}
                variants={slideVariant}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                <div className="text-center mb-8">
                  <h2 className="text-2xl font-bold text-[#302A35] mb-2">{stepTitles[2]}</h2>
                  <p className="text-sm text-[#6B5688]">{stepHints[2]}</p>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {INVESTMENT_TIERS.map((tier) => (
                    <button
                      key={tier.id}
                      onClick={() => updateData({ investmentId: tier.id, investmentAmount: tier.amount })}
                      className={`flex flex-col items-center gap-1 p-5 rounded-xl border-2 transition-all duration-200 ${
                        data.investmentId === tier.id
                          ? "border-[#A98ACB] bg-[#EDE4F7] shadow-sm"
                          : "border-[#E9DFD2] bg-white hover:border-[#C8B6E2] hover:bg-[#F7F0E5]"
                      }`}
                    >
                      <span className={`text-xl font-bold ${
                        data.investmentId === tier.id ? "text-[#A98ACB]" : "text-[#302A35]"
                      }`}>
                        {tier.short}
                      </span>
                      <span className="text-xs text-[#6B5688]">{tier.label}</span>
                      {data.investmentId === tier.id && (
                        <div className="w-5 h-5 rounded-full bg-[#A98ACB] flex items-center justify-center mt-1">
                          <Check className="size-3 text-white" />
                        </div>
                      )}
                    </button>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Step 3: Loan + Optional */}
            {currentStep === 3 && (
              <motion.div
                key="step3"
                custom={direction}
                variants={slideVariant}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                <div className="text-center mb-8">
                  <h2 className="text-2xl font-bold text-[#302A35] mb-2">{stepTitles[3]}</h2>
                  <p className="text-sm text-[#6B5688]">{stepHints[3]}</p>
                </div>

                {/* Yes/No toggle */}
                <div className="flex gap-3 max-w-xs mx-auto">
                  <button
                    onClick={() => updateData({ loanRequired: true })}
                    className={`flex-1 py-3.5 rounded-xl border-2 font-semibold transition-all duration-200 ${
                      data.loanRequired
                        ? "border-[#A98ACB] bg-[#A98ACB] text-white shadow-sm"
                        : "border-[#E9DFD2] bg-white text-[#302A35] hover:border-[#C8B6E2]"
                    }`}
                  >
                    {t("yes")}
                  </button>
                  <button
                    onClick={() => { updateData({ loanRequired: false }); setLoanAmountInput(""); }}
                    className={`flex-1 py-3.5 rounded-xl border-2 font-semibold transition-all duration-200 ${
                      !data.loanRequired
                        ? "border-[#A98ACB] bg-[#A98ACB] text-white shadow-sm"
                        : "border-[#E9DFD2] bg-white text-[#302A35] hover:border-[#C8B6E2]"
                    }`}
                  >
                    {t("no")}
                  </button>
                </div>

                {/* Loan amount (conditional) */}
                <AnimatePresence>
                  {data.loanRequired && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="pt-2">
                        <label className="block text-sm font-medium text-[#6B5688] mb-2">
                          {t("loanAmount")}
                        </label>
                        <input
                          type="number"
                          value={loanAmountInput}
                          onChange={(e) => setLoanAmountInput(e.target.value)}
                          placeholder="e.g. 200000"
                          className="w-full px-5 py-3 rounded-xl border border-[#E9DFD2] bg-white text-[#302A35] placeholder-[#A98ACB]/50 focus:outline-none focus:border-[#A98ACB] focus:ring-2 focus:ring-[#A98ACB]/20 transition-all"
                        />
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Optional info */}
                <div className="pt-4 border-t border-[#E9DFD2]/60">
                  <label className="block text-sm font-medium text-[#302A35] mb-1">
                    {t("anythingElse")}
                  </label>
                  <p className="text-xs text-[#6B5688] mb-3">{t("optionalHint")}</p>
                  <div className="relative">
                    <textarea
                      value={data.additionalInfo}
                      onChange={(e) => updateData({ additionalInfo: e.target.value })}
                      placeholder="e.g., I have experience in this field..."
                      rows={3}
                      className="w-full px-5 py-3 rounded-xl border border-[#E9DFD2] bg-white text-[#302A35] placeholder-[#A98ACB]/50 focus:outline-none focus:border-[#A98ACB] focus:ring-2 focus:ring-[#A98ACB]/20 transition-all resize-none text-sm"
                    />
                    <button
                      className="absolute bottom-3 right-3 p-1.5 rounded-lg bg-[#EDE4F7] text-[#A98ACB] hover:bg-[#C8B6E2] transition-colors"
                      title="Voice input"
                    >
                      <Mic className="size-4" />
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Navigation */}
          {currentStep <= 3 && (
            <div className="fixed bottom-0 left-0 right-0 bg-[#FFF9F0]/95 backdrop-blur-sm border-t border-[#E9DFD2]/60 px-4 py-3 safe-bottom">
              <div className="max-w-lg mx-auto">
                {currentStep === 3 ? (
                  <button
                    onClick={handleSubmit}
                    className="w-full py-3.5 bg-gradient-to-r from-[#A98ACB] to-[#8B6FB0] text-white font-semibold rounded-xl shadow-lg shadow-[#A98ACB]/25 hover:shadow-xl transition-all duration-300"
                  >
                    {t("getInsights")}
                  </button>
                ) : (
                  <button
                    onClick={goNext}
                    disabled={!canProceed()}
                    className="w-full py-3.5 bg-gradient-to-r from-[#A98ACB] to-[#8B6FB0] text-white font-semibold rounded-xl shadow-lg shadow-[#A98ACB]/25 hover:shadow-xl transition-all duration-300 disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    Next
                    <ArrowRight className="size-4" />
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
