export interface BusinessCategory {
  id: string;
  name: string;
  icon: string;
  description: string;
}

export interface InvestmentTier {
  id: string;
  label: string;
  amount: number;
  short: string;
}

export const BUSINESS_CATEGORIES: BusinessCategory[] = [
  { id: "agriculture", name: "Agriculture", icon: "🌾", description: "Farming & crops" },
  { id: "dairy", name: "Dairy", icon: "🥛", description: "Milk & dairy products" },
  { id: "food", name: "Food", icon: "🍛", description: "Food business & catering" },
  { id: "retail", name: "Retail", icon: "🏪", description: "Shop & general store" },
  { id: "tailoring", name: "Tailoring", icon: "✂️", description: "Stitching & garments" },
  { id: "poultry", name: "Poultry", icon: "🐔", description: "Poultry farming" },
  { id: "fisheries", name: "Fisheries", icon: "🐟", description: "Fish farming & fishing" },
  { id: "handicrafts", name: "Handicrafts", icon: "🎨", description: "Handmade products" },
  { id: "services", name: "Services", icon: "🔧", description: "Local services & repair" },
  { id: "other", name: "Other", icon: "💡", description: "Something else" },
];

export const INVESTMENT_TIERS: InvestmentTier[] = [
  { id: "50k", label: "₹50,000", amount: 50000, short: "₹50K" },
  { id: "1l", label: "₹1 Lakh", amount: 100000, short: "₹1L" },
  { id: "2l", label: "₹2 Lakh", amount: 200000, short: "₹2L" },
  { id: "5l", label: "₹5 Lakh", amount: 500000, short: "₹5L" },
  { id: "10l+", label: "₹10 Lakh+", amount: 1000000, short: "₹10L+" },
];

// Demo market data per business category
export const MARKET_DATA: Record<string, {
  localDemand: string;
  competition: string;
  financialOutlook: string;
  risk: string;
  baseScore: number;
  demandScore: number;
  competitionScore: number;
  financialScore: number;
  riskScore: number;
}> = {
  agriculture: {
    localDemand: "High",
    competition: "Moderate",
    financialOutlook: "Good",
    risk: "Medium",
    baseScore: 72,
    demandScore: 80,
    competitionScore: 65,
    financialScore: 70,
    riskScore: 60,
  },
  dairy: {
    localDemand: "High",
    competition: "Moderate",
    financialOutlook: "Good",
    risk: "Low",
    baseScore: 78,
    demandScore: 85,
    competitionScore: 68,
    financialScore: 75,
    riskScore: 75,
  },
  food: {
    localDemand: "High",
    competition: "High",
    financialOutlook: "Good",
    risk: "Medium",
    baseScore: 74,
    demandScore: 82,
    competitionScore: 55,
    financialScore: 78,
    riskScore: 65,
  },
  retail: {
    localDemand: "Moderate",
    competition: "High",
    financialOutlook: "Moderate",
    risk: "Medium",
    baseScore: 65,
    demandScore: 68,
    competitionScore: 50,
    financialScore: 65,
    riskScore: 62,
  },
  tailoring: {
    localDemand: "Moderate",
    competition: "Low",
    financialOutlook: "Good",
    risk: "Low",
    baseScore: 80,
    demandScore: 72,
    competitionScore: 85,
    financialScore: 78,
    riskScore: 80,
  },
  poultry: {
    localDemand: "High",
    competition: "Low",
    financialOutlook: "Good",
    risk: "Medium",
    baseScore: 76,
    demandScore: 80,
    competitionScore: 80,
    financialScore: 72,
    riskScore: 62,
  },
  fisheries: {
    localDemand: "Moderate",
    competition: "Low",
    financialOutlook: "Moderate",
    risk: "Medium",
    baseScore: 68,
    demandScore: 70,
    competitionScore: 78,
    financialScore: 62,
    riskScore: 58,
  },
  handicrafts: {
    localDemand: "Moderate",
    competition: "Low",
    financialOutlook: "Good",
    risk: "Low",
    baseScore: 74,
    demandScore: 68,
    competitionScore: 82,
    financialScore: 72,
    riskScore: 75,
  },
  services: {
    localDemand: "High",
    competition: "Moderate",
    financialOutlook: "Good",
    risk: "Low",
    baseScore: 77,
    demandScore: 82,
    competitionScore: 70,
    financialScore: 75,
    riskScore: 78,
  },
  other: {
    localDemand: "Moderate",
    competition: "Moderate",
    financialOutlook: "Moderate",
    risk: "Medium",
    baseScore: 65,
    demandScore: 65,
    competitionScore: 65,
    financialScore: 65,
    riskScore: 60,
  },
};

