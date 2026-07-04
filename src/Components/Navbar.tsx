"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Menu, X, Rocket, Bell, LayoutDashboard } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useData } from "@/contexts/DataContext";
import { UserButton } from "@clerk/nextjs";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  const pathname = usePathname();
  const router = useRouter();

  const { currentUser, isAuthenticated } = useAuth();
  const { notifications, markNotificationRead } = useData();

  const userNotifications = notifications.filter(
    (n) => n.userId === currentUser?.id || n.userId === currentUser?._id
  );

  const unreadCount = userNotifications.filter((n) => !n.read).length;

  const getDashboardRoute = () => {
    if (!currentUser?.role) return "/";
    if (currentUser.role === "admin") return "/admin-dashboard";
    if (currentUser.role === "investor") return "/investor-dashboard";
    return "/founder-dashboard";
  };

  const navLinks = isAuthenticated
    ? [  
        { name: "Home", path: "/home" },
        { name: "Startups", path: "/startups" },
        { name: "Validator", path: "/validator" },
        { name: "Roadmap", path: "/roadmap" },
        { name: "Investors", path: "/investors" },
      ]
    : [
        { name: "Home", path: "/home" },
        { name: "About", path: "/about" },
        { name: "Contact", path: "/contact" },
      ];

  const isActive = (path: string) => pathname === path;

  return (
    <nav className="sticky top-0 z-50 w-full bg-background/80 backdrop-blur-md border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">

          <div className="flex items-center">
            <Link
              href="/"
              className="flex items-center gap-2 text-xl font-bold text-foreground"
            >
              <Rocket className="text-primary h-6 w-6" />
              IdeonixAI
            </Link>
          </div>

          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-1">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.path}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                    isActive(link.path)
                      ? "text-primary bg-primary/10"
                      : "text-muted hover:bg-white/5 hover:text-foreground"
                  }`}
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>

          <div className="hidden md:flex items-center gap-4 relative">
            {isAuthenticated ? (
              <>
                <div className="relative">
                  <button
                    onClick={() => setShowNotifications(!showNotifications)}
                    className="p-2 rounded-full hover:bg-white/10 text-muted hover:text-foreground relative transition-colors"
                  >
                    <Bell className="w-5 h-5" />
                    {unreadCount > 0 && (
                      <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
                    )}
                  </button>

                  {showNotifications && (
                    <div className="absolute right-0 mt-2 w-80 bg-card border border-border rounded-xl shadow-xl z-50 p-4">
                      <div className="flex justify-between items-center mb-3 border-b border-border pb-2">
                        <h3 className="font-semibold text-foreground">
                          Notifications
                        </h3>
                        <span className="text-xs px-2 py-0.5 bg-primary/20 text-primary rounded-full">
                          {unreadCount} New
                        </span>
                      </div>
                      <div className="space-y-2 max-h-[300px] overflow-y-auto pr-1">
                        {userNotifications.length === 0 ? (
                          <p className="text-sm text-muted text-center py-4">
                            No notifications
                          </p>
                        ) : (
                          userNotifications.map((notif) => (
                            <div
                              key={notif.id}
                              onClick={() => markNotificationRead(notif.id)}
                              className={`p-3 rounded-lg border text-sm cursor-pointer transition-colors ${
                                notif.read
                                  ? "bg-background/50 border-transparent text-muted"
                                  : "bg-primary/5 border-primary/20 text-foreground"
                              }`}
                            >
                              <p>{notif.message}</p>
                              <span className="text-xs opacity-60 mt-1 block">
                                {new Date(notif.createdAt).toLocaleDateString()}
                              </span>
                            </div>
                          ))
                        )}
                      </div>
                    </div>
                  )}
                </div>

                <div className="h-6 w-[1px] bg-border mx-2"></div>

                <button
                  onClick={() => router.push(getDashboardRoute())}
                  className="flex items-center gap-2 mr-2 px-3 py-1.5 rounded-lg bg-primary text-white hover:bg-primary/90 transition"
                >
                  <LayoutDashboard className="w-4 h-4" />
                  Dashboard
                </button>

                <UserButton />
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  className="px-4 py-2 text-sm font-medium text-foreground hover:text-primary transition-colors"
                >
                  Sign In
                </Link>
                <Link
                  href="/signup"
                  className="px-4 py-2 text-sm font-medium rounded-lg bg-primary text-white hover:opacity-90 shadow-glow-primary transition-all duration-200"
                >
                  Get Started
                </Link>
              </>
            )}
          </div>

          <div className="md:hidden flex items-center border-l border-border pl-4">
            {isAuthenticated && (
              <button
                onClick={() => setShowNotifications(!showNotifications)}
                className="p-2 mr-2 rounded-full text-muted relative"
              >
                <Bell className="w-5 h-5" />
                {unreadCount > 0 && (
                  <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                )}
              </button>
            )}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-muted hover:text-foreground hover:bg-white/5"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden border-t border-border bg-background">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.path}
                onClick={() => setIsOpen(false)}
                className={`block px-3 py-2 rounded-md text-base font-medium transition-colors ${
                  isActive(link.path)
                    ? "text-primary bg-primary/10"
                    : "text-muted hover:bg-white/5 hover:text-foreground"
                }`}
              >
                {link.name}
              </Link>
            ))}
            {!isAuthenticated ? (
              <div className="pt-4 border-t border-border mt-4 flex flex-col gap-2 px-3">
                <Link
                  href="/login"
                  onClick={() => setIsOpen(false)}
                  className="w-full text-center px-4 py-2 text-sm font-medium text-foreground hover:text-primary transition-colors border border-border rounded-lg"
                >
                  Sign In
                </Link>
                <Link
                  href="/signup"
                  onClick={() => setIsOpen(false)}
                  className="w-full text-center px-4 py-2 text-sm font-medium rounded-lg bg-primary text-white hover:opacity-90 shadow-glow-primary transition-all duration-200"
                >
                  Get Started
                </Link>
              </div>
            ) : (
              <div className="pt-4 border-t border-border mt-4 flex flex-col gap-2 px-3">
                <button
                  onClick={() => {
                    setIsOpen(false);
                    router.push(getDashboardRoute());
                  }}
                  className="w-full text-center px-4 py-2 text-sm font-medium rounded-lg bg-primary text-white hover:opacity-90 transition-all duration-200"
                >
                  Dashboard
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
