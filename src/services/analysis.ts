import { MARKET_DATA, FINANCIAL_ESTIMATES, RISK_DATA, RECOMMENDATIONS } from "@/data/businesses";
import { matchSchemes, type GovernmentScheme } from "@/data/schemes";

export interface AssessmentData {
  location: string;
  businessId: string;
  investmentId: string;
  investmentAmount: number;
  loanRequired: boolean;
  loanAmount: number;
  additionalInfo: string;
}

export interface MarketInsights {
  localDemand: string;
  competition: string;
  financialOutlook: string;
  risk: string;
  demandScore: number;
  competitionScore: number;
  financialScore: number;
  riskScore: number;
}

export interface FinancialEstimate {
  startup: number;
  monthlyRevenue: number;
  monthlyExpenses: number;
  monthlyProfit: number;
  breakevenMonths: number;
  available: boolean;
}

export interface RiskItem {
  risk: string;
  mitigation: string;
}

export interface AnalysisResult {
  opportunityScore: number;
  scoreLabel: string;
  market: MarketInsights;
  financial: FinancialEstimate;
  risks: RiskItem[];
  recommendations: string[];
  matchedSchemes: GovernmentScheme[];
  businessName: string;
  location: string;
}

function getInvestmentKey(amount: number): string {
  if (amount <= 50000) return "50k";
  if (amount <= 100000) return "1l";
  if (amount <= 200000) return "2l";
  if (amount <= 500000) return "5l";
  return "10l+";
}

function calculateOpportunityScore(market: MarketInsights, hasLoan: boolean): number {
  const raw =
    market.demandScore * 0.3 +
    market.competitionScore * 0.2 +
    market.financialScore * 0.3 +
    market.riskScore * 0.2;
  const loanBoost = hasLoan ? 3 : 0;
  return Math.min(100, Math.round(raw + loanBoost));
}

function getScoreLabel(score: number): string {
  if (score >= 80) return "EXCELLENT";
  if (score >= 70) return "STRONG";
  return "PROMISING";
}

function getBusinessName(id: string): string {
  const names: Record<string, string> = {
    agriculture: "Agriculture",
    dairy: "Dairy Business",
    food: "Food Business",
    retail: "Retail Shop",
    tailoring: "Tailoring Business",
    poultry: "Poultry Farm",
    fisheries: "Fisheries Business",
    handicrafts: "Handicrafts Business",
    services: "Services Business",
    other: "Business",
  };
  return names[id] || "Business";
}

export function runAnalysis(data: AssessmentData): AnalysisResult {
  const marketBase = MARKET_DATA[data.businessId] || MARKET_DATA.other;
  const financialBase = FINANCIAL_ESTIMATES[data.businessId]?.[data.investmentId]
    || FINANCIAL_ESTIMATES.other[data.investmentId]
    || FINANCIAL_ESTIMATES.other["1l"];

  const market: MarketInsights = {
    localDemand: marketBase.localDemand,
    competition: marketBase.competition,
    financialOutlook: marketBase.financialOutlook,
    risk: marketBase.risk,
    demandScore: marketBase.demandScore,
    competitionScore: marketBase.competitionScore,
    financialScore: marketBase.financialScore,
    riskScore: marketBase.riskScore,
  };

  const financial: FinancialEstimate = {
    ...financialBase,
    available: true,
  };

  const opportunityScore = calculateOpportunityScore(market, data.loanRequired);
  const scoreLabel = getScoreLabel(opportunityScore);

  const risks = RISK_DATA[data.businessId] || RISK_DATA.other;
  const recommendations = RECOMMENDATIONS[data.businessId] || RECOMMENDATIONS.other;
  const matchedSchemes = matchSchemes(data.businessId, data.investmentAmount, data.loanRequired);

  return {
    opportunityScore,
    scoreLabel,
    market,
    financial,
    risks,
    recommendations,
    matchedSchemes,
    businessName: getBusinessName(data.businessId),
    location: data.location,
  };
}
