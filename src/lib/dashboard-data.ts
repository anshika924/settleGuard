// Mock data for the merchant dashboard

export interface Claim {
  id: string;
  platform: string;
  platformColor: string;
  type: string;
  amount: number;
  status: 'recovered' | 'pending' | 'filed' | 'escalated' | 'rejected';
  filedDate: string;
  resolvedDate?: string;
  description: string;
  aiConfidence: number;
  aiReasoning: string;
}

export interface PlatformConnection {
  id: string;
  name: string;
  icon: string;
  color: string;
  bgColor: string;
  status: 'connected' | 'syncing' | 'disconnected';
  lastSync: string;
  totalTransactions: number;
  issuesFound: number;
  amountRecovered: number;
}

export interface DashboardStats {
  totalRecovered: number;
  totalRecoveredChange: number;
  activeClaims: number;
  activeClaimsChange: number;
  winRate: number;
  winRateChange: number;
  moneyAtRisk: number;
  moneyAtRiskChange: number;
  transactionsScanned: number;
  platformsConnected: number;
}

export interface RecoveryTimelineItem {
  id: string;
  date: string;
  amount: number;
  platform: string;
  platformColor: string;
  type: string;
}

export const DASHBOARD_STATS: DashboardStats = {
  totalRecovered: 481448,
  totalRecoveredChange: 12.4,
  activeClaims: 12,
  activeClaimsChange: -2,
  winRate: 73,
  winRateChange: 3.2,
  moneyAtRisk: 18750,
  moneyAtRiskChange: -8.5,
  transactionsScanned: 24892,
  platformsConnected: 5,
};

export const CLAIMS: Claim[] = [
  {
    id: 'ST-2026-4821',
    platform: 'Amazon',
    platformColor: '#FF9900',
    type: 'Commission Overcharge',
    amount: 2340,
    status: 'filed',
    filedDate: '2026-03-28',
    description: 'SKU "Premium Silk Kurta" miscategorized as Apparel (17%) instead of Ethnic Wear (12%)',
    aiConfidence: 94,
    aiReasoning: 'Product has embroidery + ethnic patterns → should be Ethnic Wear category. Historical win rate: 81%.',
  },
  {
    id: 'ST-2026-4760',
    platform: 'Amazon',
    platformColor: '#FF9900',
    type: 'Commission Correction',
    amount: 5240,
    status: 'recovered',
    filedDate: '2026-03-16',
    resolvedDate: '2026-03-28',
    description: '14 SKUs miscategorized under "Electronics Accessories" (18%) instead of "Mobile Accessories" (9%)',
    aiConfidence: 87,
    aiReasoning: 'Systematic pattern detected across 14 SKUs. Fee schedule mismatch confirmed. Approved on first pass.',
  },
  {
    id: 'FL-9982',
    platform: 'Flipkart',
    platformColor: '#F7E532',
    type: 'Return Fraud',
    amount: 3890,
    status: 'recovered',
    filedDate: '2026-03-06',
    resolvedDate: '2026-03-28',
    description: 'Customer returned wrong item (weight 380g vs original 1.2kg). Flipkart initially rejected claim.',
    aiConfidence: 92,
    aiReasoning: 'Weight mismatch evidence conclusive. Re-filed with weight data after initial rejection. Escalated to Grievance Officer on Day 15.',
  },
  {
    id: 'CD-2026-0871',
    platform: 'Shiprocket',
    platformColor: '#8B5CF6',
    type: 'Missing COD',
    amount: 4100,
    status: 'filed',
    filedDate: '2026-03-28',
    description: '2 delivered orders confirmed via POD but COD not remitted',
    aiConfidence: 99,
    aiReasoning: 'POD exists, weight scan matches, tracking confirmed. Evidence is conclusive — filed immediately.',
  },
  {
    id: 'RZ-2026-1122',
    platform: 'Razorpay',
    platformColor: '#528FF0',
    type: 'GST Overcharge',
    amount: 1890,
    status: 'escalated',
    filedDate: '2026-03-20',
    description: 'GST charged on payment gateway fee at 18% but merchant is in composition scheme (1%)',
    aiConfidence: 88,
    aiReasoning: 'GST registration details confirm composition scheme. Razorpay support ticket auto-created. Awaiting resolution.',
  },
  {
    id: 'CF-2026-0445',
    platform: 'Cashfree',
    platformColor: '#00D09C',
    type: 'Settlement Mismatch',
    amount: 3200,
    status: 'pending',
    filedDate: '2026-03-25',
    description: 'Settlement for 3 March orders not reflected in bank account after T+2 window',
    aiConfidence: 76,
    aiReasoning: 'Bank statement cross-referenced with Cashfree ledger. 3 transactions missing from settlement batch CF-2026-03-23.',
  },
  {
    id: 'FL-2026-1055',
    platform: 'Flipkart',
    platformColor: '#F7E532',
    type: 'Weight Dispute',
    amount: 2780,
    status: 'recovered',
    filedDate: '2026-03-10',
    resolvedDate: '2026-03-24',
    description: 'Flipkart charged shipping for 2.5kg but actual product weight is 800g per warehouse records',
    aiConfidence: 96,
    aiReasoning: 'Warehouse weight log + product listing weight both show 800g. Overcharge: ₹2,780 across 8 shipments.',
  },
  {
    id: 'AM-2026-0998',
    platform: 'Amazon',
    platformColor: '#FF9900',
    type: 'FBA Fee Error',
    amount: 6100,
    status: 'recovered',
    filedDate: '2026-03-01',
    resolvedDate: '2026-03-18',
    description: 'FBA fulfillment fee charged at "Standard" size tier but products qualify for "Small & Light"',
    aiConfidence: 91,
    aiReasoning: 'Product dimensions verified against Small & Light criteria. All 22 SKUs qualify. SAFE-T claim approved in 17 days.',
  },
  {
    id: 'RZ-2026-0887',
    platform: 'Razorpay',
    platformColor: '#528FF0',
    type: 'Duplicate Charge',
    amount: 1450,
    status: 'rejected',
    filedDate: '2026-03-15',
    resolvedDate: '2026-03-22',
    description: 'Suspected duplicate transaction fee on 2 refund operations',
    aiConfidence: 52,
    aiReasoning: 'Low confidence — the fee structure allows for refund processing charges. Razorpay confirmed charges are valid.',
  },
];

