import { Link } from 'react-router-dom';
import { Rocket, Globe, Share2, MessageCircle } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-card border-t border-border pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="col-span-1 md:col-span-1">
            <Link to="/" className="flex items-center gap-2 text-xl font-bold text-foreground mb-4">
              <Rocket className="text-primary h-6 w-6" />
              IdeonixAI
            </Link>
            <p className="text-muted text-sm leading-relaxed mb-6">
              AI-powered startup validation and roadmap generation platform. Turn your ideas into fundable startups.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-muted hover:text-primary transition-colors">
                <Share2 className="h-5 w-5" />
              </a>
              <a href="#" className="text-muted hover:text-primary transition-colors">
                <MessageCircle className="h-5 w-5" />
              </a>
              <a href="#" className="text-muted hover:text-primary transition-colors">
                <Globe className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Links */}
          <div>
            <h3 className="text-foreground font-semibold mb-4">Platform</h3>
            <ul className="space-y-3">
              <li><Link to="/validator" className="text-muted hover:text-primary text-sm transition-colors">Validator</Link></li>
              <li><Link to="/roadmap" className="text-muted hover:text-primary text-sm transition-colors">Roadmap</Link></li>
              <li><Link to="/investors" className="text-muted hover:text-primary text-sm transition-colors">Investors</Link></li>
              <li><Link to="/pricing" className="text-muted hover:text-primary text-sm transition-colors">Pricing</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-foreground font-semibold mb-4">Company</h3>
            <ul className="space-y-3">
              <li><Link to="/about" className="text-muted hover:text-primary text-sm transition-colors">About Us</Link></li>
              <li><Link to="/contact" className="text-muted hover:text-primary text-sm transition-colors">Contact</Link></li>
              <li><Link to="/careers" className="text-muted hover:text-primary text-sm transition-colors">Careers</Link></li>
              <li><Link to="/blog" className="text-muted hover:text-primary text-sm transition-colors">Blog</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-foreground font-semibold mb-4">Legal</h3>
            <ul className="space-y-3">
              <li><Link to="/privacy" className="text-muted hover:text-primary text-sm transition-colors">Privacy Policy</Link></li>
              <li><Link to="/terms" className="text-muted hover:text-primary text-sm transition-colors">Terms of Service</Link></li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-muted text-sm text-center md:text-left">
            &copy; {new Date().getFullYear()} IdeonixAI. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}