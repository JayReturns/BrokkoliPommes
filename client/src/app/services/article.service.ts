import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {environment} from "../../environments/environment.development";
import { Article } from "../models/article.model";
import {User} from "../models/user.model";

@Injectable({
  providedIn: 'root'
})
export class ArticleService {

  private url = `${environment.baseApiUrl}/article`;

  constructor(private http: HttpClient) { }

  public getAllArticles() {
    return this.http.get<Article[]>(`${this.url}/all`);
  }

  public getArticlesByCategory(category: string) {
    let params = new HttpParams()
      .set('category', category);

    return this.http.get<Article[]>(this.url, {params: params});
  }

  public updateArticle(article: Article) {
    return this.http.put<Article>(this.url, article);
  }

  public createArticle(article: Article, user: User) {
    if (!user.id) {
      throw Error("User has no ID!");
    }
    return this.http.post<Article>(`${this.url}/${user.id}`, article);
  }

  public deleteArticle(id: number) {
    this.http.delete(`${this.url}/id`).subscribe();
  }

  public getCategories() {
    return this.http.get<string[]>(`${this.url}/categories`);
  }

}
