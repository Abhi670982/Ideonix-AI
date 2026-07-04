"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Rocket, Mail, Lock, User as UserIcon, ArrowRight, Briefcase } from 'lucide-react';
import { useSignUp, useClerk } from '@clerk/nextjs';
import { useAuth } from '@/contexts/AuthContext';

export default function Signup() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('founder');
  const [company, setCompany] = useState('');
  const [code, setCode] = useState('');
  const [pendingVerification, setPendingVerification] = useState(false);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { isLoaded, signUp, setActive } = useSignUp();
  const { signOut } = useClerk();
  const router = useRouter();
  const { isAuthenticated, currentUser } = useAuth();

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
    setSuccess('');
    setIsSubmitting(true);

    try {
      await signUp.create({
        emailAddress: email,
        password: password,
        firstName: name,
      });

      await signUp.prepareEmailAddressVerification({ strategy: "email_code" });
      setPendingVerification(true);
      setSuccess("Verification code sent to your email!");
    } catch (err: any) {
      console.error("Signup error:", err);
      setError(err.errors?.[0]?.message || err.message || "Registration failed. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleVerifyCode = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isLoaded || isSubmitting) return;

    setError('');
    setSuccess('');
    setIsSubmitting(true);

    try {
      const completeSignUp = await signUp.attemptEmailAddressVerification({ code });

      if (completeSignUp.status !== "complete") {
        setError("Verification incomplete. Please check the code and try again.");
        return;
      }

      // Sync user to MongoDB
      try {
        const syncRes = await fetch("/api/auth/sync", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            clerkId: completeSignUp.createdUserId,
            email,
            name,
            role,
            company: role === 'investor' ? company : undefined,
          }),
        });

        if (!syncRes.ok) {
          console.warn("Backend sync failed — user created in Clerk but not in database yet");
        }
      } catch {
        console.warn("Backend unavailable — user will be synced on next login");
      }

      if (role === 'founder') {
        await setActive({ session: completeSignUp.createdSessionId });
        setSuccess('Account created! Redirecting...');
        setTimeout(() => router.push('/home'), 1500);
      } else {
        // Investor accounts require admin approval
        await signOut();
        setSuccess('Application submitted! Your investor account is pending admin approval. You will be notified via email.');
        setTimeout(() => router.push('/login'), 4000);
      }
    } catch (err: any) {
      console.error("Verification error:", err);
      setError(err.errors?.[0]?.message || err.message || "Verification failed. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-64px)] flex py-12 items-center justify-center p-4">
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
          <h2 className="text-2xl font-bold text-foreground">
            {pendingVerification ? 'Verify Your Email' : 'Create Account'}
          </h2>
          <p className="text-muted text-sm mt-1">
            {pendingVerification
              ? 'Enter the code we sent to your email'
              : 'Start validating your startup ideas today'}
          </p>
        </div>

        {error && (
          <div className="mb-4 p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-500 text-sm text-center">
            {error}
          </div>
        )}

        {success && (
          <div className="mb-4 p-3 rounded-lg bg-green-500/10 border border-green-500/20 text-green-500 text-sm text-center">
            {success}
          </div>
        )}

        {!pendingVerification ? (
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Role Selector */}
            <div className="grid grid-cols-2 gap-2 p-1 bg-muted/20 rounded-lg mb-6">
              {['founder', 'investor'].map((r) => (
                <button
                  key={r}
                  type="button"
                  onClick={() => setRole(r)}
                  className={`py-2 text-sm font-medium rounded-md transition-all ${
                    role === r
                      ? 'bg-primary text-primary-foreground shadow-sm'
                      : 'text-muted hover:text-foreground'
                  }`}
                >
                  {r.charAt(0).toUpperCase() + r.slice(1)}
                </button>
              ))}
            </div>

            {/* Full Name */}
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-foreground">Full Name</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <UserIcon className="h-5 w-5 text-muted" />
                </div>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="block w-full pl-10 pr-3 py-2.5 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                  placeholder="John Doe"
                  required
                />
              </div>
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

            {/* Company Name (Investors only) */}
            {role === 'investor' && (
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-foreground">Company / Fund Name</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Briefcase className="h-5 w-5 text-muted" />
                  </div>
                  <input
                    type="text"
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    className="block w-full pl-10 pr-3 py-2.5 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                    placeholder="Venture Capital LLC"
                    required
                  />
                </div>
              </div>
            )}

            {/* Password */}
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-foreground">Password</label>
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

            {role === 'investor' && (
              <p className="text-xs text-muted bg-muted/10 rounded-lg p-3 border border-border">
                🔔 Investor accounts require admin approval. You will be notified once your account is reviewed.
              </p>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full btn-primary justify-center mt-4 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'Creating Account...' : (
                <>
                  {role === 'founder' ? 'Create Account' : 'Apply for Investor Access'}
                  <ArrowRight className="w-4 h-4 ml-1" />
                </>
              )}
            </button>
          </form>
        ) : (
          <form onSubmit={handleVerifyCode} className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-foreground">Verification Code</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-muted" />
                </div>
                <input
                  type="text"
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  className="block w-full pl-10 pr-3 py-2.5 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all tracking-widest text-center text-lg font-mono"
                  placeholder="123456"
                  maxLength={6}
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full btn-primary justify-center mt-4 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'Verifying...' : <>Verify Code <ArrowRight className="w-4 h-4 ml-1" /></>}
            </button>

            <button
              type="button"
              onClick={() => { setPendingVerification(false); setError(''); setSuccess(''); }}
              className="w-full text-sm text-muted hover:text-foreground text-center mt-2 transition-colors"
            >
              ← Back to registration
            </button>
          </form>
        )}

        <p className="mt-8 text-center text-sm text-muted">
          Already have an account?{' '}
          <Link href="/login" className="font-medium text-primary hover:underline">
            Log in
          </Link>
        </p>
      </motion.div>
    </div>
  );
}
