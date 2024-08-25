export interface UpdateContractDTO {
  canceled: boolean;
  contractNumber: string;
  contractDate: string;
  contractValue: number;
  clientId: number;
  payed: boolean;
}
