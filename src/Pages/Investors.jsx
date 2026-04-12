import { motion } from 'framer-motion';
import { Briefcase, Building2, ExternalLink } from 'lucide-react';

const investors = [
  {
    id: 1,
    name: "A16Z Seed Fund",
    domain: "B2B SaaS, Web3",
    description: "Looking for early-stage B2B SaaS startups with strong technical founding teams and clear go-to-market strategies.",
    ticket: "$500k - $2M",
  },
  {
    id: 2,
    name: "Sequoia Start",
    domain: "Fintech, Edtech",
    description: "Partnering with visionary founders building the next generation of financial and educational technologies.",
    ticket: "$250k - $1.5M",
  },
  {
    id: 3,
    name: "Y Combinator",
    domain: "Agnostic",
    description: "Providing seed funding for startups. Working intensely with companies for 3 months to refine pitches to investors.",
    ticket: "$500k",
  },
  {
    id: 4,
    name: "First Round Capital",
    domain: "Healthtech, Consumer",
    description: "A seed-stage venture firm focused on building a vibrant community of technology entrepreneurs and companies.",
    ticket: "$1M - $3M",
  },
  {
    id: 5,
    name: "Index Ventures",
    domain: "Marketplaces, SaaS",
    description: "Working with entrepreneurs exploring new frontiers in SaaS, e-commerce, and gaming.",
    ticket: "$1M - $5M",
  },
  {
    id: 6,
    name: "Bessemer Venture",
    domain: "Deep Tech, AI",
    description: "Investing in enterprise, consumer, and healthcare technology startups around the world.",
    ticket: "$500k - $4M",
  }
];

export default function Investors() {
  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const fadeUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  return (
    <div className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto min-h-[calc(100vh-64px)]">
      <motion.div 
        className="text-center mb-16"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <span className="inline-block py-1 px-3 rounded-full bg-secondary/10 border border-secondary/20 text-secondary text-xs font-semibold tracking-wider uppercase mb-4">
          Investor Network
        </span>
        <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">Connect with Capital</h1>
        <p className="text-muted text-lg max-w-2xl mx-auto">
          Discover and connect with top-tier venture capital firms and angel investors actively seeking opportunities in your domain.
        </p>
      </motion.div>

      <motion.div 
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
      >
        {investors.map((inv) => (
          <motion.div key={inv.id} variants={fadeUp} className="card-container flex flex-col h-full">
            <div className="flex items-start justify-between mb-4">
              <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center">
                <Building2 className="w-6 h-6 text-foreground" />
              </div>
              <span className="text-xs font-medium px-2.5 py-1 rounded-md bg-white/5 border border-border text-muted">
                {inv.ticket}
              </span>
            </div>
            
            <h3 className="text-xl font-bold text-foreground mb-1">{inv.name}</h3>
            <p className="text-primary text-sm font-medium mb-4 flex items-center gap-1.5">
              <Briefcase className="w-4 h-4" /> {inv.domain}
            </p>
            
            <p className="text-muted text-sm leading-relaxed mb-6 flex-1">
              {inv.description}
            </p>
            
            <button className="w-full btn-secondary py-2.5 flex justify-center items-center gap-2 mt-auto text-sm group">
              Contact Partner <ExternalLink className="w-4 h-4 text-muted group-hover:text-foreground transition-colors" />
            </button>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
