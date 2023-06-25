import {Component, Inject, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {MatDialogRef} from "@angular/material/dialog";
import {ArticleService} from "../../services/article.service";
import {MessageService} from "../../services/message.service";
import {Article} from "../../models/article.model";
import {map, Observable, startWith} from "rxjs";
import {MAT_DIALOG_DATA,MatDialog} from "@angular/material/dialog";
import { ConfirmDialogModel, ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'product-dialog',
  templateUrl: './product-dialog.component.html',
  styleUrls: ['./product-dialog.component.css']
})
export class ProductDialogComponent implements OnInit {

  maxDescLength = 150;



  maxFileSizeKB = 1000;
  imageUploaded = false;
  fileTypeValid = true;
  fileSizeValid = true;
  imgSrc: string | undefined;
  categories: string[] = [];
  filteredCategories: Observable<string[]> | undefined;

  articleForm: FormGroup = new FormGroup<any>({});
  article: Article | null;
  title: string;
  editMode: boolean;


  constructor(private dialogRef: MatDialogRef<ProductDialogComponent>,
              private articleService: ArticleService,
              private messageService: MessageService,
              private dialog: MatDialog,
              @Inject(MAT_DIALOG_DATA) public data: any) {
    this.article = data?.article;
    this.editMode = !!data && !!data.article;
    this.title = `${this.editMode ? "bearbeiten" : "anlegen"}`;
    this.articleService.getCategories().subscribe(categories => {
      this.categories = categories;
      this.ngOnInit();
    });
    this.initializeForm();
  }


  ngOnInit(): void {
    this.filteredCategories = this.articleForm.controls['category'].valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value || '')),
    );
  }


  initializeForm() {
    this.articleForm = new FormGroup({
      name: new FormControl<string | null>(this.article?.name || null, [Validators.required,Validators.maxLength(40)]),
      description: new FormControl<string | null>(this.article?.description || null, Validators.maxLength(this.maxDescLength)),
      category: new FormControl<string | null>(this.article?.category || null, Validators.maxLength(18)),
      price: new FormControl<number | null>(this.article?.price || null, [Validators.required, Validators.min(0.01)]),
      image: new FormControl<string | null>(this.article?.image || null)
    });
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
    const editedArticle: Article = {
      id: this.article?.id,
      name: this.articleForm.controls['name'].value!,
      description: this.articleForm.controls['description'].value!,
      category: this.articleForm.controls['category'].value!,
      price: this.articleForm.controls['price'].value!,
      image: this.articleForm.controls['image'].value!
    }

    this.dialogRef.close(editedArticle);

  }


  delete() {
    const message = "Soll der Artikel '" + this.article?.name + "' wirklich gelöscht werden?"

    const dialogDate = new ConfirmDialogModel(this.article?.name + " löschen", message);

    this.dialog.open(ConfirmationDialogComponent, {
      data: dialogDate
    }).afterClosed().subscribe((result: any) => {
        if (result) {
            if(this.article?.id){
                this.articleService.deleteArticle(this.article?.id).subscribe(() => {
                   this.messageService.notifyUser("Artikel erfolgreich entfernt!");
                   this.dialogRef.close();
                })
            }
        }
      }
    )
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
          this.articleForm.controls['image'].setValue(this.imgSrc);
          this.imageUploaded = true;
        }
      }
    }
  }

  hasValidImage() : boolean {
    return isValidBase64(this.articleForm.controls['image'].value) && atob(this.articleForm.controls['image'].value!.toString()) != '0';
  }

  deleteImage() {
    this.articleForm.controls['image'].setValue("");
  }

  get imageSource(): string {
    return `data:image/jpeg;base64,${this.articleForm.controls['image']?.value}`;
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
