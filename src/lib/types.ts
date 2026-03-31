// Types for the AI recovery agent
export type EventStatus = 'thinking' | 'scanning' | 'analyzing' | 'alert' | 'deciding' | 'acting' | 'recovered';

export type EventSource = 'razorpay' | 'amazon' | 'flipkart' | 'shiprocket' | 'cashfree' | 'payu' | 'bank';

export interface AgentThought {
  text: string;
  type: 'observation' | 'reasoning' | 'decision' | 'action' | 'result';
  confidence?: number;
}

export interface RecoveryEvent {
  id: string;
  timestamp: Date;
  status: EventStatus;
  source: EventSource;
  title: string;
  thoughts: AgentThought[];
  recoveryAmount?: number;
  claimId?: string;
}

export interface AgentStats {
  totalRecovered: number;
  claimsFiled: number;
  winRate: number;
  activeClaims: number;
}
