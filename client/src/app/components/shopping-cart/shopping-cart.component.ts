import {Component, ElementRef, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogConfig, MatDialogRef} from "@angular/material/dialog";
import {Article} from "../../models/article.model";
import {ShoppingCartService} from "../../services/shopping-cart.service";

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {

  private readonly triggerElementRef: ElementRef;

  shoppingCart: Article[] = [];

  constructor(private dialogRef: MatDialogRef<ShoppingCartComponent>, @Inject(MAT_DIALOG_DATA) data: {trigger: ElementRef},
              private cartService: ShoppingCartService) {
    this.triggerElementRef = data.trigger;
  }

  ngOnInit() {
    const matDialogConfig: MatDialogConfig = new MatDialogConfig();
    const rect = this.triggerElementRef.nativeElement.getBoundingClientRect();
    matDialogConfig.position = { left: `${rect.left - 250}px`, top: `${rect.bottom}px` };
    matDialogConfig.width = '300px';
    matDialogConfig.height = '400px';
    this.dialogRef.updateSize(matDialogConfig.width, matDialogConfig.height);
    this.dialogRef.updatePosition(matDialogConfig.position);

    this.shoppingCart = this.cartService.getShoppingCartItems();
  }
  cancel(): void {
    this.dialogRef.close(null);
  }

}
