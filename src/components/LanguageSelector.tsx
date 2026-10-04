import { useLanguage } from "@/contexts/LanguageContext";
import { Globe } from "lucide-react";

export function LanguageSelector() {
  const { language, setLanguage, languages } = useLanguage();

  return (
    <div className="flex items-center gap-1.5">
      <Globe className="size-4 text-[#A98ACB]" />
      <div className="flex gap-0.5 rounded-full bg-white/60 p-0.5 border border-[#E9DFD2]">
        {languages.map((lang) => (
          <button
            key={lang.code}
            onClick={() => setLanguage(lang.code)}
            className={`px-2.5 py-1 text-xs font-medium rounded-full transition-all duration-200 ${
              language === lang.code
                ? "bg-[#A98ACB] text-white shadow-sm"
                : "text-[#6B5688] hover:bg-[#EDE4F7]"
            }`}
          >
            {lang.name}
          </button>
        ))}
      </div>
    </div>
  );
}
