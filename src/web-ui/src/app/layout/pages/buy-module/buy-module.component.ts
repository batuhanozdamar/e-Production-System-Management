import { Component, OnInit } from '@angular/core';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {ApiService} from "../../../shared/services/api.service";
import {offer} from "../../../common/offer";
import {product} from "../../../common/product";

@Component({
  selector: 'app-buy-module',
  /*templateUrl: './buy-module.component.html',*/
  styleUrls: ['./buy-module.component.scss'],
  template: `<ng2-smart-table [settings]="settings" [source]="data" (editConfirm)="addRecord($event)"></ng2-smart-table>`
})
export class BuyModuleComponent implements OnInit {


  constructor(private http: HttpClient) {}

  data:any = [];

  ngOnInit() {

    this.http.get<ApiService>('http://localhost:8000/api/productAll/').subscribe(
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
    edit: {
      confirmSave:true,
      editButtonContent: "Send Offer"
    },
    delete: {
      deleteButtonContent: ""
    },
    add: {
      confirmCreate: true,
      addButtonContent: ""
    },update: {
      updateButtonContent: "Send"
    },
    columns: {
      productCode: {
        title: 'Product Code',
        filter: true,
        editable: false,
      },
      productCategory: {
        title: 'Category',
        filter: true,
        editable: false,
      },
      productName: {
        title: 'Product Name',
        filter: true,
        editable: false,
      },
      productPrice: {
        title: 'Price',
        filter: true,
        editable: false,
      },
    askedPrice: {
      title: 'Offer Price',
      filter: true
    },
      company: {
      title: 'Seller',
      filter: true,
      editable: false,
        valuePrepareFunction: (user) => {
          return user.nameSurname;
        }
    }
    }
  };

  addRecord(event) {
    console.log("asd");

    var data = {
      "productCode" : event.newData.productCode,
      "productCategory" : event.newData.productCategory,
      "productName" : event.newData.productName,
      "productPrice" : event.newData.productPrice,
      "askedPrice" : +event.newData.askedPrice,
      "username": JSON.parse(localStorage.getItem("currentUser")).username,

    };

    this.http.post<ApiService>('http://localhost:8000/api/offer/', data).subscribe(
        res => {
          console.log(res);
          event.confirm.resolve(event.newData);
        },
        (err: HttpErrorResponse) => {
          if (err.error instanceof Error) {
            console.log("Client-side error occured.");
          } else {
            console.log("Server-side error occured.");
          }
        });
  }

  /*updateRecord(event) {
    console.log('ddddd');
    var data = {
      "productCode" : event.newData.productCode,
      "productCategory" : event.newData.productCategory,
      "productName" : event.newData.productName,
      "productPrice" : +event.newData.productPrice,
      "username": JSON.parse(localStorage.getItem("currentUser")).username,
    };

    this.http.put<offer>('http://localhost:8000/api/offer/'+event.newData.id, data).subscribe(
        res => {
          console.log(res);
          event.confirm.resolve(event.newData);
        },
        (err: HttpErrorResponse) => {
          if (err.error instanceof Error) {
            console.log("Client-side error occured.");
          } else {
            console.log("Server-side error occured.");
          }
        });
  }*/

}
