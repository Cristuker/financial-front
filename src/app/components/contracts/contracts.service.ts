import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environment/environment';
import { CreateContractDTO } from '../../dto/contract/create.contract.dto';
import { PoStorageService } from '@po-ui/ng-storage';
import { lastValueFrom } from 'rxjs';
import { UpdateContractDTO } from '../../dto/contract/update.contract.dto';

@Injectable()
export class ContractService {
  constructor(private readonly http: HttpClient, private readonly storage: PoStorageService) {}

  async createContract(payload: CreateContractDTO) {
    const headers = await this.generateHeaders();
    await lastValueFrom(this.http.post(`${environment.API_URL}/contract`, payload, {
      headers: headers
    }));
  }

  async generateHeaders() {
    const token = await this.storage.get('token');
    return { Authorization: `Bearer ${token}` };
  }

  async pay(id: number) {
    const headers = await this.generateHeaders();
    await lastValueFrom(this.http.patch(`${environment.API_URL}/contract/${id}/pay`,null, {
      headers: headers
    }));
  }

  async cancel(id: number) {
    const headers = await this.generateHeaders();
    await lastValueFrom(this.http.patch(`${environment.API_URL}/contract/${id}/cancel`,null, {
      headers: headers
    }));
  }

  async removeFromContract(id: number) {
    const headers = await this.generateHeaders();
    await lastValueFrom(this.http.patch(`${environment.API_URL}/contract/${id}/remove`,null, {
      headers: headers
    }));
  }

  async update(id: number, contract: UpdateContractDTO) {
    const headers = await this.generateHeaders();
    await lastValueFrom(this.http.put(`${environment.API_URL}/contract/${id}`, contract, {
      headers: headers
    }));
  }
}
