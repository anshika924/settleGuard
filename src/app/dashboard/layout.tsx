'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { Shield, LayoutDashboard, FileText, Plug, Zap, Settings, Brain, LogOut } from 'lucide-react';

const NAV_ITEMS = [
  { href: '/dashboard', label: 'Overview', icon: LayoutDashboard },
  { href: '/dashboard/claims', label: 'Claims', icon: FileText },
  { href: '/dashboard/platforms', label: 'Platforms', icon: Plug },
];

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="fixed inset-0 bg-bg-primary flex">
      {/* Sidebar */}
      <aside className="w-[240px] flex-shrink-0 border-r border-border bg-bg-secondary/50 flex flex-col">
        {/* Logo */}
        <div className="px-5 py-5 border-b border-border">
          <Link href="/" className="flex items-center gap-2.5 no-underline">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: 'linear-gradient(135deg, rgba(0,255,135,0.15), rgba(0,255,135,0.05))', border: '1px solid rgba(0,255,135,0.3)' }}>
              <Shield className="w-4 h-4 text-accent-green" />
            </div>
            <div className="flex items-baseline gap-1">
              <span className="text-text-primary text-sm font-bold tracking-wide">SETTLEGUARD</span>
              <span className="text-accent-green text-xs font-bold" style={{ fontFamily: 'var(--font-mono)' }}>AI</span>
            </div>
          </Link>
        </div>

        {/* Agent status */}
        <div className="px-5 py-3">
          <div className="flex items-center gap-2 px-3 py-2 rounded-lg" style={{ background: 'rgba(0,255,135,0.04)', border: '1px solid rgba(0,255,135,0.1)' }}>
            <div className="w-2 h-2 rounded-full bg-accent-green pulse-dot" />
            <span className="text-accent-green text-[11px] font-bold uppercase tracking-wider" style={{ fontFamily: 'var(--font-mono)' }}>Agent Active</span>
          </div>
        </div>

        {/* Nav items */}
        <nav className="flex-1 px-3 py-2">
          <p className="text-text-muted text-[10px] font-semibold uppercase tracking-wider px-3 mb-2" style={{ fontFamily: 'var(--font-mono)' }}>Menu</p>
          {NAV_ITEMS.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                className="flex items-center gap-3 px-3 py-2.5 rounded-lg mb-0.5 no-underline transition-all duration-200"
                style={{
                  background: isActive ? 'rgba(0,255,135,0.06)' : 'transparent',
                  color: isActive ? '#00ff87' : '#8b919e',
                  border: isActive ? '1px solid rgba(0,255,135,0.12)' : '1px solid transparent',
                }}
              >
                <Icon className="w-4 h-4" />
                <span className="text-sm font-medium">{item.label}</span>
              </Link>
            );
          })}

          <div className="h-px bg-border my-4 mx-3" />

          <p className="text-text-muted text-[10px] font-semibold uppercase tracking-wider px-3 mb-2" style={{ fontFamily: 'var(--font-mono)' }}>System</p>
          <Link
            href="/"
            className="flex items-center gap-3 px-3 py-2.5 rounded-lg mb-0.5 no-underline transition-all duration-200 text-text-secondary hover:text-text-primary"
          >
            <Brain className="w-4 h-4" />
            <span className="text-sm font-medium">Live Agent View</span>
          </Link>
        </nav>

        {/* Bottom */}
        <div className="px-5 py-4 border-t border-border">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold" style={{ background: 'rgba(139,92,246,0.15)', color: '#8B5CF6', border: '1px solid rgba(139,92,246,0.2)' }}>
              AS
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-text-primary text-sm font-medium truncate m-0">Anshika&apos;s Store</p>
              <p className="text-text-muted text-[10px] m-0" style={{ fontFamily: 'var(--font-mono)' }}>Pro Plan</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 overflow-y-auto">
        {children}
      </main>
    </div>
  );
}
