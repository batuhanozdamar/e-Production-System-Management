import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-stock-module',
  // templateUrl: './stock-module.component.html',
  styleUrls: ['./stock-module.component.scss'],
  template: `
    <ng2-smart-table [settings]="settings" [source]="data"></ng2-smart-table>
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

  data = [
    {
      id: 1,
      Category: "Electronic",
      Product: "MacBook",
      Price: "10$"
    },
    {
      id: 1,
      Category: "Techical Staff",
      Product: "Regulator",
      Price: "20$"
    },
    {
      id: 1,
      Category: "Other",
      Product: "iPhone",
      Price: "100$"
    }
  ];

  ngOnInit() {
  }

}
