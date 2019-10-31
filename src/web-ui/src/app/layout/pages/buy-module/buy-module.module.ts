import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {BuyModuleRoutingModule} from "./buyModule-routing.module";
import {BuyModuleComponent} from "./buy-module.component";
import {FlexLayoutModule} from "@angular/flex-layout";
import {NgxDatatableModule} from "@swimlane/ngx-datatable";
import {Ng2SmartTableModule} from "ng2-smart-table";
@NgModule({
  declarations: [BuyModuleComponent],
  imports: [
    CommonModule,
    BuyModuleRoutingModule,
    Ng2SmartTableModule,
    FlexLayoutModule.withConfig({addFlexToParent: false})
  ]
})
export class BuyModuleModule { }
