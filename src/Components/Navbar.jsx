import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Rocket } from 'lucide-react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Validator', path: '/validator' },
    { name: 'Roadmap', path: '/roadmap' },
    { name: 'Investors', path: '/investors' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="sticky top-0 z-50 w-full bg-background/80 backdrop-blur-md border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center gap-2 text-xl font-bold text-foreground">
              <Rocket className="text-primary h-6 w-6" />
              IdeonixAI
            </Link>
          </div>
          
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-1">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                    isActive(link.path)
                      ? 'text-primary bg-primary/10'
                      : 'text-muted hover:bg-white/5 hover:text-foreground'
                  }`}
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>

          <div className="hidden md:flex gap-4">
            <Link to="/login" className="px-4 py-2 text-sm font-medium text-foreground hover:text-primary transition-colors">
              Log In
            </Link>
            <Link to="/signup" className="px-4 py-2 text-sm font-medium rounded-lg bg-primary text-white hover:opacity-90 shadow-glow-primary transition-all duration-200">
              Sign Up
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-muted hover:text-foreground hover:bg-white/5 focus:outline-none"
            >
              <span className="sr-only">Open main menu</span>
              {isOpen ? <X className="block h-6 w-6" /> : <Menu className="block h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden bg-card border-b border-border">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className={`block px-3 py-2 rounded-md text-base font-medium ${
                  isActive(link.path)
                    ? 'text-primary bg-primary/10'
                    : 'text-muted hover:bg-white/5 hover:text-foreground'
                }`}
              >
                {link.name}
              </Link>
            ))}
            <div className="pt-4 flex flex-col gap-2">
               <Link 
                 to="/login"
                 onClick={() => setIsOpen(false)}
                 className="block px-3 py-2 rounded-md text-base font-medium text-foreground hover:bg-white/5"
               >
                 Log In
               </Link>
               <Link 
                 to="/signup"
                 onClick={() => setIsOpen(false)}
                 className="block px-3 py-2 rounded-md text-base font-medium bg-primary text-white hover:opacity-90 text-center"
               >
                 Sign Up
               </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
