import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  categories: string[] = ['Ich', 'Weiß', 'Nicht'];
  selectedCategory: string = this.categories[2];

  ngOnInit() {}

  onCategoryChange(event: any) {
    console.log(event);
  }

}
