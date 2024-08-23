import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { PoStorageService } from '@po-ui/ng-storage';

import { environment } from '../../environment/environment';
import { LoginDTO } from '../dto/login.dto';
import { Observable } from 'rxjs';

@Injectable()
export class LoginService   {

  constructor(private readonly http: HttpClient, private storage: PoStorageService) {
  }
  

  login(email: string, password: string): Observable<LoginDTO> {
    return this.http.post<LoginDTO>(`${environment.API_URL}/auth/login`, {
      email,
      password
    })
  }

  isLoggedIn(): Promise<any> {
    return this.storage.get('isLoggedIn');
  }

}
