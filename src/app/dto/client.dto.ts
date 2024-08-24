import { ContractDTO } from "./contract.dto";

export interface ClientDTO {
  id: number;
  name: string;
  cpfCnpj: string;
  phoneNumber: string;
  contracts: ContractDTO[];
}
