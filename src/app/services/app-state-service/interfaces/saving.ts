export interface Saving {
  amount: number;
  appliedMonth: string;
  _id: string;
  __v: number;
}

export interface SavingPayload {
  amount: number;
  appliedMonth: string;
}

export interface SavingResponse {
  message: string;
  error: boolean;
  saving: Saving;
}