// Financial estimate data by business and investment level
export const FINANCIAL_ESTIMATES: Record<string, Record<string, {
  startup: number;
  monthlyRevenue: number;
  monthlyExpenses: number;
  monthlyProfit: number;
  breakevenMonths: number;
}>> = {
  agriculture: {
    "50k":   { startup: 45000,  monthlyRevenue: 12000, monthlyExpenses: 5000,  monthlyProfit: 7000,  breakevenMonths: 7 },
    "1l":    { startup: 90000,  monthlyRevenue: 22000, monthlyExpenses: 9000,  monthlyProfit: 13000, breakevenMonths: 7 },
    "2l":    { startup: 180000, monthlyRevenue: 40000, monthlyExpenses: 16000, monthlyProfit: 24000, breakevenMonths: 8 },
    "5l":    { startup: 450000, monthlyRevenue: 90000, monthlyExpenses: 35000, monthlyProfit: 55000, breakevenMonths: 9 },
    "10l+":  { startup: 900000, monthlyRevenue: 180000, monthlyExpenses: 70000, monthlyProfit: 110000, breakevenMonths: 9 },
  },
  dairy: {
    "50k":   { startup: 48000,  monthlyRevenue: 15000, monthlyExpenses: 7000,  monthlyProfit: 8000,  breakevenMonths: 6 },
    "1l":    { startup: 95000,  monthlyRevenue: 28000, monthlyExpenses: 13000, monthlyProfit: 15000, breakevenMonths: 7 },
    "2l":    { startup: 190000, monthlyRevenue: 50000, monthlyExpenses: 22000, monthlyProfit: 28000, breakevenMonths: 7 },
    "5l":    { startup: 480000, monthlyRevenue: 110000, monthlyExpenses: 48000, monthlyProfit: 62000, breakevenMonths: 8 },
    "10l+":  { startup: 950000, monthlyRevenue: 220000, monthlyExpenses: 95000, monthlyProfit: 125000, breakevenMonths: 8 },
  },
  food: {
    "50k":   { startup: 42000,  monthlyRevenue: 14000, monthlyExpenses: 6000,  monthlyProfit: 8000,  breakevenMonths: 6 },
    "1l":    { startup: 85000,  monthlyRevenue: 26000, monthlyExpenses: 12000, monthlyProfit: 14000, breakevenMonths: 7 },
    "2l":    { startup: 170000, monthlyRevenue: 48000, monthlyExpenses: 20000, monthlyProfit: 28000, breakevenMonths: 7 },
    "5l":    { startup: 420000, monthlyRevenue: 100000, monthlyExpenses: 42000, monthlyProfit: 58000, breakevenMonths: 8 },
    "10l+":  { startup: 850000, monthlyRevenue: 200000, monthlyExpenses: 85000, monthlyProfit: 115000, breakevenMonths: 8 },
  },
  retail: {
    "50k":   { startup: 40000,  monthlyRevenue: 10000, monthlyExpenses: 5000,  monthlyProfit: 5000,  breakevenMonths: 8 },
    "1l":    { startup: 80000,  monthlyRevenue: 18000, monthlyExpenses: 9000,  monthlyProfit: 9000,  breakevenMonths: 9 },
    "2l":    { startup: 160000, monthlyRevenue: 32000, monthlyExpenses: 15000, monthlyProfit: 17000, breakevenMonths: 10 },
    "5l":    { startup: 400000, monthlyRevenue: 70000, monthlyExpenses: 32000, monthlyProfit: 38000, breakevenMonths: 11 },
    "10l+":  { startup: 800000, monthlyRevenue: 140000, monthlyExpenses: 65000, monthlyProfit: 75000, breakevenMonths: 11 },
  },
  tailoring: {
    "50k":   { startup: 38000,  monthlyRevenue: 12000, monthlyExpenses: 4000,  monthlyProfit: 8000,  breakevenMonths: 5 },
    "1l":    { startup: 75000,  monthlyRevenue: 22000, monthlyExpenses: 7000,  monthlyProfit: 15000, breakevenMonths: 5 },
    "2l":    { startup: 150000, monthlyRevenue: 40000, monthlyExpenses: 12000, monthlyProfit: 28000, breakevenMonths: 6 },
    "5l":    { startup: 380000, monthlyRevenue: 85000, monthlyExpenses: 28000, monthlyProfit: 57000, breakevenMonths: 7 },
    "10l+":  { startup: 750000, monthlyRevenue: 160000, monthlyExpenses: 55000, monthlyProfit: 105000, breakevenMonths: 8 },
  },
  poultry: {
    "50k":   { startup: 45000,  monthlyRevenue: 14000, monthlyExpenses: 6000,  monthlyProfit: 8000,  breakevenMonths: 6 },
    "1l":    { startup: 90000,  monthlyRevenue: 26000, monthlyExpenses: 11000, monthlyProfit: 15000, breakevenMonths: 6 },
    "2l":    { startup: 180000, monthlyRevenue: 48000, monthlyExpenses: 20000, monthlyProfit: 28000, breakevenMonths: 7 },
    "5l":    { startup: 450000, monthlyRevenue: 100000, monthlyExpenses: 42000, monthlyProfit: 58000, breakevenMonths: 8 },
    "10l+":  { startup: 900000, monthlyRevenue: 200000, monthlyExpenses: 85000, monthlyProfit: 115000, breakevenMonths: 8 },
  },
  fisheries: {
    "50k":   { startup: 42000,  monthlyRevenue: 10000, monthlyExpenses: 5000,  monthlyProfit: 5000,  breakevenMonths: 9 },
    "1l":    { startup: 85000,  monthlyRevenue: 18000, monthlyExpenses: 9000,  monthlyProfit: 9000,  breakevenMonths: 10 },
    "2l":    { startup: 170000, monthlyRevenue: 32000, monthlyExpenses: 15000, monthlyProfit: 17000, breakevenMonths: 10 },
    "5l":    { startup: 420000, monthlyRevenue: 70000, monthlyExpenses: 32000, monthlyProfit: 38000, breakevenMonths: 11 },
    "10l+":  { startup: 850000, monthlyRevenue: 140000, monthlyExpenses: 65000, monthlyProfit: 75000, breakevenMonths: 12 },
  },
  handicrafts: {
    "50k":   { startup: 35000,  monthlyRevenue: 10000, monthlyExpenses: 3000,  monthlyProfit: 7000,  breakevenMonths: 5 },
    "1l":    { startup: 70000,  monthlyRevenue: 18000, monthlyExpenses: 6000,  monthlyProfit: 12000, breakevenMonths: 6 },
    "2l":    { startup: 140000, monthlyRevenue: 32000, monthlyExpenses: 10000, monthlyProfit: 22000, breakevenMonths: 7 },
    "5l":    { startup: 350000, monthlyRevenue: 70000, monthlyExpenses: 25000, monthlyProfit: 45000, breakevenMonths: 8 },
    "10l+":  { startup: 700000, monthlyRevenue: 140000, monthlyExpenses: 50000, monthlyProfit: 90000, breakevenMonths: 8 },
  },
  services: {
    "50k":   { startup: 30000,  monthlyRevenue: 12000, monthlyExpenses: 3000,  monthlyProfit: 9000,  breakevenMonths: 4 },
    "1l":    { startup: 60000,  monthlyRevenue: 22000, monthlyExpenses: 5000,  monthlyProfit: 17000, breakevenMonths: 4 },
    "2l":    { startup: 120000, monthlyRevenue: 40000, monthlyExpenses: 10000, monthlyProfit: 30000, breakevenMonths: 4 },
    "5l":    { startup: 300000, monthlyRevenue: 85000, monthlyExpenses: 22000, monthlyProfit: 63000, breakevenMonths: 5 },
    "10l+":  { startup: 600000, monthlyRevenue: 160000, monthlyExpenses: 45000, monthlyProfit: 115000, breakevenMonths: 6 },
  },
  other: {
    "50k":   { startup: 40000,  monthlyRevenue: 10000, monthlyExpenses: 4000,  monthlyProfit: 6000,  breakevenMonths: 7 },
    "1l":    { startup: 80000,  monthlyRevenue: 18000, monthlyExpenses: 8000,  monthlyProfit: 10000, breakevenMonths: 8 },
    "2l":    { startup: 160000, monthlyRevenue: 32000, monthlyExpenses: 14000, monthlyProfit: 18000, breakevenMonths: 9 },
    "5l":    { startup: 400000, monthlyRevenue: 70000, monthlyExpenses: 30000, monthlyProfit: 40000, breakevenMonths: 10 },
    "10l+":  { startup: 800000, monthlyRevenue: 140000, monthlyExpenses: 60000, monthlyProfit: 80000, breakevenMonths: 10 },
  },
};

