"use client";

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useData } from '@/contexts/DataContext';
import { useAuth } from '@/contexts/AuthContext';
import { Search, Filter, Compass, MessageSquare, Check, UserPlus, FileText } from 'lucide-react';
import EmptyState from '@/Components/EmptyState';

export default function Startups() {
  const { startups, pitchRequests, addPitchRequest } = useData();
  const { currentUser } = useAuth();
  
  const [searchTerm, setSearchTerm] = useState('');
  const [domainFilter, setDomainFilter] = useState('');
  
  const publicStartups = startups.filter(s => s.isPublic);
  
  const filteredStartups = publicStartups.filter(s => {
    const matchesSearch = s.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          s.summary?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          s.problem?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDomain = domainFilter ? s.domain === domainFilter : true;
    return matchesSearch && matchesDomain;
  });

  const hasSentPitch = (startupId: string) => {
    return pitchRequests.some(pr => pr.startupId === startupId && pr.investorId === currentUser?.id);
  };

  const handlePitch = (startupId: string, founderId: string) => {
    if (currentUser?.id) {
      addPitchRequest(founderId, currentUser.id, startupId);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-400">
          Discover Validated Startups
        </h1>
        <p className="text-lg text-muted max-w-2xl mx-auto">
          Explore high-potential ideas backed by AI-driven validation and readiness scores.
        </p>
      </div>

      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <div className="relative flex-1">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-muted" />
          </div>
          <input
            type="text"
            className="block w-full pl-10 pr-3 py-3 border border-border rounded-xl bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
            placeholder="Search startups by name or problem..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="relative w-full md:w-64 shrink-0">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Filter className="h-5 w-5 text-muted" />
          </div>
          <select
            className="block w-full pl-10 pr-3 py-3 border border-border rounded-xl bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all appearance-none"
            value={domainFilter}
            onChange={(e) => setDomainFilter(e.target.value)}
          >
            <option value="">All Domains</option>
            <option value="AI">AI</option>
            <option value="Fintech">Fintech</option>
            <option value="Healthtech">Healthtech</option>
            <option value="SaaS">SaaS</option>
            <option value="Edtech">Edtech</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredStartups.length === 0 ? (
          <div className="col-span-full">
            <EmptyState
              icon={FileText}
              title="No Startups Found"
              description="No public startup profiles match your search query or selected domain filter."
            />
          </div>
        ) : (
          filteredStartups.map((startup, idx) => (
            <motion.div 
              key={startup.id}
              className="card-container flex flex-col h-full"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-xl font-bold text-foreground">{startup.name}</h3>
                  <div className="flex gap-2 mt-2 flex-wrap">
                    <span className="px-2 py-1 rounded text-[10px] uppercase tracking-wider font-semibold bg-primary/10 text-primary">{startup.domain}</span>
                    <span className="px-2 py-1 rounded text-[10px] uppercase tracking-wider font-semibold bg-muted text-foreground">{startup.stage}</span>
                  </div>
                </div>
                <div className="w-10 h-10 rounded-full border-2 border-primary flex items-center justify-center text-xs font-bold text-primary shrink-0">
                  {startup.validationScore}
                </div>
              </div>

              <div className="flex-1 space-y-4">
                <div>
                  <p className="text-xs text-muted uppercase tracking-wider font-semibold mb-1">Problem</p>
                  <p className="text-sm text-foreground line-clamp-3">{startup.problem || startup.summary}</p>
                </div>
                {startup.lookingForTeam && (
                  <div className="p-3 rounded-lg bg-primary/5 border border-primary/10">
                    <p className="text-xs text-primary font-medium flex items-center gap-1 mb-1">
                      <UserPlus className="w-3 h-3"/> Recruiting
                    </p>
                    <p className="text-xs text-muted">{startup.rolesNeeded?.join(', ')}</p>
                  </div>
                )}
              </div>

              {currentUser?.role === 'investor' && (
                <div className="mt-6 pt-4 border-t border-border">
                  {hasSentPitch(startup.id) ? (
                    <button className="w-full py-2.5 rounded-lg flex items-center justify-center gap-2 bg-green-500/10 text-green-500 font-medium text-sm cursor-not-allowed">
                      <Check className="w-4 h-4" /> Pitch Requested
                    </button>
                  ) : (
                    <button 
                      onClick={() => handlePitch(startup.id, startup.founderId)}
                      className="w-full btn-primary justify-center py-2.5"
                    >
                      <MessageSquare className="w-4 h-4 min-w-4 mr-2" /> Request Pitch
                    </button>
                  )}
                </div>
              )}
            </motion.div>
          ))
        )}
      </div>
    </div>
  );
}
