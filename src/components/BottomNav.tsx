import { useNavigate, useLocation } from "react-router";
import { Home, ClipboardCheck, BarChart3, Banknote, MessageCircle } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const NAV_ITEMS = [
  { path: "/", icon: Home, labelKey: "home" },
  { path: "/assessment", icon: ClipboardCheck, labelKey: "assessment" },
  { path: "/insights", icon: BarChart3, labelKey: "insights" },
  { path: "/funding", icon: Banknote, labelKey: "funding" },
  { path: "/chat", icon: MessageCircle, labelKey: "askBisnosis" },
];

export function BottomNav() {
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useLanguage();

  // Hide on landing page and on screens that have their own fixed bottom
  // controls (assessment steps, chat input) — otherwise this nav covers them.
  if (
    location.pathname === "/" ||
    location.pathname === "/assessment" ||
    location.pathname === "/chat"
  ) {
    return null;
  }

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-t border-[#E9DFD2] safe-bottom">
      <div className="flex items-center justify-around h-16 max-w-lg mx-auto">
        {NAV_ITEMS.map((item) => {
          const isActive = location.pathname === item.path;
          const Icon = item.icon;
          return (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              className={`flex flex-col items-center gap-0.5 px-3 py-1.5 rounded-xl transition-all duration-200 min-w-[56px] ${
                isActive
                  ? "text-[#A98ACB] bg-[#EDE4F7]"
                  : "text-[#6B5688] hover:text-[#A98ACB]"
              }`}
            >
              <Icon className={`size-5 ${isActive ? "stroke-[2.5px]" : "stroke-[1.5px]"}`} />
              <span className="text-[10px] font-medium leading-tight">
                {t(item.labelKey)}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
