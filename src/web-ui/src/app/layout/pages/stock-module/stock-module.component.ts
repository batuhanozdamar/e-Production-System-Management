import {Component, OnInit} from '@angular/core';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {ApiService} from "../../../shared/services/api.service";
import {category} from "../../../common/category";
import {companyProduct} from "../../../common/companyProduct";
import {product} from "../../../common/product";

@Component({
  selector: 'app-stock-module',
  templateUrl: './stock-module.component.html',
  styleUrls: ['./stock-module.component.scss'],
})

export class StockModuleComponent implements OnInit {

  constructor(private http: HttpClient) {}

   data:any = [];
   categories:any = [];
   options:any = [];

   categoryList:category[] = [];
   productList:product[] = [];
   colorList:companyProduct[] = [];


    settings = {
        actions:{columnTitle: 'Manage Stock',position:'right'},
        pager:{
            perPage: 18
        } ,
        add:{
            confirmCreate:true,
        },
        edit:{
            confirmSave:true
        },
        delete :{
            confirmDelete: true
        },

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
        }
    };

   ngOnInit(): void {

       this.http.get<ApiService>('http://localhost:8000/api/product').subscribe(
          data => {
              // @ts-ignore
              for (let product of data) {
                  this.options.push({value: product.id, title: product.productName});
                  this.categories.push({id:product.category.value, productId: product.id, categoryName:product.category.title});
              }
              debugger;

              var newSetting:any = this.settings;
              newSetting.columns.productNames.editor.config.list = this.options;

              this.settings = Object.assign({}, newSetting);

          }
      );
      this.refreshPage();
   }

   refreshPage(){
    /*   this.http.get<ApiService>('http://localhost:8000/api/product').subscribe(
           data => {

               // @ts-ignore
               for (let product of data) {
                   product.categoryTitle = product.category.title;
                   product.productNames = product.productName;
               }

               this.data = data;
               console.log(this.data);
           }
       );*/


       this.http.get<ApiService>('http://localhost:8000/api/companyProduct/' + JSON.parse(localStorage.getItem("currentUser")).company.id).subscribe(
           data => {
                   // @ts-ignore


               for (let companyProduct of data) {
                   companyProduct.productNames = companyProduct.product.productName;
                   companyProduct.categoryTitle = companyProduct.product.category.title;
                   companyProduct.productColors = companyProduct.productColor;
               }
               debugger;

               /*for (let companyProduct of data) {
                   companyProduct.productColors = companyProduct.productColor;
                   companyProduct.productNames = companyProduct.product.productName;
                   companyProduct.categoryTitle = companyProduct.product.productCategory;
               }*/
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

   //Database Operations --------------------------------------------------------------------------------

   addRecord(event) {

     var data = {
       "productCode" : event.newData.productCode,
       "product" : {id: event.newData.productNames},
       "productPrice" : +event.newData.productPrice,
       "productColor" : event.newData.productColors,
       "productAmount" : +event.newData.productAmount,
        "company": {id: JSON.parse(localStorage.getItem("currentUser")).company.id}
     };

     this.http.post<ApiService>('http://localhost:8000/api/companyProduct/', data).subscribe(
         res => {
           this.refreshPage();
           console.log(res);
           event.confirm.resolve(event.newData);
         },
         (err: HttpErrorResponse) => {
           if (err.error instanceof Error) {
             console.log("Client-side error occured.");
           } else {
             console.log("Server-side error occured.");
               alert('Please perform the requirements\nProduct Code must be UNIQUE\nFields Cannot be null!');
           }
         });
   }


   deleteRecord(event){

     console.log(event.data);

     this.http.delete<companyProduct>('http://localhost:8000/api/companyProduct/'+event.data.id).subscribe(
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



   updateRecord(event) {

     console.log('ddddd');

       var data = {
           "productCode" : event.newData.productCode,
           "product" : {id: event.newData.productNames},
           "productPrice" : +event.newData.productPrice,
           "productColor" : event.newData.productColors,
           "productAmount" : +event.newData.productAmount,
           "company": {id: JSON.parse(localStorage.getItem("currentUser")).company.id}
       };

     this.http.put<companyProduct>('http://localhost:8000/api/companyProduct/'+event.newData.id, data).subscribe(

         res => {
           console.log(res);
           event.confirm.resolve(event.newData);
           this.refreshPage();
         },

         (err: HttpErrorResponse) => {

           if (err.error instanceof Error) {
             console.log("Client-side error occured.");
           } else {
             console.log("Server-side error occured.");
               alert('Please perform the requirements\nProduct Code must be UNIQUE\nFields Cannot be null!');
           }

         });
   }
}

