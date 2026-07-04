"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useAuth } from './AuthContext';

export interface StartupProfile {
  id: string;
  _id: string;
  founderId: any;
  name: string;
  summary?: string;
  domain?: string;
  stage: string;
  problem?: string;
  solution?: string;
  lookingForTeam: boolean;
  rolesNeeded: string[];
  validationScore: number;
  readinessScore: number;
  isPublic: boolean;
}

export interface PitchRequest {
  id: string;
  _id: string;
  founderId: any;
  investorId: any;
  startupId: any;
  status: 'pending' | 'accepted' | 'rejected';
  createdAt: string;
}

export interface NotificationItem {
  id: string;
  userId: string;
  message: string;
  type: string;
  read: boolean;
  createdAt: string;
}

interface DataContextType {
  users: any[];
  updateUser: (id: string, updates: any) => Promise<void>;
  startups: StartupProfile[];
  updateStartup: (id: string, updates: any) => Promise<void>;
  addStartup: (startupData: any) => Promise<void>;
  pitchRequests: PitchRequest[];
  addPitchRequest: (founderId: string, investorId: string, startupId: string) => Promise<void>;
  updatePitchStatus: (reqId: string, status: string) => Promise<void>;
  notifications: NotificationItem[];
  addNotification: (userId: string, message: string, type?: string) => void;
  markNotificationRead: (id: string) => void;
  loading: boolean;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export function useData() {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
}

export function DataProvider({ children }: { children: ReactNode }) {
  const { currentUser } = useAuth();

  const [startups, setStartups] = useState<StartupProfile[]>([]);
  const [pitchRequests, setPitchRequests] = useState<PitchRequest[]>([]);
  const [notifications, setNotifications] = useState<NotificationItem[]>([]);
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchUsers = async () => {
    try {
      const res = await fetch("/api/auth/users");
      const data = await res.json();
      if (data.success) {
        setUsers(data.data);
      } else {
        console.error(data.message || "Failed to fetch users");
      }
    } catch (error) {
      console.error("Server not reachable", error);
    }
  };

  const updateUser = async (id: string, updates: any) => {
    try {
      const res = await fetch(`/api/auth/users/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updates)
      });
      const data = await res.json();
      if (data.success) {
        await fetchUsers(); // Refresh users
      } else {
        console.error(data.message || "Failed to update user");
      }
    } catch (err) {
      console.error("Server not reachable", err);
    }
  };

  const fetchStartups = async () => {
    try {
      const res = await fetch("/api/startup/public");
      const data = await res.json();
      if (data.success) {
        const mappedData = data.data.map((s: any) => ({
          ...s,
          id: s._id,
          founderId: s.founderId?._id || s.founderId
        }));
        setStartups(mappedData);
      } else {
        console.error(data.message || "Failed to fetch startups");
      }
    } catch (error) {
      console.error("Server not reachable", error);
    }
  };

  const fetchRequests = async () => {
    if (!currentUser) return;
    try {
      const res = await fetch(`/api/notification?userId=${currentUser.id || currentUser._id}&role=${currentUser.role}`);
      const data = await res.json();
      if (data.success) {
        const mappedData = data.data.map((r: any) => ({ ...r, id: r._id }));
        setPitchRequests(mappedData);
      } else {
        console.error(data.message || "Failed to fetch requests");
      }
    } catch (error) {
      console.error("Server not reachable", error);
    }
  };

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      await fetchStartups();
      
      if (currentUser) {
        await fetchRequests();
        if (currentUser.role === 'admin') {
          await fetchUsers();
        }
      }
      setLoading(false);
    };
    
    loadData();
  }, [currentUser]);

  const updateStartup = async (id: string, updates: any) => {
    try {
      const res = await fetch(`/api/startup/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updates)
      });
      const data = await res.json();
      if (data.success) {
        await fetchStartups(); // Refresh data
      } else {
        console.error(data.message || "Update failed");
      }
    } catch (err) {
      console.error("Server not reachable", err);
    }
  };

  const addStartup = async (startupData: any) => {
    try {
      const payload = { ...startupData, founderId: currentUser?.id || currentUser?._id };
      const res = await fetch("/api/startup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
      const data = await res.json();
      if (data.success) {
        await fetchStartups();
      } else {
        console.error(data.message || "Add failed");
      }
    } catch (err) {
      console.error("Server not reachable", err);
    }
  };

  const addNotification = (userId: string, message: string, type = 'system') => {
    const newNotif: NotificationItem = { id: 'n_' + Date.now(), userId, message, type, read: false, createdAt: new Date().toISOString() };
    setNotifications(prev => [newNotif, ...prev]);
  };

  const markNotificationRead = (id: string) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  };

  const addPitchRequest = async (founderId: string, investorId: string, startupId: string) => {
    try {
      const res = await fetch("/api/notification", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ founderId, investorId, startupId })
      });
      const data = await res.json();
      if (data.success) {
        await fetchRequests();
        addNotification(founderId, 'You have a new pitch request.', 'pitch');
      } else {
        console.error(data.message || "Failed to add pitch request");
      }
    } catch (err) {
      console.error("Server not reachable", err);
    }
  };

  const updatePitchStatus = async (reqId: string, status: string) => {
    try {
      const res = await fetch(`/api/notification/${reqId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status })
      });
      const data = await res.json();
      if (data.success) {
        await fetchRequests();
        const request = pitchRequests.find(r => r.id === reqId);
        if (request) {
           addNotification(request.founderId, `Your pitch was ${status}.`, 'pitch');
        }
      } else {
        console.error(data.message || "Failed to update pitch status");
      }
    } catch (err) {
      console.error("Server not reachable", err);
    }
  };

  const value = {
    users, updateUser,
    startups, updateStartup, addStartup,
    pitchRequests, addPitchRequest, updatePitchStatus,
    notifications, addNotification, markNotificationRead,
    loading
  };

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
}
