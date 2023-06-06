import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {MatDialogRef} from "@angular/material/dialog";
import {ArticleService} from "../../services/article.service";
import {MessageService} from "../../services/message.service";
import {Article} from "../../models/article.model";
import {map, Observable, startWith} from "rxjs";

@Component({
  selector: 'product-dialog',
  templateUrl: './product-dialog.component.html',
  styleUrls: ['./product-dialog.component.css']
})
export class ProductDialogComponent implements OnInit {

  maxDescLength = 200;

  articleForm = new FormGroup({
    name: new FormControl<string>(''),
    description: new FormControl<string>('', Validators.maxLength(this.maxDescLength)),
    category: new FormControl<string>(''),
    price: new FormControl<number>(0, Validators.min(0.01)),
    image: new FormControl<string>('')
  });

  maxFileSizeKB = 100;
  imageUploaded = false;
  fileTypeValid = true;
  fileSizeValid = true;
  imgSrc: string | undefined;
  categories: string[] = [];
  filteredCategories: Observable<string[]>;

  constructor(private dialogRef: MatDialogRef<ProductDialogComponent>,
              private articleService: ArticleService,
              private messageService: MessageService) {
    this.filteredCategories = new Observable<string[]>();
  }

  ngOnInit(): void {
    this.filteredCategories = this.articleForm.controls.category.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value || '')),
    );
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.categories.filter(category => category.toLowerCase().includes(filterValue));
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
      price: this.articleForm.controls.price.value!,
      image: this.articleForm.controls.image.value!
    }

    this.dialogRef.close(article);

  }

  uploadFile(event: any) {
    const reader = new FileReader();

    if (event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      const sizeKB = (file.size/1024).toFixed(4);

      const isNameValid = file.name.toLowerCase().endsWith(".jpeg");
      const isTypeValid = file.type.toLowerCase() === 'image/jpeg';

      this.fileTypeValid = isNameValid && isTypeValid;
      this.fileSizeValid = Number(sizeKB) <= this.maxFileSizeKB;

      if (this.fileTypeValid && this.fileSizeValid) {
        reader.readAsDataURL(file);

        reader.onload = () => {
          this.imgSrc = (reader.result as string).replace(/data:image\/.+;base64,/i, "");
          this.articleForm.controls.image.setValue(this.imgSrc);
          this.imageUploaded = true;
        }
      }
    }
  }

  hasValidImage() : boolean {
    return isValidBase64(this.articleForm.controls.image.value) && atob(this.articleForm.controls.image.value!.toString()) != '0';
  }

  deleteImage() {
    this.articleForm.controls.image.setValue("");
  }

  get imageSource(): string {
    return `data:image/jpeg;base64,${this.articleForm.controls.image?.value}`;
  }

}

function isValidBase64(str: string | null | undefined): boolean {
  if (!str) return false;
  if (str === '' || str.trim() === '') return false;

  try {
    return btoa(atob(str)) == str;
  } catch (err) {
    return false;
  }
}
