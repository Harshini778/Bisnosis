import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, Send, Loader2, Bot, User } from "lucide-react";
import { useNavigate } from "react-router";
import { useLanguage } from "@/contexts/LanguageContext";
import { useAssessment } from "@/contexts/AssessmentContext";
import { sendChatMessage, type ChatMessage } from "@/services/ai";

const SUGGESTED_QUESTIONS = [
  "isThisGood",
  "whyThisScore",
  "whichFunding",
  "reduceRisk",
];

export default function Chat() {
  const { t } = useLanguage();
  const { data, result } = useAssessment();
  const navigate = useNavigate();
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (messages.length === 0 && result) {
      setMessages([{
        id: "welcome",
        role: "assistant",
        content: `Hello! I'm BISNOSIS, your business guide. I can help you understand your ${result.businessName.toLowerCase()} opportunity, explain your score of ${result.opportunityScore}/100, discuss funding options, or answer any business questions.\n\nFeel free to ask me anything!`,
        timestamp: Date.now(),
      }]);
    }
  }, [result]);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages]);

  const sendMessage = async (text: string) => {
    if (!text.trim() || loading || !result) return;

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      role: "user",
      content: text.trim(),
      timestamp: Date.now(),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    try {
      const response = await sendChatMessage(text, data, result, messages);
      const assistantMsg: ChatMessage = {
        id: `assistant-${Date.now()}`,
        role: "assistant",
        content: response,
        timestamp: Date.now(),
      };
      setMessages((prev) => [...prev, assistantMsg]);
    } catch {
      const errorMsg: ChatMessage = {
        id: `error-${Date.now()}`,
        role: "assistant",
        content: "Sorry, I encountered an issue. Please try again.",
        timestamp: Date.now(),
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setLoading(false);
    }
  };

  if (!result) {
    return (
      <div className="min-h-screen bg-[#FFF9F0] flex items-center justify-center px-4">
        <div className="text-center">
          <p className="text-[#6B5688] mb-4">Complete an assessment first to chat with BISNOSIS.</p>
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
    <div className="min-h-screen bg-[#FFF9F0] flex flex-col">
      {/* Header */}
      <div className="sticky top-0 z-40 bg-[#FFF9F0]/90 backdrop-blur-sm border-b border-[#E9DFD2]/60 px-4 py-3">
        <div className="max-w-lg mx-auto flex items-center gap-3">
          <button onClick={() => navigate("/insights")} className="p-2 rounded-lg hover:bg-[#EDE4F7] transition-colors">
            <ArrowLeft className="size-5 text-[#6B5688]" />
          </button>
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#A98ACB] to-[#6B5688] flex items-center justify-center">
              <Bot className="size-5 text-white" />
            </div>
            <div>
              <h1 className="text-base font-bold text-[#302A35]">{t("askBisnosis")}</h1>
              <p className="text-[10px] text-[#6B5688]">{t("yourBusinessGuide")}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto px-4 py-4 space-y-4 pb-24">
        {messages.map((msg) => (
          <motion.div
            key={msg.id}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
            className={`flex gap-2.5 ${msg.role === "user" ? "flex-row-reverse" : ""}`}
          >
            <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
              msg.role === "user"
                ? "bg-[#EDE4F7]"
                : "bg-gradient-to-br from-[#A98ACB] to-[#6B5688]"
            }`}>
              {msg.role === "user" ? (
                <User className="size-4 text-[#6B5688]" />
              ) : (
                <Bot className="size-4 text-white" />
              )}
            </div>
            <div
              className={`max-w-[80%] px-4 py-3 rounded-2xl text-sm leading-relaxed ${
                msg.role === "user"
                  ? "bg-[#A98ACB] text-white rounded-tr-sm"
                  : "bg-white border border-[#E9DFD2] text-[#302A35] rounded-tl-sm"
              }`}
            >
              <p className="whitespace-pre-line">{msg.content}</p>
            </div>
          </motion.div>
        ))}

        {loading && (
          <div className="flex gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#A98ACB] to-[#6B5688] flex items-center justify-center shrink-0">
              <Bot className="size-4 text-white" />
            </div>
            <div className="bg-white border border-[#E9DFD2] px-4 py-3 rounded-2xl rounded-tl-sm">
              <Loader2 className="size-4 text-[#A98ACB] animate-spin" />
            </div>
          </div>
        )}

        {/* Suggested questions (show at start) */}
        {messages.length <= 1 && !loading && (
          <div className="space-y-2 pt-2">
            <p className="text-xs text-[#6B5688] text-center font-medium">Suggested questions:</p>
            <div className="flex flex-wrap gap-2 justify-center">
              {SUGGESTED_QUESTIONS.map((key) => (
                <button
                  key={key}
                  onClick={() => sendMessage(t(key))}
                  className="px-4 py-2 rounded-xl bg-white border border-[#E9DFD2] text-sm text-[#6B5688] hover:bg-[#EDE4F7] hover:border-[#C8B6E2] transition-all"
                >
                  {t(key)}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Input */}
      <div className="fixed bottom-0 left-0 right-0 bg-[#FFF9F0]/95 backdrop-blur-sm border-t border-[#E9DFD2]/60 px-4 py-3 safe-bottom">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            sendMessage(input);
          }}
          className="max-w-lg mx-auto flex gap-2"
        >
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={t("typeMessage")}
            className="flex-1 px-4 py-2.5 rounded-xl border border-[#E9DFD2] bg-white text-[#302A35] placeholder-[#A98ACB]/40 focus:outline-none focus:border-[#A98ACB] focus:ring-2 focus:ring-[#A98ACB]/20 transition-all text-sm"
            disabled={loading}
          />
          <button
            type="submit"
            disabled={!input.trim() || loading}
            className="w-10 h-10 rounded-xl bg-[#A98ACB] text-white flex items-center justify-center hover:bg-[#8B6FB0] transition-colors disabled:opacity-40 disabled:cursor-not-allowed shrink-0"
          >
            {loading ? (
              <Loader2 className="size-4 animate-spin" />
            ) : (
              <Send className="size-4" />
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
