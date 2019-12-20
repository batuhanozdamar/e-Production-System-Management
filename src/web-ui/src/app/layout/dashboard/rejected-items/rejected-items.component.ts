import { Component, OnInit } from '@angular/core';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {ApiService} from "../../../shared/services/api.service";

@Component({
  selector: 'app-rejected-items',
  templateUrl: './rejected-items.component.html',
  styleUrls: ['./rejected-items.component.scss']
})
export class RejectedItemsComponent implements OnInit {

  data:any = [];

  constructor(private http: HttpClient) {

  }

  ngOnInit() {
    this.http.get<ApiService>('http://localhost:8000/api/offer/').subscribe(
        data => {
          debugger;
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
    actions: false
    ,
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
        title: 'Price',
        filter: true
      },
      askedPrice:{
        title: 'Rejected Price',
        filter: true
      },
      company: {
        title: 'Offered By',
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
