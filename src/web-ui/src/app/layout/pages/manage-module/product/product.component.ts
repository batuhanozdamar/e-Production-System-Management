import { Component, OnInit } from '@angular/core';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {ApiService} from "../../../../shared/services/api.service";
import {product} from "../../../../common/product";
import {category} from "../../../../common/category";

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {

  constructor(private http: HttpClient) {

  }

  data:any = [];
  options:any = [];
  categoryList:category[] = [];

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
      productCode: {
        title: 'Product Code',
        filter: true,
        editable:false
      },

      productName: {
        title: 'Product Name',
        filter: true,
        editable:false
      }
    }
  };

  ngOnInit(): void {

    this.http.get<ApiService>('http://localhost:8000/api/category').subscribe(
        options => {

          console.log(this.settings);
          // @ts-ignore
          this.categoryList = options;
          var newSetting:any = this.settings;
          newSetting.columns.categoryTitle.editor.config.list = options;
          this.settings = Object.assign({}, newSetting);
        }
    );

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




  addRecord(event) {

    var selectedCategory: category =null;

    for (let category of this.categoryList) {
      if(category.value == event.newData.categoryTitle) {
        selectedCategory = category;
        break;
      }
    }

    var data = {
      "productCode" : event.newData.productCode,
      "category" : selectedCategory,
      "productName" : event.newData.productName,
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

  }

  updateRecord(event) {

    console.log('ddddd');

    var selectedCategory: category =null;

    for (let category of this.categoryList) {
      if(category.value == event.newData.categoryTitle) {
        selectedCategory = category;
        break;
      }
    }

    var data = {
      "productCode" : event.newData.productCode,
      "category" : selectedCategory,
      "productName" : event.newData.productName,
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
