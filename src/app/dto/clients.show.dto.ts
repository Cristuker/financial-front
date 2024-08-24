import { ContractDTO } from "./contract.dto";

export interface ClientShowDTO {
    ID: number;
    Nome: string;
    "CPF/CNPJ": string;
    "Telefone": string;
    Contratos: ContractDTO[];
}