import { Component, OnInit } from '@angular/core';
import { ClientsService } from './clients.service';
import { ClientShowDTO } from '../../dto/clients/clients.show.dto';
import { ClientDTO } from '../../dto/clients/client.dto';
import { PoNotificationService } from '@po-ui/ng-components';

@Component({
  selector: 'app-contracts',
  templateUrl: './clients.component.html',
  styleUrl: './clients.component.scss',
})
export class ClientsComponent implements OnInit {
  search = '';
  clientsTableView: ClientShowDTO[] = [];
  filteredItems: ClientShowDTO[] = [];
  isHideLoading = true;
  constructor(
    private readonly clientService: ClientsService,
    private readonly poNotification: PoNotificationService
  ) {}

  ngOnInit(): void {
    this.getClients();
  }

  async getClients() {
    this.isHideLoading = false;
    try {
      const response = await this.clientService.listClients(this.search);
      this.clientsTableView = this.organizeClientsToShow(response.clients);
      this.filteredItems = this.clientsTableView;
      this.isHideLoading = true;
    } catch (error) {
      this.poNotification.error('Erro ao buscar clientes!');
      console.error(error);
      this.isHideLoading = true;
    }
  }

  organizeClientsToShow(contract: ClientDTO[]): ClientShowDTO[] {
    return contract.map((contract) => ({
      ID: contract.id,
      Nome: contract.name,
      'CPF/CNPJ': contract.cpfCnpj,
      Telefone: contract.phoneNumber,
      Contratos: contract.contracts,
    }));
  }

  changeModel(name: string) {
    const result = this.clientsTableView.filter((client) => client.Nome.toLocaleLowerCase().includes(name.toLocaleLowerCase()));
    this.filteredItems = result;
  }
}
