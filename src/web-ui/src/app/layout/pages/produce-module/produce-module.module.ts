import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProduceModuleComponent } from './produce-module.component';
import {ProduceModuleRoutingModule} from "./produceModule-routing.module";
import { GeneratePrescriptionComponent } from './generate-prescription/generate-prescription.component';
import { GenerateWorkOrderComponent } from './generate-work-order/generate-work-order.component';
import {Ng2SmartTableModule} from "ng2-smart-table";
import {MatSelectModule} from "@angular/material/select";
import {FormsModule} from "@angular/forms";

@NgModule({
  declarations: [ProduceModuleComponent, GeneratePrescriptionComponent, GenerateWorkOrderComponent],
    imports: [
        CommonModule,
        ProduceModuleRoutingModule,
        Ng2SmartTableModule,
        MatSelectModule,
        FormsModule
    ]
})
export class ProduceModuleModule { }
