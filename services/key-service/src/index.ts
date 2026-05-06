import { Transaction } from "../../../packages/types/transaction";

export function signTransaction(tx: Transaction) {
  return {
    ...tx,
    signature: "mock-signature-" + Date.now(),
  };
}
