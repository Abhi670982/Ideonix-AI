"use client";

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Search, Code2, Rocket, TrendingUp, CheckCircle2, Circle, Loader2, Map } from 'lucide-react';
import { useData } from '@/contexts/DataContext';
import { useAuth } from '@/contexts/AuthContext';
import EmptyState from '@/Components/EmptyState';

interface Step {
  id: number;
  title: string;
  duration: string;
  icon: React.ReactNode;
  status: 'completed' | 'current' | 'upcoming';
  tasks: string[];
}

export default function Roadmap() {
  const { startups } = useData();
  const { currentUser } = useAuth();
  const [roadmapData, setRoadmapData] = useState<Step[] | null>(null);
  const [loading, setLoading] = useState(true);

  const userStartup = startups?.find(s => s.founderId === currentUser?.id || s.founderId === currentUser?._id);

  useEffect(() => {
    const fetchRoadmap = async () => {
      if (!userStartup) {
        setRoadmapData(null);
        setLoading(false);
        return;
      }
      try {
        const res = await fetch("/api/validation/roadmap", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ idea: userStartup.problem || "Building a startup", domain: userStartup.domain || "Technology", stage: userStartup.stage || "Idea", startupId: userStartup.id })
        });
        const data = await res.json();
        if (data.success && data.data && data.data.phases) {
          const mappedSteps: Step[] = data.data.phases.map((p: any, idx: number) => ({
            id: idx + 1,
            title: p.phaseName,
            duration: p.duration,
            icon: idx === 0 ? <Search className="w-5 h-5 text-primary" /> : idx === 1 ? <Code2 className="w-5 h-5 text-primary" /> : <Rocket className="w-5 h-5 text-primary" />,
            status: idx === 0 ? "current" : "upcoming",
            tasks: p.steps?.map((s: any) => s.title) || ["Implementation"]
          }));
          setRoadmapData(mappedSteps);
        } else {
          setRoadmapData(null);
        }
      } catch (err) {
        console.error(err);
        setRoadmapData(null);
      } finally {
        setLoading(false);
      }
    };
    fetchRoadmap();
  }, [userStartup]);

  const fadeUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  if (loading) {
    return (
      <div className="py-16 px-4 flex items-center justify-center min-h-[calc(100vh-64px)]">
        <Loader2 className="w-12 h-12 text-primary animate-spin" />
      </div>
    );
  }

  if (!userStartup || !roadmapData) {
    return (
      <div className="py-24 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto min-h-[calc(100vh-64px)] flex flex-col justify-center">
        <EmptyState
          icon={Map}
          title="No Roadmap Generated Yet"
          description="In order to generate your custom AI-driven execution roadmap, you first need to validate a startup idea."
          actionText="Validate Your Idea"
          actionHref="/validator"
        />
      </div>
    );
  }

  const displayData = roadmapData;

  return (
    <div className="py-16 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto min-h-[calc(100vh-64px)]">
      <motion.div 
        className="text-center mb-16"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <span className="inline-block py-1 px-3 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-semibold tracking-wider uppercase mb-4">
          Generated AI Plan
        </span>
        <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">Your Startup Roadmap</h1>
        <p className="text-muted text-lg max-w-2xl mx-auto">
          A step-by-step personalized execution plan to take your idea from concept to successful launch and beyond.
        </p>
      </motion.div>

      <div className="relative max-w-3xl mx-auto">
        {/* Vertical line connector */}
        <div className="absolute left-8 md:left-[50%] top-0 bottom-0 w-px bg-border transform md:-translate-x-1/2" />

        <div className="space-y-12">
          {displayData.map((step, index) => {
            const isEven = index % 2 === 0;
            return (
              <motion.div 
                key={step.id}
                className="relative flex flex-col md:flex-row items-start"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
                variants={fadeUp}
              >
                {/* Timeline Node */}
                <div className="absolute left-8 md:left-[50%] flex items-center justify-center w-10 h-10 transform -translate-x-1/2 bg-card border-2 border-border rounded-full z-10 shadow-lg">
                  {step.status === 'completed' ? (
                    <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                  ) : step.status === 'current' ? (
                    <div className="w-3 h-3 rounded-full bg-primary shadow-[0_0_10px_rgba(56,189,248,0.8)]" />
                  ) : (
                    <Circle className="w-4 h-4 text-muted" />
                  )}
                </div>

                {/* Content Card */}
                <div className={`ml-20 md:ml-0 w-full md:w-1/2 ${isEven ? 'md:pr-16 md:text-right md:items-end flex flex-col' : 'md:pl-16 md:ml-auto'}`}>
                  <div className={`card-container w-full p-6 ${step.status === 'current' ? 'border-primary/50 shadow-glow-primary/5' : ''}`}>
                    <div className={`flex items-center gap-3 mb-2 ${isEven ? 'md:justify-end' : ''}`}>
                      <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center border border-white/10">
                        {step.icon}
                      </div>
                      <span className="text-xs font-semibold text-primary uppercase tracking-wider">{step.duration}</span>
                    </div>
                    
                    <h3 className="text-xl font-bold text-foreground mb-4">{step.title}</h3>
                    
                    <ul className={`space-y-2 text-sm text-muted ${isEven ? 'md:text-right' : 'text-left'}`}>
                      {step.tasks.map((task, i) => (
                        <li key={i} className={`flex items-start gap-2 ${isEven ? 'md:flex-row-reverse' : ''}`}>
                          <div className={`w-1.5 h-1.5 rounded-full mt-1.5 shrink-0 ${step.status === 'completed' ? 'bg-emerald-400' : step.status === 'current' ? 'bg-primary' : 'bg-muted'}`} />
                          <span>{task}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
