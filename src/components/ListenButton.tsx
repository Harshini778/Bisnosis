import { useState } from "react";
import { Volume2, VolumeX } from "lucide-react";
import { speak, stopSpeaking } from "@/services/speech";
import { useLanguage } from "@/contexts/LanguageContext";

interface ListenButtonProps {
  text: string;
  className?: string;
}

export function ListenButton({ text, className = "" }: ListenButtonProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const { t } = useLanguage();

  const handleToggle = () => {
    if (isPlaying) {
      stopSpeaking();
      setIsPlaying(false);
    } else {
      speak(text);
      setIsPlaying(true);
      // Auto-stop after estimated duration
      setTimeout(() => setIsPlaying(false), Math.max(3000, text.length * 50));
    }
  };

  return (
    <button
      onClick={handleToggle}
      className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-full transition-all duration-200 ${
        isPlaying
          ? "bg-[#A98ACB] text-white shadow-sm"
          : "bg-[#EDE4F7] text-[#6B5688] hover:bg-[#C8B6E2] hover:text-white"
      } ${className}`}
    >
      {isPlaying ? (
        <VolumeX className="size-3.5" />
      ) : (
        <Volume2 className="size-3.5" />
      )}
      {t("listen")}
    </button>
  );
}
