import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StockModuleComponent } from './stock-module.component';
import {StockModuleRoutingModule} from './stockModule-routing.module';
import {ProductService} from "../../../shared/services/product.service";
import {ApiService} from "../../../shared/services/api.service";
import {NgxDatatableModule} from "@swimlane/ngx-datatable";
import {BsModalService} from "ngx-bootstrap";
import {ReactiveFormsModule} from "@angular/forms";
import {Ng2SmartTableModule} from "ng2-smart-table";


@NgModule({
  declarations: [StockModuleComponent],
    imports: [
        CommonModule,
        StockModuleRoutingModule,
        NgxDatatableModule,
        ReactiveFormsModule,
        Ng2SmartTableModule,


    ],
  providers: [ProductService,ApiService,BsModalService]
})
export class StockModuleModule { }

