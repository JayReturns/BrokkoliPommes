import {Component, ElementRef, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogConfig, MatDialogRef} from "@angular/material/dialog";
import {Article} from "../../models/article.model";
import {ShoppingCartService} from "../../services/shopping-cart.service";
import {OrderService} from "../../services/order.service";
import {Order} from "../../models/order.model";
import {User} from "../../models/user.model";
import {AuthService} from "../../services/auth.service";
import {OrderPosition} from "../../models/orderposition.model";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {

  private readonly triggerElementRef: ElementRef;

  shoppingCart: Article[] = [];
  totalCost = 0.0;
  currentUser: User | undefined;

  constructor(private dialogRef: MatDialogRef<ShoppingCartComponent>, @Inject(MAT_DIALOG_DATA) data: {trigger: ElementRef},
              private cartService: ShoppingCartService, private orderService: OrderService,
              private authService: AuthService, private snackbar: MatSnackBar) {
    this.triggerElementRef = data.trigger;
    this.authService.getCurrentUser().subscribe(user => this.currentUser = user)
  }

  ngOnInit() {
    const matDialogConfig: MatDialogConfig = new MatDialogConfig();
    const rect = this.triggerElementRef.nativeElement.getBoundingClientRect();
    matDialogConfig.position = { left: `${rect.left - 250}px`, top: `${rect.bottom}px` };
    matDialogConfig.width = '300px';
    // matDialogConfig.height = '400px';
    this.dialogRef.updateSize(matDialogConfig.width, matDialogConfig.height);
    this.dialogRef.updatePosition(matDialogConfig.position);

    this.shoppingCart = this.cartService.getShoppingCartItems();
    this.totalCost = this.cartService.getShoppingCartItems().map(x => x.price)
      .reduce((accu, curr) => accu + curr, 0)
  }
  cancel(): void {
    this.dialogRef.close(null);
  }

  clearCart() {
    this.shoppingCart = this.cartService.clearShoppingCart();
  }

  checkout() {
    let order: Order = {
      user: this.currentUser!,
      date: new Date(), // new Date() = now
      orderPositions: this.shoppingCart.map(article => {
        let pos: OrderPosition = {
          article: article,
          quantity: 1
        }
        return pos
      })
    };
    console.log(order);
    this.orderService.createOrder(order, this.currentUser!).subscribe(order => {
      console.log(order);
      this.clearCart();
      this.snackbar.open("Erfolgreich gekauft!", "OK", {duration: 3000});
      this.cancel();
    })
  }

}
