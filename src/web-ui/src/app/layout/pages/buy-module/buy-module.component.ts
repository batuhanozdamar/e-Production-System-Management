import {Component, ElementRef, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {ApiService} from "../../../shared/services/api.service";
import {product} from "../../../common/product";
import {offer} from "../../../common/offer";
import {ModalDismissReasons, NgbModal} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-buy-module',
  templateUrl: './buy-module.component.html',
  styleUrls: ['./buy-module.component.scss'],

})
export class BuyModuleComponent implements OnInit {


  constructor(private http: HttpClient, private modalService: NgbModal) {}

  data:any = [];

  selectedProductDto: product;
  
  ngOnInit() {

    this.http.get<ApiService>('http://localhost:8000/api/category').subscribe(
        options => {
          //self.options = options;

          console.log(this.settings);
          //this.categoryList = options;

          var newSetting:any = this.settings;
          newSetting.columns.categoryTitle.editor.config.list = options;
          this.settings = Object.assign({}, newSetting);
          // self.settings.columns.productCategory.editor.config.list=this.options;
          /* this.settings.columns.productCategory.editor.config.list=
               [{value: 'Çekmece Rayları', title: 'Çekmece Rayları'},
               {value: 'Menteşeler', title: 'Menteşeler'},
               {value: 'Kilit Sistemleri', title: 'Kilit Sistemleri'},
               {value: 'Boya ve Cila Ürünleri', title: 'Boya ve Cila Ürünleri'},
               {value: 'Bağlantı Elemanları', title: 'Bağlantı Elemanları'}]
           ;*/
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
      productName: {
        title: 'Product Name',
        filter: true,
        editable: false,
      },
      productPrice: {
        title: 'Price',
        filter: true,
        editable: false,
      },
      company: {
      title: 'Seller',
      filter: true,
      editable: false,
        valuePrepareFunction: (user) => {
          return user.nameSurname;
        }
    }
    }
  };

  addRecord(event) {
    console.log("asd");

    var data = {
      "productCode" : event.newData.productCode,
      "productCategory" : event.newData.productCategory,
      "productName" : event.newData.productName,
      "productPrice" : event.newData.productPrice,
      "askedPrice" : +event.newData.askedPrice,
      "username": JSON.parse(localStorage.getItem("currentUser")).username,

    };

    this.http.post<ApiService>('http://localhost:8000/api/offer/', data).subscribe(
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

  @ViewChild('newOfferDialog') newOfferDialog: ElementRef;

  newOfferDto: offer = null;

  openNewOfferDialog(event) {
    this.newOfferDto = new offer();


    console.log(event.data.productCode);

    this.selectedProductDto = event.data;
    this.modalService.open(this.newOfferDialog, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

}