// Risk data per business
export const RISK_DATA: Record<string, { risk: string; mitigation: string }[]> = {
  agriculture: [
    { risk: "Seasonal demand fluctuations", mitigation: "Diversify crops across seasons to maintain steady income." },
    { risk: "Weather dependency", mitigation: "Consider weather-resistant crop varieties and basic irrigation." },
    { risk: "Price volatility of crops", mitigation: "Sell directly to consumers or join a cooperative for better prices." },
  ],
  dairy: [
    { risk: "Feed cost increases", mitigation: "Grow your own fodder to reduce dependency on market feed." },
    { risk: "Animal health issues", mitigation: "Maintain regular veterinary check-ups and hygiene standards." },
  ],
  food: [
    { risk: "High local competition", mitigation: "Differentiate with unique recipes or niche food items." },
    { risk: "Food safety regulations", mitigation: "Obtain basic FSSAI registration and maintain cleanliness." },
  ],
  retail: [
    { risk: "High competition from established shops", mitigation: "Focus on customer service and convenient location." },
    { risk: "Inventory management challenges", mitigation: "Start with fast-moving items and expand gradually." },
  ],
  tailoring: [
    { risk: "Seasonal demand for garments", mitigation: "Diversify into alterations, repairs, and uniform stitching." },
    { risk: "Competition from ready-made garments", mitigation: "Offer customization and better fitting at competitive prices." },
  ],
  poultry: [
    { risk: "Disease outbreaks", mitigation: "Follow proper vaccination schedules and biosecurity measures." },
    { risk: "Fluctuating feed prices", mitigation: "Buy feed in bulk and explore local feed alternatives." },
  ],
  fisheries: [
    { risk: "Water quality issues", mitigation: "Regular testing and maintaining optimal water conditions." },
    { risk: "Market access challenges", mitigation: "Build relationships with local restaurants and fish sellers." },
  ],
  handicrafts: [
    { risk: "Seasonal demand patterns", mitigation: "Target online marketplaces and tourist areas for year-round sales." },
    { risk: "Raw material availability", mitigation: "Source materials from multiple suppliers and maintain buffer stock." },
  ],
  services: [
    { risk: "Building initial customer trust", mitigation: "Start with competitive pricing and offer guarantees on work." },
    { risk: "Skill updates needed", mitigation: "Attend free training programs and learn new techniques regularly." },
  ],
  other: [
    { risk: "Uncertain market demand", mitigation: "Start with minimal investment and test market response first." },
    { risk: "Need for market research", mitigation: "Talk to potential customers before investing heavily." },
  ],
};

