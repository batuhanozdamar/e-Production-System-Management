import { Component, OnInit } from '@angular/core';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {ApiService} from "../../../shared/services/api.service";
import {offer} from "../../../common/offer";
import {formatDate} from "@angular/common";

@Component({
  selector: 'app-offered-items',
  templateUrl: './offered-items.component.html',
  styleUrls: ['./offered-items.component.scss']
})
export class OfferedItemsComponent implements OnInit {

  data:any = [];

  constructor(private http: HttpClient) {

  }

  ngOnInit() {
    this.refreshPage();
  }
  refreshPage(){
    var currentUserStr = localStorage.getItem("currentUser");
    if (currentUserStr != null && currentUserStr != "") {
      var currentUser= JSON.parse(currentUserStr);
    }

    this.http.get<ApiService>('http://localhost:8000/api/offer/getOffers?productCompanyId=' + currentUser.company.id + '&statusId=2').subscribe(
        data => {
          debugger;

          // @ts-ignore
          for (let offer of data) {
            offer.productCode = offer.companyProductDto.productCode;
            offer.productCategory = offer.companyProductDto.product.category.title;
            offer.productName = offer.companyProductDto.product.productName;
            offer.productPrice = offer.companyProductDto.productPrice;
            offer.company = offer.companyDto.companyName;
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
    actions: {
      columnTitle: 'Manage Offers',
      add: false,
      edit: false,
      delete: false,
      custom: [{ name: 'acceptOffer', title: `Accept` }, { name: 'rejectOffer', title: `Reject` }],
      position: 'left'
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
      productColor: {
        title: 'Product Color',
        filter: true
      },
      productPrice: {
        title: 'Price',
        filter: true
      },
      askedPrice:{
        title: 'Offered Price',
        filter: true
      },
      productAmount:{
        title: 'Stock',
        filter: true
      },
    amount:{
      title: 'Offered Amount',
      filter: true
    },
      company: {
        title: 'Offered By',
        filter: true,
        editable: false,
      },
      offeredAt:{
        title: 'Date',
        filter: true
      }
    }
  };

  //accept offer
  acceptOffer(event) {

    var currentUserStr = localStorage.getItem("currentUser");
    if (currentUserStr != null && currentUserStr != "") {
      var currentUser= JSON.parse(currentUserStr);
    }
    console.info(event.data);

    var data2 =
        {
          "id": event.data.id,
          //"companyProduct": this.data,
          //"offerStatus": this.data.companyProductDto.offerStatus.id,
          //"companyDto": {id: JSON.parse(localStorage.getItem("currentUser")).company.id}
        }

    this.http.get<ApiService>('http://localhost:8000/api/offer/acceptOffer/' + event.data.id).subscribe(
        data => {
          this.refreshPage();
        }
    )
  }


  //reject offer
  rejectOffer(event){

    var currentUserStr = localStorage.getItem("currentUser");
    if (currentUserStr != null && currentUserStr != "") {
      var currentUser= JSON.parse(currentUserStr);
    }
    console.info(event.data);

    var data2 =
        {
          "id": event.data.id,
          //"companyProduct": this.data,
          //"offerStatus": this.data.companyProductDto.offerStatus.id,
          //"companyDto": {id: JSON.parse(localStorage.getItem("currentUser")).company.id}
        }

    this.http.get<ApiService>('http://localhost:8000/api/offer/rejectOffer/' + event.data.id).subscribe(
        data => {
          this.refreshPage();
        }
    )
  }

  manageOffer(event){
    if(event.action == 'acceptOffer') {
      this.acceptOffer(event);

    }else if(event.action == 'rejectOffer') {
      this.rejectOffer(event);
    }

    console.info(event);
  }



}
