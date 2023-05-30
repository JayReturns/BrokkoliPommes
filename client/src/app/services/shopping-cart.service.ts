import { Injectable } from '@angular/core';
import {Article} from "../models/article.model";

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {

  shoppingCart: Article[] = [];

  constructor() { }

  addToShoppingCart(article: Article) {
    let alreadyInIt = false;
    this.shoppingCart.filter((value) => {
      if (value.id == article.id)
        alreadyInIt = true;
    });

    if (!alreadyInIt) {
      this.shoppingCart.push(article);
    }
    console.log(this.shoppingCart);
  }

  clearShoppingCart() {
    this.shoppingCart = [];
  }

  getShoppingCartItems() {
    return this.shoppingCart;
  }

}
