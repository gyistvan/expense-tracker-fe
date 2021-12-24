export interface Income {
  amount: number;
  whose: string;
  _id: string;
  createdAt: string;
  comment?: string;
  spentAt?: string;
  __v: number;
}

export interface IncomePayload {
  amount: number;
  whose: string;
  comment: string;
  spentAt: string;
}

export interface IncomeResponse {
  error: boolean;
  message: string;
  income: Income;
}
