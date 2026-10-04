import { createContext, useContext, useState, useCallback, type ReactNode } from "react";
import type { AssessmentData, AnalysisResult } from "@/services/analysis";
import { runAnalysis } from "@/services/analysis";

type AssessmentStep = 0 | 1 | 2 | 3 | 4 | "analyzing" | "results";

interface AssessmentContextType {
  step: AssessmentStep;
  setStep: (step: AssessmentStep) => void;
  data: AssessmentData;
  updateData: (partial: Partial<AssessmentData>) => void;
  result: AnalysisResult | null;
  submit: () => void;
  reset: () => void;
}

const AssessmentContext = createContext<AssessmentContextType | null>(null);

const INITIAL_DATA: AssessmentData = {
  location: "",
  businessId: "",
  investmentId: "",
  investmentAmount: 0,
  loanRequired: false,
  loanAmount: 0,
  additionalInfo: "",
};

export function AssessmentProvider({ children }: { children: ReactNode }) {
  const [step, setStep] = useState<AssessmentStep>(0);
  const [data, setData] = useState<AssessmentData>(INITIAL_DATA);
  const [result, setResult] = useState<AnalysisResult | null>(null);

  const updateData = useCallback((partial: Partial<AssessmentData>) => {
    setData((prev) => ({ ...prev, ...partial }));
  }, []);

  const submit = useCallback(() => {
    setStep("analyzing");
    setTimeout(() => {
      const analysisResult = runAnalysis(data);
      setResult(analysisResult);
      setStep("results");
    }, 4000);
  }, [data]);

  const reset = useCallback(() => {
    setStep(0);
    setData(INITIAL_DATA);
    setResult(null);
  }, []);

  return (
    <AssessmentContext.Provider value={{ step, setStep, data, updateData, result, submit, reset }}>
      {children}
    </AssessmentContext.Provider>
  );
}

export function useAssessment(): AssessmentContextType {
  const ctx = useContext(AssessmentContext);
  if (!ctx) throw new Error("useAssessment must be used within AssessmentProvider");
  return ctx;
}
