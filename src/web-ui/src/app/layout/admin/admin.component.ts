import {Component, OnInit, ViewChild} from '@angular/core';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {ApiService} from "../../shared/services/api.service";
import {UserService} from "../../shared/services/user.service";
import {user} from "../../common/user";

@Component({
  selector: 'app-admin',
  // templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
  template: `
    <ng2-smart-table [settings]="settings" [source]="data" (createConfirm)="addRecord($event)"
                     (deleteConfirm)="deleteRecord($event)"></ng2-smart-table>
  `
})
export class AdminComponent implements OnInit {

  constructor(private http: HttpClient) {}


  data:any = [];

  ngOnInit(): void {

    this.http.get<ApiService>('http://localhost:8000/api/users').subscribe(
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
    actions:{add:false,
    edit: false,
      columnTitle: 'Manage'},
    add:{
      confirmCreate:true,
    },
    delete :{
      confirmDelete: true
    },

    columns: {
      id: {
        title: 'User Id',
        filter: true,
        addable: false,
      },
      username: {
        title: 'User Name',
        filter: true
      },
      password: {
      title: 'Password',
      filter: true
    },
      nameSurname: {
        title: 'Name Surname',
        filter: true
      },
      email: {
        title: 'E-mail Address',
        filter: true
      }
    }
  };


  addRecord(event) {

    var data = {
      "id" : event.newData.id,
      "username" : event.newData.username,
      "password" : event.newData.password,
      "nameSurname" : event.newData.nameSurname,
      "email" : event.newData.email,
    };

    this.http.post<UserService>('http://localhost:8000/api/users/', data).subscribe(
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

    this.http.delete<user>('http://localhost:8000/api/users/'+event.data.id).subscribe(
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








}

  /*displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);

  // @ts-ignore
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
  }

}
export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
  {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
  {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
  {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
  {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
  {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
  {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
  {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
  {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
  {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
  {position: 11, name: 'Sodium', weight: 22.9897, symbol: 'Na'},
  {position: 12, name: 'Magnesium', weight: 24.305, symbol: 'Mg'},
  {position: 13, name: 'Aluminum', weight: 26.9815, symbol: 'Al'},
  {position: 14, name: 'Silicon', weight: 28.0855, symbol: 'Si'},
  {position: 15, name: 'Phosphorus', weight: 30.9738, symbol: 'P'},
  {position: 16, name: 'Sulfur', weight: 32.065, symbol: 'S'},
  {position: 17, name: 'Chlorine', weight: 35.453, symbol: 'Cl'},
  {position: 18, name: 'Argon', weight: 39.948, symbol: 'Ar'},
  {position: 19, name: 'Potassium', weight: 39.0983, symbol: 'K'},
  {position: 20, name: 'Calcium', weight: 40.078, symbol: 'Ca'},
];
*/
