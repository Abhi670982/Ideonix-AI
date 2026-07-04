"use client";

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, Loader2, Sparkles, CheckCircle2, AlertCircle, Target, 
  BrainCircuit, Coins, Briefcase, ShieldAlert, Users, Wrench, 
  Award, ArrowRight, History, Trash2, RotateCcw, 
  FileText, Globe, ArrowUpRight, BarChart3, Star, Check, Circle, Shield
} from 'lucide-react';
import EmptyState from '@/Components/EmptyState';

// TypeScript interfaces matching the upgraded Grok schema
interface ProblemValidation {
  severity: string;
  worthSolving: string;
  targetPainPoints: string[];
}

interface MarketOpportunity {
  tam: string;
  sam: string;
  som: string;
  estimatedDemand: string;
  currentTrends: string[];
  futureTrends: string[];
  growthRate: string;
}

interface TargetAudience {
  primaryUsers: string[];
  customerPersonas: string[];
  painPoints: string[];
}

interface CompetitorRow {
  name: string;
  score: number;
  differentiator: string;
}

interface Competitors {
  direct: string[];
  indirect: string[];
  alternatives: string[];
  comparisonTable: CompetitorRow[];
  strengths: string[];
  weaknesses: string[];
  marketGaps: string[];
  competitiveLandscape: string;
}

interface SWOT {
  strengths: string[];
  weaknesses: string[];
  opportunities: string[];
  threats: string[];
}

interface UVP {
  valueProp: string;
  differentiators: string;
  advantages: string[];
}

interface RevenueModel {
  monetizationOptions: string[];
  pricingStrategy: string;
  cac: string;
  ltv: string;
}

interface GoToMarket {
  launchStrategy: string;
  channels: string[];
  acquisition: string;
  retention: string;
}

interface TechnicalComplexity {
  suggestedStack: string[];
  timeline: string;
  hiringRequirements: string[];
  estimatedCost: string;
}

interface Risks {
  technical: string;
  business: string;
  legal: string;
  financial: string;
  operational: string;
}

interface Scores {
  innovation: number;
  market: number;
  execution: number;
  revenue: number;
  investment: number;
}

interface InvestmentReadiness {
  readiness: string;
  why: string;
  fundingStageRecommendation: string;
}

interface ActionPlan {
  immediateNextSteps: string[];
  longTermStrategy: string[];
}

interface Recommendations {
  mvpSuggestions: string[];
  experiments: string[];
}

interface FutureExpansion {
  premiumFeatures: string[];
  upsellingOpportunities: string[];
  globalExpansion: string;
}

interface ValidationReport {
  executiveSummary: string;
  problemValidation: ProblemValidation;
  marketOpportunity: MarketOpportunity;
  targetAudience: TargetAudience;
  competitors: Competitors;
  swot: SWOT;
  uniqueValueProposition: UVP;
  revenueModel: RevenueModel;
  goToMarket: GoToMarket;
  technicalComplexity: TechnicalComplexity;
  risks: Risks;
  scores: Scores;
  overallSuccessProbability: number;
  investmentReadiness: InvestmentReadiness;
  actionPlan: ActionPlan;
  recommendations: Recommendations;
  futureExpansion: FutureExpansion;
}

interface ValidationResultDoc {
  _id: string;
  title: string;
  idea: string;
  domain: string;
  targetAudience?: string;
  countryRegion?: string;
  businessModel?: string;
  additionalContext?: string;
  score: number;
  report: ValidationReport;
  createdAt: string;
}

// 10 Steps for the AI Thinking Experience
const thinkingSteps = [
  { id: 1, label: "Reading your idea details" },
  { id: 2, label: "Finding the core problem and urgency" },
  { id: 3, label: "Identifying direct & indirect competitors" },
  { id: 4, label: "Estimating market sizes (TAM, SAM, SOM)" },
  { id: 5, label: "Evaluating scalability & unit economics" },
  { id: 6, label: "Calculating revenue and pricing models" },
  { id: 7, label: "Performing SWOT analysis matrix" },
  { id: 8, label: "Creating GTM marketing strategy" },
  { id: 9, label: "Preparing VC investor readiness report" },
  { id: 10, label: "Finalizing actionable next-step checklist" }
];

