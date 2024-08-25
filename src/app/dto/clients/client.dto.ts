import { ContractDTO } from "../contract/contract.dto";

export interface ClientDTO {
  id: number;
  name: string;
  cpfCnpj: string;
  phoneNumber: string;
  contract: ContractDTO;
}
