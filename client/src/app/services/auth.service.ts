import { Injectable } from '@angular/core';
import {UserService} from "./user.service";
import {map, Subject} from "rxjs";
import {Router} from "@angular/router";

const USER_KEY = "appUser"

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private userService: UserService, private router: Router) { }

  public logout() {
    localStorage.removeItem(USER_KEY);
    this.router.navigate(['login'])
  }

  public login(user: {mail: string, password: string}) {
    const subject = new Subject<boolean>();
    this.userService.loginUser(user).subscribe(user => {
      if (!user)
        subject.next(false);

      if (user && user.id) {
        localStorage.setItem(USER_KEY, user.id.toString());
        subject.next(true);
      } else
        subject.next(false);
    })
    return subject.asObservable();
  }

  public getCurrentUser() {
    let id = localStorage.getItem(USER_KEY);
    if (!id)
      throw Error("User not logged in!");
    return this.userService.getUserById(+id);
  }

  public isLoggedIn(): boolean {
    return localStorage.getItem(USER_KEY) != null;
  }

}
