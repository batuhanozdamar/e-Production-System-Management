import { Component, OnInit } from '@angular/core';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {ApiService} from "../../../shared/services/api.service";
import {companyProduct} from "../../../common/companyProduct";
import {formatDate} from "@angular/common";

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
    var currentUserStr = localStorage.getItem("currentUser");
    if (currentUserStr != null && currentUserStr != "") {
      var currentUser= JSON.parse(currentUserStr);
    }

    this.http.get<ApiService>('http://localhost:8000/api/offer/getOffers?offerCompanyId=' + currentUser.company.id + '&statusId=2').subscribe(
        data => {
          debugger;

          // @ts-ignore
          for (let offer of data) {
            offer.productCode = offer.companyProductDto.productCode;
            offer.productCategory = offer.companyProductDto.product.category.title;
            offer.productName = offer.companyProductDto.product.productName;
            offer.productPrice = offer.companyProductDto.productPrice;
            offer.company = offer.companyProductDto.company.companyName;
            offer.amount = offer.askedAmount;
            offer.productColor = offer.companyProductDto.productColor;
            offer.productAmount = offer.companyProductDto.productAmount;
            offer.offeredAt = formatDate(offer.offeredAt,'dd/MM/yyyy HH:mm','en-US');
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
        title: 'Sent Price',
        filter: true
      },
      askedAmount:{
        title: 'Sent Amount',
        filter: true
      },
      company: {
        title: 'Seller',
        filter: true,
      },
      offeredAt:{
        title: 'Offer at',
        filter: true
      }
    }
  };


  deleteRecord(event) {
    console.log(event.data);

    this.http.delete<companyProduct>('http://localhost:8000/api/offer/'+event.data.id).subscribe(
        res => {
          console.log(res);
          event.confirm.resolve(event.source.data);
        },

        (err: HttpErrorResponse) => {
          if (err.error instanceof Error) {
            console.log("Client-side error occured.");
          } else {
            console.log("Server-side error occured.");
          }
        });
  }
}
