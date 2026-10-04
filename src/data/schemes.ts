export interface GovernmentScheme {
  id: string;
  name: string;
  fullName: string;
  description: string;
  potentialMatch: string;
  whyItMatches: string;
  eligibility: string;
  fundingInfo: string;
  officialSource: string;
  lastVerified: string;
  businessTypes: string[];
  minInvestment: number;
  maxInvestment: number;
  loanRequired: boolean;
}

export const GOVERNMENT_SCHEMES: GovernmentScheme[] = [
  {
    id: "mudra",
    name: "PMMY / MUDRA",
    fullName: "Pradhan Mantri MUDRA Yojana",
    description: "Provides loans up to ₹10 lakh to non-corporate, non-farm small/micro enterprises.",
    potentialMatch: "High",
    whyItMatches: "Designed for small businesses with loans from ₹50,000 to ₹10 lakh without collateral. Covers most business types including retail, food, tailoring, and services.",
    eligibility: "Individuals, partnership firms, or companies with a business plan for non-farm income-generating activities. Loans classified as Shishu (up to ₹50K), Kishore (₹50K–5L), and Tarun (₹5L–10L).",
    fundingInfo: "Up to ₹10 lakh. Shishu: up to ₹50,000. Kishore: ₹50,001 to ₹5,00,000. Tarun: ₹5,00,001 to ₹10,00,000. No collateral required.",
    officialSource: "https://www.mudra.org.in",
    lastVerified: "January 2025",
    businessTypes: ["agriculture", "dairy", "food", "retail", "tailoring", "poultry", "fisheries", "handicrafts", "services", "other"],
    minInvestment: 50000,
    maxInvestment: 1000000,
    loanRequired: true,
  },
  {
    id: "pmegp",
    name: "PMEGP",
    fullName: "Prime Minister's Employment Generation Programme",
    description: "Credit-linked subsidy programme for new self-employment ventures in manufacturing and services.",
    potentialMatch: "High",
    whyItMatches: "Provides 15-35% subsidy on project costs for new enterprises. Good fit if you're starting a manufacturing or service business with investment between ₹5 lakh and ₹25 lakh.",
    eligibility: "Individuals aged 18+ with minimum 8th standard education. Project cost for manufacturing sector: up to ₹25 lakh. For service sector: up to ₹10 lakh. New units only.",
    fundingInfo: "Margin money: 10-25% of project cost. Subsidy: 15% (urban) to 25% (rural) for manufacturing; 15% (urban) to 25% (rural) for services. Bank loan covers balance.",
    officialSource: "https://www.kviconline.gov.in/pmegp",
    lastVerified: "January 2025",
    businessTypes: ["agriculture", "dairy", "food", "retail", "tailoring", "poultry", "fisheries", "handicrafts", "services", "other"],
    minInvestment: 100000,
    maxInvestment: 2500000,
    loanRequired: false,
  },
  {
    id: "pm_svanidhi",
    name: "PM SVANidhi",
    fullName: "Pradhan Mantri Street Vendor's AtmaNirbhar Nidhi",
    description: "Working capital loan for street vendors to resume their livelihoods post-pandemic.",
    potentialMatch: "Medium",
    whyItMatches: "If your business involves street vending or a small shop, this provides affordable working capital loans with interest subsidy.",
    eligibility: "Street vendors with Certificate of Registration under Street Vendors Act. Available for vendors in possession of Identity Certificate/License issued by Urban Local Body.",
    fundingInfo: "First loan: up to ₹10,000. Second loan: up to ₹20,000 (after timely repayment). Third loan: up to ₹50,000. 7% per annum interest subsidy.",
    officialSource: "https://pmsvanidhi.mohua.gov.in",
    lastVerified: "January 2025",
    businessTypes: ["retail", "food", "handicrafts", "services"],
    minInvestment: 10000,
    maxInvestment: 500000,
    loanRequired: true,
  },
  {
    id: "pm_vishwakarma",
    name: "PM Vishwakarma",
    fullName: "PM Vishwakarma Scheme",
    description: "Supports traditional artisans and craftspeople with skill training, toolkit incentives, and credit.",
    potentialMatch: "Medium",
    whyItMatches: "Excellent fit for tailoring, handicrafts, and traditional craft businesses. Provides skill training plus financial support.",
    eligibility: "Artisans and craftspeople in 18 traditional trades (including tailoring, weaving, basket making, etc.). Age 18+. Must be registered on the PM Vishwakarma portal.",
    fundingInfo: "Toolkit incentive: up to ₹15,000. Credit support: up to ₹3 lakh (first tranche ₹1 lakh, second ₹2 lakh). Stipend of ₹500/day during training.",
    officialSource: "https://pmvishwakarma.gov.in",
    lastVerified: "January 2025",
    businessTypes: ["tailoring", "handicrafts"],
    minInvestment: 15000,
    maxInvestment: 300000,
    loanRequired: false,
  },
  {
    id: "nrlm",
    name: "DAY-NRLM",
    fullName: "Deendayal Antyodaya Yojana - National Rural Livelihoods Mission",
    description: "Strengthens self-help groups and provides credit linkage for rural livelihood activities.",
    potentialMatch: "Medium",
    whyItMatches: "If you're part of or can join a Self-Help Group, this provides access to institutional credit and skill training for rural businesses.",
    eligibility: "Women from rural households, preferably belonging to BPL families. Organized into Self-Help Groups (SHGs). SHGs must be trained and linked to banks.",
    fundingInfo: "Credit linkage through banks for SHGs. Revolving fund: ₹10,000–₹1,00,000. Community Investment Fund: up to ₹15,000 per SHG member.",
    officialSource: "https://aajeevika.gov.in",
    lastVerified: "January 2025",
    businessTypes: ["agriculture", "dairy", "food", "tailoring", "poultry", "fisheries", "handicrafts", "services"],
    minInvestment: 10000,
    maxInvestment: 500000,
    loanRequired: false,
  },
  {
    id: "kcc",
    name: "KCC",
    fullName: "Kisan Credit Card",
    description: "Provides affordable credit to farmers for agricultural and allied activities.",
    potentialMatch: "Medium",
    whyItMatches: "Suitable for agriculture and dairy businesses. Provides short-term crop loans at subsidized interest rates.",
    eligibility: "Farmers, fishers, animal husbandry farmers. Must own or lease agricultural land. SHGs/joint liability groups also eligible.",
    fundingInfo: "Crop loans: up to ₹3 lakh at 4% p.a. (after subsidy). KCC limit based on landholding and cropping pattern. Repayment: flexible, based on harvest.",
    officialSource: "https://www.india.gov.in/programmes/pradhan-mantri-fasal-bima-yojana/kisan-credit-card",
    lastVerified: "January 2025",
    businessTypes: ["agriculture", "dairy", "poultry", "fisheries"],
    minInvestment: 50000,
    maxInvestment: 500000,
    loanRequired: true,
  },
];

export function matchSchemes(
  businessId: string,
  investment: number,
  loanRequired: boolean
): GovernmentScheme[] {
  const scored = GOVERNMENT_SCHEMES.map((scheme) => {
    let score = 0;

    // Business type match
    if (scheme.businessTypes.includes(businessId)) score += 40;
    else score -= 20;

    // Investment range match
    if (investment >= scheme.minInvestment && investment <= scheme.maxInvestment) {
      score += 30;
    } else if (investment >= scheme.minInvestment * 0.5 && investment <= scheme.maxInvestment * 1.5) {
      score += 10;
    }

    // Loan requirement
    if (loanRequired && scheme.loanRequired) score += 15;
    if (!loanRequired && !scheme.loanRequired) score += 10;

    return { scheme, score };
  });

  return scored
    .filter((s) => s.score > 20)
    .sort((a, b) => b.score - a.score)
    .map((s) => s.scheme);
}
