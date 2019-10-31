import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material';
import {ApiService} from "../../shared/services/api.service";
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {product} from "../../common/product";
import {offer} from "../../common/offer";

export interface Transaction {
    productName: string;

    productCode: string;
/*
    productCategory: string;

    productPrice: number;

    company: string;*/

    askedPrice: number;
}


@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss']
})

export class DashboardComponent implements OnInit {

    data:any = [];

    constructor(private http: HttpClient) {

    }

    ngOnInit() {
        this.http.get<ApiService>('http://localhost:8000/api/offer/').subscribe(
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
        edit: {
            confirmCreate:true,
            editButtonContent: "Accept"
        },
        delete: {
            confirmDelete:true,
            deleteButtonContent: "Reject"
        },
        add: {
            addButtonContent: ""
        },
        columns: {
            productCode: {
                title: 'Product Code',
                filter: true
            },
            productCategory: {
                title: 'Category',
                filter: true,
            },
            productName: {
                title: 'Product Name',
                filter: true
            },
            productPrice: {
                title: 'Price',
                filter: true
            },
            askedPrice:{
                title: 'Offered Price',
                filter: true
            },
            company: {
                title: 'Offered Company',
                filter: true,
                editable: false,
                valuePrepareFunction: (user) => {
                    return user.nameSurname;
                }
            }
        }
    };

    addRecord(event) {

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
        //event.confirm.resolve(event.source.data);

    }
}
