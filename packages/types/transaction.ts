export type TransactionStatus =
  | "CREATED"
  | "PENDING_APPROVAL"
  | "APPROVED"
  | "SIGNED"
  | "BROADCASTED";

export interface Transaction {
  id: string;
  from: string;
  to: string;
  amount: number;
  chain: "EVM" | "SOLANA";
  status: TransactionStatus;
  approvals: string[];
  createdAt: Date;
}
