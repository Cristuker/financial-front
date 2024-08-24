import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environment/environment';
import { ClientDTO } from '../../dto/clients/client.dto';
import { lastValueFrom } from 'rxjs';
import { PoStorageService } from '@po-ui/ng-storage';
import { CreateClientDTO } from '../../dto/clients/create.client.dto';
type Response = { clients: ClientDTO[] };

@Injectable()
export class ClientsService {
  constructor(
    private readonly http: HttpClient,
    private storage: PoStorageService
  ) {}

  async listClients(name = ''): Promise<Response> {
    const headers = await this.generateHeaders();

    return await lastValueFrom(
      this.http.get<Response>(
        `${environment.API_URL}/client?page=1&size=10name=${name}`,

        {
          headers: headers,
        }
      )
    );
  }

  async createClient(client: CreateClientDTO): Promise<void> {
    const headers = await this.generateHeaders();
    await lastValueFrom(
      this.http.post<void>(`${environment.API_URL}/client`, client, {
        headers: headers
      })
    );
  }

  async generateHeaders() {
    const token = await this.storage.get('token');
    return { Authorization: `Bearer ${token}` };
  }
}
