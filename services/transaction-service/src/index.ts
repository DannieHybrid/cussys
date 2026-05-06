import { Transaction } from "../../../packages/types/transaction";
import { approveTransaction } from "../../approval-service/src";

const db: Record<string, Transaction> = {};

export function createTransaction(tx: Transaction) {
  tx.status = "PENDING_APPROVAL";
  tx.approvals = [];

  db[tx.id] = tx;

  return tx;
}

export function getTransaction(id: string) {
  return db[id];
}

export function processApproval(txId: string, userId: string) {
  const tx = db[txId];
  if (!tx) throw new Error("Transaction not found");

  const updated = approveTransaction(tx, userId);

  return updated;
}
