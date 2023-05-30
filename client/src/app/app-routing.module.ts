import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from "./components/login/login.component";
import {authGuard} from "./guards/auth.guard";
import {ProductListComponent} from "./components/product-list/product-list.component";

const routes: Routes = [
  {path: '', redirectTo: 'dashboard', pathMatch: "full"},
  {path: 'dashboard', component: ProductListComponent , canActivate: [authGuard] },
  {path: 'login', component: LoginComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
