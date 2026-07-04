"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { useAuth } from '@/contexts/AuthContext';
import { useData } from '@/contexts/DataContext';
import { Activity, Target, Zap, Edit3, Users, Save, Briefcase } from 'lucide-react';
import EmptyState from '@/Components/EmptyState';

export default function FounderDashboard() {
  const { currentUser, loading } = useAuth();
  const { startups, updateStartup, addStartup, pitchRequests } = useData();
  const router = useRouter();

  useEffect(() => {
    if (!loading && currentUser && currentUser.role !== 'founder') {
      router.replace(currentUser.role === 'admin' ? '/admin-dashboard' : '/investor-dashboard');
    }
  }, [currentUser, loading, router]);
  
  const userStartup = startups.find(s => s.founderId === currentUser?.id || s.founderId === currentUser?._id) || {} as any;
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: userStartup.name || '',
    domain: userStartup.domain || '',
    stage: userStartup.stage || '',
    problem: userStartup.problem || '',
    solution: userStartup.solution || '',
    lookingForTeam: userStartup.lookingForTeam || false,
    rolesNeeded: userStartup.rolesNeeded ? userStartup.rolesNeeded.join(', ') : '',
  });

  const handleSave = () => {
    const payload = {
      ...formData,
      rolesNeeded: formData.rolesNeeded.split(',').map((r: string) => r.trim()).filter(Boolean)
    };
    if (userStartup.id) {
      updateStartup(userStartup.id, payload);
    } else {
      addStartup(payload);
    }
    setIsEditing(false);
  };

  const founderPitches = pitchRequests.filter(pr => pr.founderId === currentUser?.id);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Founder Dashboard</h1>
          <p className="text-muted mt-1">Manage your startup and track your progress</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <motion.div className="card-container" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center">
              <Activity className="text-primary w-6 h-6" />
            </div>
            <div>
              <p className="text-sm text-muted">Profile Completion</p>
              <h3 className="text-2xl font-bold">{userStartup.domain ? '100%' : '40%'}</h3>
            </div>
          </div>
        </motion.div>
        
        <motion.div className="card-container" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-blue-500/20 flex items-center justify-center">
              <Zap className="text-blue-500 w-6 h-6" />
            </div>
            <div>
              <p className="text-sm text-muted">Validation Score</p>
              <h3 className="text-2xl font-bold">{userStartup.validationScore || 0}/100</h3>
            </div>
          </div>
        </motion.div>

        <motion.div className="card-container" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-green-500/20 flex items-center justify-center">
              <Target className="text-green-500 w-6 h-6" />
            </div>
            <div>
              <p className="text-sm text-muted">Readiness Score</p>
              <h3 className="text-2xl font-bold">{userStartup.readinessScore || 0}/100</h3>
            </div>
          </div>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="card-container relative">
            <div className="flex justify-between items-center border-b border-border pb-4 mb-4">
              <h2 className="text-xl font-semibold">Startup Profile</h2>
              <button 
                onClick={() => isEditing ? handleSave() : setIsEditing(true)}
                className="flex items-center gap-2 text-sm font-medium text-primary hover:text-primary/80 transition-colors"
              >
                {isEditing ? <><Save className="w-4 h-4"/> Save</> : <><Edit3 className="w-4 h-4"/> Edit</>}
              </button>
            </div>

            {isEditing ? (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm text-muted">Startup Name</label>
                    <input className="mt-1 w-full bg-gray-800 text-white placeholder-gray-400 border border-gray-700 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
                  </div>
                  <div>
                    <label className="text-sm text-muted">Domain</label>
                    <input className="mt-1 w-full bg-gray-800 text-white placeholder-gray-400 border border-gray-700 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary" value={formData.domain} onChange={e => setFormData({...formData, domain: e.target.value})} placeholder="e.g. AI, Fintech" />
                  </div>
                </div>
                <div>
                  <label className="text-sm text-muted">Problem Statement</label>
                  <textarea className="mt-1 w-full bg-gray-800 text-white placeholder-gray-400 border border-gray-700 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary" value={formData.problem} onChange={e => setFormData({...formData, problem: e.target.value})} />
                </div>
                <div>
                  <label className="text-sm text-muted">Solution</label>
                  <textarea className="mt-1 w-full bg-gray-800 text-white placeholder-gray-400 border border-gray-700 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary" value={formData.solution} onChange={e => setFormData({...formData, solution: e.target.value})} />
                </div>
                <div className="border border-border rounded-lg p-4 bg-background/50">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h4 className="font-semibold text-foreground">Team Builder Status</h4>
                      <p className="text-sm text-muted mt-1">Are you actively looking to add co-founders or team members?</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" checked={formData.lookingForTeam} onChange={e => setFormData({...formData, lookingForTeam: e.target.checked})} />
                      <div className="w-11 h-6 bg-muted peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                    </label>
                  </div>
                  {formData.lookingForTeam && (
                    <div className="mt-4 pt-4 border-t border-border">
                      <label className="text-sm text-muted flex items-center gap-2"><Users className="w-4 h-4"/> Roles Needed (comma separated)</label>
                      <input className="input-field mt-1 w-full" value={formData.rolesNeeded} onChange={e => setFormData({...formData, rolesNeeded: e.target.value})} placeholder="e.g. CTO, Marketing Lead, Dev" />
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div className="space-y-6">
                <div>
                  <h3 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-400">
                    {userStartup.name || 'Set up your startup name'}
                  </h3>
                  <div className="flex gap-2 mt-2">
                    <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold">{userStartup.domain || 'Domain Required'}</span>
                    <span className="px-3 py-1 rounded-full bg-muted text-foreground text-xs font-semibold">{userStartup.stage}</span>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="p-4 rounded-xl bg-background/50 border border-border">
                    <h4 className="font-semibold text-foreground mb-2">The Problem</h4>
                    <p className="text-muted text-sm">{userStartup.problem || 'No problem statement provided.'}</p>
                  </div>
                  <div className="p-4 rounded-xl bg-background/50 border border-border">
                    <h4 className="font-semibold text-foreground mb-2">The Solution</h4>
                    <p className="text-muted text-sm">{userStartup.solution || 'No solution provided.'}</p>
                  </div>
                </div>

                {userStartup.lookingForTeam && (
                  <div className="p-4 rounded-xl bg-primary/5 text-primary border border-primary/20 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                      <h4 className="font-semibold flex items-center gap-2"><Users className="w-5 h-5"/> Actively Recruiting</h4>
                      <p className="text-sm opacity-80 mt-1">Looking for: {userStartup.rolesNeeded?.join(', ') || 'Various roles'}</p>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        <div>
          <div className="card-container h-full">
            <h2 className="text-xl font-semibold border-b border-border pb-4 mb-4">Recent Activity</h2>
            {founderPitches.length === 0 ? (
              <EmptyState
                icon={Briefcase}
                title="No Recent Activity"
                description="You haven't sent any pitches or requests to investors yet. Explore startups directory or connect with capital."
              />
            ) : (
              <div className="space-y-4">
                {founderPitches.map(pitch => (
                  <div key={pitch.id} className="p-3 rounded-lg border border-border bg-background flex flex-col gap-1">
                    <p className="text-sm font-medium">Pitch sent to Investor</p>
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-muted">{new Date(pitch.createdAt).toLocaleDateString()}</span>
                      <span className={`px-2 py-0.5 rounded-full ${pitch.status === 'accepted' ? 'bg-green-500/20 text-green-500' : pitch.status === 'rejected' ? 'bg-red-500/20 text-red-500' : 'bg-yellow-500/20 text-yellow-500'}`}>
                        {pitch.status.charAt(0).toUpperCase() + pitch.status.slice(1)}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
