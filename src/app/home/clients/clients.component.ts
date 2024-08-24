import { Component, OnInit } from '@angular/core';
import { ContractDTO } from '../../dto/contract.dto';
import { ContractShowDTO } from '../../dto/contracto.show.dto';
import { ClientsService } from './clients.service';
import { ClientShowDTO } from '../../dto/clients.show.dto';
import { ClientDTO } from '../../dto/client.dto';

@Component({
  selector: 'app-contracts',
  templateUrl: './clients.component.html',
  styleUrl: './clients.component.scss'
})
export class ClientsComponent implements OnInit {

  search = '';
  clientsTableView: ClientShowDTO[] = [];
  constructor(private readonly clientService: ClientsService) {}


  ngOnInit(): void {
    this.getClients();

    
    // Colocar loading

    //buscar contratos na API

    // Organizar objeto para mostrar e guardar original

  }

  async getClients() {
    const response = await this.clientService.listClients(this.search)
    this.clientsTableView = this.organizeClientsToShow(response.clients);
  }

  organizeClientsToShow(contract: ClientDTO[]): ClientShowDTO[] {
    return contract.map(contract => ({
      ID: contract.id,
      Nome: contract.name,
      "CPF/CNPJ": contract.cpfCnpj,
      "Telefone": contract.phoneNumber,
      Contratos: contract.contracts
    }))
  }
}
