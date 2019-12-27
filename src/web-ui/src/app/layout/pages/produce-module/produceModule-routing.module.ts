import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ProduceModuleComponent} from "./produce-module.component";
import {GenerateWorkOrderComponent} from "./generate-work-order/generate-work-order.component";
import {GeneratePrescriptionComponent} from "./generate-prescription/generate-prescription.component";



const routes: Routes = [
    {
        path: '',
        component: ProduceModuleComponent
    },
    {
        path: 'prescription',
        component: GeneratePrescriptionComponent
    },
    {
        path: 'work-order',
        component: GenerateWorkOrderComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ProduceModuleRoutingModule{}
