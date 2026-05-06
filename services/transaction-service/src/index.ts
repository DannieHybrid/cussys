import { Transaction } from "../../../packages/types/transaction";
import { approveTransaction } from "../../approval-service/src";
import { signTransaction } from "../../key-service/src";
import { logEvent } from "../../audit-service/src";

const db: Record<string, Transaction> = {};

export function createTransaction(tx: Transaction) {
  tx.status = "PENDING_APPROVAL";
  tx.approvals = [];

  db[tx.id] = tx;

  logEvent("TX_CREATED", { txId: tx.id });

  return tx;
}

export function getTransaction(id: string) {
  return db[id];
}

export function processApproval(txId: string, userId: string) {
  const tx = db[txId];
  if (!tx) throw new Error("Transaction not found");

  approveTransaction(tx, userId);
  logEvent("TX_APPROVED", { txId: tx.id, userId });

  if (tx.status === "APPROVED") {
    const signedTx = signTransaction(tx);
    tx.status = "SIGNED";

    logEvent("TX_SIGNED", { txId: tx.id });

    return signedTx;
  }

  return tx;
}
