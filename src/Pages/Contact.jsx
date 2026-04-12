import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, MessageSquare, User, Send, MapPin, Phone } from 'lucide-react';

export default function Contact() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Contact form submitted:", { name, email, message });
    setIsSubmitted(true);
    setTimeout(() => setIsSubmitted(false), 3000);
    setName('');
    setEmail('');
    setMessage('');
  };

  const fadeUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  return (
    <div className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto min-h-[calc(100vh-64px)] flex flex-col justify-center">
      <motion.div 
        className="text-center mb-16"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">Get in Touch</h1>
        <p className="text-muted text-lg max-w-2xl mx-auto">
          Have questions about our platform or need support? We're here to help you on your startup journey.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
        {/* Contact Info */}
        <motion.div 
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
          }}
          className="space-y-8"
        >
          <motion.div variants={fadeUp} className="card-container flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
              <Mail className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-foreground mb-1">Email Us</h3>
              <p className="text-muted text-sm mb-2">Our friendly team is here to help.</p>
              <a href="mailto:support@ideonixai.com" className="font-medium text-foreground hover:text-primary transition-colors">
                support@ideonixai.com
              </a>
            </div>
          </motion.div>

          <motion.div variants={fadeUp} className="card-container flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-secondary/10 flex items-center justify-center shrink-0">
              <MapPin className="w-6 h-6 text-secondary" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-foreground mb-1">Office</h3>
              <p className="text-muted text-sm mb-2">Come say hello at our HQ.</p>
              <p className="font-medium text-foreground">
                100 Innovation Drive<br />San Francisco, CA 94105
              </p>
            </div>
          </motion.div>

          <motion.div variants={fadeUp} className="card-container flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-emerald-400/10 flex items-center justify-center shrink-0">
              <Phone className="w-6 h-6 text-emerald-400" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-foreground mb-1">Phone</h3>
              <p className="text-muted text-sm mb-2">Mon-Fri from 8am to 5pm (PST).</p>
              <p className="font-medium text-foreground">
                +1 (555) 123-4567
              </p>
            </div>
          </motion.div>
        </motion.div>

        {/* Contact Form */}
        <motion.div 
          className="card-container"
          initial="hidden"
          animate="visible"
          variants={fadeUp}
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-foreground">Full Name</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="h-5 w-5 text-muted" />
                </div>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="block w-full pl-10 pr-3 py-3 border border-border rounded-xl bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                  placeholder="John Doe"
                  required
                />
              </div>
            </div>

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
                  className="block w-full pl-10 pr-3 py-3 border border-border rounded-xl bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                  placeholder="you@example.com"
                  required
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-sm font-medium text-foreground">Message</label>
              <div className="relative">
                <div className="absolute top-3 left-3 pointer-events-none">
                  <MessageSquare className="h-5 w-5 text-muted" />
                </div>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="block w-full pl-10 pr-3 py-3 border border-border rounded-xl bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all resize-none h-32"
                  placeholder="How can we help you?"
                  required
                />
              </div>
            </div>

            <button 
              type="submit" 
              className={`w-full btn-primary justify-center ${isSubmitted ? 'bg-emerald-500 shadow-glow-primary/0 hover:shadow-glow-primary/0 hover:-translate-y-0' : ''}`}
              disabled={isSubmitted}
            >
              {isSubmitted ? (
                "Message Sent!"
              ) : (
                <>Send Message <Send className="w-4 h-4 ml-1" /></>
              )}
            </button>
          </form>
        </motion.div>
      </div>
    </div>
  );
}
