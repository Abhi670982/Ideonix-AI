import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Loader2, Sparkles, CheckCircle2, AlertCircle, Target, BrainCircuit } from 'lucide-react';

export default function Validator() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showResult, setShowResult] = useState(false);

  // Form states
  const [idea, setIdea] = useState('');
  const [industry, setIndustry] = useState('');
  const [audience, setAudience] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Mock API call
    setTimeout(() => {
      setIsSubmitting(false);
      setShowResult(true);
    }, 2000);
  };

  const fadeUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  return (
    <div className="py-16 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto min-h-[calc(100vh-64px)]">
      <motion.div 
        className="text-center mb-12"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">Validate Your Idea</h1>
        <p className="text-muted text-lg max-w-2xl mx-auto">
          Describe your startup concept, and our AI will analyze its market potential, identify strengths, and uncover potential risks.
        </p>
      </motion.div>

      {!showResult ? (
        <motion.div variants={fadeUp} initial="hidden" animate="visible" className="card-container max-w-3xl mx-auto">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Startup Idea</label>
              <textarea
                value={idea}
                onChange={(e) => setIdea(e.target.value)}
                className="w-full h-32 px-4 py-3 border border-border rounded-xl bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all resize-none"
                placeholder="We are building an AI-powered platform that helps users..."
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Industry</label>
                <select
                  value={industry}
                  onChange={(e) => setIndustry(e.target.value)}
                  className="w-full px-4 py-3 border border-border rounded-xl bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                  required
                >
                  <option value="" disabled>Select an industry...</option>
                  <option value="SaaS">SaaS</option>
                  <option value="Fintech">Fintech</option>
                  <option value="Healthtech">Healthtech</option>
                  <option value="Edtech">Edtech</option>
                  <option value="E-commerce">E-commerce</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Target Audience</label>
                <input
                  type="text"
                  value={audience}
                  onChange={(e) => setAudience(e.target.value)}
                  className="w-full px-4 py-3 border border-border rounded-xl bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                  placeholder="e.g. Small business owners"
                  required
                />
              </div>
            </div>

            <div className="pt-4 flex justify-end">
              <button 
                type="submit" 
                className="btn-primary w-full md:w-auto"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" /> Analyzing Market...
                  </>
                ) : (
                  <>
                    <Search className="w-5 h-5" /> Validate Concept
                  </>
                )}
              </button>
            </div>
          </form>
        </motion.div>
      ) : (
        /* Results Section */
        <motion.div 
          className="space-y-8"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
          }}
        >
          {/* Score Card */}
          <motion.div variants={fadeUp} className="card-container flex flex-col md:flex-row items-center gap-8 justify-between bg-primary/5 border-primary/20">
            <div className="flex-1">
              <div className="flex items-center gap-2 text-primary font-semibold mb-2">
                <Sparkles className="w-5 h-5" /> 
                Analysis Complete
              </div>
              <h2 className="text-2xl font-bold text-foreground mb-2">Strong Market Potential</h2>
              <p className="text-muted text-sm leading-relaxed max-w-md">
                Your idea targets a growing niche. The combination of your selected industry and target audience suggests a high likelihood of finding early adopters.
              </p>
            </div>
            
            <div className="relative w-32 h-32 flex items-center justify-center">
              {/* Circular progress background */}
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                <circle cx="18" cy="18" r="16" fill="none" className="stroke-white/10" strokeWidth="3" />
                <motion.circle 
                  cx="18" cy="18" r="16" 
                  fill="none" 
                  className="stroke-primary" 
                  strokeWidth="3" 
                  strokeDasharray="100"
                  initial={{ strokeDashoffset: 100 }}
                  animate={{ strokeDashoffset: 15 }} /* 85% score */
                  transition={{ duration: 1.5, ease: "easeOut" }}
                />
              </svg>
              <div className="absolute flex flex-col items-center justify-center">
                <span className="text-3xl font-bold text-foreground">85</span>
                <span className="text-xs text-muted">/100</span>
              </div>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Strengths */}
            <motion.div variants={fadeUp} className="card-container">
              <div className="flex items-center gap-2 mb-4 text-emerald-400 font-semibold">
                <CheckCircle2 className="w-5 h-5" /> Strengths
              </div>
              <ul className="space-y-3 text-muted text-sm">
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-1.5" />
                  Clear value proposition for the specified target audience.
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-1.5" />
                  Scalable business model typical of this industry.
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-1.5" />
                  Growing market trend supporting this type of solution.
                </li>
              </ul>
            </motion.div>

            {/* Weaknesses */}
            <motion.div variants={fadeUp} className="card-container">
              <div className="flex items-center gap-2 mb-4 text-amber-400 font-semibold">
                <AlertCircle className="w-5 h-5" /> Potential Risks
              </div>
              <ul className="space-y-3 text-muted text-sm">
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-1.5" />
                  High customer acquisition cost in this specific niche.
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-1.5" />
                  Existing entrenched competitors may be hard to displace.
                </li>
              </ul>
            </motion.div>
          </div>

          <motion.div variants={fadeUp} className="flex justify-center mt-8 gap-4 pt-8">
            <button onClick={() => setShowResult(false)} className="btn-secondary">
              Validate Another Idea
            </button>
            <button className="btn-primary">
              <BrainCircuit className="w-5 h-5" />
              Generate Roadmap
            </button>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}
