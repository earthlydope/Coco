export type CaseStatus = 'New' | 'Discovery' | 'Proposal' | 'Contract' | 'Active' | 'Observation';

export interface Patient {
  id: string;
  name: string;
  email: string;
  phone: string;
  avatar?: string;
  treatmentType?: string;
}

export interface Case {
  id: string;
  patientId: string;
  patientName: string;
  status: CaseStatus;
  lastUpdated: string;
  totalValue: number;
  assignedTo: string;
  nextTask?: string;
  observationReason?: string;
  recallDate?: string;
  probability?: 'High' | 'Medium' | 'Low';
}

export interface FinancialPreset {
  name: string;
  minDownPercent: number;
  maxTermMonths: number;
  minMonthly: number;
  color: string;
}

export interface Proposal {
  treatmentCost: number;
  downPayment: number;
  termMonths: number;
  insuranceEstimate: number;
  discount: number;
  apr: number;
  isPayInFull: boolean;
  insuranceVerified: boolean;
}