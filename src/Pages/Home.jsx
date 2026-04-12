import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Zap, Target, Users, ArrowRight, CheckCircle, BarChart, Rocket, Shield } from 'lucide-react';

const features = [
  {
    id: 1,
    icon: <Zap className="w-6 h-6 text-white" />,
    title: "Instant Validation",
    description: "Get AI-powered market analysis, competition insights, and success probability in seconds.",
    active: false,
  },
  {
    id: 2,
    icon: <Target className="w-6 h-6 text-white" />,
    title: "Smart Roadmaps",
    description: "Receive personalized step-by-step plans from MVP to scaling, tailored to your industry.",
    active: true,
  },
  {
    id: 3,
    icon: <Users className="w-6 h-6 text-white" />,
    title: "Investor Network",
    description: "Connect with relevant investors actively seeking opportunities in your space.",
    active: false,
  },
];

const steps = [
  {
    id: "01",
    icon: <Target className="w-6 h-6 text-white" />,
    title: "Submit Your Idea",
    description: "Describe your startup concept and target market",
  },
  {
    id: "02",
    icon: <BarChart className="w-6 h-6 text-white" />,
    title: "Get Analysis",
    description: "Receive comprehensive AI validation and insights",
  },
  {
    id: "03",
    icon: <Rocket className="w-6 h-6 text-white" />,
    title: "Follow Roadmap",
    description: "Execute your personalized action plan",
  },
  {
    id: "04",
    icon: <Users className="w-6 h-6 text-white" />,
    title: "Connect & Scale",
    description: "Match with investors and grow your startup",
  },
];

const testimonials = [
  {
    id: 1,
    text: "IdeonixAI helped us validate our SaaS idea and secure $2M in seed funding within 3 months.",
    name: "Sarah Chen",
    role: "CEO at TechFlow",
  },
  {
    id: 2,
    text: "The AI roadmap was incredibly detailed. We followed it step-by-step and launched our MVP in 6 weeks.",
    name: "Marcus Rodriguez",
    role: "Founder of FinTrack",
  },
  {
    id: 3,
    text: "Connected with the perfect investor through their marketplace. Game-changing platform for startups.",
    name: "Emily Watson",
    role: "Co-founder at HealthHub",
  },
];

const fadeUpVariant = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

