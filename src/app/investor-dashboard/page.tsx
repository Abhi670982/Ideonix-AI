"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { useAuth } from '@/contexts/AuthContext';
import { useData } from '@/contexts/DataContext';
import { Network, Star, ExternalLink, Filter, Inbox } from 'lucide-react';
import Link from 'next/link';
import EmptyState from '@/Components/EmptyState';

export default function InvestorDashboard() {
  const { currentUser, loading } = useAuth();
  const { startups, pitchRequests } = useData();
  const [filterDomain, setFilterDomain] = useState('All');
  const router = useRouter();

  useEffect(() => {
    if (!loading && currentUser && currentUser.role !== 'investor') {
      router.replace(currentUser.role === 'admin' ? '/admin-dashboard' : '/founder-dashboard');
    }
  }, [currentUser, loading, router]);

  // Simple pseudo-matching logic:
  // If startup domain is in investor's preferred domains, bump match score.
  const matchedStartups = startups
    .filter(s => s.isPublic)
    .map(s => {
      let finalScore = s.validationScore || 50; 
      // Boost if domain matches preferences
      if (s.domain && currentUser?.preferences?.preferredDomains?.includes(s.domain)) {
        finalScore = Math.min(finalScore + 15, 99);
      }
      return { ...s, matchScore: finalScore };
    })
    .sort((a, b) => b.matchScore - a.matchScore);

  const displayedStartups = filterDomain === 'All' 
    ? matchedStartups 
    : matchedStartups.filter(s => s.domain === filterDomain);

  const incomingPitches = pitchRequests.filter(pr => pr.investorId === currentUser?.id);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex flex-col md:flex-row justify-between md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground flex items-center gap-3">
            Investor Dashboard
            {currentUser?.status === 'verified' && (
              <span className="px-2 py-1 rounded bg-green-500/20 text-green-500 text-xs font-bold uppercase tracking-wider">Verified</span>
            )}
            {currentUser?.status === 'pending' && (
              <span className="px-2 py-1 rounded bg-yellow-500/20 text-yellow-500 text-xs font-bold uppercase tracking-wider">Verification Pending</span>
            )}
          </h1>
          <p className="text-muted mt-1">Discover high-potential startups matching your criteria</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="md:col-span-1 space-y-6">
          <div className="card-container">
            <h3 className="font-semibold mb-4 flex items-center gap-2"><Filter className="w-4 h-4"/> Filter Preferences</h3>
            <div className="space-y-4">
              <div>
                <label className="text-sm text-muted">Domain</label>
                <select 
                  className="input-field w-full mt-1 appearance-none"
                  value={filterDomain}
                  onChange={(e) => setFilterDomain(e.target.value)}
                >
                  <option value="All">All Domains</option>
                  <option value="AI">AI</option>
                  <option value="Fintech">Fintech</option>
                  <option value="Healthtech">Healthtech</option>
                  <option value="SaaS">SaaS</option>
                </select>
              </div>
              <div className="pt-4 border-t border-border">
                <p className="text-sm text-foreground font-medium mb-2">My Preferences</p>
                <div className="flex flex-wrap gap-2">
                  {currentUser?.preferences?.preferredDomains && (currentUser.preferences.preferredDomains as any).split(',').map((domain: string) => (
                    <span key={domain} className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-full">{domain.trim()}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="card-container">
            <h3 className="font-semibold mb-4 text-foreground text-sm tracking-wide uppercase">Incoming Pitches ({incomingPitches.filter(p => p.status === 'pending').length})</h3>
            {incomingPitches.length === 0 ? (
              <div className="text-center py-8 px-4 text-muted text-sm border border-dashed border-border rounded-xl bg-background/30 flex flex-col items-center justify-center">
                <Inbox className="w-6 h-6 mb-2 opacity-40 text-muted" />
                <p>No incoming pitches yet</p>
              </div>
            ) : (
              <div className="space-y-3">
                {incomingPitches.map(p => (
                  <div key={p.id} className="p-3 border border-border rounded-lg bg-background text-sm flex flex-col gap-2">
                    <div>
                      <span className="font-medium text-primary">Pitch Request</span>
                      <p className="text-xs text-muted mt-0.5">{new Date(p.createdAt).toLocaleDateString()}</p>
                    </div>
                    <span className={`w-fit px-2 py-0.5 rounded-full text-xs ${p.status === 'accepted' ? 'bg-green-500/20 text-green-500' : p.status === 'rejected' ? 'bg-red-500/20 text-red-500' : 'bg-yellow-500/20 text-yellow-500'}`}>
                      {p.status}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="md:col-span-3">
          <h2 className="text-xl font-bold mb-4 flex items-center gap-2"><Star className="w-5 h-5 text-yellow-500"/> Top Matches for You</h2>
          
          <div className="space-y-4">
            {displayedStartups.length === 0 ? (
              <EmptyState
                icon={Network}
                title="No Matching Startups Found"
                description="We couldn't find any public startup profiles matching this industry domain filter. Check back later or adjust filters."
              />
            ) : (
              displayedStartups.map((startup, idx) => (
                <motion.div 
                  key={startup.id} 
                  className="card-container p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-6"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-3">
                      <h3 className="text-xl font-bold text-foreground">{startup.name}</h3>
                      <span className="px-2 py-1 rounded text-xs font-semibold bg-primary/10 text-primary">{startup.domain}</span>
                      <span className="px-2 py-1 rounded text-xs font-semibold bg-muted text-foreground">{startup.stage}</span>
                    </div>
                    <p className="text-muted text-sm mt-2">{startup.summary || startup.problem}</p>
                    
                    <div className="flex gap-6 mt-4">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full border-2 border-primary flex items-center justify-center text-xs font-bold text-primary">
                          {startup.matchScore}%
                        </div>
                        <span className="text-xs text-muted font-medium">Match</span>
                      </div>
                      <div className="flex flex-col">
                        <span className="text-sm font-semibold">{startup.validationScore}/100</span>
                        <span className="text-xs text-muted">Validation</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex shrink-0">
                    <Link href="/startups" className="btn-secondary whitespace-nowrap">
                      View Profile <ExternalLink className="w-4 h-4 ml-2" />
                    </Link>
                  </div>
                </motion.div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
