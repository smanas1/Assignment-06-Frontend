export interface User {
  _id: string;
  name: string;
  phone: string;
  role: "user" | "agent" | "admin";
  isBlocked: boolean;
  wallet: string;
  createdAt: string;
}

export type TransactionType =
  | "add"
  | "withdraw"
  | "send"
  | "receive"
  | "cash-in"
  | "cash-out"
  | "commission-earned"
  | "bill-payment"
  | "merchant-payment";

export interface Transaction {
  _id: string;
  type: TransactionType;
  amount: number;
  sender?: string;
  receiver?: string;
  wallet: string;
  description?: string;
  commission?: number;
  reference?: string;
  status: "pending" | "completed" | "failed" | "cancelled";
  createdAt: string;
  updatedAt: string;
}

export interface Wallet {
  _id: string;
  owner: string;
  balance: number;
  isActive: boolean;
  frozen: boolean;
  dailyLimit: number;
  monthlyLimit: number;
  createdAt: string;
  updatedAt: string;
}
