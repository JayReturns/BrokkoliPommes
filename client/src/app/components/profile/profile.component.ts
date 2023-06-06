import {Component, OnInit} from '@angular/core';
import {OrderService} from "../../services/order.service";
import {AuthService} from "../../services/auth.service";
import {Order} from "../../models/order.model";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  orders: Order[] | undefined;

  constructor(private orderService: OrderService, private authService: AuthService) {
  }

  ngOnInit() {
    this.authService.getCurrentUser().subscribe(user => {
      this.orderService.getOrdersForUser(user).subscribe(res => {
        this.orders = res
    })
    })
  }

  getPriceForOrder(order: Order): number {
    return order.orderPositions
      .map(x => x.article.price * x.quantity)
      .reduce((accu, curr) => accu + curr, 0);
  }

  getArticles(order: Order): string {
    return order.orderPositions
      .map(x => x.quantity + " x " + x.article.name)
      .reduce((accu, curr) => accu + ", " + curr, "")
      .substring(2)
  }

}
