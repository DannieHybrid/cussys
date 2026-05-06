import { Transaction } from "../../../packages/types/transaction";

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
