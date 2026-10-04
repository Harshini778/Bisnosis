import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router";
import {
  ArrowLeft, TrendingUp, AlertTriangle, Lightbulb,
  Banknote, ChevronDown, ChevronUp, ExternalLink,
} from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useAssessment } from "@/contexts/AssessmentContext";
import { ListenButton } from "@/components/ListenButton";

function formatCurrency(amount: number): string {
  if (amount >= 100000) {
    const lakhs = amount / 100000;
    return `₹${lakhs % 1 === 0 ? lakhs : lakhs.toFixed(1)} Lakh`;
  }
  return `₹${amount.toLocaleString("en-IN")}`;
}

function ScoreCircle({ score, label }: { score: number; label: string }) {
  const radius = 54;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (score / 100) * circumference;

  return (
    <div className="relative inline-flex items-center justify-center">
      <svg width="140" height="140" viewBox="0 0 140 140">
        <circle cx="70" cy="70" r={radius} fill="none" stroke="#EDE4F7" strokeWidth="8" />
        <motion.circle
          cx="70"
          cy="70"
          r={radius}
          fill="none"
          stroke="url(#scoreGradient)"
          strokeWidth="8"
          strokeLinecap="round"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: offset }}
          transition={{ duration: 1.5, ease: "easeOut", delay: 0.3 }}
          transform="rotate(-90 70 70)"
        />
        <defs>
          <linearGradient id="scoreGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#A98ACB" />
            <stop offset="100%" stopColor="#6B5688" />
          </linearGradient>
        </defs>
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <motion.span
          className="text-3xl font-bold text-[#302A35]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          {score}
        </motion.span>
        <span className="text-xs text-[#6B5688]">/ 100</span>
      </div>
    </div>
  );
}

