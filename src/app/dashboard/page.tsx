'use client';

import { motion } from 'framer-motion';
import { DASHBOARD_STATS, CLAIMS, RECOVERY_TIMELINE, PLATFORMS } from '@/lib/dashboard-data';
import { TrendingUp, TrendingDown, ArrowUpRight, Brain, Shield, Activity, AlertTriangle, CheckCircle2, Clock, Zap, ChevronRight, ExternalLink } from 'lucide-react';
import Link from 'next/link';

function StatCard({ label, value, change, prefix = '', suffix = '', delay = 0 }: {
  label: string; value: number | string; change: number; prefix?: string; suffix?: string; delay?: number;
}) {
  const isPositive = change >= 0;
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.4 }}
      className="glass-card p-5 hover:border-border-bright transition-all duration-300"
    >
      <p className="text-text-muted text-xs font-medium uppercase tracking-wider mb-3">{label}</p>
      <div className="flex items-end justify-between">
        <p className="text-text-primary text-2xl font-bold m-0" style={{ fontFamily: 'var(--font-mono)' }}>
          {prefix}{typeof value === 'number' ? new Intl.NumberFormat('en-IN').format(value) : value}{suffix}
        </p>
        <div className={`flex items-center gap-1 text-xs font-semibold ${isPositive ? 'text-accent-green' : 'text-accent-red'}`}>
          {isPositive ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
          <span>{isPositive ? '+' : ''}{change}%</span>
        </div>
      </div>
    </motion.div>
  );
}

const STATUS_STYLES: Record<string, { bg: string; color: string; label: string }> = {
  recovered: { bg: 'rgba(0,255,135,0.1)', color: '#00ff87', label: 'Recovered' },
  filed: { bg: 'rgba(59,130,246,0.1)', color: '#3b82f6', label: 'Filed' },
  pending: { bg: 'rgba(255,184,0,0.1)', color: '#ffb800', label: 'Pending' },
  escalated: { bg: 'rgba(139,92,246,0.1)', color: '#8B5CF6', label: 'Escalated' },
  rejected: { bg: 'rgba(255,59,92,0.1)', color: '#ff3b5c', label: 'Rejected' },
};

