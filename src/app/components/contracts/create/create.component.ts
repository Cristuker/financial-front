import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { PoModalComponent, PoDynamicFormField } from '@po-ui/ng-components';
import { ContractService } from '../contracts.service';

@Component({
  selector: 'app-create-contract',
  templateUrl: './create.component.html',
  styleUrl: './create.component.scss',
})
export class CreateContractsComponent implements OnInit {
  @ViewChild(PoModalComponent, { static: true }) poModal: PoModalComponent;
  @Input('openContract') openContract: EventEmitter<any> = new EventEmitter();
  @Output('refreshList') refreshList: EventEmitter<any> = new EventEmitter();

  contract = {
    contractNumber: '',
    contractDate: '',
    contractValue: 0,
    clientId: 0,
  };
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
      required: true,
      label: 'Data do contrato',
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

  constructor(private contractService: ContractService) {}

  ngOnInit(): void {
    this.openContract.subscribe((event: any) => {
      this.contract.clientId = event['ID'];
      this.poModal.open()
    });
  }

  async submit() {
    await this.contractService.createContract(this.contract);
    this.refreshList.emit(null);
    this.poModal.close();
  }
}
