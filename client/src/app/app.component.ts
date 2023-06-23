import {Component, ElementRef} from '@angular/core';
import {AuthService} from "./services/auth.service";
import {MatDialog} from "@angular/material/dialog";
import {ShoppingCartComponent} from "./components/shopping-cart/shopping-cart.component";
import {ShoppingCartService} from "./services/shopping-cart.service";
import {Router} from "@angular/router";
import { UserdataDialogComponent } from './components/userdata-dialog/userdata-dialog.component';
import {User} from "./models/user.model";
import {authGuard} from "./guards/auth.guard";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  currentuser: User | undefined;

  constructor(private authService: AuthService,
              private dialog: MatDialog,
              public cartService: ShoppingCartService,
              public router: Router) {
        //if (authService.isLoggedIn()) 
            this.authService.getCurrentUser().subscribe(user => this.currentuser = user);
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

  getFormattedItemCount() {
    const count = this.cartService.getItemCount();
    if (count <= 9)
      return count.toString();
    else
      return "9+"
  }

  edit_userdata() {
    const dialogRef = this.dialog.open(UserdataDialogComponent,{
        data: {
            user: this.currentuser
          }
  });

    dialogRef.afterClosed().subscribe(result => {
      if (!result)
        return;

      //this.userServie.editUser(result).subscribe(() => {})
  })
}

  protected readonly open = open;
  protected readonly alert = alert;
}
