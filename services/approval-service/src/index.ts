import { Transaction } from "../../../packages/types/transaction";

const REQUIRED_APPROVALS = 2;

export function approveTransaction(tx: Transaction, userId: string) {
  if (!tx.approvals.includes(userId)) {
    tx.approvals.push(userId);
  }

  // 🔥 IMPORTANT: set status when threshold is met
  if (tx.approvals.length >= REQUIRED_APPROVALS) {
    tx.status = "APPROVED";
  }

  return tx;
}
