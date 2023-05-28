import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../services/auth.service";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  categories: string[] = ['Ich', 'Weiß', 'Nicht'];
  selectedCategory: string = this.categories[2];

  ngOnInit() {}

  constructor(private authService: AuthService) {
  }

  onCategoryChange(event: any) {
    console.log(event);
  }

  logout() {
    this.authService.logout();
  }

}