function MetricRow({ label, value, color }: { label: string; value: string; color: string }) {
  const colorMap: Record<string, string> = {
    High: "bg-[#A98ACB]",
    Good: "bg-[#7BAE6B]",
    Moderate: "bg-[#D4A74E]",
    Low: "bg-[#6B5688]",
    Medium: "bg-[#D4A74E]",
  };
  return (
    <div className="flex items-center justify-between py-2.5">
      <span className="text-sm text-[#6B5688]">{label}</span>
      <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold text-white ${colorMap[value] || "bg-[#A98ACB]"}`}>
        <span className="w-1.5 h-1.5 rounded-full bg-white/40" />
        {value}
      </span>
    </div>
  );
}

function FinancialCard({ label, value, icon }: { label: string; value: string; icon: React.ReactNode }) {
  return (
    <div className="bg-white rounded-xl border border-[#E9DFD2] p-4">
      <div className="flex items-center gap-2 mb-2">
        <div className="w-8 h-8 rounded-lg bg-[#EDE4F7] flex items-center justify-center text-[#A98ACB]">
          {icon}
        </div>
        <span className="text-xs text-[#6B5688] font-medium">{label}</span>
      </div>
      <span className="text-lg font-bold text-[#302A35]">{value}</span>
    </div>
  );
}

function CollapsibleSection({ title, icon, children, defaultOpen = false }: {
  title: string; icon: React.ReactNode; children: React.ReactNode; defaultOpen?: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="border border-[#E9DFD2] rounded-2xl bg-white overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center gap-3 px-5 py-4 text-left hover:bg-[#F7F0E5]/50 transition-colors"
      >
        <div className="w-9 h-9 rounded-xl bg-[#EDE4F7] flex items-center justify-center text-[#A98ACB] shrink-0">
          {icon}
        </div>
        <span className="flex-1 font-semibold text-[#302A35]">{title}</span>
        {open ? (
          <ChevronUp className="size-5 text-[#6B5688]" />
        ) : (
          <ChevronDown className="size-5 text-[#6B5688]" />
        )}
      </button>
      {open && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="px-5 pb-5 border-t border-[#E9DFD2]/60"
        >
          <div className="pt-4">{children}</div>
        </motion.div>
      )}
    </div>
  );
}

export default function Insights() {
  const { t } = useLanguage();
  const { result, reset } = useAssessment();
  const navigate = useNavigate();

  if (!result) {
    return (
      <div className="min-h-screen bg-[#FFF9F0] flex items-center justify-center px-4">
        <div className="text-center">
          <p className="text-[#6B5688] mb-4">No assessment data found.</p>
          <button
            onClick={() => navigate("/assessment")}
            className="px-6 py-2.5 bg-[#A98ACB] text-white rounded-xl font-medium"
          >
            Start Assessment
          </button>
        </div>
      </div>
    );
  }

  const scoreText = `${result.businessName} in ${result.location} has an opportunity score of ${result.opportunityScore} out of 100. ` +
    `Local demand is ${result.market.localDemand.toLowerCase()}, competition is ${result.market.competition.toLowerCase()}, ` +
    `and financial outlook is ${result.market.financialOutlook.toLowerCase()}.`;

  return (
    <div className="min-h-screen bg-[#FFF9F0] pb-24">
      {/* Header */}
      <div className="sticky top-0 z-40 bg-[#FFF9F0]/90 backdrop-blur-sm border-b border-[#E9DFD2]/60 px-4 py-3">
        <div className="max-w-lg mx-auto flex items-center gap-3">
          <button onClick={() => navigate("/")} className="p-2 rounded-lg hover:bg-[#EDE4F7] transition-colors">
            <ArrowLeft className="size-5 text-[#6B5688]" />
          </button>
          <h1 className="text-lg font-bold text-[#302A35]">{t("insights")}</h1>
          <div className="flex-1" />
          <ListenButton text={scoreText} />
        </div>
      </div>

      <div className="max-w-lg mx-auto px-4 space-y-6 pt-6">
        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <h2 className="text-2xl font-bold text-[#302A35] mb-1">{t("heresWhatWeFound")}</h2>
          <p className="text-sm text-[#6B5688]">
            {result.businessName} · {result.location}
          </p>
        </motion.div>

        {/* Opportunity Score */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-2xl border border-[#E9DFD2] p-6 text-center shadow-sm"
        >
          <p className="text-xs font-semibold text-[#A98ACB] uppercase tracking-widest mb-3">
            {t("businessOpportunity")}
          </p>
          <ScoreCircle score={result.opportunityScore} label={result.scoreLabel} />
          <p className="text-lg font-bold text-[#6B5688] mt-3">{t(result.scoreLabel.toLowerCase())}</p>

          <div className="mt-5 border-t border-[#E9DFD2]/60 pt-4 space-y-0.5">
            <MetricRow label={t("localDemand")} value={result.market.localDemand} color="#A98ACB" />
            <MetricRow label={t("competition")} value={result.market.competition} color="#A98ACB" />
            <MetricRow label={t("financialOutlook")} value={result.market.financialOutlook} color="#A98ACB" />
            <MetricRow label={t("risk")} value={result.market.risk} color="#A98ACB" />
          </div>
        </motion.div>

        {/* Financial Summary */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <h3 className="text-base font-bold text-[#302A35] mb-3 flex items-center gap-2">
            <TrendingUp className="size-5 text-[#A98ACB]" />
            {t("financialSummary")}
          </h3>
          <div className="grid grid-cols-2 gap-3">
            <FinancialCard
              label={t("estimatedStartup")}
              value={formatCurrency(result.financial.startup)}
              icon={<TrendingUp className="size-4" />}
            />
            <FinancialCard
              label={t("estMonthlyRevenue")}
              value={formatCurrency(result.financial.monthlyRevenue)}
              icon={<TrendingUp className="size-4" />}
            />
            <FinancialCard
              label={t("estMonthlyExpenses")}
              value={formatCurrency(result.financial.monthlyExpenses)}
              icon={<AlertTriangle className="size-4" />}
            />
            <FinancialCard
              label={t("estMonthlyProfit")}
              value={formatCurrency(result.financial.monthlyProfit)}
              icon={<Lightbulb className="size-4" />}
            />
          </div>
          <div className="mt-3 bg-[#EDE4F7]/50 rounded-xl px-4 py-3 text-center">
            <span className="text-sm text-[#6B5688]">{t("estBreakeven")}: </span>
            <span className="text-sm font-bold text-[#302A35]">{result.financial.breakevenMonths} {t("months")}</span>
          </div>
          <p className="text-xs text-[#6B5688] text-center mt-2 italic">
            Estimates are indicative and may vary based on actual conditions.
          </p>
        </motion.div>

        {/* Recommendations */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <CollapsibleSection
            title={t("whatWeRecommend")}
            icon={<Lightbulb className="size-4" />}
            defaultOpen
          >
            <ul className="space-y-3">
              {result.recommendations.map((rec, i) => (
                <li key={i} className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-[#EDE4F7] flex items-center justify-center shrink-0 mt-0.5">
                    <span className="text-xs font-bold text-[#A98ACB]">{i + 1}</span>
                  </div>
                  <span className="text-sm text-[#302A35] leading-relaxed">{rec}</span>
                </li>
              ))}
            </ul>
            <div className="mt-4">
              <ListenButton
                text={result.recommendations.join(". ")}
                className="w-full justify-center"
              />
            </div>
          </CollapsibleSection>
        </motion.div>

        {/* Risks */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <CollapsibleSection
            title={t("thingsToWatch")}
            icon={<AlertTriangle className="size-4" />}
          >
            <div className="space-y-4">
              {result.risks.map((risk, i) => (
                <div key={i} className="space-y-1.5">
                  <div className="flex items-start gap-2">
                    <AlertTriangle className="size-4 text-[#D4A74E] shrink-0 mt-0.5" />
                    <span className="text-sm font-semibold text-[#302A35]">{risk.risk}</span>
                  </div>
                  <div className="flex items-start gap-2 ml-6">
                    <Lightbulb className="size-3.5 text-[#7BAE6B] shrink-0 mt-0.5" />
                    <span className="text-xs text-[#6B5688] leading-relaxed">{risk.mitigation}</span>
                  </div>
                </div>
              ))}
            </div>
          </CollapsibleSection>
        </motion.div>

        {/* Funding */}
        {result.matchedSchemes.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <CollapsibleSection
              title={t("fundingOptions")}
              icon={<Banknote className="size-4" />}
            >
              <div className="space-y-4">
                {result.matchedSchemes.slice(0, 3).map((scheme) => (
                  <div key={scheme.id} className="border border-[#E9DFD2] rounded-xl p-4 bg-[#F7F0E5]/30">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-semibold text-[#302A35] text-sm">{scheme.name}</h4>
                      <span className="px-2 py-0.5 rounded-full bg-[#A98ACB]/10 text-[#A98ACB] text-xs font-medium">
                        {scheme.potentialMatch} Match
                      </span>
                    </div>
                    <p className="text-xs text-[#6B5688] italic mb-2">{scheme.fullName}</p>
                    <p className="text-sm text-[#302A35] mb-2">{scheme.whyItMatches}</p>
                    <div className="text-xs text-[#6B5688] space-y-1">
                      <p><strong>Funding:</strong> {scheme.fundingInfo}</p>
                      <p className="italic text-[#A98ACB]">{t("youMayBeEligible")}</p>
                    </div>
                    {scheme.officialSource && (
                      <a
                        href={scheme.officialSource}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 mt-2 text-xs text-[#A98ACB] hover:underline"
                      >
                        {t("officialSource")} <ExternalLink className="size-3" />
                      </a>
                    )}
                  </div>
                ))}
              </div>
              <p className="text-xs text-[#6B5688] italic mt-3">{t("disclaimer")}</p>
              <div className="mt-4">
                <button
                  onClick={() => navigate("/funding")}
                  className="w-full py-2.5 border border-[#A98ACB] text-[#A98ACB] rounded-xl text-sm font-medium hover:bg-[#EDE4F7] transition-colors"
                >
                  {t("funding")} →
                </button>
              </div>
            </CollapsibleSection>
          </motion.div>
        )}

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="space-y-3 pt-4"
        >
          <button
            onClick={() => navigate("/chat")}
            className="w-full py-3.5 bg-gradient-to-r from-[#A98ACB] to-[#8B6FB0] text-white font-semibold rounded-xl shadow-lg shadow-[#A98ACB]/25"
          >
            {t("askBisnosis")} →
          </button>
          <button
            onClick={() => { reset(); navigate("/assessment"); }}
            className="w-full py-3 border border-[#E9DFD2] text-[#6B5688] rounded-xl text-sm font-medium hover:bg-[#EDE4F7] transition-colors"
          >
            Start New Assessment
          </button>
        </motion.div>

        {/* Disclaimer */}
        <div className="py-6 border-t border-[#E9DFD2]/60">
          <p className="text-xs text-[#6B5688]/70 leading-relaxed text-center">
            {t("reportDisclaimer")}
          </p>
        </div>
      </div>
    </div>
  );
}
