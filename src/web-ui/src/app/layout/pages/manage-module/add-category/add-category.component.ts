import { Component, OnInit } from '@angular/core';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {ApiService} from "../../../../shared/services/api.service";
import {offer} from "../../../../common/offer";


@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.scss']
})
export class AddCategoryComponent implements OnInit {

  constructor(private http: HttpClient) {}

  data:any = [];

  ngOnInit(): void {

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
      deleteButtonContent: ""
    },
    add: {
      confirmCreate: true,
      addButtonContent: "Add New Category"
    },
    edit: {
      confirmSave:true,
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

    this.http.delete<offer>('http://localhost:8000/api/offer/'+ event.data.id).subscribe(
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
