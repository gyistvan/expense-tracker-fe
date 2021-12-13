import { IncomePayload } from 'src/app/services/incomes/interfaces/income';

export interface DeleteIncomeAction {
  id: string;
  type: string;
}

export interface AddIncomeAction {
  type: string;
  IncomePayload: IncomePayload;
}

export interface UpdateIncomeAction {
  id: string;
  type: string;
  Income: IncomePayload;
}
