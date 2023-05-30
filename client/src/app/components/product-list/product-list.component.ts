import {Component, OnInit} from '@angular/core';
import {Article} from "../../models/article.model";
import {AuthService} from "../../services/auth.service";
import {ArticleService} from "../../services/article.service";

@Component({
  selector: 'product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  categories: string[] = [];
  selectedCategory: string = this.categories[2];

  articles: Article[] = [];

  ngOnInit() {
    this.updateArticles();
  }

  constructor(private authService: AuthService, private articleService: ArticleService) {
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
    console.log(event[0]);
    this.updateArticles(event[0]);
  }

}
