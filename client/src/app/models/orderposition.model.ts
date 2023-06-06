import {Article} from "./article.model";

export interface OrderPosition {
  article: Article;
  quantity: number;
}
