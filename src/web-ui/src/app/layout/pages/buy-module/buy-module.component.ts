import {Component, ElementRef, Inject, Input, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {ApiService} from "../../../shared/services/api.service";
import {product} from "../../../common/product";
import {offer} from "../../../common/offer";
import {ModalDismissReasons, NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {company} from "../../../common/company";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";


var input = Input;

export interface DialogData {
  animal: string;
  name: string;
}

@Component({
  selector: 'app-buy-module',
  templateUrl: './buy-module.component.html',
  styleUrls: ['./buy-module.component.scss'],

})
export class BuyModuleComponent implements OnInit {


  constructor(private http: HttpClient, private modalService: NgbModal) {}

  data:any = [];
  yourAmount:number;

  yourPrice:number;

  selectedProductDto: product;

  
  ngOnInit() {
    debugger;
    this.refreshPage();
  }
  refreshPage(){

    var currentUserStr = localStorage.getItem("currentUser");
    if (currentUserStr != null && currentUserStr != "") {
      var currentUser= JSON.parse(currentUserStr);
    }


    this.http.get<ApiService>('http://localhost:8000/api/companyProduct/getAll/' + currentUser.company.id).subscribe(
        data => {
          debugger;
          // @ts-ignore
          for (let companyProduct of data) {
            companyProduct.productNames = companyProduct.product.productName;
            companyProduct.categoryTitle = companyProduct.product.category.title;
            companyProduct.company = companyProduct.company.companyName;
            companyProduct.offerStatus = companyProduct.offerStatusDto.name;
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
    actions: {
      columnTitle: 'Send Offer',
      add: false,
      edit: false,
      delete: false,
      custom: [{ name: 'newOffer', title: `Send Offer` }],
      position: 'right'
    },

    columns: {
      productCode: {
        title: 'Product Code',
        filter: true,
        editable: false,
      },
      categoryTitle: {
        title: 'Category',
        filter: true,
        editable: false,
      },
      productNames: {
        title: 'Product Name',
        filter: true,
        editable: false,
      },
      productColor: {
        title: 'Product Color',
        filter: true,

      },
      productPrice: {
        title: 'Price',
        filter: true,
        editable: false,
      },
      company: {
      title: 'Seller',
      filter: true,
    },
      offerStatus: {
        title: 'Offer Status',
        filter: true,
      }
    }
  };




  // Dialog box -------------------------------------------
  closeResult: string;

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }


  open(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {

      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  sendOffer() {

    if(+this.yourAmount > +this.selectedProductDto.companyProductDto.productAmount)
    {

      alert("There is not enough stock.")
    }
    else if(+this.yourPrice > +this.selectedProductDto.companyProductDto.productPrice)
    {

      alert("Offer must be smaller or equal to product price.")
    }
    else {


      var currentUserStr = localStorage.getItem("currentUser");
      if (currentUserStr != null && currentUserStr != "") {
        var currentUser = JSON.parse(currentUserStr);
      }

      var data2 =
          {
            "id": this.selectedProductDto.id,
            "companyProductDto": this.selectedProductDto.companyProductDto,
            "askedPrice": +this.yourPrice,
            "askedAmount": +this.yourAmount,
            "companyDto": {id: JSON.parse(localStorage.getItem("currentUser")).company.id}
          }
      this.http.post<ApiService>('http://localhost:8000/api/offer/', data2).subscribe(
          data => {
            this.refreshPage();
          }
      )
      //this.modalService.
      this.modalService.dismissAll();
    }


  }


  @ViewChild('newOfferDialog') newOfferDialog: ElementRef;
  newOfferDto: offer = null;

  //open dialog
  openNewOfferDialog(event) {
    this.yourPrice=null;
    this.yourAmount=null;

    this.newOfferDto = new offer();
    console.log(event.data.productCode);
    this.selectedProductDto = event.data;
    var page = this;
    this.modalService.open(this.newOfferDialog, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      //this.http.post<ApiService>('http://localhost:8000/api/companyProduct/getAll/' + currentUser.company.id).subscribe(
        //  data => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });

    debugger;

  }

}
