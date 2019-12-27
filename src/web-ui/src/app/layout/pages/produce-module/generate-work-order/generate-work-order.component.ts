import { Component, OnInit } from '@angular/core';
import {ApiService} from "../../../../shared/services/api.service";
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {category} from "../../../../common/category";
import {Router} from "@angular/router";

@Component({
  selector: 'app-generate-work-order',
  templateUrl: './generate-work-order.component.html',
  styleUrls: ['./generate-work-order.component.scss']
})
export class GenerateWorkOrderComponent implements OnInit {

  data:any = [];
  categoryList:any = [];
  selectedCategory:any;
  categorydata:category;
  totalPrice:number;
  selectedRows:any = [];


  constructor(private http: HttpClient, private route:Router) { }

  ngOnInit() {

    this.http.get<ApiService>('http://localhost:8000/api/category').subscribe(
        data => {
          this.categoryList = data;
          console.log(data);
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
    selectMode: 'multi',
    pager: {
      display: true,
      perPage: 100
    },
    actions:false,
    columns: {
      productCode: {
        title: 'Product Code',
        filter: true,
        editable:true
      },/*
            categoryTitle: {
                title: 'Category',
                filter: true,
                editable:false,
                addable: false,
                editor: {
                    type: 'list',
                    config: {
                        // type: 'Select Category',
                        list: []
                    }
                },
            },*/
      productNames: {
        title: 'Product Name',
        filter: true,
        editable:true,
        editor: {
          type: 'list',
          config: {
            // type: 'Select Category',
            list: []
          }
        },
      },
      productColors: {
        title: 'Color',
        filter: true,
        editable:true,
        editor: {
          type: 'list',
          config: {
            // type: 'Select Category',
            list: [{value:"Black", title:"Black"},
              {value:"White", title:"White"},
              {value:"Yellow", title:"Yellow"},
              {value:"Green", title:"Green"},
              {value:"Blue", title:"Blue"},
              {value:"Red", title:"Red"},{value:"Brown", title:"Brown"},
              {value:"Silver", title:"Silver"},{value:"Purple", title:"Purple"},
              {value:"Orange", title:"Orange"},{value:"Gray", title:"Gray"},
              {value:"Pink", title:"Pink"},{value:"Cyan", title:"Cyan"},
              {value:"Fuchsia", title:"Fuchsia"},{value:"Magenta", title:"Magenta"},
              {value:"Olive", title:"Olive"},{value:"Lime", title:"Lime"}]
          }
        },
      },
      productAmount: {
        title: 'Stock Amount',
        filter: true
      },
      productPrice: {
        title: 'Price',
        filter: true
      },
      necessaryAmount: {
        title: 'Necessary Amount',
        filter: true,
        editable:true
      },
    company: {
      title: 'Seller',
      filter: true,
      editable:true
    }
    }
  };
  offeredPrice: number;


  showProductLists()
  {
    var currentUserStr = localStorage.getItem("currentUser");
    if (currentUserStr != null && currentUserStr != "") {
      var currentUser= JSON.parse(currentUserStr);
    }
    this.categorydata = new category();
    this.categorydata.value = this.selectedCategory;
    this.categorydata.title = 'qasd';

debugger;
    // @ts-ignore
    this.http.get<ApiService>('http://localhost:8000/api/companyProduct/getAllByCategory/' + currentUser.company.id + '/' + this.selectedCategory).subscribe(
        data => {
          debugger;
          var i = 0;
          // @ts-ignore
          for (let companyProduct of data) {

            companyProduct.productNames = companyProduct.product.productName;
            companyProduct.categoryTitle = companyProduct.product.category.title;
            companyProduct.company = companyProduct.company.companyName;
            companyProduct.offerStatus = companyProduct.offerStatusDto.name;
            companyProduct.productColors = companyProduct.productColor;
            companyProduct.necessaryAmount = companyProduct.product.necessaryAmount;
            if (companyProduct.productAmount < companyProduct.product.necessaryAmount)
            {
              delete data[i];
            }
            i++;
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


  onUserRowSelect($event: any) {

    var result = 0;
    for(let selected of $event.selected)
    {
      result += selected.necessaryAmount * selected.productPrice;
    }
  this.totalPrice = result;
    this.selectedRows = $event.selected;
  }

  sendOffer() {

    if(+this.offeredPrice > this.totalPrice)
    {
      alert("Offered price cannot be bigger than total price");
    }
    else {
      var currentUserStr = localStorage.getItem("currentUser");
      if (currentUserStr != null && currentUserStr != "") {
        var currentUser= JSON.parse(currentUserStr);
      }
      var oran = +this.offeredPrice / this.totalPrice;
      var data2 = [];

      for(let selected of this.selectedRows)
      {

        var added =
        {
          "id": selected.id,
          "companyProductDto": selected.companyProductDto,
          "askedPrice": selected.productPrice*oran,
          "askedAmount": selected.necessaryAmount,
          "companyDto": {id: JSON.parse(localStorage.getItem("currentUser")).company.id}
        }

        data2.push(added);
      }


      this.http.post<ApiService>('http://localhost:8000/api/offer/gwo', data2).subscribe(
          data => {
            this.route.navigate(['/procurementModule']);
          }
      )

    }


  }
}
