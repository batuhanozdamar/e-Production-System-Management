import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {BuyModuleRoutingModule} from "./buyModule-routing.module";
import {BuyModuleComponent} from "./buy-module.component";
import {FlexLayoutModule} from "@angular/flex-layout";
import {Ng2SmartTableModule} from "ng2-smart-table";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {MatDialogModule} from "@angular/material/dialog";
@NgModule({
  declarations: [BuyModuleComponent],
    imports: [
        CommonModule,
        BuyModuleRoutingModule,
        Ng2SmartTableModule,
        FlexLayoutModule.withConfig({addFlexToParent: false}),
        NgbModule,
        FormsModule,
        MatDialogModule,
    ]
})
export class BuyModuleModule { }
