

import {Component, Inject} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {MessageService} from "../../services/message.service";
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {User} from "../../models/user.model";
import {AuthService} from "../../services/auth.service";
import { sha256 } from 'js-sha256';


@Component({
    selector: 'app-userdata-dialog',
    templateUrl: './userdata-dialog.component.html',
    styleUrls: ['./userdata-dialog.component.css']
})
export class UserdataDialogComponent {

  maxCommentLength = 100;

  userdataForm: FormGroup = new FormGroup<any>({});
  currentuser: User | undefined;

  constructor(private messageService: MessageService,
              private dialogRef: MatDialogRef<UserdataDialogComponent>,
              private authService: AuthService,
              @Inject(MAT_DIALOG_DATA) public data: any) {
    this.authService.getCurrentUser().subscribe(user => {
        this.currentuser = user;
        this.initializeForm();
    });
    //this.currentuser = data?.user;
    console.log(this.currentuser?.name);
    
  }

  

  initializeForm() {
    console.log(this.currentuser?.id);
    this.userdataForm = new FormGroup({
      userId: new FormControl<number | null>(this.currentuser?.id || null),
      name: new FormControl<string | null>(this.currentuser?.name || null, Validators.required),
      password: new FormControl<string | null>('', Validators.minLength(5)),
      company: new FormControl<string | null>(this.currentuser?.companyName || 'Kunde', Validators.required)
    });
  }

  onSubmit(): void {
    if (this.userdataForm == null || !this.userdataForm.valid || this.userdataForm.errors) {
      this.messageService.notifyUserError();
      return;
    }
    let password:string;

    if(this.userdataForm.controls['password'].value)
        password = this.hashPassword(this.userdataForm.controls['password'].value)
    else
        password = this.currentuser?.password || ""
    
    const user: User = {
        id: this.currentuser?.id,
        mail: this.currentuser?.mail || "",
        name: this.userdataForm.controls['name'].value,
        companyName: this.userdataForm.controls['company'].value,
        password: password,
        isSupplier: this.currentuser?.isSupplier || false
    }

    console.log(user);

    this.dialogRef.close(user);

  }


  close(): void {
    this.dialogRef.close();
  }

  private hashPassword(pw: string): string {
    return sha256(pw);
  }

}

