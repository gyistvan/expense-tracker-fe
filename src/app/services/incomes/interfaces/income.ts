export interface Income {
  amount: number;
  whose: string;
  _id: string;
  createdAt: string;
  comment?: string;
  recievedAt?: string;
  __v: number;
}

export interface IncomePayload {
  amount: number;
  whose: string;
  comment: string;
  recievedAt: string;
}

export interface IncomeResponse {
  error: boolean;
  message: string;
  income: Income;
}
