import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { User } from "../dto/user/user.dto";
import { environment } from "../../environment/environment";
import { CreateUser } from "../dto/user/create.user.dto";
import { Observable } from "rxjs";

@Injectable()
export class SignUpService {
    constructor(private readonly http: HttpClient) {
    }

    signup(user: CreateUser): Observable<User> {
        const payload = {
            email: user.email,
            name: user.name,
            password: user.password
        };

        return this.http.post<User>(`${environment.API_URL}/user`, payload);
    }
}