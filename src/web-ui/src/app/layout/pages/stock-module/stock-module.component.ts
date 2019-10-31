import {Component, OnInit, TemplateRef} from '@angular/core';
import {ProductService} from "../../../shared/services/product.service";
import {Page} from "../../../common/page";
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {ApiService} from "../../../shared/services/api.service";
import {product} from "../../../common/product";

@Component({
  selector: 'app-stock-module',
  /*templateUrl: './stock-module.component.html',*/
  styleUrls: ['./stock-module.component.scss'],
  template: `
    <ng2-smart-table [settings]="settings" [source]="data" (createConfirm)="addRecord($event)"
                     (editConfirm)="updateRecord($event)"
                     (deleteConfirm)="deleteRecord($event)"></ng2-smart-table>
  `
})

export class StockModuleComponent implements OnInit {

 /* page = new Page();
  cols=[];
  rows = [];
*/

/*  constructor(/!*private productService: ProductService*!/) {}

  ngOnInit() {}*/

    /*this.cols = [
      {prop: 'productCode', name: 'Product Code', sortable: false},
      {prop: 'productName', name: 'Product Name', sortable: false},
      {prop: 'productCategory', name: 'Product Category', sortable: false},
      {prop: 'productPrice', name: 'Price', sortable: false},
      {prop: 'company', name: 'Owner of the Product', sortable: false}];

    this.setPage({offset: 0});
  }*/

 /* setPage(pageInfo) {

    this.page.page = pageInfo.offset;

    this.productService.getAllPageable(this.page).subscribe(pagedData => {
      this.page.size = pagedData.size;
      this.page.page = pagedData.page;
      this.page.totalElements = pagedData.totalElements;
      this.rows = pagedData.content;
    });*/


  constructor(private http: HttpClient) {}


   data:any = [];

   ngOnInit(): void {

     this.http.get<ApiService>('http://localhost:8000/api/product').subscribe(
         data => {
             debugger;
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
         productCategory: {
         title: 'Category',
         filter: true,
             editable:false,
         editor: {
           type: 'list',
           config: {
             type: 'Select Category',
             list: [
               {value: 'Çekmece Rayları', title: 'Çekmece Rayları'},
               {value: 'Menteşeler', title: 'Menteşeler'},
               {value: 'Kilit Sistemleri', title: 'Kilit Sistemleri'},
               {value: 'Boya ve Cila Ürünleri', title: 'Boya ve Cila Ürünleri'},
                 {value: 'Bağlantı Elemanları', title: 'Bağlantı Elemanları'}
             ]
           }
         },
       },
       productName: {
         title: 'Product Name',
         filter: true,
           editable:false
       },
       productPrice: {
         title: 'Price',
         filter: true
       }
     }
   };


   addRecord(event) {

     var data = {
         "productCode" : event.newData.productCode,
       "productCategory" : event.newData.productCategory,
       "productName" : event.newData.productName,
       "productPrice" : +event.newData.productPrice,
       "username": JSON.parse(localStorage.getItem("currentUser")).username,

     };

     this.http.post<ApiService>('http://localhost:8000/api/product/', data).subscribe(
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

     this.http.delete<product>('http://localhost:8000/api/product/'+event.data.id).subscribe(
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
     //event.confirm.resolve(event.source.data);

   }

   updateRecord(event) {
     console.log('ddddd');
       var data = {
           "productCode" : event.newData.productCode,
           "productCategory" : event.newData.productCategory,
           "productName" : event.newData.productName,
           "productPrice" : +event.newData.productPrice,
           "username": JSON.parse(localStorage.getItem("currentUser")).username,
       };

     this.http.put<product>('http://localhost:8000/api/product/'+event.newData.id, data).subscribe(
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


/*  --default ng2 smart table codes---
constructor(){}


  settings = {

    columns: {
      id: {
        title: 'ID',
        // filter: false,
        editable: false,
        addable:false,
        autoIncrement: false,
      },
      Category: {
        title: 'Category',
        filter: true
      },
      Product: {
        title: 'Product Name',
        filter: true
      },
      Price: {
        title: 'Price',
        filter: true
      }
    }
  };


  data = [
    {
      id: 1,
      Category: 'Computer',
      Product: 'MacBook',
      Price: '10$'
    },
    {
      id: 2,
      Category: 'Techical Staff',
      Product: 'Regulator',
      Price: '20$'
    },
    {
      id: 3,
      Category: 'Other',
      Product: 'iPhone',
      Price: '100$'
    },
    {
      id: 4,
      Category: 'Electronic',
      Product: 'Samsung SSD',
      Price: '300$'
    },
    {
      id: 5,
      Category: 'Other',
      Product: 'SD Card',
      Price: '50$'
    },
    {
      id: 6,
      Category: 'Other',
      Product: 'iPhone 11 Pro',
      Price: '100$'
    },
    {
      id: 7,
      Category: 'Test Category',
      Product: 'Test Product',
      Price: '1$'
    },
    ,
    {
      id: 8,
      Category: 'Test Category',
      Product: 'Test Product',
      Price: '1$'
    },
    {
      id: 9,
      Category: 'Test Category',
      Product: 'Test Product',
      Price: '1$'
    },
    {
      id: 10,
      Category: 'Test Category',
      Product: 'Test Product',
      Price: '1$'
    },
    {
      id: 11,
      Category: 'Test Category',
      Product: 'Test Product',
      Price: '1$'
    }
  ];

  ngOnInit() {}*/

