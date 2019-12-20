import {Component, OnInit} from '@angular/core';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {ApiService} from "../../../shared/services/api.service";
import {product} from "../../../common/product";
import {category} from "../../../common/category";

@Component({
  selector: 'app-stock-module',
  templateUrl: './stock-module.component.html',
  styleUrls: ['./stock-module.component.scss'],
})

export class StockModuleComponent implements OnInit {

  constructor(private http: HttpClient) {}

   data:any = [];
   options:any = [];
   productArray:any = [];

   categoryList:category[] = [];
   productList:product[] = [];

    settings = {
        actions:{columnTitle: 'Manage Stock'},
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
                editable:false
            },
            categoryTitle: {
                title: 'Category',
                filter: true,
                editable:false,
                editor: {
                    type: 'list',
                    config: {
                        // type: 'Select Category',
                        list: []
                    }
                },
            },
            productName: {
                title: 'Product Name',
                filter: true,
                editable:false,
                editor: {
                    type: 'list',
                    config: {
                        // type: 'Select Category',
                        list: []
                    }
                },
            },
            productColor: {
                title: 'Color',
                filter: true,
                editable:true,
                editor: {
                    type: 'list',
                    config: {
                        // type: 'Select Category',
                        list: [{value:"Siyah", title:"Siyah"},
                            {value:"Beyaz", title:"Beyaz"},
                            {value:"Sarı", title:"Sarı"},
                            {value:"Lacivert", title:"Lacivert"}]

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

       this.http.get<ApiService>('http://localhost:8000/api/category').subscribe(
           options => {
               //self.options = options;

               console.log(this.settings);
               // @ts-ignore
               this.categoryList = options;

               var newSetting:any = this.settings;
               newSetting.columns.categoryTitle.editor.config.list = options;
               this.settings = Object.assign({}, newSetting);
           }
       );

       this.http.get<ApiService>('http://localhost:8000/api/product').subscribe(
           productArray => {
               // @ts-ignore
               this.productList = productArray;

               var newSetting:any = this.settings;
               newSetting.columns.productName.editor.config.list = productArray;
               this.settings = Object.assign({}, newSetting);
           }
       );

       this.http.get<ApiService>('http://localhost:8000/api/companyProduct').subscribe(

           data => {

               var dataList = data;
             /*  // @ts-ignore
               for (let product of data) {
                   product.categoryTitle = product.category.title
                   product.productName = product.productName
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
       "categoryTitle" : event.newData.categoryTitle,
       "productName" : event.newData.productName,
       "productPrice" : +event.newData.productPrice,
       "productColor" : event.newData.productColor,
       "productAmount" : +event.newData.productAmount,
       "username": JSON.parse(localStorage.getItem("currentUser")).username,
     };

     this.http.post<ApiService>('http://localhost:8000/api/companyProduct/', data).subscribe(
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

   deleteRecord(event){

     console.log(event.data);

     this.http.delete<product>('http://localhost:8000/api/companyProduct/'+event.data.id).subscribe(
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
           "categoryTitle" : event.newData.categoryTitle,
           "productName" : event.newData.productName,
           "productPrice" : +event.newData.productPrice,
           "productColor" : event.newData.productColor,
           "productAmount" : +event.newData.productAmount,
           "username": JSON.parse(localStorage.getItem("currentUser")).username,
       };

     this.http.put<product>('http://localhost:8000/api/companyProduct/'+event.newData.id, data).subscribe(

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
}

