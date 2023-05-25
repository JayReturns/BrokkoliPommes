import {Component} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {User} from "../../models/user.model";
import { sha256 } from "js-sha256";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  hide = true;
  canLogin = false;
  selectedRole: string | undefined;

  loginForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl('', Validators.email),
  })

  registrationForm = new FormGroup({
    name: new FormControl('', Validators.minLength(3)),
    email: new FormControl('', Validators.email),
    password: new FormControl('', Validators.minLength(5)),
    repeatPassword: new FormControl('', Validators.minLength(5)),
    isSupplier: new FormControl(false),
    companyName: new FormControl('')
  })

  constructor() {
    this.registrationForm.valueChanges.subscribe(x =>  {
      this.canLogin = this.registrationForm.controls.password.value == this.registrationForm.controls.repeatPassword.value;
    })
  }

  register() {
    let user: User = {
      companyName: this.registrationForm.controls.isSupplier.value ? this.registrationForm.controls.companyName.value : null,
      isSupplier: false,
      mail: this.registrationForm.controls.email.value!,
      name: this.registrationForm.controls.name.value!,
      password: this.hashPassword(this.registrationForm.controls.password.value!)
    }

    console.log(user);
  }

  login() {

    // if (this.email == "admin" && this.password == "admin") {
    //   this.snackBar.open('Login Successful', '', {duration: 1000})
    // } else {
    //   this.snackBar.open('Login error', '', {duration: 1000})
    // }
  }

  private hashPassword(pw: string): string {
    return sha256(pw);
  }

}
