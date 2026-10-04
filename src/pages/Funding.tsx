import { motion } from "framer-motion";
import { ArrowLeft, Banknote, ExternalLink, CheckCircle2, AlertCircle } from "lucide-react";
import { useNavigate } from "react-router";
import { useLanguage } from "@/contexts/LanguageContext";
import { useAssessment } from "@/contexts/AssessmentContext";
import { ListenButton } from "@/components/ListenButton";

export default function Funding() {
  const { t } = useLanguage();
  const { result } = useAssessment();
  const navigate = useNavigate();

  if (!result) {
    return (
      <div className="min-h-screen bg-[#FFF9F0] flex items-center justify-center px-4">
        <div className="text-center">
          <p className="text-[#6B5688] mb-4">Complete an assessment to see funding options.</p>
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

  return (
    <div className="min-h-screen bg-[#FFF9F0] pb-24">
      {/* Header */}
      <div className="sticky top-0 z-40 bg-[#FFF9F0]/90 backdrop-blur-sm border-b border-[#E9DFD2]/60 px-4 py-3">
        <div className="max-w-lg mx-auto flex items-center gap-3">
          <button onClick={() => navigate("/insights")} className="p-2 rounded-lg hover:bg-[#EDE4F7] transition-colors">
            <ArrowLeft className="size-5 text-[#6B5688]" />
          </button>
          <h1 className="text-lg font-bold text-[#302A35]">{t("funding")}</h1>
          <div className="flex-1" />
        </div>
      </div>

      <div className="max-w-lg mx-auto px-4 space-y-6 pt-6">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <div className="w-14 h-14 rounded-2xl bg-[#EDE4F7] flex items-center justify-center mx-auto mb-3">
            <Banknote className="size-7 text-[#A98ACB]" />
          </div>
          <h2 className="text-xl font-bold text-[#302A35] mb-1">{t("fundingOptions")}</h2>
          <p className="text-sm text-[#6B5688]">
            Based on your {result.businessName.toLowerCase()} profile
          </p>
        </motion.div>

        {result.matchedSchemes.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-2xl border border-[#E9DFD2] p-6 text-center"
          >
            <AlertCircle className="size-10 text-[#D4A74E] mx-auto mb-3" />
            <p className="text-sm text-[#302A35] font-medium mb-1">No strong scheme matches found</p>
            <p className="text-xs text-[#6B5688]">
              Based on your current profile, we couldn't find a strong match. Consider exploring
              local bank loans or contacting your district industry office.
            </p>
          </motion.div>
        ) : (
          result.matchedSchemes.map((scheme, i) => (
            <motion.div
              key={scheme.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="bg-white rounded-2xl border border-[#E9DFD2] p-5 shadow-sm"
            >
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h3 className="font-bold text-[#302A35] text-base">{scheme.name}</h3>
                  <p className="text-xs text-[#6B5688] italic">{scheme.fullName}</p>
                </div>
                <span className="px-2.5 py-1 rounded-full bg-[#A98ACB]/10 text-[#A98ACB] text-xs font-semibold shrink-0">
                  {scheme.potentialMatch} Match
                </span>
              </div>

              <p className="text-sm text-[#302A35] leading-relaxed mb-4">
                {scheme.description}
              </p>

              <div className="space-y-3">
                <div className="bg-[#EDE4F7]/40 rounded-xl p-3">
                  <p className="text-xs font-semibold text-[#A98ACB] mb-1">{t("whyItMayMatch")}</p>
                  <p className="text-sm text-[#302A35] leading-relaxed">{scheme.whyItMatches}</p>
                </div>

                <div className="bg-[#F7F0E5]/60 rounded-xl p-3">
                  <p className="text-xs font-semibold text-[#6B5688] mb-1">{t("eligibility")}</p>
                  <p className="text-sm text-[#302A35] leading-relaxed">{scheme.eligibility}</p>
                </div>

                <div className="bg-white rounded-xl p-3 border border-[#E9DFD2]/60">
                  <p className="text-xs font-semibold text-[#6B5688] mb-1">{t("fundingInfo")}</p>
                  <p className="text-sm text-[#302A35] leading-relaxed">{scheme.fundingInfo}</p>
                </div>
              </div>

              <div className="flex items-center gap-4 mt-4 pt-3 border-t border-[#E9DFD2]/60">
                {scheme.officialSource && (
                  <a
                    href={scheme.officialSource}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-xs text-[#A98ACB] hover:underline font-medium"
                  >
                    {t("officialSource")} <ExternalLink className="size-3" />
                  </a>
                )}
                <span className="text-[10px] text-[#6B5688]">
                  {t("lastVerified")}: {scheme.lastVerified}
                </span>
              </div>

              <div className="flex items-start gap-1.5 mt-3 pt-3 border-t border-[#E9DFD2]/60">
                <CheckCircle2 className="size-3.5 text-[#A98ACB] shrink-0 mt-0.5" />
                <p className="text-[10px] text-[#6B5688] italic leading-relaxed">
                  {t("youMayBeEligible")}. {t("disclaimer")}
                </p>
              </div>
            </motion.div>
          ))
        )}

        <div className="py-6 border-t border-[#E9DFD2]/60">
          <ListenButton
            text={`${result.matchedSchemes.length} funding options were found for your ${result.businessName.toLowerCase()}. The top recommendation is ${result.matchedSchemes[0]?.name || "not available"}. Remember to verify eligibility through official sources.`}
            className="w-full justify-center"
          />
        </div>

        <div className="py-4">
          <p className="text-xs text-[#6B5688]/70 leading-relaxed text-center">
            {t("reportDisclaimer")}
          </p>
        </div>
      </div>
    </div>
  );
}
