import type { Metadata } from 'next';
import { ClerkProvider } from '@clerk/nextjs';
import { AuthProvider } from '@/contexts/AuthContext';
import { DataProvider } from '@/contexts/DataContext';
import Navbar from '@/Components/Navbar';
import Footer from '@/Components/Footer';
import AnimatedBackground from '@/Components/AnimatedBackground';
import './globals.css';

export const metadata: Metadata = {
  title: 'IdeonixAI - Turn Your Ideas into Fundable Startups',
  description: 'Validate, build, and scale your startup with AI. Get instant market analysis, roadmaps, and connect with investors.',
  icons: {
    icon: '/assets/logo.png',
  }
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider afterSignOutUrl="/">
      <html lang="en">
        <body className="flex flex-col min-h-screen bg-background text-foreground antialiased font-sans relative">
          <AnimatedBackground />
          <AuthProvider>
            <DataProvider>
              <Navbar />
              <main className="flex-1">
                {children}
              </main>
              <Footer />
            </DataProvider>
          </AuthProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
