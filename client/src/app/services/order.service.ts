import { Injectable } from '@angular/core';
import {MessageService} from "./message.service";
import {HttpClient} from "@angular/common/http";
import {catchError, Observable} from "rxjs";
import {environment} from "../../environments/environment.development";
import {Order} from "../models/order.model";
import {User} from "../models/user.model";

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  url = `${environment.baseApiUrl}/order`;

  constructor(private messageService: MessageService, private http: HttpClient) { }

  createOrder(order: Order, user: User): Observable<Order> {
    if (!user.id) {
      throw new Error('User has no id');
    }
    return this.http.post<Order>(`${this.url}/create/${user.id}`, order)
      .pipe(
        catchError(this.messageService.handleError<Order>('createOrder'))
      )
  }

  getOrdersForUser(user: User) {
    if (!user.id)
      throw new Error('User has no id');
    return this.http.get<Order[]>(`${this.url}/${user.id}`)
      .pipe(
        catchError(this.messageService.handleError<Order[]>('getOrdersForUser'))
      )
  }

}
