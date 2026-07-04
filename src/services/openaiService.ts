import OpenAI from 'openai';

const getGroqClient = () => {
  if (!process.env.GROQ_API_KEY) {
    console.warn("WARNING: GROQ_API_KEY is not set.");
  }

  return new OpenAI({
    baseURL: "https://api.groq.com/openai/v1",
    apiKey: process.env.GROQ_API_KEY || "",
  });
};

// Reusable Safe JSON Parser
const safeParseJSON = (jsonStr: string) => {
  try {
    if (!jsonStr) return null;

    // Remove markdown blocks
    jsonStr = jsonStr.replace(/```json|```/g, "").trim();

    // Find first { and last }
    const start = jsonStr.indexOf("{");
    const end = jsonStr.lastIndexOf("}");

    if (start === -1 || end === -1) {
      throw new Error("No JSON boundaries found");
    }

    const cleanJSON = jsonStr.substring(start, end + 1);
    return JSON.parse(cleanJSON);
  } catch (err) {
    console.error("❌ JSON Parse Failed:", err);
    return null;
  }
};

// Helper function to invoke Groq with model failover and retry mechanisms
async function callGroqWithModelFailover(prompt: string, maxTokens: number = 3500) {
  const client = getGroqClient();
  try {
    console.log("Invoking primary Groq model: llama-3.3-70b-versatile");
    const completion = await client.chat.completions.create({
      messages: [
        {
          role: "system",
          content: "You are an expert VC partner, startup incubator director, veteran product engineer, and professional financial analyst. You conduct highly critical, realistic, deep, and dynamic business validations without using template or repetitive responses."
        },
        { role: "user", content: prompt }
      ],
      model: "llama-3.3-70b-versatile",
      temperature: 0.7,
      max_tokens: maxTokens,
    });
    return completion.choices[0].message.content?.trim() || "";
  } catch (err: any) {
    console.warn("Primary model failed or rate-limited. Retrying with backup llama-3.1-8b-instant...", err.message);
    const completion = await client.chat.completions.create({
      messages: [
        {
          role: "system",
          content: "You are an expert VC partner and business analyst. Return deep, custom, structured startup report JSON."
        },
        { role: "user", content: prompt }
      ],
      model: "llama-3.1-8b-instant",
      temperature: 0.7,
      max_tokens: maxTokens,
    });
    return completion.choices[0].message.content?.trim() || "";
  }
}

export interface ValidationInput {
  title?: string;
  idea: string;
  domain: string;
  targetAudience?: string;
  countryRegion?: string;
  businessModel?: string;
  additionalContext?: string;
  stage?: string;
}

