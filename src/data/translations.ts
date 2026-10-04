export type Language = "en" | "te" | "hi";

export const LANGUAGE_NAMES: Record<Language, string> = {
  en: "English",
  te: "తెలుగు",
  hi: "हिन्दी",
};

export const translations: Record<string, Record<Language, string>> = {
  // Landing page
  "brand": { en: "BISNOSIS", te: "BISNOSIS", hi: "BISNOSIS" },
  "tagline": { en: "Know before you grow.", te: "పెరగడానికి ముందు తెలుసుకోండి.", hi: "बढ़ने से पहले जानें।" },
  "hero": { en: "Your business idea deserves a smarter start.", te: "మీ వ్యాపార ఆలోచనకు తెలివైన ప్రారంభం అవసరం.", hi: "आपके व्यापार के विचार को एक स्मार्ट शुरुआत मिलनी चाहिए।" },
  "heroSub": { en: "Get simple, local business guidance, financial insights and potential funding options — without complicated forms.", te: "సంక్లిష్టమైన ఫారాలు లేకుండా, సరళమైన, స్థానిక వ్యాపార మార్గదర్శనం, ఆర్థిక అంతర్దృష్టులు మరియు సంభావ్య నిధుల ఎంపికలు పొందండి.", hi: "बिना जटिल फॉर्म के, सरल, स्थानीय व्यापार मार्गदर्शन, वित्तीय जानकारी और संभावित फंडिंग विकल्प प्राप्त करें।" },
  "startAssessment": { en: "Start Your Assessment", te: "మీ అంచనా ప్రారంభించండి", hi: "अपना मूल्यांकन शुरू करें" },
  "howItWorks": { en: "How It Works", te: "ఇది ఎలా పనిచేస్తుంది", hi: "यह कैसे काम करता है" },
  "step1Title": { en: "Tell us your idea", te: "మీ ఆలోచనను చెప్పండి", hi: "अपना विचार बताएं" },
  "step2Title": { en: "We understand your opportunity", te: "మేము మీ అవకాశాన్ని అర్థం చేసుకుంటాము", hi: "हम आपके अवसर को समझते हैं" },
  "step3Title": { en: "Get your personalized guidance", te: "మీ వ్యక్తిగత మార్గదర్శనం పొందండి", hi: "अपना व्यक्तिगत मार्गदर्शन प्राप्त करें" },

  // Assessment steps
  "whereBusiness": { en: "Where will your business be?", te: "మీ వ్యాపారం ఎక్కడ ఉంటుంది?", hi: "आपका व्यापार कहाँ होगा?" },
  "locationPlaceholder": { en: "Enter PIN code, village, or town", te: "PIN కోడ్, గ్రామం లేదా పట్టణం నమోదు చేయండి", hi: "PIN कोड, गाँव या शहर दर्ज करें" },
  "useMyLocation": { en: "Use my location", te: "నా స్థానాన్ని ఉపయోగించండి", hi: "मेरा स्थान उपयोग करें" },
  "step1Hint": { en: "This helps us find local market data for your area.", te: "ఇది మీ ప్రాంతంలో స్థానిక మార్కెట్ డేటా కనుగొనడంలో సహాయపడుతుంది.", hi: "यह आपके क्षेत्र के लिए स्थानीय बाजार डेटा खोजने में मदद करता है।" },

  "whatBusiness": { en: "What business are you interested in?", te: "మీకు ఏ వ్యాపారంలో ఆసక్తి ఉంది?", hi: "आप किस व्यापार में रुचि रखते हैं?" },
  "step2Hint": { en: "Choose what feels closest to your idea.", te: "మీ ఆలోచనకు అతి సమీపంగా ఉన్నదాన్ని ఎంచుకోండి.", hi: "अपने विचार के सबसे करीब चुनें।" },

  "howMuchInvest": { en: "How much can you invest?", te: "మీరు ఎంత పెట్టుబడి పెట్టగలరు?", hi: "आप कितना निवेश कर सकते हैं?" },
  "step3Hint": { en: "This is approximate — we'll estimate the rest.", te: "ఇది సుమారు — మిగిలినది మేము అంచనా వేస్తాము.", hi: "यह अनुमानित है — बाकी हम अनुमान लगाएंगे।" },

  "needLoan": { en: "Will you need a loan?", te: "మీకు రుణం అవసరమా?", hi: "क्या आपको लोन की जरूरत है?" },
  "step4Hint": { en: "We'll check government schemes that may suit you.", te: "మీకు అనుకూలంగా ఉండే ప్రభుత్వ పథకాలను మేము తనిఖీ చేస్తాము.", hi: "हम आपके लिए उपयुक्त सरकारी योजनाओं की जांच करेंगे।" },
  "loanAmount": { en: "How much approximately?", te: "సుమారుగా ఎంత?", hi: "लगभग कितना?" },
  "yes": { en: "Yes", te: "అవును", hi: "हाँ" },
  "no": { en: "No", te: "కాదు", hi: "नहीं" },

  "anythingElse": { en: "Anything else you'd like us to know?", te: "మీకు మాకు చెప్పాలనిపించేది ఇంకా ఏదైనా ఉందా?", hi: "क्या आप हमें कुछ और बताना चाहेंगे?" },
  "optionalHint": { en: "Optional — helps us give better advice", te: "ఐచ్ఛికం — మంచి సలహా ఇవ్వడంలో సహాయపడుతుంది", hi: "वैकल्पिक — बेहतर सलाह देने में मदद करता है" },
  "getInsights": { en: "Get My Business Insights", te: "నా వ్యాపార అంతర్దృష్టులు పొందండి", hi: "मेरी व्यापार जानकारी प्राप्त करें" },

  // Progress
  "of4": { en: "of 4", te: "4 లో", hi: "4 में से" },

  // Analysis
  "understandingBusiness": { en: "Understanding your business opportunity…", te: "మీ వ్యాపార అవకాశాన్ని అర్థం చేసుకుంటున్నాము…", hi: "आपके व्यापार के अवसर को समझ रहे हैं…" },
  "analyzingLocation": { en: "Understanding your location", te: "మీ స్థానాన్ని అర్థం చేసుకుంటున్నాము", hi: "आपका स्थान समझ रहे हैं" },
  "reviewingMarket": { en: "Reviewing market indicators", te: "మార్కెట్ సూచికలను సమీక్షిస్తున్నాము", hi: "बाजार संकेतकों की समीक्षा" },
  "estimatingFinancial": { en: "Estimating financial feasibility", te: "ఆర్థిక సాధ్యతను అంచనా వేస్తున్నాము", hi: "वित्तीय व्यवहार्यता का अनुमान" },
  "checkingFunding": { en: "Checking funding options", te: "నిధుల ఎంపికలను తనిఖీ చేస్తున్నాము", hi: "फंडिंग विकल्पों की जांच" },
  "preparingRecs": { en: "Preparing recommendations", te: "సిఫార్సులను సిద్ధం చేస్తున్నాము", hi: "सिफारिशें तैयार कर रहे हैं" },

  // Results
  "heresWhatWeFound": { en: "Here's what we found", te: "మేము ఏమి కనుగొన్నామంటే", hi: "यह है जो हमने पाया" },
  "businessOpportunity": { en: "BUSINESS OPPORTUNITY", te: "వ్యాపార అవకాశం", hi: "व्यापार अवसर" },
  "promising": { en: "PROMISING", te: "ఆశాజనకం", hi: "आशाजनक" },
  "strong": { en: "STRONG", te: "బలమైన", hi: "मजबूत" },
  "excellent": { en: "EXCELLENT", te: "అద్భుతం", hi: "उत्कृष्ट" },
  "localDemand": { en: "Local Demand", te: "స్థానిక డిమాండ్", hi: "स्थानीय मांग" },
  "competition": { en: "Competition", te: "పోటీ", hi: "प्रतिस्पर्धा" },
  "financialOutlook": { en: "Financial Outlook", te: "ఆర్థిక దృష్టి", hi: "वित्तीय दृष्टिकोण" },
  "risk": { en: "Risk", te: "రిస్క్", hi: "जोखिम" },
  "high": { en: "High", te: "అధికం", hi: "उच्च" },
  "moderate": { en: "Moderate", te: "మధ్యస్థం", hi: "मध्यम" },
  "low": { en: "Low", te: "తక్కువ", hi: "कम" },
  "good": { en: "Good", te: "మంచి", hi: "अच्छा" },
  "medium": { en: "Medium", te: "మధ్యస్థం", hi: "मध्यम" },

  // Financial
  "financialSummary": { en: "Financial Summary", te: "ఆర్థిక సారాంశం", hi: "वित्तीय सारांश" },
  "estimatedStartup": { en: "Estimated Startup Investment", te: "అంచనా ప్రారంభ పెట్టుబడి", hi: "अनुमानित स्टार्टअप निवेश" },
  "estMonthlyRevenue": { en: "Estimated Monthly Revenue", te: "అంచనా నెలవారీ ఆదాయం", hi: "अनुमानित मासिक आय" },
  "estMonthlyExpenses": { en: "Estimated Monthly Expenses", te: "అంచనా నెలవారీ ఖర్చులు", hi: "अनुमानित मासिक खर्च" },
  "estMonthlyProfit": { en: "Estimated Monthly Profit", te: "అంచనా నెలవారీ లాభం", hi: "अनुमानित मासिक लाभ" },
  "estBreakeven": { en: "Estimated Break-even", te: "అంచనా బ్రేక్-ఈవెన్", hi: "अनुमानित ब्रेक-ईवन" },
  "months": { en: "months", te: "నెలలు", hi: "महीने" },
  "estimateUnavailable": { en: "Estimate unavailable with current information.", te: "ప్రస్తుత సమాచారంతో అంచనా అందుబాటులో లేదు.", hi: "वर्तमान जानकारी के साथ अनुमान उपलब्ध नहीं है।" },

  // Recommendations
  "whatWeRecommend": { en: "What we recommend", te: "మేము సిఫార్సు చేసేది", hi: "हमारी सिफारिशें" },

  // Risk
  "thingsToWatch": { en: "Things to watch", te: "గమనించవలసినవి", hi: "ध्यान रखने योग्य बातें" },
  "whatYouCanDo": { en: "What you can do", te: "మీరు చేయగలిగేది", hi: "आप क्या कर सकते हैं" },

  // Funding
  "fundingOptions": { en: "Funding options that may suit you", te: "మీకు అనుకూలమైన నిధుల ఎంపికలు", hi: "आपके लिए उपयुक्त फंडिंग विकल्प" },
  "potentialMatch": { en: "Potential Match", te: "సంభావ్య సరిపోలిక", hi: "संभावित मैच" },
  "whyItMayMatch": { en: "Why it may match", te: "ఎందుకు సరిపోలవచ్చు", hi: "यह क्यों मैच हो सकता है" },
  "eligibility": { en: "Eligibility", te: "అర్హత", hi: "पात्रता" },
  "fundingInfo": { en: "Funding Information", te: "నిధుల సమాచారం", hi: "फंडिंग जानकारी" },
  "officialSource": { en: "Official Source", te: "అధికారిక మూలం", hi: "आधिकारिक स्रोत" },
  "lastVerified": { en: "Last verified", te: "చివరిగా ధృవీకరించబడింది", hi: "अंतिम सत्यापन" },
  "youMayBeEligible": { en: "You may be eligible", te: "మీరు అర్హులు కావచ్చు", hi: "आप पात्र हो सकते हैं" },
  "disclaimer": { en: "Final eligibility depends on current official guidelines, documentation and lender/authority assessment.", te: "తుది అర్హత ప్రస్తుత అధికారిక మార్గదర్శకాలు, పత్రాలు మరియు రుణదాత/అధికారి అంచనాపై ఆధారపడి ఉంటుంది.", hi: "अंतिम पात्रता वर्तमान आधिकारिक दिशानिर्देशों, दस्तावेज़ और ऋणदाता/प्राधिकरण मूल्यांकन पर निर्भर करती है।" },

  // Chat
  "askBisnosis": { en: "Ask BISNOSIS", te: "BISNOSIS ను అడగండి", hi: "BISNOSIS से पूछें" },
  "yourBusinessGuide": { en: "Your business guide", te: "మీ వ్యాపార మార్గదర్శి", hi: "आपका व्यापार मार्गदर्शक" },
  "typeMessage": { en: "Type your question…", te: "మీ ప్రశ్నను టైప్ చేయండి…", hi: "अपना सवाल टाइप करें…" },
  "sending": { en: "Sending…", te: "పంపుతోంది…", hi: "भेज रहे हैं…" },

  // Suggested questions
  "isThisGood": { en: "Is this a good business?", te: "ఇది మంచి వ్యాపారమా?", hi: "क्या यह एक अच्छा व्यापार है?" },
  "whyThisScore": { en: "Why this score?", te: "ఈ స్కోర్ ఎందుకు?", hi: "यह स्कोर क्यों?" },
  "whichFunding": { en: "Which funding option should I check?", te: "నేను ఏ నిధుల ఎంపికను తనిఖీ చేయాలి?", hi: "मुझे कौन सा फंडिंग विकल्प देखना चाहिए?" },
  "reduceRisk": { en: "How can I reduce my risk?", te: "నేను నా రిస్క్ ఎలా తగ్గించగలను?", hi: "मैं अपना जोखिम कैसे कम कर सकता हूँ?" },

  // Full Report
  "viewFullReport": { en: "View Full Report", te: "పూర్తి నివేదిక చూడండి", hi: "पूरी रिपोर्ट देखें" },
  "downloadReport": { en: "Download Report", te: "నివేదికను డౌన్లోడ్ చేయండి", hi: "रिपोर्ट डाउनलोड करें" },
  "fullReport": { en: "Full Report", te: "పూర్తి నివేదిక", hi: "पूरी रिपोर्ट" },
  "reportDisclaimer": { en: "Financial and market figures are estimates and may vary based on actual conditions. Government scheme matching is informational and does not guarantee eligibility, approval or loan sanction. Always verify current scheme details and eligibility through the official government source or lender.", te: "ఆర్థిక మరియు మార్కెట్ గణాంకాలు అంచనాలు మరియు వాస్తవ పరిస్థితుల ఆధారంగా మారవచ్చు. ప్రభుత్వ పథకాల సరిపోలిక సమాచారాత్మకమైనది మరియు అర్హత, ఆమోదం లేదా రుణ ఆమోదాన్ని హామీ ఇవ్వదు. ఎల్లప్పుడూ అధికారిక ప్రభుత్వ మూలం లేదా రుణదాత ద్వారా ప్రస్తుత పథకాల వివరాలు మరియు అర్హతను ధృవీకరించండి.", hi: "वित्तीय और बाजार आंकड़े अनुमान हैं और वास्तविक परिस्थितियों के आधार पर भिन्न हो सकते हैं। सरकारी योजना मैचिंग केवल जानकारी के लिए है और पात्रता, स्वीकृति या ऋण स्वीकृति की गारंटी नहीं देती। हमेशा आधिकारिक सरकारी स्रोत या ऋणदाता के माध्यम से वर्तमान योजना विवरण और पात्रता सत्यापित करें।" },

  // Navigation
  "home": { en: "Home", te: "హోమ్", hi: "होम" },
  "assessment": { en: "Assessment", te: "అంచనా", hi: "मूल्यांकन" },
  "insights": { en: "Insights", te: "అంతర్దృష్టులు", hi: "जानकारी" },
  "funding": { en: "Funding", te: "నిధులు", hi: "फंडिंग" },

  // Listen
  "listen": { en: "Listen", te: "వినండి", hi: "सुनें" },
};
