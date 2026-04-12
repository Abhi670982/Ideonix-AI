import { motion } from 'framer-motion';
import { Rocket, Target, Heart } from 'lucide-react';

const team = [
  {
    id: 1,
    name: "Alex Sterling",
    role: "Founder & CEO",
    bio: "Ex-VC turned founder. Obsessed with making startup intelligence accessible to everyone.",
    initials: "AS"
  },
  {
    id: 2,
    name: "Dr. Maya Lin",
    role: "Chief AI Scientist",
    bio: "PhD in Machine Learning. Built the predictive market analysis engine powering IdeonixAI.",
    initials: "ML"
  },
  {
    id: 3,
    name: "James Holden",
    role: "Head of Product",
    bio: "Former YC alumni with a passion for building intuitive tools for early-stage founders.",
    initials: "JH"
  }
];

export default function About() {
  const fadeUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  const stagger = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  return (
    <div className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto min-h-[calc(100vh-64px)]">
      {/* Header */}
      <motion.div 
        className="text-center max-w-3xl mx-auto mb-20"
        initial="hidden"
        animate="visible"
        variants={fadeUp}
      >
        <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">Democratizing Startup Success</h1>
        <p className="text-muted text-lg leading-relaxed">
          At IdeonixAI, we believe that great ideas shouldn't die because of a lack of guidance or capital. 
          We are building the definitive intelligence layer for early-stage founders.
        </p>
      </motion.div>

      {/* Mission & Vision */}
      <motion.div 
        className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-24"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={stagger}
      >
        <motion.div variants={fadeUp} className="card-container flex flex-col items-start bg-primary/5 border-primary/10">
          <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center mb-6">
            <Target className="w-6 h-6 text-primary" />
          </div>
          <h2 className="text-2xl font-bold text-foreground mb-4">Our Mission</h2>
          <p className="text-muted leading-relaxed">
            To dramatically increase the success rate of new ventures globally by providing founders with instant, 
            AI-driven validation, actionable roadmaps, and direct connections to the right investors.
          </p>
        </motion.div>

        <motion.div variants={fadeUp} className="card-container flex flex-col items-start bg-secondary/5 border-secondary/10">
          <div className="w-12 h-12 rounded-xl bg-secondary/20 flex items-center justify-center mb-6">
            <Rocket className="w-6 h-6 text-secondary" />
          </div>
          <h2 className="text-2xl font-bold text-foreground mb-4">Our Vision</h2>
          <p className="text-muted leading-relaxed">
            A world where any ambitious founder, regardless of geography or network, can validate their concept, 
            build a viable product, and secure funding using our unified platform.
          </p>
        </motion.div>
      </motion.div>

      {/* Team */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={stagger}
      >
        <motion.div variants={fadeUp} className="text-center mb-12">
          <Heart className="w-8 h-8 text-rose-400 mx-auto mb-4" />
          <h2 className="text-3xl font-bold text-foreground">Meet the Team</h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {team.map((member) => (
            <motion.div key={member.id} variants={fadeUp} className="card-container text-center flex flex-col items-center">
              <div className="w-20 h-20 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-2xl font-bold text-foreground mb-4 shadow-xl">
                {member.initials}
              </div>
              <h3 className="text-xl font-bold text-foreground mb-1">{member.name}</h3>
              <p className="text-primary text-sm font-medium mb-4">{member.role}</p>
              <p className="text-muted text-sm leading-relaxed">{member.bio}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
