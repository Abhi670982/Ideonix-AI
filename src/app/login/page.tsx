"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Rocket, Mail, Lock, ArrowRight, Shield } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useSignIn, useClerk } from '@clerk/nextjs';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('founder');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { isAuthenticated, currentUser } = useAuth();
  const router = useRouter();
  const { isLoaded, signIn, setActive } = useSignIn();
  const { signOut } = useClerk();

  // Redirect already-authenticated users
  useEffect(() => {
    if (isAuthenticated && currentUser) {
      if (currentUser.role === 'admin') router.push('/admin-dashboard');
      else if (currentUser.role === 'investor') router.push('/investor-dashboard');
      else router.push('/home');
    }
  }, [isAuthenticated, currentUser, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isLoaded || isSubmitting) return;

    setError('');
    setIsSubmitting(true);

    try {
      const result = await signIn.create({
        identifier: email,
        password: password,
      });

      if (result.status !== "complete") {
        setError("Login could not be completed. Please try again.");
        return;
      }

      await setActive({ session: result.createdSessionId });

      try {
        const profileRes = await fetch(
          `/api/auth/users/by-email/${encodeURIComponent(email)}`
        );

        if (profileRes.ok) {
          const profileData = await profileRes.json();
          const dbUser = profileData.user;

          if (dbUser) {
            // Role mismatch check
            if (role !== 'admin' && dbUser.role !== role && dbUser.role !== 'admin') {
              setError(`Access denied. Your account is registered as a ${dbUser.role}, not ${role}.`);
              await signOut();
              return;
            }

            // Status checks
            if (dbUser.status === 'pending') {
              setError('Your account is pending admin approval. You will be notified once approved.');
              await signOut();
              return;
            }

            if (dbUser.status === 'rejected') {
              setError('Your account has been rejected. Please contact support.');
              await signOut();
              return;
            }

            // Redirect based on database role
            if (dbUser.role === 'admin') router.push('/admin-dashboard');
            else if (dbUser.role === 'investor') router.push('/investor-dashboard');
            else router.push('/home');
            return;
          }
        }
      } catch {
        console.warn("Backend unavailable for role check, using selected role");
      }

      // Fallback redirect using selected role tab
      if (role === 'admin') router.push('/admin-dashboard');
      else if (role === 'investor') router.push('/investor-dashboard');
      else router.push('/home');

    } catch (err: any) {
      console.error("Login error:", err);
      setError(err.errors?.[0]?.message || err.message || "Login failed. Please check your credentials.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-64px)] flex items-center justify-center p-4">
      <motion.div
        className="card-container w-full max-w-md"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex flex-col items-center mb-8">
          <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center mb-4">
            <Rocket className="text-primary w-6 h-6" />
          </div>
          <h2 className="text-2xl font-bold text-foreground">Welcome Back</h2>
          <p className="text-muted text-sm mt-1">Log in to your IdeonixAI account</p>
        </div>

        {error && (
          <div className="mb-4 p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-500 text-sm text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Role Selector */}
          <div className="grid grid-cols-3 gap-2 p-1 bg-muted/20 rounded-lg mb-6">
            {['founder', 'investor', 'admin'].map((r) => (
              <button
                key={r}
                type="button"
                onClick={() => setRole(r)}
                className={`py-2 text-sm font-medium rounded-md transition-all flex items-center justify-center gap-1 ${
                  role === r
                    ? 'bg-primary text-primary-foreground shadow-sm'
                    : 'text-muted hover:text-foreground'
                }`}
              >
                {r === 'admin' && <Shield className="w-3 h-3" />}
                {r.charAt(0).toUpperCase() + r.slice(1)}
              </button>
            ))}
          </div>

          {/* Email */}
          <div className="space-y-1.5">
            <label className="text-sm font-medium text-foreground">Email</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Mail className="h-5 w-5 text-muted" />
              </div>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="block w-full pl-10 pr-3 py-2.5 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                placeholder="you@example.com"
                required
              />
            </div>
          </div>

          {/* Password */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium text-foreground">Password</label>
              <a href="#" className="text-xs text-primary hover:underline">Forgot password?</a>
            </div>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Lock className="h-5 w-5 text-muted" />
              </div>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="block w-full pl-10 pr-3 py-2.5 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                placeholder="••••••••"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full btn-primary justify-center mt-4 disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {isSubmitting ? 'Logging in...' : <>Log In <ArrowRight className="w-4 h-4 ml-1" /></>}
          </button>
        </form>

        <p className="mt-8 text-center text-sm text-muted">
          Don&apos;t have an account?{' '}
          <Link href="/signup" className="font-medium text-primary hover:underline">
            Sign up
          </Link>
        </p>
      </motion.div>
    </div>
  );
}
