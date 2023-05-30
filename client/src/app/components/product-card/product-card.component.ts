import {Component, Input} from '@angular/core';
import {Article} from "../../models/article.model";

@Component({
  selector: 'product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent {

  @Input() article: Article | undefined;

}
