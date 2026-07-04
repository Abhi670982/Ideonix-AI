"use client";

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Briefcase, Building2, ExternalLink, Loader2, Users } from 'lucide-react';
import EmptyState from '@/Components/EmptyState';

interface DBInvestor {
  _id: string;
  userId?: {
    name: string;
    email: string;
  };
  company: string;
  investmentRange?: string;
  preferredDomains?: string[];
  pastInvestments?: string;
  status: string;
}

export default function Investors() {
  const [investors, setInvestors] = useState<DBInvestor[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchInvestors = async () => {
      try {
        const res = await fetch("/api/investor");
        const data = await res.json();
        if (data.success && data.data) {
          setInvestors(data.data);
        }
      } catch (err) {
        console.error("Failed to load investors:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchInvestors();
  }, []);

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

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

  return (
    <div className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto min-h-[calc(100vh-64px)]">
      <motion.div 
        className="text-center mb-16"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <span className="inline-block py-1 px-3 rounded-full bg-secondary/10 border border-secondary/20 text-secondary text-xs font-semibold tracking-wider uppercase mb-4">
          Investor Network
        </span>
        <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">Connect with Capital</h1>
        <p className="text-muted text-lg max-w-2xl mx-auto">
          Discover and connect with top-tier venture capital firms and angel investors actively seeking opportunities in your domain.
        </p>
      </motion.div>

      {investors.length === 0 ? (
        <EmptyState
          icon={Users}
          title="No Registered Investors"
          description="There are currently no verified investors in the network. Register as an investor or check back later."
          actionText="Register as Investor"
          actionHref="/signup"
        />
      ) : (
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
        >
          {investors.map((inv) => (
            <motion.div key={inv._id} variants={fadeUp} className="card-container flex flex-col h-full">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-xl bg-secondary/15 flex items-center justify-center text-secondary shadow-lg">
                  <Building2 className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-foreground">{inv.company}</h3>
                  <span className="text-xs text-primary font-semibold tracking-wider uppercase">
                    {inv.preferredDomains && inv.preferredDomains.length > 0
                      ? inv.preferredDomains.join(", ")
                      : "Agnostic"}
                  </span>
                </div>
              </div>
              
              <p className="text-muted text-sm leading-relaxed mb-8 flex-1">
                Represented by <span className="text-foreground font-semibold">{inv.userId?.name || "Verified Investor"}</span>. 
                {inv.pastInvestments ? ` Past investments: ${inv.pastInvestments}` : " Open to reviewing validated startup pitches."}
              </p>
              
              <div className="flex items-center justify-between pt-6 border-t border-border mt-auto">
                <div className="flex items-center gap-2">
                  <Briefcase className="w-4 h-4 text-muted" />
                  <span className="text-sm font-semibold text-foreground">
                    {inv.investmentRange || "Undisclosed ticket"}
                  </span>
                </div>
                <button className="flex items-center gap-1 text-sm font-semibold text-primary hover:text-primary/80 transition-colors">
                  Apply <ExternalLink className="w-3.5 h-3.5" />
                </button>
              </div>
            </motion.div>
          ))}
        </motion.div>
      )}
    </div>
  );
}