// Recommendations per business
export const RECOMMENDATIONS: Record<string, string[]> = {
  agriculture: [
    "Start with 2-3 high-demand crops suited to your local climate.",
    "Connect with your nearest Krishi Vigyan Kendra for crop guidance.",
    "Consider organic farming for premium pricing in local markets.",
    "Keep working capital reserves for input purchases before harvest.",
  ],
  dairy: [
    "Start with 2-3 cows and expand based on milk demand.",
    "Ensure consistent water supply and clean shelter for animals.",
    "Explore direct milk delivery to nearby households for better margins.",
    "Join a local dairy cooperative for collective bargaining power.",
  ],
  food: [
    "Start from home to minimize rent and infrastructure costs.",
    "Focus on 3-4 signature dishes initially to streamline operations.",
    "Get basic FSSAI registration — it's simple and builds customer trust.",
    "Consider tiffin services or catering for steady bulk orders.",
  ],
  retail: [
    "Stock fast-moving daily-use items to ensure consistent turnover.",
    "Build relationships with 2-3 suppliers for better pricing.",
    "Start with a small, well-located shop rather than a large space.",
    "Offer home delivery for regular customers to build loyalty.",
  ],
  tailoring: [
    "Offer alterations and repairs alongside new stitching for steady income.",
    "Target school uniforms and local event orders for bulk work.",
    "Consider basic embroidery or design work for premium pricing.",
    "Maintain a portfolio of your work to attract new customers.",
  ],
  poultry: [
    "Start with 50-100 birds to manage costs while learning operations.",
    "Maintain strict hygiene and vaccination schedules from day one.",
    "Sell both eggs and meat to maximize revenue from each batch.",
    "Explore direct sales to local households for better margins.",
  ],
  fisheries: [
    "Choose fish species that are popular locally and grow well in your water conditions.",
    "Start with a small pond and expand as you gain experience.",
    "Maintain water quality testing routine for healthy fish stock.",
    "Build direct relationships with local restaurants and fish markets.",
  ],
  handicrafts: [
    "Focus on products with local cultural significance for unique appeal.",
    "Set up an online store on platforms like Flipkart or local marketplaces.",
    "Participate in local melas and exhibitions for visibility.",
    "Train family members to help scale production during peak seasons.",
  ],
  services: [
    "Start with services you're already skilled in to build confidence.",
    "Build a strong local reputation through word-of-mouth referrals.",
    "Offer package deals or maintenance contracts for steady income.",
    "List your services on local directories and WhatsApp groups.",
  ],
  other: [
    "Start small, test your idea with real customers, then scale.",
    "Keep detailed records of income and expenses from day one.",
    "Talk to other entrepreneurs in your area for practical insights.",
    "Focus on building a loyal customer base before expanding.",
  ],
};
