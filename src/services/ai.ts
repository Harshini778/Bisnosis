import type { AssessmentData, AnalysisResult } from "./analysis";

export interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: number;
}

function getBusinessName(id: string): string {
  const names: Record<string, string> = {
    agriculture: "Agriculture",
    dairy: "Dairy",
    food: "Food",
    retail: "Retail",
    tailoring: "Tailoring",
    poultry: "Poultry",
    fisheries: "Fisheries",
    handicrafts: "Handicrafts",
    services: "Services",
    other: "Your business",
  };
  return names[id] || "Your business";
}

function formatCurrency(amount: number): string {
  if (amount >= 100000) {
    const lakhs = amount / 100000;
    return `₹${lakhs % 1 === 0 ? lakhs : lakhs.toFixed(1)} Lakh`;
  }
  return `₹${amount.toLocaleString("en-IN")}`;
}

function generateLocalResponse(
  question: string,
  assessment: AssessmentData,
  result: AnalysisResult
): string {
  const q = question.toLowerCase();
  const bizName = getBusinessName(assessment.businessId);

  // Score questions
  if (q.includes("score") || q.includes("78") || q.includes("80") || q.includes("why")) {
    const reasons: string[] = [];
    if (result.market.demandScore >= 75) reasons.push("high local demand for " + bizName.toLowerCase());
    if (result.market.competitionScore >= 70) reasons.push("manageable competition in your area");
    if (result.market.financialScore >= 70) reasons.push("good financial outlook for this business type");
    if (result.market.riskScore >= 65) reasons.push("moderate risk levels that can be managed");
    if (reasons.length === 0) reasons.push("balanced market conditions for this business type");

    return `Your score of ${result.opportunityScore} is based on four key factors:\n\n• ${reasons.join("\n• ")}\n\nThe score reflects that ${bizName.toLowerCase()} has ${result.market.localDemand.toLowerCase()} local demand with ${result.market.competition.toLowerCase()} competition. ${result.market.financialOutlook === "Good" ? "The financial outlook is positive." : "The financial outlook is moderate."}`;
  }

  // Good business questions
  if (q.includes("good") || q.includes("suitable") || q.includes("right") || q.includes("start")) {
    if (result.opportunityScore >= 70) {
      return `Yes, ${bizName.toLowerCase()} looks promising for your area (${assessment.location}). With a score of ${result.opportunityScore}/100, you have ${result.market.localDemand.toLowerCase()} demand and ${result.market.competition.toLowerCase()} competition. Your investment of ${formatCurrency(assessment.investmentAmount)} is a reasonable starting point. I'd recommend starting with a focused approach and scaling up as you build your customer base.`;
    }
    return `${bizName.toLowerCase()} can work in your area (${assessment.location}), but there are some factors to consider carefully. With a score of ${result.opportunityScore}/100, the market shows ${result.market.competition.toLowerCase()} competition. I'd suggest starting small, understanding your local customers well, and building from there.`;
  }

  // Funding questions
  if (q.includes("fund") || q.includes("loan") || q.includes("scheme") || q.includes("government")) {
    if (result.matchedSchemes.length === 0) {
      return "Based on your profile, I couldn't find a strong match with current government schemes. You may want to explore local bank loans or connect with your district's industry office for guidance on available schemes.";
    }
    const top = result.matchedSchemes[0];
    return `Based on your ${bizName.toLowerCase()} business with ${formatCurrency(assessment.investmentAmount)} investment, here's what I'd recommend:\n\n1. ${top.name} (${top.fullName}) — This is the strongest match for your profile with a ${top.potentialMatch.toLowerCase()} potential.\n\n${result.matchedSchemes.length > 1 ? `2. ${result.matchedSchemes[1].name} — Another option worth exploring.\n\n` : ""}Remember, final eligibility depends on official documentation and lender assessment. Visit the official website or your nearest bank branch for accurate information.`;
  }

  // Risk questions
  if (q.includes("risk") || q.includes("problem") || q.includes("challenge") || q.includes("danger")) {
    if (result.risks.length > 0) {
      return `Your main risks for ${bizName.toLowerCase()} are:\n\n1. ${result.risks[0].risk} — ${result.risks[0].mitigation}\n\n${result.risks.length > 1 ? `2. ${result.risks[1].risk} — ${result.risks[1].mitigation}\n\n` : ""}The good news: these are all manageable with proper planning. Keep some reserves for unexpected situations, and don't invest everything in one go.`;
    }
    return `Every business has risks. For ${bizName.toLowerCase()}, the key things to watch are market competition and seasonal demand changes. Keep working capital reserves and start with a focused approach.`;
  }

  // Investment questions
  if (q.includes("invest") || q.includes("reduce") || q.includes("cost") || q.includes("cheap")) {
    return `To reduce your initial investment for ${bizName.toLowerCase()}:\n\n1. Start with essential equipment only — rent or borrow what you can initially\n2. Begin from home if possible to save on rent\n3. Buy raw materials in smaller quantities until you understand demand\n4. Explore second-hand equipment in good condition\n5. Consider starting part-time while keeping your current income\n\nYour current investment of ${formatCurrency(assessment.investmentAmount)} is ${assessment.investmentAmount <= 100000 ? "a modest and smart starting point" : "a reasonable amount"}. You can always scale up once you see consistent returns.`;
  }

  // Revenue / profit questions
  if (q.includes("revenue") || q.includes("profit") || q.includes("income") || q.includes("earn") || q.includes("money")) {
    if (result.financial.available) {
      return `Here's what the estimates show for your ${bizName.toLowerCase()}:\n\n• Monthly Revenue: ${formatCurrency(result.financial.monthlyRevenue)}\n• Monthly Expenses: ${formatCurrency(result.financial.monthlyExpenses)}\n• Monthly Profit: ${formatCurrency(result.financial.monthlyProfit)}\n• Break-even: ${result.financial.breakevenMonths} months\n\nThese are estimates based on typical businesses of this type. Your actual numbers will depend on your effort, local demand, and how well you manage costs.`;
    }
    return "With the current information, I can't provide precise financial estimates. I'd recommend starting with detailed record-keeping from day one to understand your actual numbers.";
  }

  // Break-even
  if (q.includes("break") || q.includes("recover") || q.includes("pay back")) {
    return `Your estimated break-even point is ${result.financial.breakevenMonths} months, meaning you'd recover your initial investment in approximately ${result.financial.breakevenMonths} months based on projected monthly profit of ${formatCurrency(result.financial.monthlyProfit)}. This is an estimate — actual break-even depends on how quickly you build your customer base and manage expenses.`;
  }

  // Competition
  if (q.includes("compet")) {
    return `Competition for ${bizName.toLowerCase()} in your area is ${result.market.competition.toLowerCase()}. ${result.market.competition === "High" ? "This means you'll need to differentiate yourself — perhaps through better quality, competitive pricing, or superior customer service." : result.market.competition === "Moderate" ? "There's room for new players, but focus on what makes your offering unique." : "You have a relatively open market, which is an advantage. Use this time to build a strong customer base."} Start by observing what existing businesses do well and where they fall short.`;
  }

  // Location
  if (q.includes("location") || q.includes("area") || q.includes("village") || q.includes("town")) {
    return `Your location (${assessment.location}) factors into the analysis through market indicators. For ${bizName.toLowerCase()}, the local demand is ${result.market.localDemand.toLowerCase()}. ${result.market.localDemand === "High" ? "This is great — there's strong existing demand for this type of business." : "Focus on building awareness and demand through local marketing."} Connect with local business associations and understand the specific needs of your community.`;
  }

  // Default response
  return `Great question! Based on your ${bizName.toLowerCase()} business plan in ${assessment.location} with ${formatCurrency(assessment.investmentAmount)} investment:\n\n• Your opportunity score is ${result.opportunityScore}/100\n• Market demand is ${result.market.localDemand.toLowerCase()}\n• Competition is ${result.market.competition.toLowerCase()}\n• Estimated monthly profit: ${formatCurrency(result.financial.monthlyProfit)}\n\nFeel free to ask me about your score, funding options, risks, or how to improve your business plan. I'm here to help!`;
}

export async function sendChatMessage(
  message: string,
  assessment: AssessmentData,
  result: AnalysisResult,
  history: ChatMessage[]
): Promise<string> {
  // Simulate processing delay
  await new Promise((resolve) => setTimeout(resolve, 600 + Math.random() * 800));
  return generateLocalResponse(message, assessment, result);
}
