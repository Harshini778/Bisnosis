import { motion } from "framer-motion";
import { useNavigate } from "react-router";
import { ArrowRight, Sparkles, TrendingUp, Shield, ChevronDown } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { LanguageSelector } from "@/components/LanguageSelector";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" as const } },
};

const stagger = {
  visible: { transition: { staggerChildren: 0.12 } },
};

export default function Landing() {
  const navigate = useNavigate();
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-[#FFF9F0] overflow-hidden">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-[#FFF9F0]/80 backdrop-blur-md border-b border-[#E9DFD2]/60">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#A98ACB] to-[#6B5688] flex items-center justify-center">
              <span className="text-white font-bold text-sm">B</span>
            </div>
            <span className="text-lg font-bold tracking-tight text-[#302A35]">
              BISNOSIS
            </span>
          </div>
          <LanguageSelector />
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative pt-28 pb-16 sm:pt-36 sm:pb-24 px-4 sm:px-6">
        {/* Decorative elements */}
        <div className="absolute top-20 right-[10%] w-64 h-64 rounded-full bg-[#EDE4F7]/60 blur-3xl" />
        <div className="absolute bottom-10 left-[5%] w-48 h-48 rounded-full bg-[#C8B6E2]/20 blur-3xl" />

        <motion.div
          initial="hidden"
          animate="visible"
          variants={stagger}
          className="relative max-w-4xl mx-auto text-center"
        >
          {/* Badge */}
          <motion.div variants={fadeUp} className="mb-6">
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#EDE4F7] text-[#6B5688] text-sm font-medium border border-[#C8B6E2]/40">
              <Sparkles className="size-4" />
              AI-Powered Business Advisory
            </span>
          </motion.div>

          {/* Brand */}
          <motion.h1
            variants={fadeUp}
            className="text-5xl sm:text-7xl font-bold tracking-tight text-[#302A35] mb-3"
          >
            BISNOSIS
          </motion.h1>

          <motion.p
            variants={fadeUp}
            className="text-lg sm:text-xl text-[#A98ACB] font-medium mb-6 italic"
          >
            "{t('tagline')}"
          </motion.p>

          {/* Hero text */}
          <motion.h2
            variants={fadeUp}
            className="text-2xl sm:text-3xl font-semibold text-[#302A35] mb-4 max-w-2xl mx-auto leading-snug"
          >
            {t('hero')}
          </motion.h2>

          <motion.p
            variants={fadeUp}
            className="text-base sm:text-lg text-[#6B5688] max-w-xl mx-auto mb-8 leading-relaxed"
          >
            {t('heroSub')}
          </motion.p>

          {/* CTAs */}
          <motion.div variants={fadeUp} className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              onClick={() => navigate("/assessment")}
              className="group inline-flex items-center gap-2 px-8 py-3.5 bg-gradient-to-r from-[#A98ACB] to-[#8B6FB0] text-white font-semibold rounded-xl shadow-lg shadow-[#A98ACB]/25 hover:shadow-xl hover:shadow-[#A98ACB]/30 transition-all duration-300 hover:-translate-y-0.5"
            >
              {t('startAssessment')}
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
            </button>
            <button
              onClick={() => {
                document.getElementById("how-it-works")?.scrollIntoView({ behavior: "smooth" });
              }}
              className="inline-flex items-center gap-2 px-8 py-3.5 bg-white/80 text-[#6B5688] font-semibold rounded-xl border border-[#E9DFD2] hover:bg-[#EDE4F7] hover:border-[#C8B6E2] transition-all duration-300"
            >
              {t('howItWorks')}
              <ChevronDown className="size-4" />
            </button>
          </motion.div>
        </motion.div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-16 sm:py-24 px-4 sm:px-6 bg-white/50">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h3 className="text-sm font-semibold text-[#A98ACB] uppercase tracking-widest mb-2">
              Simple Process
            </h3>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#302A35]">
              {t('howItWorks')}
            </h2>
          </motion.div>

          <div className="grid sm:grid-cols-3 gap-6 sm:gap-8">
            {[
              {
                num: "01",
                title: t("step1Title"),
                desc: "Share your business idea, location, and budget — just 4 simple questions.",
                icon: <Sparkles className="size-6" />,
              },
              {
                num: "02",
                title: t("step2Title"),
                desc: "We analyze local market data, competition, and financial feasibility for you.",
                icon: <TrendingUp className="size-6" />,
              },
              {
                num: "03",
                title: t("step3Title"),
                desc: "Get your opportunity score, financial estimates, and funding recommendations.",
                icon: <Shield className="size-6" />,
              },
            ].map((step, i) => (
              <motion.div
                key={step.num}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-30px" }}
                transition={{ duration: 0.5, delay: i * 0.15 }}
                className="relative group"
              >
                <div className="bg-white rounded-2xl p-6 sm:p-8 border border-[#E9DFD2] shadow-sm hover:shadow-md hover:border-[#C8B6E2]/60 transition-all duration-300 h-full">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-3xl font-bold text-[#C8B6E2]">{step.num}</span>
                    <div className="w-10 h-10 rounded-xl bg-[#EDE4F7] flex items-center justify-center text-[#A98ACB]">
                      {step.icon}
                    </div>
                  </div>
                  <h4 className="text-lg font-semibold text-[#302A35] mb-2">{step.title}</h4>
                  <p className="text-sm text-[#6B5688] leading-relaxed">{step.desc}</p>
                </div>
                {i < 2 && (
                  <div className="hidden sm:block absolute top-1/2 -right-4 w-8 h-px bg-[#C8B6E2]" />
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 sm:py-24 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h3 className="text-sm font-semibold text-[#A98ACB] uppercase tracking-widest mb-2">
              Why BISNOSIS?
            </h3>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#302A35]">
              Built for real entrepreneurs
            </h2>
          </motion.div>

          <div className="grid sm:grid-cols-2 gap-4 sm:gap-5">
            {[
              { title: "Minimal Input", desc: "Just 4 simple questions — no complicated forms." },
              { title: "Local Intelligence", desc: "Market insights tailored to your specific area." },
              { title: "Financial Clarity", desc: "Clear revenue, expense, and break-even estimates." },
              { title: "Funding Guidance", desc: "Government schemes matched to your profile." },
              { title: "Risk Awareness", desc: "Know potential risks and how to manage them." },
              { title: "AI Assistant", desc: "Ask anything about your business plan, anytime." },
            ].map((feature, i) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className="flex items-start gap-3 p-4 rounded-xl bg-white/60 border border-[#E9DFD2]/60"
              >
                <div className="w-2 h-2 rounded-full bg-[#A98ACB] mt-2 shrink-0" />
                <div>
                  <h4 className="font-semibold text-[#302A35] mb-0.5">{feature.title}</h4>
                  <p className="text-sm text-[#6B5688]">{feature.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 sm:py-24 px-4 sm:px-6 bg-gradient-to-b from-[#EDE4F7]/40 to-[#FFF9F0]">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="max-w-2xl mx-auto text-center"
        >
          <h2 className="text-2xl sm:text-3xl font-bold text-[#302A35] mb-4">
            Ready to know before you grow?
          </h2>
          <p className="text-[#6B5688] mb-8 max-w-md mx-auto">
            Your business idea deserves a smarter start. Take the first step today.
          </p>
          <button
            onClick={() => navigate("/assessment")}
            className="group inline-flex items-center gap-2 px-10 py-4 bg-gradient-to-r from-[#A98ACB] to-[#8B6FB0] text-white font-semibold rounded-xl shadow-lg shadow-[#A98ACB]/25 hover:shadow-xl transition-all duration-300 hover:-translate-y-0.5 text-lg"
          >
            {t('startAssessment')}
            <ArrowRight className="size-5 transition-transform group-hover:translate-x-1" />
          </button>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 sm:px-6 border-t border-[#E9DFD2]/60">
        <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-md bg-gradient-to-br from-[#A98ACB] to-[#6B5688] flex items-center justify-center">
              <span className="text-white font-bold text-[10px]">B</span>
            </div>
            <span className="text-sm font-semibold text-[#302A35]">BISNOSIS</span>
          </div>
          <p className="text-xs text-[#6B5688] text-center">
            Financial estimates are indicative and may vary. Always verify with official sources.
          </p>
        </div>
      </footer>
    </div>
  );
}
