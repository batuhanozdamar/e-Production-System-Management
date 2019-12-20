import { Component, OnInit } from '@angular/core';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {ApiService} from "../../../shared/services/api.service";

@Component({
  selector: 'app-my-offers',
  templateUrl: './my-offers.component.html',
  styleUrls: ['./my-offers.component.scss']
})
export class MyOffersComponent implements OnInit {

  data:any = [];

  constructor(private http: HttpClient) {

  }

  ngOnInit() {

    this.http.get<ApiService>('http://localhost:8000/api/product').subscribe(
        data => {

          var dataList = data;
          // @ts-ignore
          for (let product of data) {
            product.categoryTitle = product.category.title
          }

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
    actions:{columnTitle: 'Manage Offer'},
    edit: {
      confirmCreate:true,
      editButtonContent: ""
    },
    delete: {
      confirmDelete:true,
      deleteButtonContent: "Cancel Offer"
    },
    add: {
      addButtonContent: ""
    },

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
        title: 'My Offer',
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