export const validateIdea = async (input: ValidationInput) => {
  const prompt = `Perform a highly detailed, realistic, custom VC-grade validation analysis of the following startup concept.
Do NOT use placeholder text, repetitive sentences, or static fallback templates. Customize all metrics, SWOT, competitors, pricing, risks, and roadmap to directly address the user's idea details.

Startup Concept:
- Title: ${input.title || "Untitled Project"}
- Description/Idea: ${input.idea}
- Industry Category: ${input.domain}
- Target Audience Focus: ${input.targetAudience || "General Public"}
- Target Country/Region: ${input.countryRegion || "Global"}
- Proposed Business Model: ${input.businessModel || "Not specified"}
- Additional Context: ${input.additionalContext || "None"}

Generate a strictly formatted JSON report matching the schema below. Respond ONLY with the JSON object.

{
  "executiveSummary": "A custom 2-3 sentence overview of this specific startup's commercial feasibility, viability, and primary risk.",
  "problemValidation": {
    "severity": "Critical / High / Moderate / Low (choose one and explain why)",
    "worthSolving": "In-depth explanation of commercial benefits and why customers will pay for this.",
    "targetPainPoints": ["Specific pain point 1", "Specific pain point 2", "Specific pain point 3"]
  },
  "marketOpportunity": {
    "tam": "Estimated Total Addressable Market (e.g. $12.5B based on industry reports)",
    "sam": "Estimated Serviceable Addressable Market (e.g. $1.8B based on realistic audience sizing)",
    "som": "Estimated Serviceable Obtainable Market (e.g. $95M based on 3-year capture goals)",
    "estimatedDemand": "Realistic customer demand analysis.",
    "currentTrends": ["Trend 1 favoring this idea", "Trend 2 favoring this idea"],
    "futureTrends": ["Future industry tailwind 1", "Future industry tailwind 2"],
    "growthRate": "Compound Annual Growth Rate (CAGR) estimate (e.g. 14.5% CAGR)"
  },
  "targetAudience": {
    "primaryUsers": ["User segment 1", "User segment 2"],
    "customerPersonas": ["Detailed customer persona description 1", "Detailed customer persona description 2"],
    "painPoints": ["User frustration 1", "User frustration 2"]
  },
  "competitors": {
    "direct": ["Real competitor name 1", "Real competitor name 2"],
    "indirect": ["Indirect competitor or alternative workaround 1"],
    "alternatives": ["Manual methods or spreadsheet workarounds"],
    "comparisonTable": [
      { "name": "This Startup", "score": 90, "differentiator": "Our primary dynamic advantage" },
      { "name": "Direct Competitor 1", "score": 75, "differentiator": "What they do well or poorly" },
      { "name": "Direct Competitor 2", "score": 80, "differentiator": "Their key value prop" }
    ],
    "strengths": ["Competitor core strengths"],
    "weaknesses": ["Competitor core weaknesses/gaps"],
    "marketGaps": ["Under-served customer segment or service gap we will exploit"]
  },
  "swot": {
    "strengths": ["Internal advantage 1", "Internal advantage 2"],
    "weaknesses": ["Internal vulnerability 1", "Internal vulnerability 2"],
    "opportunities": ["External tech/market opportunity 1", "External tech/market opportunity 2"],
    "threats": ["External threat 1 (regulation, security, platform dependency)"]
  },
  "uniqueValueProposition": {
    "valueProp": "Unified core value proposition statement.",
    "differentiators": "Primary differentiator from existing solutions.",
    "advantages": ["Core benefit 1", "Core benefit 2"]
  },
  "revenueModel": {
    "monetizationOptions": ["Pricing option 1", "Pricing option 2"],
    "pricingStrategy": "Suggested pricing model (e.g. $29/mo tiered subscription).",
    "cac": "Estimated Customer Acquisition Cost (e.g. $45 - $80 per user)",
    "ltv": "Estimated Lifetime Value (e.g. $450 per user)"
  },
  "goToMarket": {
    "launchStrategy": "Launching strategy sequence (e.g. Private Beta -> Product Hunt).",
    "channels": ["GTM marketing channel 1", "GTM marketing channel 2"],
    "acquisition": "Main client acquisition channel description.",
    "retention": "Customer retention strategy description."
  },
  "technicalComplexity": {
    "suggestedStack": ["Suggested framework (e.g. Next.js)", "Suggested DB", "Suggested AI SDK"],
    "timeline": "Timeline estimate (e.g. 8-12 weeks)",
    "hiringRequirements": ["Key hire 1 (e.g. Fullstack Engineer)", "Key hire 2"],
    "estimatedCost": "MVP launch cost range (e.g. $15,000 - $30,000)"
  },
  "risks": {
    "technical": "Suggested technical risk or system barrier.",
    "business": "Product-market fit or cash runway risk.",
    "legal": "Compliance or regulatory challenge.",
    "financial": "Revenue model risk.",
    "operational": "Sourcing or operations dependency risk."
  },
  "scores": {
    "innovation": 80,
    "market": 85,
    "execution": 75,
    "revenue": 80,
    "investment": 78
  },
  "overallSuccessProbability": 80,
  "investmentReadiness": {
    "readiness": "VC assessment (e.g. Pre-Seed Ready / Incubator Ready)",
    "why": "VC reasoning statement.",
    "fundingStageRecommendation": "Suggested funding track (e.g. Angel/Pre-Seed round)"
  },
  "actionPlan": {
    "immediateNextSteps": ["Action step 1", "Action step 2"],
    "longTermStrategy": ["Long term objective 1", "Long term objective 2"]
  },
  "recommendations": {
    "mvpSuggestions": ["MVP feature 1", "MVP feature 2"],
    "experiments": ["Validation experiment 1", "Validation experiment 2"]
  },
  "futureExpansion": {
    "premiumFeatures": ["Premium add-on 1", "Premium add-on 2"],
    "upsellingOpportunities": ["Enterprise scaling tiers"],
    "globalExpansion": "International roadmap potential."
  }
}`;

  try {
    const rawResult = await callGroqWithModelFailover(prompt, 3500);
    const parsed = safeParseJSON(rawResult);
    if (!parsed) {
      throw new Error("Failed to parse Groq JSON response");
    }
    return parsed;
  } catch (error: any) {
    console.error("Grok Validation Error:", error);
    throw new Error(`AI Validation failed: ${error.message}`);
  }
};

export const generateRoadmap = async (idea: string, domain: string, stage: string) => {
  const prompt = `You are an expert startup strategist.
Return ONLY raw JSON. Do NOT include markdown tags or introductory text.

Idea: ${idea}
Domain: ${domain}
Stage: ${stage}

Format:
{
  "timeline": "3-6 months",
  "phases": [
    {
      "phaseName": "Phase Name",
      "duration": "Duration description",
      "steps": [
        {
          "title": "Step title",
          "description": "Step description",
          "duration": "Step duration"
        }
      ]
    }
  ]
}`;

  try {
    const rawResult = await callGroqWithModelFailover(prompt, 1500);
    const parsed = safeParseJSON(rawResult);
    if (!parsed) {
      throw new Error("Failed to parse Groq Roadmap response");
    }
    return parsed;
  } catch (error) {
    console.error("Groq Roadmap Error:", error);
    return {
      timeline: "3 months",
      phases: [
        {
          phaseName: "Immediate Validation",
          duration: "Weeks 1-2",
          steps: [
            {
              title: "User Interviews",
              description: "Conduct 10 qualitative user feedback sessions.",
              duration: "1 week"
            }
          ]
        }
      ]
    };
  }
};