export default function Home() {
  return (
    <div className="flex flex-col w-full overflow-hidden">
      {/* ── 1. Hero Section ── */}
      <section className="relative min-h-[calc(100vh-64px)] flex items-center justify-center px-4 sm:px-6 lg:px-8 overflow-hidden">
        {/* Background Accents (Solid Colors, No Gradients) */}
        <div className="absolute top-[30%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-primary/5 blur-[100px] pointer-events-none" />
        <div className="absolute top-[10%] -left-[100px] w-[400px] h-[400px] rounded-full bg-secondary/5 blur-[80px] pointer-events-none" />
        
        <motion.div 
          className="relative z-10 flex flex-col items-center text-center max-w-4xl pt-16 pb-24"
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
        >
          <motion.div variants={fadeUpVariant} className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-md mb-8">
            <span className="text-primary font-medium text-sm flex items-center gap-2">
              <Shield className="w-4 h-4" /> AI-Powered Startup Intelligence
            </span>
          </motion.div>
          
          <motion.h1 variants={fadeUpVariant} className="text-5xl md:text-7xl font-bold text-foreground tracking-tight mb-6 leading-[1.1]">
            Turn Your Ideas into<br /> <span className="text-primary">Fundable</span> Startups
          </motion.h1>
          
          <motion.p variants={fadeUpVariant} className="text-lg md:text-xl text-muted max-w-2xl mb-10 leading-relaxed">
            Validate, build, and scale your startup with AI. Get instant market
            analysis, roadmaps, and connect with investors.
          </motion.p>
          
          <motion.div variants={fadeUpVariant} className="flex flex-col sm:flex-row items-center gap-4">
            <Link to="/validator" className="w-full sm:w-auto btn-primary">
              Validate Your Idea
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link to="/investors" className="w-full sm:w-auto btn-secondary">
              Explore Startups
            </Link>
          </motion.div>
        </motion.div>
      </section>

      {/* ── 2. Features Section ── */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-card/30">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            className="text-center max-w-2xl mx-auto mb-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeUpVariant}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Everything You Need to Launch</h2>
            <p className="text-muted text-lg">AI-powered tools to transform your ideas into successful ventures</p>
          </motion.div>
          
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
          >
            {features.map((f) => (
              <motion.div 
                key={f.id} 
                variants={fadeUpVariant}
                className={`card-container ${f.active ? 'border-border-active shadow-glow-primary/10' : ''}`}
              >
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 shadow-glow-primary/20 ${f.active ? 'bg-primary' : 'bg-primary'}`}>
                  {f.icon}
                </div>
                <h3 className="text-xl font-bold text-foreground mb-3">{f.title}</h3>
                <p className="text-muted leading-relaxed">{f.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── 3. How It Works Section ── */}
      <section className="py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            className="text-center max-w-2xl mx-auto mb-20"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeUpVariant}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">How It Works</h2>
            <p className="text-muted text-lg">From idea to launch in four simple steps</p>
          </motion.div>
          
          <div className="relative">
            {/* Horizontal line connector (hidden on mobile) */}
            <div className="hidden md:block absolute top-[52px] left-10 right-10 h-[2px] bg-border z-0" />
            
            <motion.div 
              className="grid grid-cols-1 md:grid-cols-4 gap-12 relative z-10"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={staggerContainer}
            >
              {steps.map((step) => (
                <motion.div key={step.id} variants={fadeUpVariant} className="flex flex-col items-center text-center">
                  <div className="w-28 h-28 rounded-3xl bg-card border border-border flex flex-col items-center justify-center mb-6 shadow-xl relative mt-[-24px] md:mt-0">
                    <div className="absolute -top-4 -right-4 w-10 h-10 rounded-full bg-primary border-4 border-background flex items-center justify-center text-white font-bold text-sm">
                      {step.id}
                    </div>
                    <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center text-primary mb-2">
                       {step.icon}
                    </div>
                  </div>
                  <h3 className="text-lg font-bold text-foreground mb-2">{step.title}</h3>
                  <p className="text-sm text-muted leading-relaxed">{step.description}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── 4. Testimonials Section ── */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-card/30">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            className="text-center max-w-2xl mx-auto mb-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeUpVariant}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Trusted by Founders</h2>
            <p className="text-muted text-lg">Join thousands of entrepreneurs who launched with IdeonixAI</p>
          </motion.div>
          
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
          >
            {testimonials.map((t) => (
              <motion.div key={t.id} variants={fadeUpVariant} className="card-container flex flex-col items-start text-left">
                <div className="flex gap-1 mb-6">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-5 h-5 text-primary" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-muted mb-8 flex-1 italic">"{t.text}"</p>
                <div>
                  <h4 className="text-foreground font-bold">{t.name}</h4>
                  <p className="text-muted text-sm">{t.role}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── 5. CTA Section ── */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 flex justify-center">
        <motion.div 
          className="w-full max-w-4xl bg-card border border-border shadow-2xl rounded-[2rem] p-12 md:p-16 text-center relative overflow-hidden"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeUpVariant}
        >
          <div className="absolute inset-0 bg-primary/5 pointer-events-none" />
          <div className="relative z-10">
            <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-6">Ready to Launch Your Startup?</h2>
            <p className="text-muted text-lg md:text-xl mb-10 max-w-2xl mx-auto">
              Join thousands of entrepreneurs building the future. Start validating your idea today.
            </p>
            <Link to="/validator" className="btn-primary text-lg px-8 py-4">
              Start Validating Now
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </motion.div>
      </section>
    </div>
  );
}