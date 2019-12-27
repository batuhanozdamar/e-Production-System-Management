import { Component, OnInit } from '@angular/core';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {ApiService} from "../../../shared/services/api.service";
import {formatDate} from "@angular/common";

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

    var currentUserStr = localStorage.getItem("currentUser");
    if (currentUserStr != null && currentUserStr != "") {
      var currentUser= JSON.parse(currentUserStr);
    }

    this.http.get<ApiService>('http://localhost:8000/api/offer/getOffers?offerCompanyId=' + currentUser.company.id + '&statusId=4').subscribe(
        data => {

          // @ts-ignore
          for (let offer of data) {
            offer.productCode = offer.companyProductDto.productCode;
            offer.productCategory = offer.companyProductDto.product.category.title;
            offer.productName = offer.companyProductDto.product.productName;
            offer.productPrice = offer.companyProductDto.productPrice;
            //offer.company = offer.companyDto.companyName;
            offer.company = offer.companyProductDto.company.companyName;
            offer.amount = offer.askedAmount;
            offer.rejectedAt = formatDate(offer.rejectedAt,'dd/MM/yyyy HH:mm','en-US');
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
    actions: false
    ,
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
      productPrice: {
        title: 'Price',
        filter: true
      },
      askedPrice:{
        title: 'Rejected Price',
        filter: true
      },
    amount:{
      title: 'Rejected Amount',
      filter: true
    },
      company: {
        title: 'Rejected By',
        filter: true,
      },
      rejectedAt:{
      title: 'Date',
      filter: true
      }
    }
  };

}
