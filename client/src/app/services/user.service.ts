import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {User} from "../models/user.model";
import {environment} from "../../environments/environment.development";
import {MessageService} from "./message.service";
import {catchError} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  url = `${environment.baseApiUrl}/user`;

  constructor( private http: HttpClient, private messageService: MessageService) { }

  registerUser(user: User) {
    return this.http.post<User>(`${this.url}/register`, user)
      .pipe(
        catchError(this.messageService.handleError<User>('registerUser'))
      )
  }

}
