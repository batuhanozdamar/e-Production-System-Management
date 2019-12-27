import { Component, OnInit } from '@angular/core';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {ApiService} from "../../../../shared/services/api.service";
import {category} from "../../../../common/category";


@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.scss']
})
export class AddCategoryComponent implements OnInit {

  constructor(private http: HttpClient) {}

  data:any = [];

  ngOnInit(): void {

    this.refreshPage();
  }

  refreshPage(){

    this.http.get<ApiService>('http://localhost:8000/api/category').subscribe(
        data => {
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
    delete: {
      deleteButtonContent: "Delete Category",
      confirmDelete: true
    },
    add: {
      confirmCreate: true,
      addButtonContent: "Add New Category"
    },
    edit: {
      editButtonContent: ""
    },

    columns: {
      title: {
        title: 'Product Category',
        filter: true,
        editable:false,
      }
    }
  };


  addRecord(event) {

    var data = {
      "title" : event.newData.title,
      "username": JSON.parse(localStorage.getItem("currentUser")).username,
    };

    this.http.post<ApiService>('http://localhost:8000/api/category/', data).subscribe(
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
          }
        });
  }

  deleteRecord(event){

    console.log(event.data);
  debugger;
    this.http.delete<category>('http://localhost:8000/api/category/'+ event.data.value).subscribe(
        res => {

          this.refreshPage();
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
