"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { useData } from '@/contexts/DataContext';
import { Users, Shield, Flag, CheckCircle, XCircle, Trash2, Award, CheckSquare } from 'lucide-react';
import EmptyState from '@/Components/EmptyState';

export default function AdminDashboard() {
  const { currentUser, loading } = useAuth();
  const { users, startups, updateUser } = useData();
  const [activeTab, setActiveTab] = useState<'verification' | 'users'>('verification');
  const router = useRouter();

  useEffect(() => {
    if (!loading && currentUser && currentUser.role !== 'admin') {
      router.replace(currentUser.role === 'investor' ? '/investor-dashboard' : '/founder-dashboard');
    }
  }, [currentUser, loading, router]);

  const allInvestors = users.filter(u => u.role === 'investor');
  const pendingInvestors = allInvestors.filter(i => i.status === 'pending');

  const handleVerify = (id: string, verified: boolean) => {
    updateUser(id, { status: verified ? 'verified' : 'rejected' });
  };

  const handleBan = (id: string) => {
    updateUser(id, { status: 'rejected' });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground">Admin Control Panel</h1>
        <p className="text-muted mt-1">Manage users, investors, and platform moderation</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="card-container flex items-center justify-between">
          <div>
            <p className="text-sm text-muted">Total Users</p>
            <h3 className="text-2xl font-bold">{users.length}</h3>
          </div>
          <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center">
            <Users className="text-primary w-5 h-5" />
          </div>
        </div>
        <div className="card-container flex items-center justify-between">
          <div>
            <p className="text-sm text-muted">Total Startups</p>
            <h3 className="text-2xl font-bold">{startups.length}</h3>
          </div>
          <div className="w-10 h-10 rounded-xl bg-blue-500/20 flex items-center justify-center">
            <Award className="text-blue-500 w-5 h-5" />
          </div>
        </div>
        <div className="card-container flex items-center justify-between">
          <div>
            <p className="text-sm text-muted">Pending Verifications</p>
            <h3 className="text-2xl font-bold">{pendingInvestors.length}</h3>
          </div>
          <div className="w-10 h-10 rounded-xl bg-yellow-500/20 flex items-center justify-center">
            <Shield className="text-yellow-500 w-5 h-5" />
          </div>
        </div>
        <div className="card-container flex items-center justify-between">
          <div>
            <p className="text-sm text-muted">Reports</p>
            <h3 className="text-2xl font-bold">0</h3>
          </div>
          <div className="w-10 h-10 rounded-xl bg-red-500/20 flex items-center justify-center">
            <Flag className="text-red-500 w-5 h-5" />
          </div>
        </div>
      </div>

      <div className="card-container !p-0 overflow-hidden border border-border">
        <div className="flex border-b border-border bg-muted/10">
          <button 
            onClick={() => setActiveTab('verification')}
            className={`flex-1 py-4 text-sm font-medium transition-colors ${activeTab === 'verification' ? 'text-primary border-b-2 border-primary bg-background' : 'text-muted hover:text-foreground'}`}
          >
            Investor Verification Queue
          </button>
          <button 
            onClick={() => setActiveTab('users')}
            className={`flex-1 py-4 text-sm font-medium transition-colors ${activeTab === 'users' ? 'text-primary border-b-2 border-primary bg-background' : 'text-muted hover:text-foreground'}`}
          >
            User Management
          </button>
        </div>

        <div className="p-6">
          {activeTab === 'verification' && (
            <div>
              <h2 className="text-xl font-semibold mb-4">Pending Investors</h2>
              {pendingInvestors.length === 0 ? (
                <EmptyState
                  icon={CheckSquare}
                  title="Queue is All Clear"
                  description="There are currently no pending investor verification requests requiring review."
                />
              ) : (
                <div className="space-y-4">
                  {pendingInvestors.map(inv => (
                    <div key={inv.id} className="flex flex-col sm:flex-row sm:items-center justify-between p-4 border border-border rounded-xl bg-background/50 gap-4">
                      <div>
                        <h4 className="font-bold text-foreground">{inv.name} <span className="text-muted text-sm font-normal">({inv.email})</span></h4>
                        <p className="text-sm text-primary mt-1">{inv.company}</p>
                        <div className="flex gap-2 mt-2">
                          <span className="text-xs px-2 py-0.5 rounded bg-muted">Range: {inv.investmentRange}</span>
                          <span className="text-xs px-2 py-0.5 rounded bg-muted">Domains: {inv.preferredDomains?.join(', ')}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <button 
                          onClick={() => handleVerify(inv.id, true)}
                          className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-green-500/10 text-green-500 hover:bg-green-500/20 text-sm font-medium transition-colors"
                        >
                          <CheckCircle className="w-4 h-4" /> Approve
                        </button>
                        <button 
                          onClick={() => handleVerify(inv.id, false)}
                          className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-red-500/10 text-red-500 hover:bg-red-500/20 text-sm font-medium transition-colors"
                        >
                          <XCircle className="w-4 h-4" /> Reject
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {activeTab === 'users' && (
            <div>
              <h2 className="text-xl font-semibold mb-4">All Users</h2>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead className="bg-muted/20 text-muted uppercase font-medium">
                    <tr>
                      <th className="px-4 py-3 rounded-tl-lg">Name</th>
                      <th className="px-4 py-3">Role</th>
                      <th className="px-4 py-3">Status</th>
                      <th className="px-4 py-3 rounded-tr-lg">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    {users.map(u => (
                      <tr key={u.id} className="hover:bg-muted/5 transition-colors">
                        <td className="px-4 py-3 font-medium text-foreground">
                          {u.name} <br/><span className="text-xs text-muted font-normal">{u.email}</span>
                        </td>
                        <td className="px-4 py-3 text-primary text-xs uppercase tracking-wider">{u.role}</td>
                        <td className="px-4 py-3">
                          <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                            u.status === 'verified' ? 'bg-green-500/20 text-green-500' :
                            u.status === 'pending' ? 'bg-yellow-500/20 text-yellow-500' : 'bg-red-500/20 text-red-500'
                          }`}>
                            {u.status}
                          </span>
                        </td>
                        <td className="px-4 py-3">
                          {u.role !== 'admin' && u.status !== 'rejected' && (
                            <button 
                              onClick={() => handleBan(u.id)}
                              className="text-red-500 hover:text-red-400 p-1 rounded-lg hover:bg-red-500/10 transition-colors"
                              title="Ban User"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
