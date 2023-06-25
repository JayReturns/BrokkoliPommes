import { Injectable } from '@angular/core';
import {Article} from "../models/article.model";
import {of} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {

  shoppingCart: Article[] = [];

  sCart: any[][] = [] 

  constructor() { }

  addToShoppingCart(article: Article, quantity: number) {
    if (!this.contains(article) || this.sCart.some((subarray) => subarray.some((obj) => obj === article.name))) {
        this.sCart.push([article, quantity])
      for (let i= 0; i<quantity; i++) {
        this.shoppingCart.push(article);
      }
    }
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
    this.clearSC();
    return this.shoppingCart;
  }

  clearSC(){
    this.sCart = [];
    return this.sCart;
  }

  getShoppingCartItems() {
    return this.shoppingCart;
  }

  getSCartItems(){
    return this.sCart;
  }

  getItemCount() {
    return this.shoppingCart.length;
  }


  removeFromCart(article: Article) {
    /*this.shoppingCart.forEach((value, index) => {
      if (value.id == article.id)
        this.shoppingCart.splice(index, 1);
    });*/

    // The upper code just halves the amount of selected object in the product card and doesn't just discard everything related to it.

    for(let k = 0; k<this.sCart.length; k++){
        if(this.shoppingCart[k].id == article.id){
            this.shoppingCart.splice(k,1);
        }
    }

    for(let i = 0; i<this.sCart.length; i++){
        for(let j = 0; j<this.sCart[i].length; j++){
            if(this.sCart[i][j] == article.name){
                this.sCart[i].splice(j, 1);
            }
        }
    }
  }

}