export default function DashboardPage() {
  const recoveredCount = CLAIMS.filter(c => c.status === 'recovered').length;
  const activeCount = CLAIMS.filter(c => ['filed', 'pending', 'escalated'].includes(c.status)).length;
  const totalRecoveredFromClaims = CLAIMS.filter(c => c.status === 'recovered').reduce((s, c) => s + c.amount, 0);

  return (
    <div className="p-8 max-w-[1200px]">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-text-primary text-2xl font-bold m-0 mb-1">Dashboard</h1>
        <p className="text-text-secondary text-sm m-0">Your AI agent is monitoring 5 platforms. Last scan: 2 minutes ago.</p>
      </motion.div>

      {/* Stats grid */}
      <div className="grid grid-cols-4 gap-4 mb-8">
        <StatCard label="Total Recovered" value={DASHBOARD_STATS.totalRecovered} change={DASHBOARD_STATS.totalRecoveredChange} prefix="₹" delay={0.05} />
        <StatCard label="Active Claims" value={DASHBOARD_STATS.activeClaims} change={DASHBOARD_STATS.activeClaimsChange} delay={0.1} />
        <StatCard label="Win Rate" value={DASHBOARD_STATS.winRate} change={DASHBOARD_STATS.winRateChange} suffix="%" delay={0.15} />
        <StatCard label="Money at Risk" value={DASHBOARD_STATS.moneyAtRisk} change={DASHBOARD_STATS.moneyAtRiskChange} prefix="₹" delay={0.2} />
      </div>

      {/* Two columns */}
      <div className="grid grid-cols-5 gap-6 mb-8">
        {/* Recent Claims — wider */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
          className="col-span-3 glass-card overflow-hidden"
        >
          <div className="flex items-center justify-between px-5 py-4 border-b border-border">
            <div className="flex items-center gap-2">
              <FileIcon />
              <h2 className="text-text-primary text-sm font-bold m-0">Recent Claims</h2>
            </div>
            <Link href="/dashboard/claims" className="flex items-center gap-1 text-accent-green text-xs font-semibold no-underline hover:underline">
              View all <ChevronRight className="w-3 h-3" />
            </Link>
          </div>
          <div className="divide-y divide-border">
            {CLAIMS.slice(0, 5).map((claim) => {
              const statusStyle = STATUS_STYLES[claim.status];
              return (
                <div key={claim.id} className="flex items-center gap-4 px-5 py-3.5 hover:bg-bg-card-hover transition-colors duration-200">
                  {/* Platform badge */}
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 text-xs font-bold" style={{ background: `${claim.platformColor}15`, color: claim.platformColor, border: `1px solid ${claim.platformColor}30` }}>
                    {claim.platform.slice(0, 2).toUpperCase()}
                  </div>
                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <p className="text-text-primary text-sm font-medium m-0 truncate">{claim.type}</p>
                    <p className="text-text-muted text-[11px] m-0" style={{ fontFamily: 'var(--font-mono)' }}>{claim.id} · {claim.platform}</p>
                  </div>
                  {/* AI confidence */}
                  <div className="flex items-center gap-1.5 flex-shrink-0">
                    <Brain className="w-3 h-3 text-text-muted" />
                    <span className="text-text-secondary text-[11px] font-semibold" style={{ fontFamily: 'var(--font-mono)' }}>{claim.aiConfidence}%</span>
                  </div>
                  {/* Amount */}
                  <p className="text-text-primary text-sm font-bold m-0 flex-shrink-0 w-20 text-right" style={{ fontFamily: 'var(--font-mono)' }}>
                    ₹{new Intl.NumberFormat('en-IN').format(claim.amount)}
                  </p>
                  {/* Status */}
                  <span className="tag flex-shrink-0" style={{ background: statusStyle.bg, color: statusStyle.color, border: `1px solid ${statusStyle.color}30` }}>
                    {statusStyle.label}
                  </span>
                </div>
              );
            })}
          </div>
        </motion.div>

        {/* Recovery Timeline — narrower */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="col-span-2 glass-card overflow-hidden"
        >
          <div className="flex items-center justify-between px-5 py-4 border-b border-border">
            <div className="flex items-center gap-2">
              <Activity className="w-4 h-4 text-accent-green" />
              <h2 className="text-text-primary text-sm font-bold m-0">Recovery Timeline</h2>
            </div>
          </div>
          <div className="px-5 py-3 space-y-0.5">
            {RECOVERY_TIMELINE.map((item, idx) => (
              <div key={item.id} className="flex items-center gap-3 py-2.5">
                <span className="text-text-muted text-[10px] font-medium w-12 flex-shrink-0" style={{ fontFamily: 'var(--font-mono)' }}>{item.date}</span>
                <div className="flex-1">
                  <div className="h-1.5 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.03)' }}>
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${Math.min((item.amount / 6100) * 100, 100)}%` }}
                      transition={{ delay: 0.4 + idx * 0.05, duration: 0.6 }}
                      className="h-full rounded-full"
                      style={{ background: `linear-gradient(90deg, ${item.platformColor}80, ${item.platformColor})` }}
                    />
                  </div>
                </div>
                <span className="text-text-primary text-xs font-bold flex-shrink-0 w-14 text-right" style={{ fontFamily: 'var(--font-mono)' }}>
                  ₹{new Intl.NumberFormat('en-IN').format(item.amount)}
                </span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Connected Platforms Preview */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.35 }}
        className="glass-card overflow-hidden"
      >
        <div className="flex items-center justify-between px-5 py-4 border-b border-border">
          <div className="flex items-center gap-2">
            <Zap className="w-4 h-4 text-accent-amber" />
            <h2 className="text-text-primary text-sm font-bold m-0">Connected Platforms</h2>
          </div>
          <Link href="/dashboard/platforms" className="flex items-center gap-1 text-accent-green text-xs font-semibold no-underline hover:underline">
            Manage <ChevronRight className="w-3 h-3" />
          </Link>
        </div>
        <div className="grid grid-cols-5 divide-x divide-border">
          {PLATFORMS.map((p) => (
            <div key={p.id} className="px-5 py-4 hover:bg-bg-card-hover transition-colors duration-200">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-lg">{p.icon}</span>
                <span className="text-text-primary text-xs font-semibold truncate">{p.name.split(' ')[0]}</span>
                <div className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${
                  p.status === 'connected' ? 'bg-accent-green' : p.status === 'syncing' ? 'bg-accent-amber pulse-dot' : 'bg-accent-red'
                }`} />
              </div>
              <p className="text-text-primary text-sm font-bold m-0 mb-0.5" style={{ fontFamily: 'var(--font-mono)' }}>
                ₹{new Intl.NumberFormat('en-IN').format(p.amountRecovered)}
              </p>
              <p className="text-text-muted text-[10px] m-0">recovered</p>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}

function FileIcon() {
  return <Zap className="w-4 h-4 text-accent-blue" />;
}
