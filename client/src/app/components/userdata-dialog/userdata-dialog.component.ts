

import {Component, Inject} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {MessageService} from "../../services/message.service";
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {User} from "../../models/user.model";
import {UserService} from "../../services/user.service";
import {AuthService} from "../../services/auth.service";


@Component({
    selector: 'app-userdata-dialog',
    templateUrl: './userdata-dialog.component.html',
    styleUrls: ['./userdata-dialog.component.css']
})
export class UserdataDialogComponent {

  maxCommentLength = 100;

  userdataForm: FormGroup = new FormGroup<any>({});
  currentuser: User | undefined;

  constructor(private formBuilder: FormBuilder,
              private userService: UserService,
              private messageService: MessageService,
              private dialogRef: MatDialogRef<UserdataDialogComponent>,
              private dialog: MatDialog,
              private authService: AuthService,
              @Inject(MAT_DIALOG_DATA) public data: any) {
    //this.authService.getCurrentUser().subscribe(user2 => this.currentuser = user2);
    this.currentuser = data?.user;
    console.log(this.currentuser?.name);
    setTimeout(() => {  this.currentuser?.name }, 3000);
    this.initializeForm();
  }

  initializeForm() {
    console.log(this.currentuser?.id);
    this.userdataForm = new FormGroup({
      //userId: new FormControl<number | null>(this.user?.id || null),
      name: new FormControl<string | null>(this.currentuser?.name || null, [Validators.required, Validators.minLength(3)]),
      newPassword: new FormControl<string | null>('', Validators.minLength(5)),
      oldPassword: new FormControl<string | null>('', Validators.minLength(5)),
      company: new FormControl<string | null>(this.currentuser?.companyName || null, Validators.required)
    });
  }

  onSubmit(): void {
    if (this.userdataForm == null || !this.userdataForm.valid || this.userdataForm.errors) {
      this.messageService.notifyUserError();
      return;
    }
    console.log(this.currentuser?.id);
    console.log(this.currentuser?.name);
    console.log(this.currentuser?.password);
    /*
    const user: User = {
        id: this.userdataForm.controls['id'].value || undefined,
        name: this.userdataForm.controls['environmentType'].value,
        password: this.userdataForm.controls['comment'].value || "",
        mail: '',
        isSupplier: false
    }*/

  }


  close(): void {
    this.dialogRef.close();
  }

}

