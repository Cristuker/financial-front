import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { ClientsService } from './clients.service';
import { ClientShowDTO } from '../../dto/clients/clients.show.dto';
import { ClientDTO } from '../../dto/clients/client.dto';
import {
  PoModalComponent,
  PoNotificationService,
  PoTableAction,
  PoTableRowTemplateArrowDirection,
} from '@po-ui/ng-components';
import { ContractService } from '../contracts/contracts.service';
import { ContractDTO } from '../../dto/contract/contract.dto';
import { formatDate } from '../../utils/formatDate';

@Component({
  selector: 'app-contracts',
  templateUrl: './clients.component.html',
  styleUrl: './clients.component.scss',
})
export class ClientsComponent implements OnInit {
  @ViewChild(PoModalComponent, { static: true }) poModal: PoModalComponent;

  poModalContract: PoModalComponent;
  @Output('openContract') openContract: EventEmitter<any> = new EventEmitter();
  @Output('openEditContract') openEditContract: EventEmitter<any> = new EventEmitter();
  @Input('refreshList') refreshList: any;

  clientsTableView: ClientShowDTO[] = [];
  detail: ContractDTO;
  contractToUpdate: ContractDTO;
  filteredItems: Array<any> = [];
  originalClientsFormat: ClientDTO[] = [];
  isHideLoading = true;
  menuSide: PoTableRowTemplateArrowDirection =
    PoTableRowTemplateArrowDirection.Right;
  filterSelect = [
    { label: 'Nome', value: ['name', 'Nome'] },
    { label: 'Status', value: ['status', 'Status'] },
    { label: 'CPF/CNPJ', value: ['cpfCnpj', 'CPF/CNPJ'] },
    { label: 'Telefone', value: ['phoneNumber', 'Telefone'] },
  ];
  actions: PoTableAction[] = [
    {
      label: 'Criar contrato',
      action: this.createContract.bind(this),
    },
    {
      label: 'Editar contrato',
      action: this.updateContract.bind(this),
      disabled: this.shouldShowDeleteContract.bind(this),
    },
    {
      label: 'Remover cliente',
      action: this.removeClient.bind(this),
      disabled: this.shouldShowDeleteContract.bind(this),
    },
    {
      label: 'Cancelar contrato',
      disabled: this.shouldShowDeleteContract.bind(this),
      action: this.cancelContract.bind(this),
    },
    {
      label: 'Visualizar detalhes do contrato',
      action: this.details.bind(this),
      disabled: this.shouldShowDeleteContract.bind(this),
    },
  ];
  constructor(
    private readonly clientService: ClientsService,
    private readonly poNotification: PoNotificationService,
    private readonly contractService: ContractService
  ) {}

  ngOnInit(): void {
    this.getClients();
  }

  async getClients() {
    this.isHideLoading = false;
    try {
      const response = await this.clientService.listClients();
      this.originalClientsFormat = response.clients;
      this.clientsTableView = this.organizeClientsToShow(response.clients);
      this.filteredItems = this.clientsTableView;
      this.isHideLoading = true;
    } catch (error) {
      this.poNotification.error('Erro ao buscar clientes!');
      console.error(error);
      this.isHideLoading = true;
    }
  }

  organizeClientsToShow(client: ClientDTO[]): ClientShowDTO[] {
    return client.map((client) => ({
      ID: client.id,
      Nome: client.name,
      'CPF/CNPJ': client.cpfCnpj,
      Telefone: client.phoneNumber,
      Status: client.contract?.status || 'Sem contrato',
    }));
  }

  filtered(event: Array<any>) {
    this.filteredItems = event;
  }

  createContract(contract: any) {
    this.openContract.emit(contract);
  }

  refresh() {
    this.getClients();
  }

  async removeClient(client: ClientShowDTO) {
    const clientWithContract = this.findContract(client.ID);

    if (clientWithContract) {
      try {
        await this.contractService.removeFromContract(clientWithContract?.id);
        this.poNotification.success('Cliente removido');
      } catch (error) {
        this.poNotification.success('Falha ao remover cliente');
        console.error(error);
      }
    }
  }

  shouldShowDeleteContract(client: ClientShowDTO) {
    const clientWithContract = this.findContract(client.ID);
    return clientWithContract?.contract === null;
  }

  async cancelContract(client: ClientShowDTO) {
    const clientWithContract = this.findContract(client.ID);
    if (clientWithContract) {
      try {
        await this.contractService.cancel(clientWithContract?.contract.id);
        this.poNotification.success('Cliente removido');
      } catch (error) {
        this.poNotification.success('Falha ao remover cliente');
        console.error(error);
      }
    }
  }

  haveContract(client: ClientShowDTO, index: number): boolean {
    return client.Status !== 'Sem contrato';
  }

  findContract(id: number): ClientDTO | undefined {
    return this.originalClientsFormat.find((c) => c.id === id);
  }

  details(clientShow: ClientShowDTO) {
    const client = this.findContract(clientShow.ID);

    if (client) {
      this.detail = client.contract;
      this.poModal.open();
    }
  }

  parseString(value: string | null | undefined | number): string {
    if (typeof value === 'number') {
      return String(value);
    }

    return value ? value : '';
  }

  formatDate(date: any) {
    return formatDate(date)
  }

  formatCurrency(value: any): string {
    const formatter = new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    });

    return formatter.format(Number(value));
  }

  updateContract(clientShow: ClientShowDTO) {
    const client = this.findContract(clientShow.ID);

    if (client) {
      this.contractToUpdate = client.contract;
      this.openEditContract.emit(this.contractToUpdate);
    }
  }
}
