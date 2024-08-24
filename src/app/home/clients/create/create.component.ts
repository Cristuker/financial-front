import { Component, ViewChild } from '@angular/core';
import {
  PoDynamicFormField,
  PoModalComponent,
  PoNotificationService,
} from '@po-ui/ng-components';
import { ClientsService } from '../clients.service';

@Component({
  selector: 'app-create-client',
  templateUrl: './create.component.html',
  styleUrl: './create.component.scss',
})
export class CreateComponent {
  @ViewChild(PoModalComponent, { static: true }) poModal: PoModalComponent;

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
    private readonly clientsService: ClientsService,
    private poNotification: PoNotificationService
  ) {}

  async submit() {
    try {
      await this.clientsService.createClient(this.client);
      this.poNotification.success('Cliente cadastrado com sucesso!');
    } catch (error) {
      console.error(error);
      this.poNotification.error('Erro ao cadastrar cliente!');
    }
    this.closeModal();
  }

  formReset() {
    this.client = {
      name: '',
      cpfCnpj: '',
      phoneNumber: '',
    };
  }
  closeModal() {
    this.formReset();
    this.poModal.close();
  }
}
