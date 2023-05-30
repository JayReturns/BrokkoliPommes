import { Component } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {ArticleService} from "../../services/article.service";
import {MessageService} from "../../services/message.service";
import {Article} from "../../models/article.model";
import {AuthService} from "../../services/auth.service";

@Component({
  selector: 'app-product-dialog',
  templateUrl: './product-dialog.component.html',
  styleUrls: ['./product-dialog.component.css']
})
export class ProductDialogComponent {

  maxDescLength = 200;

  articleForm = new FormGroup({
    name: new FormControl<string>(''),
    description: new FormControl<string>('', Validators.maxLength(this.maxDescLength)),
    category: new FormControl<string>(''),
    price: new FormControl<number>(0, Validators.min(0.01))
  });

  constructor(private dialogRef: MatDialogRef<ProductDialogComponent>,
              private articleService: ArticleService,
              private messageService: MessageService,
              private authService: AuthService) {
  }

  close() {
    this.dialogRef.close();
  }

  onSubmit() {
    if (this.articleForm == null || !this.articleForm.value || this.articleForm.errors) {
      this.messageService.notifyUserError()
      return;
    }
    const article: Article = {
      name: this.articleForm.controls.name.value!,
      description: this.articleForm.controls.description.value!,
      category: this.articleForm.controls.category.value!,
      price: this.articleForm.controls.price.value!
    }

    this.dialogRef.close(article);

  }

}
