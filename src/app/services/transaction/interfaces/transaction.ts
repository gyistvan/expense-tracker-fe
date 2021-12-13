export interface Transaction {
  _id: string;
  amount: number;
  type: string;
  usedFor: string;
  spentAt: string;
  createdAt: string;
  isPaid: boolean;
  comment?: string;
  __v: number;
}

export interface TransactionPayload {
  amount: number;
  type: string;
  usedFor: string;
  spentAt?: string;
  isPaid: boolean;
  comment?: string;
}
