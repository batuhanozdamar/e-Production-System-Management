import { Component, OnInit } from '@angular/core';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {ApiService} from "../../../../shared/services/api.service";
import {formatDate} from "@angular/common";

@Component({
  selector: 'app-generate-prescription',
  templateUrl: './generate-prescription.component.html',
  styleUrls: ['./generate-prescription.component.scss']
})
export class GeneratePrescriptionComponent implements OnInit {

  data:any = [];
  dataP:any = [];

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



    this.http.get<ApiService>('http://localhost:8000/api/offer/getOffers?productCompanyId=' + currentUser.company.id + '&statusId=3' ).subscribe(
        dataP => {

          // @ts-ignore
          for (let offer of dataP) {
            offer.productCode = offer.companyProductDto.productCode;
            offer.productCategory = offer.companyProductDto.product.category.title;
            offer.productName = offer.companyProductDto.product.productName;
            offer.productPrice = offer.companyProductDto.productPrice;
            offer.company = offer.companyProductDto.company.companyName;
            offer.amount = offer.askedAmount;
            offer.productColor = offer.companyProductDto.productColor;
            offer.soldAt = formatDate(offer.soldAt,'dd/MM/yyyy HH:mm','en-US');
          }


          this.dataP = dataP;
          console.log(this.dataP);
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
        filter: false
      }/*,

      productCategory: {
        title: 'Category',
        filter: true,
      }*/,

      productName: {
        title: 'Product Name',
        filter: false
      },
      productColor: {
        title: 'Product Color',
        filter: false
      },
      productPrice: {
        title: 'Price',
        filter: false
      },
      askedPrice:{
        title: 'Purchased Price',
        filter: false
      },
      amount:{
        title: 'Purchased Amount',
        filter: false
      },
      company: {
        title: 'Seller',
        filter: false,
      },
      soldAt:{
        title: 'Purchased Date',
        filter: false
      }
    }
  };


  //sold items
  settingsP = {
    actions: false,
    columns: {

      productCode: {
        title: 'Product Code',
        filter: false
      }/*,

      productCategory: {
        title: 'Category',
        filter: true,
      }*/,

      productName: {
        title: 'Product Name',
        filter: false
      },
      productColor: {
        title: 'Product Color',
        filter: false
      },
      productPrice: {
        title: 'Price',
        filter: false
      },
      askedPrice:{
        title: 'Sold Price',
        filter: false
      },
      amount:{
        title: 'Sold Amount',
        filter: false
      },
      company: {
        title: 'Seller',
        filter: false,
      },
      soldAt:{
        title: 'Sold Date',
        filter: false
      }
    }
  };



  print(): void {
    let printContents, popupWin;
    printContents = document.getElementById('1').innerHTML;
    popupWin = window.open('', '_blank');
    popupWin.document.open();
    popupWin.document.write(`
      <html>
        <head>
          <title>Print tab</title>
          <style>
            html {
              font-family: sans-serif;
              width: 100%;
            }
            
            a {
              text-decoration: none;
            }
          
            table {
                color: #606c71;
                border-spacing: 0;
                border: 1px solid #e9ebec;
                max-width: 100%;
                overflow-x: auto;
            }
            
            th, tr td {
                border: 1px solid #e9ebec;
                padding: 8px 16px;
            }
            
            h1, h2 {
                text-align: center;
            }
            
            input {
                padding: 8px 16px;
                border-radius: 10px;
                border: 1px solid #eee;
                font-size: 16px;
            }
            
            @media print {
                table, input, html {
                    font-size: 10px;
                }
                
                th, tr td, input {
                    padding: 4px;
                }
            }
          </style>
        </head>
    <body onload="window.print();window.close()">${printContents}</body>
      </html>`);
    popupWin.document.close();
  }




  printPurchased(): void {
    let printContents, popupWin;
    printContents = document.getElementById('2').innerHTML;
    popupWin = window.open('', '_blank');
    popupWin.document.open();
    popupWin.document.write(`
      <html>
        <head>
          <title>Print tab</title>
          <style>
            html {
              font-family: sans-serif;
              width: 100%;
            }
            
            a {
              text-decoration: none;
            }
          
            table {
                color: #606c71;
                border-spacing: 0;
                border: 1px solid #e9ebec;
                max-width: 100%;
                overflow-x: auto;
            }
            
            th, tr td {
                border: 1px solid #e9ebec;
                padding: 8px 16px;
            }
            
            h1, h2 {
                text-align: center;
            }
            
            input {
                padding: 8px 16px;
                border-radius: 10px;
                border: 1px solid #eee;
                font-size: 16px;
            }
            
            @media print {
                table, input, html {
                    font-size: 10px;
                }
                
                th, tr td, input {
                    padding: 4px;
                }
            }
          </style>
        </head>
    <body onload="window.print();window.close()">${printContents}</body>
      </html>`);
    popupWin.document.close();
  }


}
