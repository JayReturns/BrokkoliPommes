import {Component, Input} from '@angular/core';
import {Article} from "../../models/article.model";
import {ShoppingCartService} from "../../services/shopping-cart.service";

@Component({
  selector: 'product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent {

  @Input() article: Article | undefined;

  constructor(private cartService: ShoppingCartService) {
  }

  addToCart() {
    this.cartService.addToShoppingCart(this.article!);
  }

  isInCart() {
    return this.cartService.contains(this.article!)
  }

}
