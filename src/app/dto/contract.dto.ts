import { ContractStatus } from './types/status';

export interface ContractDTO {
  id: number;
  contractNumber: string;
  contractDate: Date;
  contractValue: number;
  clientId: number;
  status?: ContractStatus;
  canceled: boolean;
}
