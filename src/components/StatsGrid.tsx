'use client';

import { motion } from 'framer-motion';
import { AgentStats } from '@/lib/types';
import { Search, FileCheck, Shield, TrendingUp, Clock, Target } from 'lucide-react';

interface StatsGridProps {
  stats: AgentStats;
}

export default function StatsGrid({ stats }: StatsGridProps) {
  const items = [
    { 
      icon: <Search className="w-4 h-4" />, 
      label: 'Transactions Audited', 
      value: new Intl.NumberFormat('en-IN').format(stats.transactionsAudited),
      color: 'text-text-primary',
    },
    { 
      icon: <Target className="w-4 h-4" />, 
      label: 'Overcharges Caught', 
      value: stats.overchargesDetected.toString(),
      color: 'text-accent-amber',
    },
    { 
      icon: <FileCheck className="w-4 h-4" />, 
      label: 'Claims Auto-Filed', 
      value: stats.claimsFiled.toString(),
      color: 'text-accent-green',
    },
    { 
      icon: <Shield className="w-4 h-4" />, 
      label: 'Win Rate', 
      value: `${stats.winRate}%`,
      color: 'text-accent-green',
    },
    { 
      icon: <Clock className="w-4 h-4" />, 
      label: 'Avg Resolution', 
      value: `${stats.avgResolutionDays} days`,
      color: 'text-text-primary',
    },
    { 
      icon: <TrendingUp className="w-4 h-4" />, 
      label: 'Monthly Savings', 
      value: `₹${new Intl.NumberFormat('en-IN').format(stats.savingsPerMonth)}`,
      color: 'text-accent-green',
    },
  ];

  return (
    <div className="grid grid-cols-3 gap-2 px-5 py-3">
      {items.map((item, idx) => (
        <motion.div
          key={item.label}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 + idx * 0.06 }}
          className="glass-card px-3 py-2.5 flex flex-col gap-1"
        >
          <div className="flex items-center gap-1.5">
            <span className="text-text-muted">{item.icon}</span>
            <span className="text-text-muted text-[9px] uppercase tracking-wider font-semibold" style={{ fontFamily: 'var(--font-mono)' }}>
              {item.label}
            </span>
          </div>
          <span className={`text-lg font-bold ${item.color}`} style={{ fontFamily: 'var(--font-mono)' }}>
            {item.value}
          </span>
        </motion.div>
      ))}
    </div>
  );
}
