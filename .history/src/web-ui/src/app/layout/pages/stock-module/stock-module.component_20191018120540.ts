import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-stock-module',
  // templateUrl: './stock-module.component.html',
  styleUrls: ['./stock-module.component.scss'],
  template: `
    <ng2-smart-table [settings]="settings"></ng2-smart-table>
  `,
})
export class StockModuleComponent implements OnInit {

  constructor() { }

  settings = {
    columns: {
      id: {
        title: 'ID'
      },
      name: {
        title: 'Category'
      },
      username: {
        title: 'Product Name'
      },
      email: {
        title: 'Price'
      }
    }
  };

  ngOnInit() {
  }

}
