"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { LucideIcon } from "lucide-react";

interface EmptyStateProps {
  icon: LucideIcon;
  title: string;
  description: string;
  actionText?: string;
  actionHref?: string;
  onActionClick?: () => void;
}

export default function EmptyState({
  icon: Icon,
  title,
  description,
  actionText,
  actionHref,
  onActionClick,
}: EmptyStateProps) {
  return (
    <motion.div
      className="card-container flex flex-col items-center justify-center text-center p-12 max-w-lg mx-auto bg-card/60 backdrop-blur-md border border-white/5"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4 }}
    >
      <div className="w-16 h-16 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center mb-6 text-primary shadow-glow-primary/10">
        <Icon className="w-8 h-8" />
      </div>

      <h3 className="text-xl font-bold text-foreground mb-2">{title}</h3>
      <p className="text-muted text-sm leading-relaxed mb-6 max-w-sm">{description}</p>

      {actionText && (
        <>
          {actionHref ? (
            <Link href={actionHref} className="btn-primary py-2.5 px-6 text-sm">
              {actionText}
            </Link>
          ) : (
            <button onClick={onActionClick} className="btn-primary py-2.5 px-6 text-sm">
              {actionText}
            </button>
          )}
        </>
      )}
    </motion.div>
  );
}
