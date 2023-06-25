import {Component, OnInit} from '@angular/core';
import {Article} from "../../models/article.model";
import {AuthService} from "../../services/auth.service";
import {ArticleService} from "../../services/article.service";
import {MatDialog} from "@angular/material/dialog";
import {ProductDialogComponent} from "../product-dialog/product-dialog.component";
import {MessageService} from "../../services/message.service";

@Component({
  selector: 'product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  categories: string[] = [];
  selectedCategory: string = this.categories[2];

  articles: Article[] = [];
  isSupplier: boolean | undefined;

  ngOnInit() {
    this.updateArticles();
  }

  constructor(private authService: AuthService, private articleService: ArticleService, private dialog: MatDialog,
              private messageService: MessageService) {
    this.authService.getCurrentUser().subscribe(res => {
      this.isSupplier = res.isSupplier;
    })
  }

  updateArticles(category?: string) {
    if (category) {
      this.articleService.getArticlesByCategory(category).subscribe(res => {
        this.articles = res;
      })
    } else {
      this.articleService.getAllArticles().subscribe(res => {
        this.articles = res;
      });
    }
    this.articleService.getCategories().subscribe(res => {
      this.categories = res;
    })
  }

  onCategoryChange(event: string[]) {
    this.updateArticles(event[0]);
  }

  clearCategory() {
    this.selectedCategory = '';
    this.updateArticles();
  }

  addArticle() {
    this.dialog.open(ProductDialogComponent).afterClosed().subscribe(createdArticle => {
      this.authService.getCurrentUser().subscribe(res => {
        if (!res || !createdArticle) return;
        this.articleService.createArticle(createdArticle, res).subscribe(() => {
          this.messageService.notifyUser("Artikel erfolgreich angelegt!");
          this.updateArticles();
          this.selectedCategory = '';
        })
      })
    })
  }

}
