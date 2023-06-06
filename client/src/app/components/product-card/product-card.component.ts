import {Component, Input, OnInit} from '@angular/core';
import {Article} from "../../models/article.model";
import {ShoppingCartService} from "../../services/shopping-cart.service";
import {MatSelectModule} from '@angular/material/select'
import {MatFormFieldModule} from "@angular/material/form-field";
import {CurrencyPipe, TitleCasePipe} from "@angular/common";
import {MatCardModule} from "@angular/material/card";
import {MatDividerModule} from "@angular/material/divider";
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";

@Component({
  selector: 'product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css'],
  /*imports: [MatFormFieldModule, MatSelectModule, TitleCasePipe, CurrencyPipe, MatCardModule, MatDividerModule, MatIconModule, MatButtonModule],
  standalone: true,*/

})
export class ProductCardComponent implements OnInit {

  @Input() article: Article | undefined;
  selected = 1
  imgSrc = "";

  constructor(private cartService: ShoppingCartService) {
  }

  ngOnInit() {
    if (this.article?.image)
      this.imgSrc = `data:image/jpeg;base64,${this.article.image}`;
  }

  addToCart() {
    this.cartService.addToShoppingCart(this.article!, this.selected!);
  }

  remove() {
    this.cartService.removeFromCart(this.article!);
  }

  isInCart() {
    return this.cartService.contains(this.article!)
  }

}



