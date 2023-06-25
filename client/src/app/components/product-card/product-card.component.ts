import {Component, Input, OnInit} from '@angular/core';
import {Article} from "../../models/article.model";
import {ShoppingCartService} from "../../services/shopping-cart.service";

@Component({
  selector: 'product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
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



