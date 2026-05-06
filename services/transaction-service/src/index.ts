import { Transaction } from "../../../packages/types/transaction";
import { signTransaction } from "../../key-service/src";
import { logEvent } from "../../audit-service/src";

const db: Record<string, Transaction> = {};

export function createTransaction(tx: Transaction) {
  const newTx: Transaction = {
    ...tx,
    status: "PENDING_APPROVAL",
    approvals: [],
  };

  db[newTx.id] = newTx;

  logEvent("TX_CREATED", { txId: newTx.id });

  return newTx;
}

export function getTransaction(id: string) {
  return db[id];
}

export function processApproval(txId: string, userId: string) {
  const tx = db[txId];
  if (!tx) throw new Error("Transaction not found");

  // ensure no duplicates
  tx.approvals = tx.approvals ?? [];

  if (!tx.approvals.includes(userId)) {
    tx.approvals.push(userId);
  }

  logEvent("TX_APPROVAL_ADDED", {
    txId,
    userId,
    approvals: tx.approvals,
  });

  // 🔥 FORCE EVALUATION (no hidden state dependency)
  const APPROVAL_THRESHOLD = 2;

  const approvalCount = tx.approvals.length;

  if (approvalCount >= APPROVAL_THRESHOLD && tx.status !== "SIGNED") {
    tx.status = "APPROVED";

    const signed = signTransaction(tx);

    tx.status = "SIGNED";
    tx.signature = signed.signature;

    logEvent("TX_SIGNED", {
      txId,
      signature: tx.signature,
    });

    return tx;
  }

  return tx;
}
