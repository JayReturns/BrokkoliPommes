import {Component, ComponentFactoryResolver, Inject, Input, OnInit} from '@angular/core';
import {Article} from "../../models/article.model";
import {ShoppingCartService} from "../../services/shopping-cart.service";
import {AuthService} from "../../services/auth.service";
import {ProductDialogComponent} from "../product-dialog/product-dialog.component";
import {ArticleService} from "../../services/article.service";
import {MessageService} from "../../services/message.service";
import {MatDialog} from "@angular/material/dialog";
import { ProductListComponent } from '../product-list/product-list.component';


@Component({
  selector: 'product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent implements OnInit {

  @Input() article: Article | undefined;
  imgSrc = "";

  supplierID: number | undefined;


  constructor(private cartService: ShoppingCartService,
              private authService: AuthService,
              private articleService: ArticleService,
              private productList: ProductListComponent,
              private messageService: MessageService,
              public dialog: MatDialog){
    this.authService.getCurrentUser().subscribe(res => {
      this.supplierID = res.id;
    });
  };

  ngOnInit() {
    if (this.article?.image)
      this.imgSrc = `data:image/jpeg;base64,${this.article.image}`;
  }

  editArticle() {
    
    this.dialog.open(ProductDialogComponent, {
      data: {
        article: this.article
      }
    }).afterClosed().subscribe(editedArticle => {
        this.productList.updateArticles();
        if (!editedArticle) return;
        this.articleService.updateArticle(editedArticle).subscribe(() => {
            this.messageService.notifyUser("Änderung erfolgreich!");
            this.productList.updateArticles();
        })
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