export const PLATFORMS: PlatformConnection[] = [
  {
    id: 'amazon',
    name: 'Amazon Seller Central',
    icon: '📦',
    color: '#FF9900',
    bgColor: 'rgba(255,153,0,0.08)',
    status: 'connected',
    lastSync: '2 minutes ago',
    totalTransactions: 8432,
    issuesFound: 23,
    amountRecovered: 187400,
  },
  {
    id: 'flipkart',
    name: 'Flipkart Seller Hub',
    icon: '🛒',
    color: '#F7E532',
    bgColor: 'rgba(247,229,50,0.06)',
    status: 'connected',
    lastSync: '5 minutes ago',
    totalTransactions: 5621,
    issuesFound: 14,
    amountRecovered: 92300,
  },
  {
    id: 'razorpay',
    name: 'Razorpay',
    icon: '💳',
    color: '#528FF0',
    bgColor: 'rgba(82,143,240,0.08)',
    status: 'connected',
    lastSync: '1 minute ago',
    totalTransactions: 12450,
    issuesFound: 8,
    amountRecovered: 45200,
  },
  {
    id: 'shiprocket',
    name: 'Shiprocket',
    icon: '🚚',
    color: '#8B5CF6',
    bgColor: 'rgba(139,92,246,0.08)',
    status: 'syncing',
    lastSync: 'Syncing now...',
    totalTransactions: 3200,
    issuesFound: 6,
    amountRecovered: 28100,
  },
  {
    id: 'cashfree',
    name: 'Cashfree Payments',
    icon: '🏦',
    color: '#00D09C',
    bgColor: 'rgba(0,208,156,0.08)',
    status: 'connected',
    lastSync: '12 minutes ago',
    totalTransactions: 4100,
    issuesFound: 3,
    amountRecovered: 12800,
  },
];

export const RECOVERY_TIMELINE: RecoveryTimelineItem[] = [
  { id: '1', date: 'Mar 28', amount: 5240, platform: 'Amazon', platformColor: '#FF9900', type: 'Commission Correction' },
  { id: '2', date: 'Mar 28', amount: 3890, platform: 'Flipkart', platformColor: '#F7E532', type: 'Return Fraud' },
  { id: '3', date: 'Mar 24', amount: 2780, platform: 'Flipkart', platformColor: '#F7E532', type: 'Weight Dispute' },
  { id: '4', date: 'Mar 22', amount: 1200, platform: 'Razorpay', platformColor: '#528FF0', type: 'Fee Correction' },
  { id: '5', date: 'Mar 18', amount: 6100, platform: 'Amazon', platformColor: '#FF9900', type: 'FBA Fee Error' },
  { id: '6', date: 'Mar 15', amount: 3400, platform: 'Shiprocket', platformColor: '#8B5CF6', type: 'COD Recovery' },
  { id: '7', date: 'Mar 12', amount: 4200, platform: 'Amazon', platformColor: '#FF9900', type: 'Commission' },
  { id: '8', date: 'Mar 08', amount: 1800, platform: 'Cashfree', platformColor: '#00D09C', type: 'Settlement' },
];
