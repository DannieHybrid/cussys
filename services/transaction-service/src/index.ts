import { Transaction } from "../../../packages/types/transaction";
import { approveTransaction } from "../../approval-service/src";
import { signTransaction } from "../../key-service/src";

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

  approveTransaction(tx, userId);

  // 🔥 CORE LOGIC: trigger signing after quorum
  if (tx.status === "APPROVED") {
    const signedTx = signTransaction(tx);
    tx.status = "SIGNED";

    return signedTx;
  }

  return tx;
}
