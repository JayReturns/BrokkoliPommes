import {Component, Inject, Input, OnInit} from '@angular/core';
import {Article} from "../../models/article.model";
import {ShoppingCartService} from "../../services/shopping-cart.service";
import {AuthService} from "../../services/auth.service";
import {ProductDialogComponent} from "../product-dialog/product-dialog.component";
import {ArticleService} from "../../services/article.service";
import {MessageService} from "../../services/message.service";
import {MatDialog} from "@angular/material/dialog";


@Component({
  selector: 'product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent implements OnInit {

  @Input() article: Article | undefined;
  imgSrc = "";

  isSupplier: boolean | undefined;


  constructor(private cartService: ShoppingCartService,
              private authService: AuthService,
              private messageService: MessageService,
              public dialog: MatDialog){
    this.authService.getCurrentUser().subscribe(res => {
      this.isSupplier = res.isSupplier;
    });
  };

  ngOnInit() {
    if (this.article?.image)
      this.imgSrc = `data:image/jpeg;base64,${this.article.image}`;
  }

  editArticle() {
    console.log((this.article?.name))
    this.dialog.open(ProductDialogComponent, {
      data: {
        article: this.article
      }
    }).afterClosed().subscribe(editedArticle => {
      console.log("bearbeitet")
      /*this.authService.getCurrentUser().subscribe(res => {
        if (!res || !editedArticle) return;
        this.articleService.createArticle(editedArticle, res).subscribe(() => {
          this.messageService.notifyUser("Erfolgreich Erstellt!");
          this.updateArticles();
          this.selectedCategory = '';
        })
      })*/
    })
  }

  addToCart() {
    this.cartService.addToShoppingCart(this.article!);
  }

  remove() {
    this.cartService.removeFromCart(this.article!);
  }

  isInCart() {
    return this.cartService.contains(this.article!)
  }

}
