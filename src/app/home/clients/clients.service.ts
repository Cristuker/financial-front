import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environment/environment';
import { ClientDTO } from '../../dto/client.dto';
import { lastValueFrom, Observable } from 'rxjs';
import { PoStorageService } from '@po-ui/ng-storage';
type Response = { clients: ClientDTO[] };

@Injectable()
export class ClientsService {
  constructor(
    private readonly http: HttpClient,
    private storage: PoStorageService
  ) {}
  async listClients(name = ''): Promise<Response> {
    const token = await this.storage.get('token');
    const headers = { Authorization: `Bearer ${token}` };

    return await lastValueFrom(
      this.http.get<Response>(
        `${environment.API_URL}/client?page=1&size=10name=${name}`,

        {
          headers: headers,
        }
      )
    );
  }
}
