import { Injectable } from '@angular/core';
import {Article} from "../models/article.model";
import {of} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {

  shoppingCart: Article[] = [];

  constructor() { }

  addToShoppingCart(article: Article, quantity: number) {
    if (!this.contains(article)) {
      for (let i= 0; i<quantity; i++) {
        this.shoppingCart.push(article);
      }
    }
    console.log(this.shoppingCart);
  }

  contains(article: Article) {
    let alreadyInIt = false;
    this.shoppingCart.forEach((value) => {
      if (value.id == article.id)
        alreadyInIt = true;
    });

    return alreadyInIt;
  }

  clearShoppingCart() {
    this.shoppingCart = [];
    return this.shoppingCart;
  }

  getShoppingCartItems() {
    return this.shoppingCart;
  }

  getItemCount() {
    return this.shoppingCart.length;
  }


  removeFromCart(article: Article) {
    this.shoppingCart.forEach((value, index) => {
      if (value.id == article.id)
        this.shoppingCart.splice(index, 1);
    });
  }

}
