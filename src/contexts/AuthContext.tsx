"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useUser, useAuth as useClerkAuth } from '@clerk/nextjs';

export interface UserProfile {
  id: string;
  _id: string;
  clerkId: string;
  email: string;
  firstName?: string;
  lastName?: string;
  fullName?: string;
  name?: string;
  username?: string;
  profileImage?: string;
  role: 'founder' | 'investor' | 'admin';
  status: 'pending' | 'verified' | 'rejected';
  credits?: number;
  subscription?: string;
  plan?: string;
  onboardingCompleted?: boolean;
  preferences?: Record<string, string>;
  usage?: Record<string, number>;
  workspaces?: any[];
  lastLoginAt?: string | Date;
}

interface AuthContextType {
  currentUser: UserProfile | null;
  setCurrentUser: (user: UserProfile | null) => void;
  logout: () => Promise<void>;
  updateProfile: (updates: Partial<UserProfile>) => Promise<void>;
  isAuthenticated: boolean;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const { user, isLoaded: isClerkLoaded, isSignedIn } = useUser();
  const { signOut } = useClerkAuth();
  const [currentUser, setCurrentUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const sync = async () => {
      if (!isClerkLoaded) return;

      if (isSignedIn && user) {
        try {
          const res = await fetch("/api/auth/sync", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              clerkId: user.id,
              email: user.primaryEmailAddress?.emailAddress,
              firstName: user.firstName,
              lastName: user.lastName,
              fullName: user.fullName || `${user.firstName || ""} ${user.lastName || ""}`.trim() || "User",
              username: user.username,
              profileImage: user.imageUrl,
            }),
          });

          if (res.ok) {
            const data = await res.json();
            if (data.success && data.user) {
              setCurrentUser(data.user);
            }
          } else {
            console.warn("Backend sync failed, using Clerk data as fallback");
            setCurrentUser({
              id: user.id,
              _id: user.id,
              clerkId: user.id,
              email: user.primaryEmailAddress?.emailAddress || "",
              firstName: user.firstName || "",
              lastName: user.lastName || "",
              fullName: user.fullName || "",
              profileImage: user.imageUrl,
              role: "founder",
              status: "verified",
            });
          }
        } catch (error) {
          console.error("Error syncing user with backend:", error);
          setCurrentUser({
            id: user.id,
            _id: user.id,
            clerkId: user.id,
            email: user.primaryEmailAddress?.emailAddress || "",
            firstName: user.firstName || "",
            lastName: user.lastName || "",
            fullName: user.fullName || "",
            profileImage: user.imageUrl,
            role: "founder",
            status: "verified",
          });
        } finally {
          setLoading(false);
        }
      } else {
        setCurrentUser(null);
        setLoading(false);
      }
    };

    sync();
  }, [user, isClerkLoaded, isSignedIn]);

  const logout = async () => {
    try {
      await signOut();
    } catch (err) {
      console.error("Sign out error:", err);
    } finally {
      setCurrentUser(null);
    }
  };

  const updateProfile = async (updates: Partial<UserProfile>) => {
    if (!currentUser) return;
    setCurrentUser(prev => prev ? { ...prev, ...updates } : null);
    try {
      await fetch(`/api/auth/users/${currentUser.id || currentUser._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updates),
      });
    } catch (error) {
      console.error("Failed to update user profile in database:", error);
    }
  };

  const value = {
    currentUser,
    setCurrentUser,
    logout,
    updateProfile,
    isAuthenticated: !!currentUser && !!isSignedIn,
    loading,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
