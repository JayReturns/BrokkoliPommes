import {Component} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {User} from "../../models/user.model";
import { sha256 } from "js-sha256";
import {UserService} from "../../services/user.service";
import {AuthService} from "../../services/auth.service";
import {Router} from "@angular/router";
import {MatSnackBar} from "@angular/material/snack-bar";

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

  constructor(private userService: UserService, private authService: AuthService, private router: Router,
              private snackBar: MatSnackBar) {
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
    this.userService.registerUser(user).subscribe(res => console.log(res));
  }

  login() {
    let user = {
      mail: this.loginForm.controls.email.value!,
      password: this.hashPassword(this.loginForm.controls.password.value!)
    }
    this.authService.login(user).subscribe(validCredentials => {
      console.log(`Valid: ${validCredentials}`);
      if (validCredentials) {
        this.router.navigate(['dashboard']);
      } else {
        this.snackBar.open("Benutzername oder Passwort falsch!", "", {duration: 10000})
      }
    });
  }

  private hashPassword(pw: string): string {
    return sha256(pw);
  }

}