export default function Validator() {
  const [activeTab, setActiveTab] = useState<'new' | 'history'>('new');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [thinkingStepIndex, setThinkingStepIndex] = useState(0);

  // Form Fields
  const [title, setTitle] = useState('');
  const [idea, setIdea] = useState('');
  const [industry, setIndustry] = useState('SaaS');
  const [audience, setAudience] = useState('');
  const [region, setRegion] = useState('Global');
  const [businessModel, setBusinessModel] = useState('Subscription');
  const [additionalContext, setAdditionalContext] = useState('');

  // Selected/Active Validation Record
  const [activeReportDoc, setActiveReportDoc] = useState<ValidationResultDoc | null>(null);
  const [errorInfo, setErrorInfo] = useState('');

  // History Dashboard
  const [historyList, setHistoryList] = useState<ValidationResultDoc[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterIndustry, setFilterIndustry] = useState('');
  const [sortBy, setSortBy] = useState<'date' | 'score'>('date');
  const [historyLoading, setHistoryLoading] = useState(false);

  // Dynamic Thinking Progress Loop
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isSubmitting) {
      setThinkingStepIndex(0);
      interval = setInterval(() => {
        setThinkingStepIndex((prev) => {
          if (prev < thinkingSteps.length - 1) {
            return prev + 1;
          }
          return prev;
        });
      }, 2500);
    }
    return () => clearInterval(interval);
  }, [isSubmitting]);

  const loadHistory = async () => {
    setHistoryLoading(true);
    try {
      const res = await fetch("/api/validation/validate");
      const data = await res.json();
      if (data.success && data.data) {
        setHistoryList(data.data);
      }
    } catch (err) {
      console.error("Failed to load validation history:", err);
    } finally {
      setHistoryLoading(false);
    }
  };

  useEffect(() => {
    if (activeTab === 'history') {
      loadHistory();
    }
  }, [activeTab]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorInfo('');
    setActiveReportDoc(null);

    try {
      const res = await fetch("/api/validation/validate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: title || "Untitled Project",
          idea,
          domain: industry,
          targetAudience: audience,
          countryRegion: region,
          businessModel,
          additionalContext
        })
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "Validation failed on the AI server.");
      }

      const data = await res.json();
      if (!data.success || !data.data) {
        throw new Error(data.message || "Failed to parse validation report");
      }

      setActiveReportDoc(data.data);
    } catch (err: any) {
      setErrorInfo(err.message || "Grok API Connection Timeout. Please verify configuration and retry.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (!confirm("Are you sure you want to delete this validation report?")) return;
    try {
      const res = await fetch(`/api/validation/validate/${id}`, {
        method: 'DELETE'
      });
      if (res.ok) {
        setHistoryList(prev => prev.filter(item => item._id !== id));
        if (activeReportDoc && activeReportDoc._id === id) {
          setActiveReportDoc(null);
        }
      }
    } catch (err) {
      console.error("Delete failed:", err);
    }
  };

  const handleReRun = (doc: ValidationResultDoc, e: React.MouseEvent) => {
    e.stopPropagation();
    setTitle(doc.title);
    setIdea(doc.idea);
    setIndustry(doc.domain);
    setAudience(doc.targetAudience || '');
    setRegion(doc.countryRegion || 'Global');
    setBusinessModel(doc.businessModel || 'Subscription');
    setAdditionalContext(doc.additionalContext || '');
    setActiveTab('new');
    setActiveReportDoc(null);
  };

  const filteredHistory = historyList
    .filter(doc => {
      const matchesSearch = doc.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                            doc.idea.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesFilter = filterIndustry ? doc.domain === filterIndustry : true;
      return matchesSearch && matchesFilter;
    })
    .sort((a, b) => {
      if (sortBy === 'score') return b.score - a.score;
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });

  const getScoreColor = (score: number) => {
    if (score >= 85) return "text-emerald-400 stroke-emerald-400";
    if (score >= 70) return "text-amber-400 stroke-amber-400";
    return "text-rose-400 stroke-rose-400";
  };

  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto min-h-[calc(100vh-64px)] relative">
      {/* Header Tabs */}
      <div className="flex justify-between items-center border-b border-border pb-6 mb-8 gap-4 flex-wrap">
        <div>
          <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-400 flex items-center gap-3">
            <BrainCircuit className="w-9 h-9 text-primary" /> Idea Validator
          </h1>
          <p className="text-muted text-sm mt-1 flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-primary animate-pulse" /> Live Grok-powered VC analyst platform
          </p>
        </div>

        <div className="flex gap-2 bg-white/5 p-1 rounded-xl border border-white/10">
          <button
            onClick={() => { setActiveTab('new'); setErrorInfo(''); }}
            className={`flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg transition ${
              activeTab === 'new' ? 'bg-primary text-white shadow-lg' : 'text-muted hover:text-foreground'
            }`}
          >
            New Validation
          </button>
          <button
            onClick={() => setActiveTab('history')}
            className={`flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg transition ${
              activeTab === 'history' ? 'bg-primary text-white shadow-lg' : 'text-muted hover:text-foreground'
            }`}
          >
            My Validations ({historyList.length})
          </button>
        </div>
      </div>

      <AnimatePresence mode="wait">
        {activeTab === 'new' && (
          <motion.div
            key="new-tab"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.3 }}
          >
            {isSubmitting ? (
              /* Upgraded AI Thinking Experience Screen */
              <div className="card-container max-w-xl mx-auto p-8 border border-white/10 bg-card/70 backdrop-blur-lg rounded-2xl shadow-glow-primary/5">
                <div className="flex items-center gap-3 mb-6">
                  <Loader2 className="w-6 h-6 text-primary animate-spin" />
                  <h3 className="text-lg font-bold text-foreground">AI Thinking Process</h3>
                </div>
                <div className="space-y-4">
                  {thinkingSteps.map((step, idx) => {
                    const isCompleted = idx < thinkingStepIndex;
                    const isActive = idx === thinkingStepIndex;
                    return (
                      <div 
                        key={step.id} 
                        className={`flex items-center gap-3 text-sm transition-all duration-300 ${
                          isCompleted ? 'text-emerald-400 font-medium' : isActive ? 'text-primary font-bold scale-[1.02]' : 'text-muted opacity-50'
                        }`}
                      >
                        {isCompleted ? (
                          <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                        ) : isActive ? (
                          <Loader2 className="w-5 h-5 text-primary animate-spin shrink-0" />
                        ) : (
                          <Circle className="w-5 h-5 text-muted shrink-0" />
                        )}
                        <span>{step.label}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            ) : activeReportDoc ? (
              /* Redesigned Premium Investor Report Dashboard */
              <div className="space-y-8 animate-fade-in">
                {/* Back Button */}
                <button
                  onClick={() => setActiveReportDoc(null)}
                  className="btn-secondary py-2 px-4 text-xs font-semibold"
                >
                  ← Validate Another Idea
                </button>

                {/* Cover summary card */}
                <div className="card-container bg-card/60 backdrop-blur-md border-border p-8 flex flex-col lg:flex-row items-center justify-between gap-8">
                  <div className="space-y-4 flex-1">
                    <div className="flex items-center gap-3">
                      <span className="px-2.5 py-1 rounded bg-primary/10 text-primary text-[10px] font-bold uppercase tracking-wider">{activeReportDoc.domain}</span>
                      <span className="px-2.5 py-1 rounded bg-white/5 border border-white/10 text-foreground text-[10px] font-semibold">{activeReportDoc.report.investmentReadiness.readiness}</span>
                    </div>
                    <h2 className="text-3xl font-bold text-foreground">{activeReportDoc.title}</h2>
                    <p className="text-muted text-sm leading-relaxed">{activeReportDoc.report.executiveSummary}</p>
                    <div className="text-xs text-muted flex gap-4">
                      <span>Region: <strong className="text-foreground">{activeReportDoc.countryRegion || "Global"}</strong></span>
                      <span>Model: <strong className="text-foreground">{activeReportDoc.businessModel || "Not specified"}</strong></span>
                    </div>
                  </div>

                  {/* Circular Score display */}
                  <div className="relative w-36 h-36 flex items-center justify-center shrink-0">
                    <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                      <circle cx="18" cy="18" r="16" fill="none" className="stroke-white/10" strokeWidth="2.5" />
                      <motion.circle 
                        cx="18" cy="18" r="16" 
                        fill="none" 
                        className={getScoreColor(activeReportDoc.report.overallSuccessProbability || activeReportDoc.score)} 
                        strokeWidth="2.5" 
                        strokeDasharray="100"
                        initial={{ strokeDashoffset: 100 }}
                        animate={{ strokeDashoffset: 100 - (activeReportDoc.report.overallSuccessProbability || activeReportDoc.score) }}
                        transition={{ duration: 1.2, ease: "easeOut" }}
                      />
                    </svg>
                    <div className="absolute flex flex-col items-center justify-center">
                      <span className="text-4xl font-extrabold text-foreground">{activeReportDoc.report.overallSuccessProbability || activeReportDoc.score}</span>
                      <span className="text-[9px] text-muted uppercase font-bold tracking-wider text-center px-2">Overall Success</span>
                    </div>
                  </div>
                </div>

                {/* Score breakdown & SWOT */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  {/* Score breakdown progress list */}
                  <div className="card-container lg:col-span-1 space-y-6">
                    <h3 className="text-lg font-bold border-b border-border pb-3 flex items-center gap-2"><BarChart3 className="w-5 h-5 text-primary" /> Core Venture Metrics</h3>
                    <div className="space-y-4">
                      {Object.entries(activeReportDoc.report.scores).map(([key, val]) => (
                        <div key={key} className="space-y-1">
                          <div className="flex justify-between text-xs font-semibold uppercase tracking-wider text-muted">
                            <span>{key} Score</span>
                            <span className="text-foreground">{val as number}%</span>
                          </div>
                          <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                            <motion.div 
                              className="h-full bg-primary" 
                              initial={{ width: 0 }}
                              animate={{ width: `${val}%` }}
                              transition={{ duration: 1, delay: 0.2 }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* SWOT Matrix Grid */}
                  <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Strengths */}
                    <div className="card-container bg-emerald-500/5 border-emerald-500/10">
                      <h4 className="text-sm font-bold text-emerald-400 uppercase tracking-widest mb-3 flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Strengths
                      </h4>
                      <ul className="space-y-2 text-xs text-muted">
                        {activeReportDoc.report.swot.strengths.map((s, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full mt-1.5 shrink-0" />
                            <span>{s}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Weaknesses */}
                    <div className="card-container bg-rose-500/5 border-rose-500/10">
                      <h4 className="text-sm font-bold text-rose-400 uppercase tracking-widest mb-3 flex items-center gap-2">
                        <AlertCircle className="w-4 h-4 text-rose-400" /> Weaknesses
                      </h4>
                      <ul className="space-y-2 text-xs text-muted">
                        {activeReportDoc.report.swot.weaknesses.map((w, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <div className="w-1.5 h-1.5 bg-rose-400 rounded-full mt-1.5 shrink-0" />
                            <span>{w}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Opportunities */}
                    <div className="card-container bg-blue-500/5 border-blue-500/10">
                      <h4 className="text-sm font-bold text-blue-400 uppercase tracking-widest mb-3 flex items-center gap-2">
                        <ArrowUpRight className="w-4 h-4 text-blue-400" /> Opportunities
                      </h4>
                      <ul className="space-y-2 text-xs text-muted">
                        {activeReportDoc.report.swot.opportunities.map((o, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <div className="w-1.5 h-1.5 bg-blue-400 rounded-full mt-1.5 shrink-0" />
                            <span>{o}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Threats */}
                    <div className="card-container bg-purple-500/5 border-purple-500/10">
                      <h4 className="text-sm font-bold text-purple-400 uppercase tracking-widest mb-3 flex items-center gap-2">
                        <Shield className="w-4 h-4 text-purple-400" /> Threats
                      </h4>
                      <ul className="space-y-2 text-xs text-muted">
                        {activeReportDoc.report.swot.threats.map((t, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <div className="w-1.5 h-1.5 bg-purple-400 rounded-full mt-1.5 shrink-0" />
                            <span>{t}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Problem & Target Audience */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {/* Problem validation */}
                  <div className="card-container space-y-4">
                    <h3 className="text-lg font-bold border-b border-border pb-3 flex items-center gap-2"><Target className="w-5 h-5 text-primary" /> Problem Urgency</h3>
                    <div className="flex gap-4 items-center">
                      <span className={`px-2 py-1 rounded text-xs font-bold ${
                        activeReportDoc.report.problemValidation.severity.toLowerCase().includes('critical') || activeReportDoc.report.problemValidation.severity.toLowerCase().includes('high')
                          ? 'bg-rose-500/15 text-rose-400 border border-rose-500/25'
                          : 'bg-amber-500/15 text-amber-400 border border-amber-500/25'
                      }`}>
                        Severity: {activeReportDoc.report.problemValidation.severity}
                      </span>
                    </div>
                    <p className="text-sm text-muted"><strong>Worth Solving:</strong> {activeReportDoc.report.problemValidation.worthSolving}</p>
                    <div>
                      <span className="text-xs text-muted font-bold block mb-1">Key Customer Pain Points</span>
                      <ul className="space-y-1 text-xs text-muted">
                        {activeReportDoc.report.problemValidation.targetPainPoints.map((pt, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <span className="text-primary font-bold mt-0.5">•</span>
                            <span>{pt}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Target Audience & Persona */}
                  <div className="card-container space-y-4">
                    <h3 className="text-lg font-bold border-b border-border pb-3 flex items-center gap-2"><Users className="w-5 h-5 text-primary" /> Customer Sizing & Personas</h3>
                    <div className="space-y-3 text-sm">
                      <div>
                        <span className="text-xs text-muted block mb-1">Target Segments</span>
                        <div className="flex flex-wrap gap-1.5">
                          {activeReportDoc.report.targetAudience.primaryUsers.map((seg, i) => (
                            <span key={i} className="px-2 py-0.5 rounded bg-white/5 border border-white/10 text-foreground text-xs">{seg}</span>
                          ))}
                        </div>
                      </div>
                      <div>
                        <span className="text-xs text-muted block mb-1">Ideal Personas</span>
                        <ul className="space-y-1.5 text-xs text-muted">
                          {activeReportDoc.report.targetAudience.customerPersonas.map((per, i) => (
                            <li key={i} className="flex items-start gap-2">
                              <span className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 shrink-0" />
                              <span>{per}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Market Opportunity */}
                <div className="card-container space-y-6">
                  <h3 className="text-lg font-bold border-b border-border pb-3 flex items-center gap-2"><Globe className="w-5 h-5 text-primary" /> Market Size & Industry Trends</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                    <div className="p-4 rounded-xl bg-white/5 border border-border text-center">
                      <p className="text-[10px] text-muted uppercase font-bold tracking-wider">TAM</p>
                      <h4 className="text-xl font-bold text-foreground mt-1">{activeReportDoc.report.marketOpportunity.tam}</h4>
                    </div>
                    <div className="p-4 rounded-xl bg-white/5 border border-border text-center">
                      <p className="text-[10px] text-muted uppercase font-bold tracking-wider">SAM</p>
                      <h4 className="text-xl font-bold text-foreground mt-1">{activeReportDoc.report.marketOpportunity.sam}</h4>
                    </div>
                    <div className="p-4 rounded-xl bg-white/5 border border-border text-center">
                      <p className="text-[10px] text-muted uppercase font-bold tracking-wider">SOM</p>
                      <h4 className="text-xl font-bold text-foreground mt-1">{activeReportDoc.report.marketOpportunity.som}</h4>
                    </div>
                    <div className="p-4 rounded-xl bg-white/5 border border-border text-center">
                      <p className="text-[10px] text-muted uppercase font-bold tracking-wider">Est. CAGR</p>
                      <h4 className="text-xl font-bold text-foreground mt-1">{activeReportDoc.report.marketOpportunity.growthRate}</h4>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
                    <div>
                      <span className="text-xs text-muted font-bold block mb-1">Current Tailwinds</span>
                      <ul className="space-y-1.5 text-xs text-muted">
                        {activeReportDoc.report.marketOpportunity.currentTrends.map((t, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <Check className="w-3.5 h-3.5 text-emerald-400 mt-0.5 shrink-0" />
                            <span>{t}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <span className="text-xs text-muted font-bold block mb-1">Future Vectors</span>
                      <ul className="space-y-1.5 text-xs text-muted">
                        {activeReportDoc.report.marketOpportunity.futureTrends.map((t, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <ArrowUpRight className="w-3.5 h-3.5 text-primary mt-0.5 shrink-0" />
                            <span>{t}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Upgraded Competitor Matrix Table */}
                <div className="card-container space-y-6">
                  <h3 className="text-lg font-bold border-b border-border pb-3 flex items-center gap-2"><Target className="w-5 h-5 text-primary" /> VC Competitor Matrix</h3>
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm border-collapse">
                      <thead>
                        <tr className="border-b border-border">
                          <th className="pb-3 font-semibold text-muted text-xs uppercase tracking-wider">Startup / Product</th>
                          <th className="pb-3 font-semibold text-muted text-xs uppercase tracking-wider">Capability Score</th>
                          <th className="pb-3 font-semibold text-muted text-xs uppercase tracking-wider">Core Positioning / Differentiator</th>
                        </tr>
                      </thead>
                      <tbody>
                        {activeReportDoc.report.competitors.comparisonTable.map((row, idx) => (
                          <tr key={idx} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                            <td className="py-4 font-bold text-foreground">{row.name}</td>
                            <td className="py-4">
                              <div className="flex items-center gap-2">
                                <div className="h-1.5 w-24 bg-white/5 rounded-full overflow-hidden shrink-0">
                                  <div className="h-full bg-primary" style={{ width: `${row.score}%` }} />
                                </div>
                                <span className="text-xs font-semibold">{row.score}%</span>
                              </div>
                            </td>
                            <td className="py-4 text-xs text-muted">{row.differentiator}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs text-muted">
                    <div>
                      <span className="font-bold text-foreground block mb-1">Competitive Landscape Summary</span>
                      <p>{activeReportDoc.report.competitors.competitiveLandscape}</p>
                    </div>
                    <div>
                      <span className="font-bold text-foreground block mb-1">Identified Market Gaps</span>
                      <ul className="space-y-1">
                        {activeReportDoc.report.competitors.marketGaps.map((gap, i) => (
                          <li key={i}>• {gap}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Revenue Strategy & Tech Architecture */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {/* Revenue Model */}
                  <div className="card-container space-y-6">
                    <h3 className="text-lg font-bold border-b border-border pb-3 flex items-center gap-2"><Coins className="w-5 h-5 text-primary" /> Revenue & Unit Economics</h3>
                    <div className="space-y-4 text-sm">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="p-3 bg-white/5 border border-border rounded-xl">
                          <span className="text-xs text-muted">Target CAC</span>
                          <p className="font-bold text-foreground text-lg mt-0.5">{activeReportDoc.report.revenueModel.cac}</p>
                        </div>
                        <div className="p-3 bg-white/5 border border-border rounded-xl">
                          <span className="text-xs text-muted">Target LTV</span>
                          <p className="font-bold text-foreground text-lg mt-0.5">{activeReportDoc.report.revenueModel.ltv}</p>
                        </div>
                      </div>
                      <p><strong>Pricing strategy recommendation:</strong> {activeReportDoc.report.revenueModel.pricingStrategy}</p>
                      <div>
                        <span className="text-xs text-muted font-bold block mb-1.5">Monetization Options</span>
                        <div className="flex flex-wrap gap-2">
                          {activeReportDoc.report.revenueModel.monetizationOptions.map((opt, i) => (
                            <span key={i} className="px-2 py-1 rounded bg-white/5 border border-white/10 text-foreground text-xs">{opt}</span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Tech stack */}
                  <div className="card-container space-y-6">
                    <h3 className="text-lg font-bold border-b border-border pb-3 flex items-center gap-2"><Wrench className="w-5 h-5 text-primary" /> Technical MVP Architecture</h3>
                    <div className="space-y-4 text-sm">
                      <div>
                        <span className="text-xs text-muted block mb-1.5">Recommended Tech Stack</span>
                        <div className="flex flex-wrap gap-1.5">
                          {activeReportDoc.report.technicalComplexity.suggestedStack.map((tech, i) => (
                            <span key={i} className="px-2.5 py-1 rounded bg-primary/10 text-primary text-xs font-semibold">{tech}</span>
                          ))}
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4 text-xs text-muted">
                        <div>
                          <strong>MVP Timeline:</strong> {activeReportDoc.report.technicalComplexity.timeline}
                        </div>
                        <div>
                          <strong>Estimated Cost:</strong> {activeReportDoc.report.technicalComplexity.estimatedCost}
                        </div>
                      </div>
                      <div>
                        <span className="text-xs text-muted block mb-1">Key Hires Required</span>
                        <p className="text-xs font-semibold text-foreground">{activeReportDoc.report.technicalComplexity.hiringRequirements.join(', ')}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Risk matrix */}
                <div className="card-container space-y-6">
                  <h3 className="text-lg font-bold border-b border-border pb-3 flex items-center gap-2"><ShieldAlert className="w-5 h-5 text-primary" /> Venture Risk Analysis</h3>
                  <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                    {Object.entries(activeReportDoc.report.risks).map(([key, val]) => (
                      <div key={key} className="p-4 rounded-xl bg-white/5 border border-border">
                        <span className="text-[10px] text-muted font-bold uppercase tracking-wider block mb-1.5">{key} Risk</span>
                        <p className="text-xs leading-relaxed text-foreground">{val as string}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* VC Investment assessment */}
                <div className="card-container bg-primary/5 border border-primary/20 space-y-6">
                  <h3 className="text-lg font-bold border-b border-primary/10 pb-3 flex items-center gap-2 text-primary"><Award className="w-5 h-5" /> VC Investment Assessment</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
                    <div>
                      <span className="text-xs text-muted block mb-1">Readiness Rating</span>
                      <p className="text-xl font-bold text-foreground">{activeReportDoc.report.investmentReadiness.readiness}</p>
                      <p className="text-xs text-muted mt-2 leading-relaxed">{activeReportDoc.report.investmentReadiness.why}</p>
                    </div>
                    <div>
                      <span className="text-xs text-muted block mb-1">Recommended Funding Stage</span>
                      <p className="text-xl font-bold text-foreground">{activeReportDoc.report.investmentReadiness.fundingStageRecommendation}</p>
                      <p className="text-xs text-muted mt-2 leading-relaxed">Consider building MVP validation to prove initial product-market fit metrics before approaching Seed investors.</p>
                    </div>
                  </div>
                </div>

                {/* Recommendations action plan */}
                <div className="card-container space-y-6">
                  <h3 className="text-lg font-bold border-b border-border pb-3 flex items-center gap-2"><CheckCircle2 className="w-5 h-5 text-primary" /> Action Plan & Recommendations</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
                    <div>
                      <span className="text-xs font-bold text-primary uppercase block mb-3">Immediate Next Steps</span>
                      <ul className="space-y-2 text-xs text-muted">
                        {activeReportDoc.report.actionPlan.immediateNextSteps.map((step, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <span className="w-4 h-4 rounded-full bg-primary/20 text-primary flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5">{i+1}</span>
                            <span>{step}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <span className="text-xs font-bold text-primary uppercase block mb-3">Long-Term Objectives</span>
                      <ul className="space-y-2 text-xs text-muted">
                        {activeReportDoc.report.actionPlan.longTermStrategy.map((step, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <span className="w-1.5 h-1.5 bg-primary rounded-full shrink-0 mt-1.5" />
                            <span>{step}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <span className="text-xs font-bold text-primary uppercase block mb-3">MVP Scope & Validation Trials</span>
                      <div className="space-y-3 text-xs text-muted">
                        <p><strong>Scope:</strong> {activeReportDoc.report.recommendations.mvpSuggestions.join(', ')}</p>
                        <p><strong>Experiments:</strong> {activeReportDoc.report.recommendations.experiments.join(', ')}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              /* Validation Form */
              <div className="card-container max-w-3xl mx-auto">
                {errorInfo && (
                  <div className="mb-4 p-3 rounded-lg bg-red-500/10 border border-red-500/25 text-red-400 text-sm text-center font-medium">
                    {errorInfo}
                  </div>
                )}
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-foreground">Project Title</label>
                      <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="w-full px-4 py-3 border border-border rounded-xl bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                        placeholder="e.g. ResumeWorded AI"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium text-foreground">Industry Category</label>
                      <select
                        value={industry}
                        onChange={(e) => setIndustry(e.target.value)}
                        className="w-full px-4 py-3 border border-border rounded-xl bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                        required
                      >
                        <option value="SaaS">SaaS</option>
                        <option value="Fintech">Fintech</option>
                        <option value="Healthtech">Healthtech</option>
                        <option value="Edtech">Edtech</option>
                        <option value="E-commerce">E-commerce</option>
                        <option value="Deep Tech">Deep Tech</option>
                        <option value="AI">AI</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">Startup Description (Detailed)</label>
                    <textarea
                      value={idea}
                      onChange={(e) => setIdea(e.target.value)}
                      className="w-full h-32 px-4 py-3 border border-border rounded-xl bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all resize-none text-sm"
                      placeholder="e.g. Build an AI-driven resume optimizer that reads PDF documents, audits keywords against target ATS criteria, and suggestions improvements..."
                      required
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-foreground">Target Audience</label>
                      <input
                        type="text"
                        value={audience}
                        onChange={(e) => setAudience(e.target.value)}
                        className="w-full px-4 py-3 border border-border rounded-xl bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                        placeholder="e.g. Job Seekers, Career Changers"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium text-foreground">Country / Region</label>
                      <input
                        type="text"
                        value={region}
                        onChange={(e) => setRegion(e.target.value)}
                        className="w-full px-4 py-3 border border-border rounded-xl bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                        placeholder="e.g. USA, Global"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium text-foreground">Business Model</label>
                      <input
                        type="text"
                        value={businessModel}
                        onChange={(e) => setBusinessModel(e.target.value)}
                        className="w-full px-4 py-3 border border-border rounded-xl bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                        placeholder="e.g. SaaS Subscription"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">Additional Context (optional)</label>
                    <textarea
                      value={additionalContext}
                      onChange={(e) => setAdditionalContext(e.target.value)}
                      className="w-full h-24 px-4 py-3 border border-border rounded-xl bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all resize-none text-sm"
                      placeholder="Optional details regarding bootstrapping constraints, competitor positioning, or regulatory guidelines..."
                    />
                  </div>

                  <div className="pt-4 flex justify-end">
                    <button 
                      type="submit" 
                      className="btn-primary w-full md:w-auto flex items-center gap-2 justify-center"
                      disabled={isSubmitting}
                    >
                      <Search className="w-5 h-5" /> Validate Concept
                    </button>
                  </div>
                </form>
              </div>
            )}
          </motion.div>
        )}

        {/* TAB 2: History Dashboard */}
        {activeTab === 'history' && (
          <motion.div
            key="history-tab"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.3 }}
            className="space-y-6"
          >
            {/* Search/Sort filters */}
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
              <div className="relative flex-1 w-full">
                <Search className="absolute inset-y-0 left-3 h-5 w-5 text-muted flex items-center pointer-events-none mt-3.5" />
                <input
                  type="text"
                  placeholder="Search validations..."
                  className="block w-full pl-10 pr-3 py-3 border border-border rounded-xl bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>

              <div className="flex gap-4 w-full md:w-auto items-center">
                <select
                  value={filterIndustry}
                  onChange={(e) => setFilterIndustry(e.target.value)}
                  className="px-3 py-3 border border-border rounded-xl bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary appearance-none text-sm w-full md:w-40"
                >
                  <option value="">All Industries</option>
                  <option value="SaaS">SaaS</option>
                  <option value="Fintech">Fintech</option>
                  <option value="Healthtech">Healthtech</option>
                  <option value="Edtech">Edtech</option>
                  <option value="E-commerce">E-commerce</option>
                </select>

                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as 'date' | 'score')}
                  className="px-3 py-3 border border-border rounded-xl bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary appearance-none text-sm w-full md:w-40"
                >
                  <option value="date">Sort by Date</option>
                  <option value="score">Sort by Score</option>
                </select>
              </div>
            </div>

            {/* List / History cards */}
            {historyLoading ? (
              <div className="flex justify-center py-12">
                <Loader2 className="w-8 h-8 text-primary animate-spin" />
              </div>
            ) : filteredHistory.length === 0 ? (
              <EmptyState
                icon={FileText}
                title="No Validations Found"
                description="You haven't run any idea validations yet or no results match the filter."
                actionText="Validate New Concept"
                onActionClick={() => setActiveTab('new')}
              />
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredHistory.map((doc) => (
                  <motion.div
                    key={doc._id}
                    onClick={() => {
                      setActiveReportDoc(doc);
                      setActiveTab('new');
                    }}
                    className="card-container flex flex-col h-56 justify-between cursor-pointer border-white/5 hover:border-primary/30"
                    whileHover={{ y: -4 }}
                  >
                    <div>
                      <div className="flex justify-between items-start mb-3 gap-2">
                        <span className="px-2 py-0.5 rounded bg-primary/10 text-primary text-[10px] font-bold uppercase tracking-wider">{doc.domain}</span>
                        <div className="w-8 h-8 rounded-full border border-primary/20 flex items-center justify-center text-xs font-bold text-primary shrink-0">
                          {doc.score}
                        </div>
                      </div>
                      <h3 className="font-bold text-foreground text-lg truncate mb-1">{doc.title}</h3>
                      <p className="text-muted text-xs line-clamp-3 leading-relaxed">{doc.idea}</p>
                    </div>

                    <div className="flex justify-between items-center pt-4 border-t border-border mt-auto">
                      <span className="text-[10px] text-muted">{new Date(doc.createdAt).toLocaleDateString()}</span>
                      <div className="flex gap-2">
                        <button
                          onClick={(e) => handleReRun(doc, e)}
                          title="Re-run Validation"
                          className="p-1.5 rounded hover:bg-white/10 text-muted hover:text-primary transition"
                        >
                          <RotateCcw className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={(e) => handleDelete(doc._id, e)}
                          title="Delete Report"
                          className="p-1.5 rounded hover:bg-red-500/10 text-muted hover:text-red-400 transition"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
