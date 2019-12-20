import { Component, OnInit } from '@angular/core';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {ApiService} from "../../../shared/services/api.service";

@Component({
  selector: 'app-purchased-items',
  templateUrl: './purchased-items.component.html',
  styleUrls: ['./purchased-items.component.scss']
})
export class PurchasedItemsComponent implements OnInit {

  data:any = [];

  constructor(private http: HttpClient) {

  }

  ngOnInit() {
    this.http.get<ApiService>('http://localhost:8000/api/product/').subscribe(
        data => {

          this.data = data;

          console.log(this.data);
        },
        (err: HttpErrorResponse) => {
          if (err.error instanceof Error) {
            console.log("Client-side error occured.");
          } else {
            console.log("Server-side error occured.");
          }
        });
  }

  settings = {

    actions: false,


    columns: {

      productCode: {
        title: 'Product Code',
        filter: true
      },

      productCategory: {
        title: 'Category',
        filter: true,
      },

      productName: {
        title: 'Product Name',
        filter: true
      },

      productPrice: {
        title: 'First Price',
        filter: true
      },

      askedPrice:{
        title: 'Purchased Price',
        filter: true
      },
      company: {
        title: 'Company',
        filter: true,
        editable: false,
        valuePrepareFunction: (user) => {
          return user.nameSurname;
        }
      },
      date:{
        title: 'Date',
        filter: true
      },
      amount:{
        title: 'Amount',
        filter: true
      }
    }
  };

}
