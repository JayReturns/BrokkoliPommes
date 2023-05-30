import {Component, ElementRef} from '@angular/core';
import {AuthService} from "./services/auth.service";
import {MatDialog} from "@angular/material/dialog";
import {ShoppingCartComponent} from "./components/shopping-cart/shopping-cart.component";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(private authService: AuthService, private dialog: MatDialog) {
  }

  logout() {
    this.authService.logout();
  }

  openShoppingCart(evt: MouseEvent) {
    let target = new ElementRef(evt.currentTarget);
    this.dialog.open(ShoppingCartComponent, {
      position: {right: '0px', top: '0px'},
      data: { trigger: target }
    });
  }

  protected readonly open = open;
}
