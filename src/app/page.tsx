'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import RecoveryCounter from '@/components/RecoveryCounter';
import LiveFeed from '@/components/LiveFeed';
import { RecoveryEvent, AgentStats } from '@/lib/types';
import { INITIAL_STATS, LIVE_EVENTS, EVENT_SCHEDULE } from '@/lib/data';
import { Shield, Brain, Zap, Activity } from 'lucide-react';

export default function Home() {
  const [phase, setPhase] = useState<'intro' | 'boot' | 'live'>('intro');
  const [events, setEvents] = useState<RecoveryEvent[]>([]);
  const [recoveryDeltas, setRecoveryDeltas] = useState<number[]>([]);
  const [stats, setStats] = useState<AgentStats>(INITIAL_STATS);
  const [bootLines, setBootLines] = useState<string[]>([]);
  const [recoveryFlash, setRecoveryFlash] = useState(false);
  const timerRefs = useRef<ReturnType<typeof setTimeout>[]>([]);

  const BOOT_SEQUENCE = [
    '> Initializing SettleGuard AI Agent v3.0...',
    '> Connecting payment gateways (Razorpay, Cashfree)... ✓',
    '> Connecting marketplaces (Amazon, Flipkart)... ✓',
    '> Connecting logistics (Shiprocket)... ✓',
    '> Loading merchant bank feed... ✓',
    '> Loading AI models: fee-classifier, anomaly-detector, claim-optimizer... ✓',
    '> Loading historical claim outcomes (2,847 cases)... ✓',
    '> Agent ready. Beginning autonomous scan...',
    '> ████████████████████████ AI AGENT ACTIVE ████████████████████████',
  ];

  const startBootSequence = useCallback(() => {
    setPhase('boot');
    setBootLines([]);
    BOOT_SEQUENCE.forEach((line, idx) => {
      const timer = setTimeout(() => {
        setBootLines(prev => [...prev, line]);
        if (idx === BOOT_SEQUENCE.length - 1) {
          const t = setTimeout(() => setPhase('live'), 1000);
          timerRefs.current.push(t);
        }
      }, 150 + idx * 280);
      timerRefs.current.push(timer);
    });
  }, []);

  // Live event stream
  useEffect(() => {
    if (phase !== 'live') return;

    EVENT_SCHEDULE.forEach((delay, idx) => {
      if (idx < LIVE_EVENTS.length) {
        const timer = setTimeout(() => {
          const event = { ...LIVE_EVENTS[idx], timestamp: new Date() };
          setEvents(prev => [...prev, event]);

          if (event.recoveryAmount && event.status === 'recovered') {
            setRecoveryDeltas(prev => [...prev, event.recoveryAmount!]);
            setRecoveryFlash(true);
            setTimeout(() => setRecoveryFlash(false), 2000);
            setStats(prev => ({
              ...prev,
              totalRecovered: prev.totalRecovered + event.recoveryAmount!,
              claimsFiled: prev.claimsFiled + 1,
            }));
          }

          if (event.status === 'acting') {
            setStats(prev => ({
              ...prev,
              claimsFiled: prev.claimsFiled + 1,
              activeClaims: prev.activeClaims + 1,
            }));
          }
        }, delay);
        timerRefs.current.push(timer);
      }
    });

    return () => {
      timerRefs.current.forEach(clearTimeout);
      timerRefs.current = [];
    };
  }, [phase]);

  // ============ INTRO ============
  if (phase === 'intro') {
    return (
      <div className="fixed inset-0 bg-bg-primary flex flex-col items-center justify-center">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="text-center max-w-2xl px-8"
        >
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="flex items-center justify-center gap-3 mb-10"
          >
            <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: 'linear-gradient(135deg, rgba(0,255,135,0.15), rgba(0,255,135,0.05))', border: '1px solid rgba(0,255,135,0.3)' }}>
              <Shield className="w-5 h-5 text-accent-green" />
            </div>
            <div>
              <span className="text-text-primary text-lg font-bold tracking-wide">SETTLEGUARD</span>
              <span className="text-accent-green text-lg font-bold ml-1.5" style={{ fontFamily: 'var(--font-mono)' }}>AI</span>
            </div>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.8 }}
            className="text-text-secondary text-lg leading-relaxed mb-6"
          >
            Businesses lose{' '}
            <span className="text-accent-amber font-bold glow-amber-text">1–3% of revenue</span>{' '}
            to wrong payment fees, marketplace overcharges, and missing refunds.
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2.5, duration: 0.8 }}
            className="text-text-primary text-2xl font-bold leading-snug mb-4"
          >
            SettleGuard is an AI agent that{' '}
            <span className="text-accent-green glow-green-text">finds the money,</span>{' '}
            <span className="text-accent-amber glow-amber-text">decides whether to act,</span>{' '}
            and{' '}
            <span className="text-accent-green glow-green-text">recovers it — autonomously.</span>
          </motion.p>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 4, duration: 0.8 }}
            className="text-text-muted text-sm mb-10"
          >
            No human intervention. The merchant wakes up to money in their account.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 5, duration: 0.8 }}
          >
            <motion.button
              onClick={startBootSequence}
              whileHover={{ scale: 1.05, boxShadow: '0 0 40px rgba(0,255,135,0.15)' }}
              whileTap={{ scale: 0.95 }}
              className="px-10 py-4 rounded-2xl font-bold text-lg tracking-wide cursor-pointer relative overflow-hidden group"
              style={{
                background: 'linear-gradient(135deg, rgba(0,255,135,0.2), rgba(0,204,106,0.06))',
                border: '1px solid rgba(0,255,135,0.4)',
                color: '#00ff87',
              }}
            >
              <span className="relative z-10 flex items-center gap-2">
                <Brain className="w-5 h-5" />
                DEPLOY AI AGENT
              </span>
              <motion.div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{ background: 'linear-gradient(135deg, rgba(0,255,135,0.3), rgba(0,204,106,0.1))' }}
              />
            </motion.button>
          </motion.div>
        </motion.div>
      </div>
    );
  }

  // ============ BOOT ============
  if (phase === 'boot') {
    return (
      <div className="fixed inset-0 bg-bg-primary flex items-center justify-center">
        <div className="w-full max-w-2xl px-8">
          <div className="glass-card-glow p-6 rounded-2xl">
            <div className="flex items-center gap-2 mb-4 pb-3 border-b border-border">
              <div className="w-3 h-3 rounded-full bg-accent-red opacity-60" />
              <div className="w-3 h-3 rounded-full bg-accent-amber opacity-60" />
              <div className="w-3 h-3 rounded-full bg-accent-green opacity-60" />
              <span className="text-text-muted text-xs ml-2" style={{ fontFamily: 'var(--font-mono)' }}>
                settleguard-ai-agent
              </span>
            </div>
            <div className="space-y-2 min-h-[280px]" style={{ fontFamily: 'var(--font-mono)' }}>
              <AnimatePresence>
                {bootLines.map((line, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.15 }}
                    className={`text-sm ${
                      line.includes('✓') ? 'text-accent-green'
                      : line.includes('AI AGENT ACTIVE') ? 'text-accent-green font-bold glow-green-text text-base'
                      : line.includes('Beginning') ? 'text-accent-amber'
                      : 'text-text-secondary'
                    }`}
                  >
                    {line}
                  </motion.div>
                ))}
              </AnimatePresence>
              {bootLines.length < BOOT_SEQUENCE.length && (
                <div className="inline-block w-2.5 h-4 bg-accent-green animate-pulse" />
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ============ LIVE AGENT VIEW ============
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="fixed inset-0 bg-bg-primary flex flex-col"
    >
      {/* Top bar — minimal */}
      <div className="px-6 py-3 flex items-center justify-between border-b border-border bg-bg-secondary/50">
        <div className="flex items-center gap-3">
          <Shield className="w-4 h-4 text-accent-green" />
          <span className="text-text-primary text-sm font-bold tracking-wide">SETTLEGUARD</span>
          <span className="text-accent-green text-sm font-bold" style={{ fontFamily: 'var(--font-mono)' }}>AI</span>
          <div className="h-4 w-px bg-border mx-1" />
          <div className="flex items-center gap-1.5">
            <div className="w-2 h-2 rounded-full bg-accent-green pulse-dot" />
            <span className="text-accent-green text-[10px] font-bold uppercase tracking-wider" style={{ fontFamily: 'var(--font-mono)' }}>
              Agent Active
            </span>
          </div>
        </div>
        <div className="flex items-center gap-5">
          <div className="flex items-center gap-1.5">
            <Zap className="w-3 h-3 text-text-muted" />
            <span className="text-text-muted text-[10px] uppercase tracking-wider" style={{ fontFamily: 'var(--font-mono)' }}>Claims</span>
            <span className="text-text-primary text-xs font-bold" style={{ fontFamily: 'var(--font-mono)' }}>{stats.claimsFiled}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Activity className="w-3 h-3 text-text-muted" />
            <span className="text-text-muted text-[10px] uppercase tracking-wider" style={{ fontFamily: 'var(--font-mono)' }}>Win Rate</span>
            <span className="text-accent-green text-xs font-bold" style={{ fontFamily: 'var(--font-mono)' }}>{stats.winRate}%</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-1.5 h-1.5 rounded-full bg-accent-green pulse-dot" />
            <span className="text-accent-green text-[10px] font-bold" style={{ fontFamily: 'var(--font-mono)' }}>LIVE</span>
          </div>
        </div>
      </div>

      {/* Main layout — Counter on top, Agent Log below. That's it. */}
      <div className="flex-1 flex flex-col overflow-hidden max-w-5xl mx-auto w-full">
        
        {/* Recovery Counter — massive, centered */}
        <div className={`py-6 px-6 border-b border-border flex-shrink-0 transition-all duration-700 ${recoveryFlash ? 'recovery-glow' : ''}`}>
          <RecoveryCounter
            baseAmount={INITIAL_STATS.totalRecovered}
            deltas={recoveryDeltas}
          />
        </div>

        {/* AI Agent Log — the entire experience */}
        <div className="flex-1 overflow-hidden">
          <LiveFeed events={events} />
        </div>
      </div>

      {/* Recovery flash overlay */}
      <AnimatePresence>
        {recoveryFlash && (
          <motion.div
            initial={{ opacity: 0.4 }}
            animate={{ opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 2 }}
            className="fixed inset-0 pointer-events-none z-50"
            style={{ background: 'radial-gradient(ellipse at center, rgba(0,255,135,0.1) 0%, transparent 60%)' }}
          />
        )}
      </AnimatePresence>
    </motion.div>
  );
}
