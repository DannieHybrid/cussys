export type TransactionStatus = "PENDING_APPROVAL" | "APPROVED" | "SIGNED";

export interface Transaction {
  id: string;
  from: string;
  to: string;
  amount: number;
  status: TransactionStatus;
  approvals: string[];
  signature?: string;
}
