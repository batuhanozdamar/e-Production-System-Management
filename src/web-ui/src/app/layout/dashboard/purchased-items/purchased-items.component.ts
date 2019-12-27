import { Component, OnInit } from '@angular/core';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {ApiService} from "../../../shared/services/api.service";
import {formatDate} from "@angular/common";

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

    var currentUserStr = localStorage.getItem("currentUser");
    if (currentUserStr != null && currentUserStr != "") {
      var currentUser= JSON.parse(currentUserStr);
    }

    this.http.get<ApiService>('http://localhost:8000/api/offer/getOffers?offerCompanyId=' + currentUser.company.id + '&statusId=3' ).subscribe(
        data => {

          // @ts-ignore
          for (let offer of data) {
            offer.productCode = offer.companyProductDto.productCode;
            offer.productCategory = offer.companyProductDto.product.category.title;
            offer.productName = offer.companyProductDto.product.productName;
            offer.productPrice = offer.companyProductDto.productPrice;
            offer.company = offer.companyProductDto.company.companyName;
            offer.amount = offer.askedAmount;
            offer.productColor = offer.companyProductDto.productColor;
            offer.soldAt = formatDate(offer.soldAt,'dd/MM/yyyy HH:mm','en-US');
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

    actions: false,
    columns: {

      productCode: {
        title: 'Product Code',
        filter: true
      }/*,

      productCategory: {
        title: 'Category',
        filter: true,
      }*/,

      productName: {
        title: 'Product Name',
        filter: true
      },
    productColor: {
      title: 'Product Color',
      filter: true
    },
      productPrice: {
        title: 'Price',
        filter: true
      },
      askedPrice:{
        title: 'Sold Price',
        filter: true
      },
      amount:{
        title: 'Sold Amount',
        filter: true
      },
      company: {
        title: 'Seller',
        filter: true,
      },
      soldAt:{
        title: 'Sold Date',
        filter: true
      }
    }
  };

}
