export interface Wallet {
  id: string;
  address: string;
  chain: "EVM" | "SOLANA";
  createdAt: Date;
}
