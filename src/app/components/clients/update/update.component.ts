import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import {
  PoDynamicFormField,
  PoModalComponent,
  PoNotificationService,
} from '@po-ui/ng-components';
import { ClientsService } from '../clients.service';
import { UpdateClientDTO } from '../../../dto/clients/update.client.dto';

@Component({
  selector: 'app-update-client',
  templateUrl: './update.component.html',
  styleUrl: './update.component.scss',
})
export class UpdateClientComponent implements OnChanges {
  @ViewChild(PoModalComponent, { static: true }) poModal: PoModalComponent;
  @Input('clientToUpdate') clientToUpdate: any;
  @Output('refreshList') refreshList = new EventEmitter();

  fields: Array<PoDynamicFormField> = [
    {
      property: 'name',
      required: true,
      label: 'Nome',
      placeholder: 'Digite o seu nome',
      gridColumns: 6,
      gridSmColumns: 12,
      order: 1,
    },
    {
      property: 'cpfCnpj',
      required: true,
      label: 'CPF/CNPJ',
      placeholder: 'Digite o seu CPF/CNPJ',
      gridColumns: 6,
      gridSmColumns: 12,
      order: 2,
    },
    {
      property: 'phoneNumber',
      required: true,
      label: 'Telefone',
      placeholder: 'Digite o seu telefone',
      mask: '(99) 99999-9999',
      gridColumns: 6,
      gridSmColumns: 12,
      order: 3,
    },
  ];
  client = {
    name: '',
    cpfCnpj: '',
    phoneNumber: '',
  };

  constructor(
    private readonly poNotification: PoNotificationService,
    private readonly clientService: ClientsService
  ) {}

  ngOnChanges(changes: SimpleChanges): void {
    this.client = changes['clientToUpdate'].currentValue;
    if (!this.client) return;
    this.poModal.open();
  }

  async submit() {
    try {
      const payload: UpdateClientDTO = {
        name: this.client.name,
        cpfCnpj: this.client.cpfCnpj,
        phoneNumber: this.client.phoneNumber,
      };
      await this.clientService.update(this.clientToUpdate.id, payload);
      this.poNotification.success('Cliente atualizado');
      this.poModal.close();
    } catch (error) {
      this.poNotification.error('Erro ao atualizar o cliente');
      this.poModal.close();
      console.error(error);
    }
    this.refreshList.emit();
  }
}
