import { Component, OnInit } from '@angular/core';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {ApiService} from "../../../../shared/services/api.service";
import {offer} from "../../../../common/offer";
import {role} from "../../../../common/role";

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss']
})
export class AddUserComponent implements OnInit {


  constructor(private http: HttpClient) {}

  data:any = [];
  roleList:any[] = [];

  ngOnInit(): void {

    this.http.get<ApiService>('http://localhost:8000/api/role').subscribe(
        data => {


          // @ts-ignore
            for (let role of data) {
            this.roleList.push({value: role.id, title: role.name})
          }

          // @ts-ignore
          //this.roleList = role;
          var newSetting:any = this.settings;
          newSetting.columns.roleName.editor.config.list = this.roleList;
          this.settings = Object.assign({}, newSetting);
        },
        (err: HttpErrorResponse) => {
          if (err.error instanceof Error) {
            console.log("Client-side error occured.");
          } else {
            console.log("Server-side error occured.");
          }
        });

    this.refreshPage();
  }

  refreshPage(){
        this.http.get<ApiService>('http://localhost:8000/api/users').subscribe(
            data => {

                // @ts-ignore
                for (let user of data) {
                    user.roleName = user.role.name;
                    user.password = "****";
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
    delete: {
      deleteButtonContent: "Delete",
        confirmDelete: true
    },
    add: {
      confirmCreate: true,
      addButtonContent: "Add New User"
    },
    edit: {
      confirmSave:true,
      editButtonContent: ""
    },

    columns: {
        nameSurname: {
            title: 'Name Surname',
            filter: true,
            editable:false,
        },
        roleName: {
            title: 'User Type',
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
      username: {
        title: 'User Name',
        filter: true,
        editable:false,
      },
      password: {
        title: 'Password',
        filter: true,
        editable:false,
      },
    }

  };


  addRecord(event) {

      var selectedRole: role =null;

      for (let role of this.roleList) {
          if(role.value == event.newData.roleName) {
              selectedRole = role;
              break;
          }
      }

      var currentUserStr = localStorage.getItem("currentUser");
      if (currentUserStr != null && currentUserStr != "") {
          var currentUser= JSON.parse(currentUserStr);
      }


      var data = {
      "company" : currentUser.company,
      "username" : event.newData.username,
      "password" : event.newData.password,
      "nameSurname" : event.newData.nameSurname,
      // @ts-ignore
      "role" : {id: selectedRole.value},
    };

    this.http.post<ApiService>('http://localhost:8000/api/users/addUserCompany/', data).subscribe(
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

    this.http.delete<offer>('http://localhost:8000/api/users/'+ event.data.id).subscribe(
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
