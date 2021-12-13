import { TransactionPayload } from 'src/app/services/transaction/interfaces/transaction';

export interface DeleteTransactionAction {
  id: string;
  type: string;
}

export interface AddTransactionAction {
  type: string;
  transactionPayload: TransactionPayload;
}

export interface UpdateTransactionAction {
  id: string;
  type: string;
  transaction: TransactionPayload;
}
