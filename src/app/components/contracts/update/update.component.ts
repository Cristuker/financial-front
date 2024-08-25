import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { ContractDTO } from '../../../dto/contract/contract.dto';
import { PoDynamicFormField, PoModalComponent, PoNotificationService } from '@po-ui/ng-components';
import { ContractService } from '../contracts.service';
import { UpdateContractDTO } from '../../../dto/contract/update.contract.dto';
import { formatDate } from '../../../utils/formatDate';

@Component({
  selector: 'app-contract-update',
  templateUrl: './update.component.html',
  styleUrl: './update.component.scss',
})
export class UpdateContractComponent implements OnInit, OnChanges {
  @ViewChild(PoModalComponent, { static: true }) poModal: PoModalComponent;
  @Input('contractToUpdate') contractToUpdate: any;
  contract: ContractDTO;
  fields: Array<PoDynamicFormField> = [
    {
      property: 'contractNumber',
      required: true,
      label: 'Número do contrato',
      placeholder: 'Digite o número do contrato',
      gridColumns: 6,
      gridSmColumns: 12,
      order: 1,
    },
    {
      property: 'contractDate',
      label: 'Nova data do contrato',
      gridColumns: 6,
      gridSmColumns: 12,
      order: 2,
      format: 'dd/mm/yyyy',
      type: 'date',
    },
    {
      property: 'contractValue',
      required: true,
      label: 'Valor do contrato',
      placeholder: 'Digite o valor do contrato',
      gridColumns: 6,
      gridSmColumns: 12,
      order: 3,
      type: 'currency',
      decimalsLength: 2,
    },
  ];
  constructor(private readonly poNotification: PoNotificationService, private readonly contractService: ContractService) {}

  ngOnInit(): void {}

  ngOnChanges(changes: any): void {
    this.contract = changes.contractToUpdate.currentValue;
    if (!this.contract) return;
    this.contract.contractDate = new Date(this.contract.contractDate);
    this.poModal.open();
  }

  async submit() {
    try {
      console.log(this.contract)
      const payload: UpdateContractDTO = {
        canceled: this.contract.canceled,
        contractDate: new Date(this.contract.contractDate).toISOString(),
        clientId: this.contract.clientId,
        contractNumber: this.contract.contractNumber,
        contractValue: Number(this.contract.contractValue),
        payed: this.contract.payed,
      }
      await this.contractService.update(this.contract.id, payload);
      this.poNotification.success('Contrato atualizado');
      this.poModal.close();
    } catch (error) {
      this.poNotification.error('Erro ao atualizar o contrato');
      this.poModal.close();
      console.error(error);
    }
  }

  formatDate(date: any) {
    return formatDate(date)
  }
}
